import React, { useState } from 'react';
import {
  MapPin,
  Globe,
  MessageSquare,
  ShieldCheck,
  Edit3,
  Calendar,
  FolderKanban,
  Flag,
  UserX,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../lib/store';
import { FeedPostCard } from '../components/common/FeedPostCard';
import { ProjectCard } from '../components/cards/ProjectCard';
import { EditProfileModal } from '../components/modals/EditProfileModal';
import { ReportDialog } from '../components/common/ReportDialog';
import { BlockUserDialog } from '../components/common/BlockUserDialog';

interface ProfilePageProps {
  username: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ username }) => {
  const {
    allUsers,
    currentUser,
    posts,
    projects,
    communities,
    startOrOpenDirectMessage,
    navigate,
  } = useApp();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);

  // Find user by username
  const profileUser =
    allUsers.find((u) => u.username.toLowerCase() === username.toLowerCase()) ||
    currentUser ||
    allUsers[0];

  const isSelf = currentUser?.id === profileUser.id;

  const userPosts = posts.filter((p) => p.author_id === profileUser.id);
  const userProjects = projects.filter(
    (proj) => proj.creator_id === profileUser.id || proj.is_member
  );

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <img
              src={profileUser.avatar_url}
              alt={profileUser.full_name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md ring-1 ring-slate-200 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-2xl font-extrabold text-[#182230]">
                  {profileUser.full_name}
                </h1>
                <span className="text-xs bg-blue-50 text-[#145DA0] font-semibold px-2 py-0.5 rounded-full">
                  Verified Builder
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">@{profileUser.username}</p>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                {profileUser.bio || 'Purpose-driven builder and learner on ConnectPurpose.'}
              </p>

              <div className="mt-3 flex items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 flex-wrap">
                {profileUser.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{profileUser.location}</span>
                  </span>
                )}
                {profileUser.website && (
                  <a
                    href={profileUser.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#145DA0] hover:underline"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{profileUser.website.replace('https://', '')}</span>
                  </a>
                )}
                <span className="flex items-center gap-1 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Joined early 2026</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center sm:justify-end gap-2 shrink-0">
            {isSelf ? (
              <button
                onClick={() => setIsEditOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => startOrOpenDirectMessage(profileUser)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
                <button
                  onClick={() => setIsReportOpen(true)}
                  className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-red-600 transition-colors"
                  title="Report user"
                >
                  <Flag className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsBlockOpen(true)}
                  className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-800 transition-colors"
                  title="Block user"
                >
                  <UserX className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Selected Interests & Skills */}
        {profileUser.selected_interests && profileUser.selected_interests.length > 0 && (
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 mr-2">Skills & Focus:</span>
            {profileUser.selected_interests.map((int, i) => (
              <span
                key={i}
                className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
              >
                {int}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Trust & Contribution Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#145DA0] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-[#145DA0] font-mono tabular-nums">
              {profileUser.trust_points || 120}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">Verified Trust Points</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-[#16A34A] font-mono tabular-nums">
              {profileUser.helpful_count || 48}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">Helpful Peer Answers</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <FolderKanban className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-purple-700 font-mono tabular-nums">
              {userProjects.length}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">Projects Contributed</p>
          </div>
        </div>
      </div>

      {/* User Projects Section */}
      {userProjects.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#182230]">Active Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {userProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}

      {/* Recent Helpful Posts */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#182230]">Recent Contributions & Requests</h2>
        {userPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/80">
            <p className="text-xs text-slate-500">No public posts yet from this user.</p>
          </div>
        ) : (
          userPosts.map((p) => <FeedPostCard key={p.id} post={p} />)
        )}
      </div>

      {/* Modals */}
      {isSelf && (
        <EditProfileModal
          user={profileUser}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}
      {!isSelf && (
        <>
          <ReportDialog
            targetType="user"
            targetId={profileUser.id}
            isOpen={isReportOpen}
            onClose={() => setIsReportOpen(false)}
          />
          <BlockUserDialog
            userToBlock={profileUser}
            isOpen={isBlockOpen}
            onClose={() => setIsBlockOpen(false)}
          />
        </>
      )}
    </div>
  );
};
