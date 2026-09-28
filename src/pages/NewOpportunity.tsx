import React, { useState } from 'react';
import { ArrowLeft, Send, Briefcase, Globe, Clock, ShieldCheck } from 'lucide-react';
import { useApp } from '../lib/store';
import { OpportunityType } from '../types/database';
import { z } from 'zod';

const oppSchema = z.object({
  title: z.string().min(5, 'Opportunity title must be at least 5 characters'),
  description: z.string().min(20, 'Please provide an informative description of the role or brief'),
  opportunity_type: z.enum(['job', 'internship', 'mentorship', 'collaboration', 'service', 'volunteer']),
  required_skills: z.string().min(2, 'Please specify at least 1 required skill'),
  location: z.string().optional(),
  contact_info: z.string().min(3, 'Please provide contact details or email'),
});

export const NewOpportunity: React.FC = () => {
  const { createOpportunity, communities, navigate } = useApp();

  const [title, setTitle] = useState('');
  const [opportunityType, setOpportunityType] = useState<OpportunityType>('internship');
  const [description, setDescription] = useState('');
  const [skillsInput, setSkillsInput] = useState('React, TypeScript, Figma');
  const [isRemote, setIsRemote] = useState(true);
  const [location, setLocation] = useState('Kigali, Rwanda');
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0]
  );
  const [contactPreference, setContactPreference] = useState<'platform' | 'email' | 'external_link'>('platform');
  const [contactInfo, setContactInfo] = useState('opportunities@connectpurpose.org');
  const [communityId, setCommunityId] = useState(communities[0]?.id || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = oppSchema.safeParse({
      title,
      description,
      opportunity_type: opportunityType,
      required_skills: skillsInput,
      location,
      contact_info: contactInfo,
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

      createOpportunity({
        title,
        opportunity_type: opportunityType,
        description,
        required_skills: skills,
        location,
        is_remote: isRemote,
        deadline: new Date(deadline).toISOString(),
        contact_preference: contactPreference,
        contact_info: contactInfo,
        community_id: communityId || undefined,
      });

      setIsLoading(false);
      navigate('/opportunities');
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button
        onClick={() => navigate('/opportunities')}
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#145DA0] font-semibold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Opportunities</span>
      </button>

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/90 space-y-6">
        <div>
          <span className="text-xs font-bold text-[#0B7A75] uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-[#0B7A75]" />
            <span>Create Listing</span>
          </span>
          <h1 className="text-2xl font-extrabold text-[#182230] mt-1">
            Share an opportunity or mentorship pod
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ConnectPurpose prohibits pay-to-apply fees and misleading recruiting listings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Opportunity title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Junior UI/UX Design Intern (3 Months Paid)"
              className={`w-full bg-[#F7F9FC] border rounded-xl px-3.5 py-2.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none ${
                errors.title ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.title && <p className="text-xs text-red-600 mt-1 font-medium">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Opportunity type
              </label>
              <select
                value={opportunityType}
                onChange={(e) => setOpportunityType(e.target.value as OpportunityType)}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              >
                <option value="internship">Paid Internship</option>
                <option value="mentorship">Mentorship Pod</option>
                <option value="collaboration">Project Collaboration</option>
                <option value="job">Full-time / Part-time Job</option>
                <option value="service">Local Craft / Technical Service</option>
                <option value="volunteer">Community Volunteer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Associated community
              </label>
              <select
                value={communityId}
                onChange={(e) => setCommunityId(e.target.value)}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              >
                <option value="">Public Opportunity</option>
                {communities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description & compensation / expectations
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline the responsibilities, stipend/pay details, time commitment, and what participants will learn..."
              rows={4}
              className={`w-full bg-[#F7F9FC] border rounded-2xl p-3.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none resize-none ${
                errors.description ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.description && (
              <p className="text-xs text-red-600 mt-1 font-medium">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Required skills (comma separated)
            </label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="e.g. Figma, React, Prototyping, Git"
              className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Format
              </label>
              <div className="flex items-center gap-2 pt-2">
                <input
                  id="remote-check"
                  type="checkbox"
                  checked={isRemote}
                  onChange={(e) => setIsRemote(e.target.checked)}
                  className="w-4 h-4 rounded text-[#145DA0] focus:ring-[#145DA0]"
                />
                <label htmlFor="remote-check" className="text-xs text-slate-700">
                  Remote / Flexible
                </label>
              </div>
            </div>

            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Kigali, Rwanda"
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contact preference
              </label>
              <select
                value={contactPreference}
                onChange={(e) => setContactPreference(e.target.value as typeof contactPreference)}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              >
                <option value="platform">Direct Platform Message</option>
                <option value="email">Email</option>
                <option value="external_link">External Application URL</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contact info or URL
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="email or external URL"
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-center gap-2 text-xs text-[#145DA0]">
            <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
            <span>Opportunities published on ConnectPurpose adhere to open trust and non-discrimination charters.</span>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/opportunities')}
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
              <span>{isLoading ? 'Publishing...' : 'Publish Opportunity'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
