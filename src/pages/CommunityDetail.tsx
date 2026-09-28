import React, { useState } from 'react';
import {
  Users,
  MapPin,
  ShieldCheck,
  Calendar,
  FolderKanban,
  FileText,
  Info,
  Check,
  Plus,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../lib/store';
import { FeedPostCard } from '../components/common/FeedPostCard';
import { EventCard } from '../components/cards/EventCard';
import { ProjectCard } from '../components/cards/ProjectCard';

interface CommunityDetailProps {
  slug: string;
  onOpenCreatePost: () => void;
}

export const CommunityDetail: React.FC<CommunityDetailProps> = ({ slug, onOpenCreatePost }) => {
  const {
    communities,
    posts,
    events,
    projects,
    allUsers,
    joinCommunity,
    leaveCommunity,
    navigate,
    startOrOpenDirectMessage,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'posts' | 'events' | 'projects' | 'members' | 'about'>('posts');

  const community = communities.find((c) => c.slug === slug) || communities[0];
  const communityPosts = posts.filter((p) => p.community_id === community.id);
  const communityEvents = events.filter((e) => e.community_id === community.id);
  const communityProjects = projects.filter((p) => p.community_id === community.id);

  // Moderator
  const moderator = allUsers.find((u) => u.id === community.created_by) || allUsers[0];

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/communities')}
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#145DA0] font-semibold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Communities</span>
      </button>

      {/* Cover & Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
        <div className="h-44 sm:h-56 w-full relative bg-slate-200 overflow-hidden">
          <img
            src={community.cover_image_url}
            alt={community.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
            <div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-black/40 backdrop-blur-xs mb-1 inline-block">
                {community.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-xs">
                {community.name}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {community.is_joined ? (
                <button
                  onClick={() => leaveCommunity(community.id)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Joined</span>
                </button>
              ) : (
                <button
                  onClick={() => joinCommunity(community.id)}
                  className="px-5 py-2 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  Join Community
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Community Metadata Bar */}
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100">
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            {community.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium shrink-0">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-slate-400" />
              <span>{community.member_count || 120} members</span>
            </span>
            {community.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{community.location}</span>
              </span>
            )}
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-6 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'posts', label: 'Posts & Help', icon: FileText, count: communityPosts.length },
            { id: 'events', label: 'Events & Pods', icon: Calendar, count: communityEvents.length },
            { id: 'projects', label: 'Projects', icon: FolderKanban, count: communityProjects.length },
            { id: 'members', label: 'Members', icon: Users, count: community.member_count || 120 },
            { id: 'about', label: 'Rules & About', icon: Info },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-3.5 px-3 border-b-2 font-semibold text-xs whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-[#145DA0] text-[#145DA0]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded-full text-slate-500">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Posts */}
      {activeTab === 'posts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#182230]">Community Conversations</h2>
            <button
              onClick={onOpenCreatePost}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-semibold rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Post</span>
            </button>
          </div>

          {communityPosts.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/80">
              <p className="text-sm text-slate-500">No posts in this community yet.</p>
              <button
                onClick={onOpenCreatePost}
                className="mt-3 px-4 py-2 bg-[#145DA0] text-white text-xs font-semibold rounded-xl"
              >
                Be the first to share
              </button>
            </div>
          ) : (
            communityPosts.map((post) => <FeedPostCard key={post.id} post={post} />)
          )}
        </div>
      )}

      {/* Tab 2: Events */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#182230]">Upcoming Sessions in {community.name}</h2>
            <button
              onClick={() => navigate('/events/new')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-semibold rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Schedule Session</span>
            </button>
          </div>

          {communityEvents.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/80">
              <p className="text-sm text-slate-500">No upcoming events scheduled right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {communityEvents.map((evt) => (
                <EventCard key={evt.id} event={evt} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#182230]">Collaborative Projects</h2>
            <button
              onClick={() => navigate('/projects/new')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-semibold rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Project</span>
            </button>
          </div>

          {communityProjects.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/80">
              <p className="text-sm text-slate-500">No active projects linked to this community yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {communityProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Members */}
      {activeTab === 'members' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-[#182230]">Community Leaders & Members</h2>
            <span className="text-xs text-slate-400">Total: {community.member_count || 120}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allUsers.map((user) => (
              <div
                key={user.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 truncate">
                  <img
                    src={user.avatar_url}
                    alt={user.full_name}
                    className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="truncate">
                    <button
                      onClick={() => navigate(`/profile/${user.username}`)}
                      className="font-bold text-xs text-[#182230] hover:text-[#145DA0] truncate block text-left"
                    >
                      {user.full_name}
                    </button>
                    <span className="text-[11px] text-slate-400">
                      {user.id === community.created_by ? 'Lead Organizer' : 'Member'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => startOrOpenDirectMessage(user)}
                  className="px-2.5 py-1 text-xs font-semibold text-[#145DA0] hover:bg-blue-50 rounded-lg shrink-0 ml-2"
                >
                  Message
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Rules & About */}
      {activeTab === 'about' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-[#182230]">About {community.name}</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {community.description}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              <span>Visible Community Rules</span>
            </h3>
            <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
              {community.rules ||
                '1. Be kind and constructive to beginners.\n2. Share code and resources with attribution.\n3. Keep conversations centered on purposeful learning.'}
            </p>
          </div>

          <div className="flex items-center gap-3 p-4 bg-blue-50/60 rounded-2xl border border-blue-100">
            <img
              src={moderator.avatar_url}
              alt={moderator.full_name}
              className="w-10 h-10 rounded-full object-cover shrink-0 border border-blue-200"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-xs font-bold text-[#182230]">Community Moderator</p>
              <p className="text-xs text-slate-600">
                {moderator.full_name} (@{moderator.username})
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
