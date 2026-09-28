import React, { useState } from 'react';
import { X, Send, Tag, Sparkles } from 'lucide-react';
import { useApp } from '../../lib/store';
import { z } from 'zod';

const postSchema = z.object({
  body: z.string().min(5, 'Post content must be at least 5 characters'),
  community_id: z.string().optional(),
  post_type: z.enum(['standard', 'update', 'resource']),
  tags: z.string().optional(),
});

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCommunityId?: string;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  defaultCommunityId,
}) => {
  const { communities, createPost } = useApp();
  const [body, setBody] = useState('');
  const [communityId, setCommunityId] = useState(defaultCommunityId || communities[0]?.id || '');
  const [postType, setPostType] = useState<'standard' | 'update' | 'resource'>('standard');
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<{ body?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = postSchema.safeParse({
      body,
      community_id: communityId,
      post_type: postType,
      tags: tagInput,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({ body: fieldErrors.body?.[0] });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const tagList = tagInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      createPost({
        body,
        community_id: communityId || undefined,
        post_type: postType,
        tags: tagList,
      });

      setIsSubmitting(false);
      setBody('');
      setTagInput('');
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-6 border border-slate-100 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#145DA0] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#182230]">Create community post</h2>
              <p className="text-xs text-slate-500">Share knowledge, progress, or insights</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Post type
              </label>
              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value as 'standard' | 'update' | 'resource')}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              >
                <option value="standard">Standard Discussion</option>
                <option value="resource">Learning Resource</option>
                <option value="update">Project Progress Update</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target community
              </label>
              <select
                value={communityId}
                onChange={(e) => setCommunityId(e.target.value)}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              >
                <option value="">Public / Direct Network</option>
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
              What would you like to share?
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write a clear, helpful message with practical context..."
              rows={4}
              className={`w-full bg-[#F7F9FC] border rounded-2xl p-3.5 text-sm text-[#182230] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#145DA0] focus:bg-white resize-none ${
                errors.body ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.body && (
              <p className="text-xs text-red-600 mt-1 font-medium">{errors.body}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <span>Topic tags (comma separated)</span>
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="e.g. React, Next.js, Accessibility"
              className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#182230] focus:outline-none focus:ring-2 focus:ring-[#145DA0] focus:bg-white"
            />
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <span className="text-xs text-slate-400">
              Posts adhere to community trust guidelines
            </span>
            <div className="flex items-center gap-2">
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
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-[#145DA0] hover:bg-[#0f487e] text-white rounded-xl shadow-xs transition-colors disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Publishing...' : 'Publish'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
