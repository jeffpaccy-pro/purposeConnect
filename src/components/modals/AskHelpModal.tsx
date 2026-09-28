import React, { useState } from 'react';
import { X, HelpCircle, Send, Clock } from 'lucide-react';
import { useApp } from '../../lib/store';
import { UrgencyLevel } from '../../types/database';
import { z } from 'zod';

const helpSchema = z.object({
  title: z.string().min(6, 'Please state what you need help with'),
  details: z.string().min(10, 'Please provide sufficient details to help peers debug or guide you'),
  category: z.string().min(1, 'Category is required'),
  skill_level: z.string().min(1, 'Skill level is required'),
});

interface AskHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AskHelpModal: React.FC<AskHelpModalProps> = ({ isOpen, onClose }) => {
  const { communities, createPost } = useApp();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('Web development');
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [urgency, setUrgency] = useState<UrgencyLevel>('this_week');
  const [communityId, setCommunityId] = useState(communities[0]?.id || '');
  const [errors, setErrors] = useState<{ title?: string; details?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = helpSchema.safeParse({
      title,
      details,
      category,
      skill_level: skillLevel,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        title: fieldErrors.title?.[0],
        details: fieldErrors.details?.[0],
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const fullBody = `${title}\n\n${details}`;
      createPost({
        body: fullBody,
        community_id: communityId || undefined,
        post_type: 'help_request',
        urgency,
        category,
        skill_level: skillLevel,
        tags: [category, skillLevel, 'Help Request'],
      });

      setIsSubmitting(false);
      setTitle('');
      setDetails('');
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-6 border border-slate-100 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#182230]">Ask for community help</h2>
              <p className="text-xs text-slate-500">Get constructive guidance from peers and mentors</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              What do you need help with?
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Trouble aligning fixed sidebar layout on mobile browsers"
              className={`w-full bg-[#F7F9FC] border rounded-xl px-3.5 py-2.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none ${
                errors.title ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.title && <p className="text-xs text-red-600 mt-1 font-medium">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              >
                <option value="Web development">Web development</option>
                <option value="Design">UI/UX Design</option>
                <option value="Business">Business / Finance</option>
                <option value="Agriculture">Agriculture & Sensors</option>
                <option value="Technology">General Technology</option>
                <option value="Career">Career & Internships</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your current skill level
              </label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              >
                <option value="Beginner">Beginner (learning fundamentals)</option>
                <option value="Intermediate">Intermediate (working on projects)</option>
                <option value="Advanced">Advanced (architecture/refactoring)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Details, code snippet, or what you&apos;ve tried
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe the issue, paste relevant code, or list what approaches you have already tested..."
              rows={4}
              className={`w-full bg-[#F7F9FC] border rounded-2xl p-3.5 text-xs text-[#182230] focus:outline-none focus:ring-2 focus:ring-[#145DA0] focus:bg-white resize-none ${
                errors.details ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.details && (
              <p className="text-xs text-red-600 mt-1 font-medium">{errors.details}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Urgency level</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { level: 'no_rush' as UrgencyLevel, label: 'No rush', desc: 'Whenever someone has time' },
                { level: 'this_week' as UrgencyLevel, label: 'This week', desc: 'Working on a milestone' },
                { level: 'urgent' as UrgencyLevel, label: 'Urgent', desc: 'Blocked on production/deadline' },
              ].map(({ level, label, desc }) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setUrgency(level)}
                  className={`p-2 rounded-xl border text-left transition-colors ${
                    urgency === level
                      ? 'border-[#F59E0B] bg-amber-50/50 text-[#182230]'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <p className="font-semibold text-xs">{label}</p>
                  <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select community
            </label>
            <select
              value={communityId}
              onChange={(e) => setCommunityId(e.target.value)}
              className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
            >
              {communities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-[#F59E0B] hover:bg-[#d98906] text-white rounded-xl shadow-xs transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Posting...' : 'Post Request'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
