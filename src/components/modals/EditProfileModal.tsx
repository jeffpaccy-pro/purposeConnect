import React, { useState } from 'react';
import { X, User, Save } from 'lucide-react';
import { useApp } from '../../lib/store';
import { Profile } from '../../types/database';

interface EditProfileModalProps {
  user: Profile;
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const { updateCurrentUserProfile } = useApp();
  const [fullName, setFullName] = useState(user.full_name);
  const [bio, setBio] = useState(user.bio || '');
  const [location, setLocation] = useState(user.location || '');
  const [website, setWebsite] = useState(user.website || '');
  const [skillsInput, setSkillsInput] = useState(
    (user.selected_interests || []).join(', ')
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    updateCurrentUserProfile({
      full_name: fullName.trim(),
      bio: bio.trim(),
      location: location.trim(),
      website: website.trim(),
      selected_interests: skills,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-6 border border-slate-100 space-y-5 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#145DA0] flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-base text-[#182230]">Edit Profile</h2>
              <p className="text-xs text-slate-500">Update your public details and skills</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Tell other builders what you are learning, building, or mentoring..."
              className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl p-3 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Kigali, Rwanda"
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Website or Portfolio URL
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Skills & Interests (comma separated)
            </label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="e.g. Web development, UI/UX, Python"
              className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
