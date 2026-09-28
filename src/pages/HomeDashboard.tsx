import React, { useState } from 'react';
import {
  HelpCircle,
  Briefcase,
  FolderPlus,
  Calendar,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../lib/store';
import { FeedPostCard } from '../components/common/FeedPostCard';
import { EventItem, ProjectItem } from '../types/database';

interface HomeDashboardProps {
  onOpenCreatePost: () => void;
  onOpenAskHelp: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onOpenAskHelp,
}) => {
  const {
    currentUser,
    posts,
    events,
    projects,
    communities,
    navigate,
    setRsvp,
    activeRoute,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'help_request' | 'resource' | 'update' | 'saved'>(() => {
    return activeRoute.includes('filter=saved') ? 'saved' : 'all';
  });

  // Calculate friendly greeting based on time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const firstName = currentUser?.full_name ? currentUser.full_name.split(' ')[0] : 'Friend';

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    if (activeFilter === 'saved') return post.is_saved;
    if (activeFilter === 'help_request') return post.post_type === 'help_request';
    if (activeFilter === 'resource') return post.post_type === 'resource';
    if (activeFilter === 'update') return post.post_type === 'update';
    return true;
  });

  const upcomingEvents: EventItem[] = events.slice(0, 2);
  const activeProjects: ProjectItem[] = projects.slice(0, 2);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Center Main Feed Area */}
      <div className="flex-1 w-full space-y-6">
        {/* Header Greeting & Action Prompts */}
        <div className="bg-gradient-to-r from-blue-900 to-[#145DA0] rounded-3xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
              {greeting}, {firstName}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-balance">
              What do you want to achieve today?
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-xl leading-relaxed text-balance">
              Turn useful conversations into study sessions, open source projects, and verified opportunities.
            </p>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <button
                onClick={onOpenAskHelp}
                className="p-3.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl text-left transition-all backdrop-blur-xs flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="font-bold text-xs">Ask for help</p>
                    <p className="text-[10px] text-blue-200">Solve blockers</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/opportunities')}
                className="p-3.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl text-left transition-all backdrop-blur-xs flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#0B7A75] text-white flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="font-bold text-xs">Find opportunity</p>
                    <p className="text-[10px] text-blue-200">Internships & gigs</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/projects/new')}
                className="p-3.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl text-left transition-all backdrop-blur-xs flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0">
                    <FolderPlus className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="font-bold text-xs">Start a project</p>
                    <p className="text-[10px] text-blue-200">Find co-builders</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Explainable Feed Segmented Filter Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 rounded-xl overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'For you' },
              { id: 'help_request', label: 'Help requests' },
              { id: 'resource', label: 'Resources' },
              { id: 'update', label: 'Updates' },
              { id: 'saved', label: 'Saved' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-white text-[#182230] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-slate-400 font-medium">
            Explainable feed · Ranked by stated purpose
          </span>
        </div>

        {/* Feed Posts List */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80">
              <Bookmark className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-sm text-[#182230]">No items found in this view</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {activeFilter === 'saved'
                  ? 'Click "Save" on any post or opportunity to collect them here.'
                  : 'Check back later or join more communities to see new activity.'}
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <FeedPostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>

      {/* Right Sidebar on Desktop */}
      <div className="w-full lg:w-80 shrink-0 space-y-6">
        {/* Progress & Trust Summary */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-[#182230]">Your Trust Summary</h3>
            <span className="text-[11px] font-semibold text-[#145DA0] bg-blue-50 px-2 py-0.5 rounded-full">
              Level 2 Builder
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-3 bg-slate-50 rounded-2xl">
              <p className="text-xl font-extrabold text-[#145DA0] font-mono tabular-nums">
                {currentUser?.trust_points || 124}
              </p>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Trust Points</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl">
              <p className="text-xl font-extrabold text-[#16A34A] font-mono tabular-nums">
                {currentUser?.helpful_count || 48}
              </p>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Helpful Answers</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                Study pods attended
              </span>
              <span className="font-semibold">3 this month</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#145DA0]" />
                Projects contributed
              </span>
              <span className="font-semibold">2 active</span>
            </div>
          </div>
        </div>

        {/* Upcoming Events Box */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-sm text-[#182230] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#145DA0]" />
              <span>Upcoming Sessions</span>
            </h3>
            <button
              onClick={() => navigate('/events')}
              className="text-xs text-[#145DA0] font-semibold hover:underline"
            >
              All events
            </button>
          </div>

          <div className="space-y-3">
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <p className="font-bold text-xs text-slate-800 line-clamp-1">{evt.title}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>
                    {new Date(evt.start_at).toLocaleDateString([], { month: 'short', day: 'numeric' })} at{' '}
                    {new Date(evt.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="font-semibold text-[#145DA0]">{evt.attendees_count} attending</span>
                </div>
                <div className="flex items-center justify-end gap-1.5 pt-1">
                  <button
                    onClick={() => setRsvp(evt.id, evt.user_rsvp === 'going' ? 'cannot_attend' : 'going')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      evt.user_rsvp === 'going'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {evt.user_rsvp === 'going' ? 'Going ✓' : 'RSVP'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Projects Box */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-sm text-[#182230] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>Active Projects</span>
            </h3>
            <button
              onClick={() => navigate('/projects')}
              className="text-xs text-[#145DA0] font-semibold hover:underline"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {activeProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/projects/${p.id}`)}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 cursor-pointer transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-xs text-[#182230] truncate">{p.title}</p>
                  <span className="text-[10px] font-mono text-[#145DA0] font-semibold">{p.progress}%</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1 italic">&ldquo;{p.goal}&rdquo;</p>
                <div className="w-full bg-slate-200 rounded-full h-1">
                  <div
                    className="bg-[#145DA0] h-1 rounded-full"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Community Actions */}
        <div className="p-4 bg-amber-50/70 rounded-3xl border border-amber-200/70 text-xs text-amber-900 space-y-1.5">
          <p className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Suggested Action</span>
          </p>
          <p className="leading-relaxed">
            Eric in <strong>{communities[0]?.name}</strong> asked for help reviewing responsive Flexbox code. Share a tip to earn trust points!
          </p>
        </div>
      </div>
    </div>
  );
};
