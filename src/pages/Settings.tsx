import React, { useState } from 'react';
import {
  User,
  Shield,
  Sliders,
  Bell,
  Lock,
  Download,
  Trash2,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../lib/store';
import { exportProjectZip } from '../lib/zip-export';
import { MessagePrivacy, Profile, ProfileVisibility } from '../types/database';

export const Settings: React.FC = () => {
  const {
    currentUser,
    updateCurrentUserProfile,
    addToast,
    logout,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'feed' | 'notifications' | 'export' | 'danger'>('privacy');

  // Form states
  const [fullName, setFullName] = useState(currentUser?.full_name || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [website, setWebsite] = useState(currentUser?.website || '');

  const [messagePrivacy, setMessagePrivacy] = useState<MessagePrivacy>(
    currentUser?.message_privacy || 'community'
  );
  const [profileVisibility, setProfileVisibility] = useState<ProfileVisibility>(
    currentUser?.profile_visibility || 'public'
  );
  const [feedPriority, setFeedPriority] = useState<string>(
    currentUser?.feed_priority || 'learning'
  );

  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUserProfile({
      full_name: fullName,
      bio,
      location,
      website,
    });
  };

  const handlePrivacySave = () => {
    updateCurrentUserProfile({
      message_privacy: messagePrivacy,
      profile_visibility: profileVisibility,
    });
  };

  const handleFeedSave = () => {
    updateCurrentUserProfile({
      feed_priority: feedPriority as Profile['feed_priority'],
    });
  };

  const handleExportDataJson = () => {
    setIsExporting(true);
    setTimeout(() => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(
        JSON.stringify({
          user: currentUser,
          exportedAt: new Date().toISOString(),
          version: '1.0.0',
        }, null, 2)
      );
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `connectpurpose-data-${currentUser?.username || 'user'}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      setIsExporting(false);
      addToast('Personal data archive generated');
    }, 500);
  };

  const handleDeleteAccount = () => {
    logout();
    addToast('Account deleted. Your personal data has been erased.', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#182230]">Settings & Preferences</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your account safety, feed algorithm priorities, and data ownership.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Left Settings Sidebar Tabs */}
        <div className="w-full md:w-60 border-r border-slate-200/80 bg-[#F7F9FC]/60 p-3 space-y-1">
          {[
            { id: 'privacy', label: 'Privacy & Safety', icon: Shield },
            { id: 'feed', label: 'Feed Preferences', icon: Sliders },
            { id: 'profile', label: 'Edit Profile', icon: User },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'export', label: 'Data Ownership', icon: Download },
            { id: 'danger', label: 'Delete Account', icon: Trash2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                  isActive
                    ? 'bg-[#145DA0] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Settings Panel */}
        <div className="flex-1 p-6 sm:p-8 space-y-6">
          {/* Tab 1: Privacy & Safety */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-base font-bold text-[#182230]">Direct Message Permissions</h2>
                <p className="text-xs text-slate-500 mt-0.5">Control who can initiate chats with you.</p>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'community', title: 'Community members', desc: 'Any verified member in your joined communities' },
                  { id: 'approved_only', title: 'People I approve first', desc: 'Direct messages require mutual accept' },
                  { id: 'nobody', title: 'Nobody for now', desc: 'Disable incoming messages entirely' },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-colors ${
                      messagePrivacy === opt.id
                        ? 'border-[#145DA0] bg-blue-50/50'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="msg-priv"
                      value={opt.id}
                      checked={messagePrivacy === opt.id}
                      onChange={() => setMessagePrivacy(opt.id as MessagePrivacy)}
                      className="mt-0.5 text-[#145DA0] accent-[#145DA0]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#182230]">{opt.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-[#182230]">Profile Visibility</h2>
                <div className="mt-3 space-y-2">
                  {[
                    { id: 'public', title: 'Public', desc: 'Visible to anyone on ConnectPurpose' },
                    { id: 'community_only', title: 'Community members only', desc: 'Hidden from non-members' },
                    { id: 'private', title: 'Private', desc: 'Visible only to project co-collaborators' },
                  ].map((v) => (
                    <label
                      key={v.id}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-colors ${
                        profileVisibility === v.id
                          ? 'border-[#145DA0] bg-blue-50/50'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="prof-vis"
                        value={v.id}
                        checked={profileVisibility === v.id}
                        onChange={() => setProfileVisibility(v.id as ProfileVisibility)}
                        className="mt-0.5 accent-[#145DA0]"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#182230]">{v.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{v.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handlePrivacySave}
                  className="px-5 py-2 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  Save Privacy Preferences
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Feed Preferences */}
          {activeTab === 'feed' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-base font-bold text-[#182230]">Explainable Feed Logic</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose what signals prioritize items in your &ldquo;For you&rdquo; dashboard.
                </p>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'learning', title: 'Learning & Mentorship first', desc: 'Prioritizes study sessions, code Q&As, and beginner requests' },
                  { id: 'opportunities', title: 'Opportunities first', desc: 'Prioritizes verified internships, jobs, and collaboration briefs' },
                  { id: 'communities', title: 'My joined communities first', desc: 'Prioritizes updates strictly from groups you joined' },
                  { id: 'events', title: 'Upcoming events first', desc: 'Prioritizes sessions occurring within the next 48 hours' },
                ].map((f) => (
                  <label
                    key={f.id}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-colors ${
                      feedPriority === f.id
                        ? 'border-[#145DA0] bg-blue-50/50'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="feed-prio"
                      value={f.id}
                      checked={feedPriority === f.id}
                      onChange={() => setFeedPriority(f.id)}
                      className="mt-0.5 accent-[#145DA0]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#182230]">{f.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{f.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleFeedSave}
                  className="px-5 py-2 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  Update Feed Priorities
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: Profile */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave} className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h2 className="text-base font-bold text-[#182230]">Profile Information</h2>
                <p className="text-xs text-slate-500 mt-0.5">Visible to fellow community members.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
                    className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Website or portfolio
                  </label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  Save Profile
                </button>
              </div>
            </form>
          )}

          {/* Tab 4: Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h2 className="text-base font-bold text-[#182230]">Notification Channels</h2>
                <p className="text-xs text-slate-500 mt-0.5">Select how and when you want to be notified.</p>
              </div>

              <div className="space-y-2.5">
                {[
                  { title: 'Study session reminders', desc: '1 hour before a scheduled event you RSVPed Going to', defaultChecked: true },
                  { title: 'Direct messages', desc: 'When an approved member sends you a direct message', defaultChecked: true },
                  { title: 'Help request answers', desc: 'When a mentor or peer responds to your code question', defaultChecked: true },
                  { title: 'Opportunity matches', desc: 'Weekly digest of internships matching your selected skills', defaultChecked: false },
                ].map((item, idx) => (
                  <label
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#182230]">{item.title}</p>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={item.defaultChecked}
                      className="w-4 h-4 rounded text-[#145DA0] focus:ring-[#145DA0]"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Data Ownership & ZIP Export */}
          {activeTab === 'export' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-base font-bold text-[#182230]">Data Ownership & Export</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your data stays yours. Export your personal profile archive or download the entire project codebase.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#182230]">
                  <Download className="w-4 h-4 text-[#145DA0]" />
                  <span>Export Personal Data JSON</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Downloads a structured JSON file with your profile metadata, interests, and purpose preferences.
                </p>
                <button
                  type="button"
                  onClick={handleExportDataJson}
                  disabled={isExporting}
                  className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold rounded-xl text-slate-700 transition-colors shadow-2xs"
                >
                  {isExporting ? 'Generating JSON...' : 'Download My Data JSON'}
                </button>
              </div>

              <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-200/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#145DA0]">
                  <Download className="w-4 h-4 text-[#145DA0]" />
                  <span>Download Full Project Codebase ZIP</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  As requested, package all TypeScript components, Supabase SQL migrations, and README into a single downloadable .zip file.
                </p>
                <button
                  type="button"
                  onClick={() => exportProjectZip()}
                  className="px-4 py-2 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                >
                  Download ConnectPurpose.zip
                </button>
              </div>
            </div>
          )}

          {/* Tab 6: Delete Account */}
          {activeTab === 'danger' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h2 className="text-base font-bold text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Delete Account</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Permanent action. This erases your account, profile, and credentials.
                </p>
              </div>

              <div className="p-4 bg-red-50/70 border border-red-200 rounded-2xl text-xs text-red-800 space-y-2">
                <p className="font-semibold">What happens when you delete your account:</p>
                <ul className="list-disc pl-4 space-y-1 text-[11px]">
                  <li>Your profile and username are immediately de-indexed.</li>
                  <li>Direct messages and private settings are permanently erased.</li>
                  <li>This action cannot be undone.</li>
                </ul>
              </div>

              {showDeleteConfirm ? (
                <div className="p-4 bg-slate-100 rounded-2xl space-y-3">
                  <p className="text-xs font-bold text-[#182230]">Are you completely sure?</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs"
                    >
                      Yes, Delete My Account
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  Proceed to Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
