import React, { useState } from 'react';
import { ArrowLeft, Send, FolderKanban, ShieldCheck } from 'lucide-react';
import { useApp } from '../lib/store';
import { ProjectStatus, VisibilityLevel } from '../types/database';
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(5, 'Project name must be at least 5 characters'),
  goal: z.string().min(10, 'Please articulate a clear one-sentence goal'),
  description: z.string().min(20, 'Please outline project scope and technical approach'),
  required_skills: z.string().min(2, 'Specify at least 1 required skill'),
});

export const NewProject: React.FC = () => {
  const { createProject, communities, navigate } = useApp();

  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [description, setDescription] = useState('');
  const [skillsInput, setSkillsInput] = useState('React, TypeScript, CSS');
  const [status, setStatus] = useState<ProjectStatus>('active');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [targetDate, setTargetDate] = useState(
    new Date(Date.now() + 86400000 * 45).toISOString().split('T')[0]
  );
  const [visibility, setVisibility] = useState<VisibilityLevel>('public');
  const [communityId, setCommunityId] = useState(communities[0]?.id || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = projectSchema.safeParse({
      title,
      goal,
      description,
      required_skills: skillsInput,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) fieldErrors[issue.path[0].toString()] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const skills = skillsInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const newProj = createProject({
        title,
        goal,
        description,
        status,
        start_date: startDate,
        target_date: targetDate,
        visibility,
        required_skills: skills,
        community_id: communityId || undefined,
      });

      setIsLoading(false);
      navigate(`/projects/${newProj.id}`);
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button
        onClick={() => navigate('/projects')}
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#145DA0] font-semibold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Projects</span>
      </button>

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/90 space-y-6">
        <div>
          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
            <FolderKanban className="w-4 h-4 text-purple-700" />
            <span>Project Initialization</span>
          </span>
          <h1 className="text-2xl font-extrabold text-[#182230] mt-1">
            Start a collaborative project workspace
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Define milestones, invite community builders, and track progress openly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Project name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Open Agri-Sensor Dashboard"
              className={`w-full bg-[#F7F9FC] border rounded-xl px-3.5 py-2.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none ${
                errors.title ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.title && <p className="text-xs text-red-600 mt-1 font-medium">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Core goal (one sentence)
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Enable cooperative farmers to monitor soil metrics via low-cost ESP32 sensors"
              className={`w-full bg-[#F7F9FC] border rounded-xl px-3.5 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none ${
                errors.goal ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.goal && <p className="text-xs text-red-600 mt-1 font-medium">{errors.goal}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Project description & scope
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the background, what you've built so far, and how collaborators can contribute..."
              rows={4}
              className={`w-full bg-[#F7F9FC] border rounded-2xl p-3.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none resize-none ${
                errors.description ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.description && (
              <p className="text-xs text-red-600 mt-1 font-medium">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Associated community
              </label>
              <select
                value={communityId}
                onChange={(e) => setCommunityId(e.target.value)}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              >
                <option value="">Public / Open Project</option>
                {communities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current stage
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              >
                <option value="planning">Planning (defining tasks & team)</option>
                <option value="active">Active Sprint (currently building)</option>
                <option value="completed">Completed / Maintained</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Start date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-1.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target completion date
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-1.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Required skills (comma separated)
            </label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="e.g. React, TypeScript, MQTT, Tailwind"
              className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-center gap-2 text-xs text-[#145DA0]">
            <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
            <span>ConnectPurpose projects are transparent by default, allowing peer learners to observe and contribute.</span>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-bold rounded-xl shadow-xs transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Creating workspace...' : 'Initialize Workspace'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
