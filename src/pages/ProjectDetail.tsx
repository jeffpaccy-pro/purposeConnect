import React, { useState } from 'react';
import {
  FolderKanban,
  Users,
  CheckCircle2,
  Circle,
  Clock,
  Plus,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { useApp } from '../lib/store';
import { TaskStatus } from '../types/database';

interface ProjectDetailProps {
  id: string;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ id }) => {
  const {
    projects,
    communities,
    allUsers,
    currentUser,
    toggleTaskStatus,
    addTaskToProject,
    joinProject,
    navigate,
    startOrOpenDirectMessage,
  } = useApp();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  const project = projects.find((p) => p.id === id) || projects[0];
  const community = communities.find((c) => c.id === project.community_id);
  const creator = allUsers.find((u) => u.id === project.creator_id) || allUsers[0];

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTaskToProject(project.id, newTaskTitle.trim());
    setNewTaskTitle('');
    setIsAddingTask(false);
  };

  const tasks = project.tasks || [];
  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/projects')}
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#145DA0] font-semibold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Projects</span>
      </button>

      {/* Project Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-emerald-50 text-[#16A34A] border border-emerald-200">
                {project.status === 'active' ? 'Active Sprint' : project.status}
              </span>
              {community && (
                <span className="text-xs text-[#145DA0] font-semibold">
                  in {community.name}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182230]">
              {project.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => joinProject(project.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                project.is_member
                  ? 'bg-blue-50 text-[#145DA0] border border-blue-200'
                  : 'bg-[#145DA0] hover:bg-[#0f487e] text-white shadow-xs'
              }`}
            >
              {project.is_member && <CheckCircle2 className="w-4 h-4" />}
              <span>{project.is_member ? 'Joined Team' : 'Request to Join'}</span>
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Core Project Goal
          </p>
          <p className="text-sm font-semibold text-[#182230] italic">
            &ldquo;{project.goal}&rdquo;
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {project.description}
        </p>

        {/* Progress & Milestone */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Milestone Completion</span>
            <span className="font-mono text-[#145DA0]">{project.progress || 0}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#145DA0] h-2 rounded-full transition-all duration-500"
              style={{ width: `${project.progress || 0}%` }}
            />
          </div>
        </div>

        {/* Project Meta Bar */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-slate-400" />
              <span>{project.members_count} collaborators</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Target: {project.target_date || 'Nov 2026'}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Owner:</span>
            <button
              onClick={() => navigate(`/profile/${creator.username}`)}
              className="font-semibold text-slate-800 hover:text-[#145DA0]"
            >
              {creator.full_name}
            </button>
          </div>
        </div>
      </div>

      {/* Task Board */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-[#182230]">Collaborative Task Board</h2>
            <p className="text-xs text-slate-500">Click circle to toggle status between Todo, In-Progress, and Done</p>
          </div>

          <button
            onClick={() => setIsAddingTask(!isAddingTask)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Inline Add Task Form */}
        {isAddingTask && (
          <form onSubmit={handleAddTaskSubmit} className="flex gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 animate-in fade-in">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="e.g. Build API route for sensor telemetry..."
              className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!newTaskTitle.trim()}
              className="px-4 py-1.5 bg-[#145DA0] hover:bg-[#0f487e] disabled:opacity-50 text-white rounded-xl text-xs font-semibold"
            >
              Add
            </button>
          </form>
        )}

        {/* 3 Columns Task Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: Todo */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>To Do</span>
              <span className="font-mono text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                {todoTasks.length}
              </span>
            </div>
            <div className="space-y-2">
              {todoTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex items-start gap-2.5"
                >
                  <button
                    onClick={() => toggleTaskStatus(project.id, t.id, 'in_progress')}
                    className="p-0.5 text-slate-300 hover:text-[#145DA0] mt-0.5"
                    title="Move to In Progress"
                  >
                    <Circle className="w-4 h-4" />
                  </button>
                  <div className="flex-1">
                    <p className="font-semibold text-xs text-[#182230] leading-snug">{t.title}</p>
                    {t.description && (
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{t.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#145DA0]">
              <span>In Progress</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded-full border border-blue-200">
                {inProgressTasks.length}
              </span>
            </div>
            <div className="space-y-2">
              {inProgressTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3 bg-white rounded-xl border border-blue-200/80 shadow-2xs hover:border-blue-300 transition-all flex items-start gap-2.5"
                >
                  <button
                    onClick={() => toggleTaskStatus(project.id, t.id, 'done')}
                    className="p-0.5 text-[#145DA0] hover:text-[#16A34A] mt-0.5"
                    title="Mark Done"
                  >
                    <Clock className="w-4 h-4" />
                  </button>
                  <div className="flex-1">
                    <p className="font-semibold text-xs text-[#182230] leading-snug">{t.title}</p>
                    {t.description && (
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{t.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Done */}
          <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#16A34A]">
              <span>Done</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                {doneTasks.length}
              </span>
            </div>
            <div className="space-y-2">
              {doneTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3 bg-white rounded-xl border border-emerald-200/80 shadow-2xs transition-all flex items-start gap-2.5 opacity-90"
                >
                  <button
                    onClick={() => toggleTaskStatus(project.id, t.id, 'todo')}
                    className="p-0.5 text-[#16A34A] hover:text-slate-400 mt-0.5"
                    title="Reopen task"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <div className="flex-1">
                    <p className="font-semibold text-xs text-slate-600 line-through leading-snug">
                      {t.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
