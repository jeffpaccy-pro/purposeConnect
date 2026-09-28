import React, { useState } from 'react';
import { Search, Compass, Users, Calendar, Briefcase, MessageSquare, ArrowRight } from 'lucide-react';
import { useApp } from '../lib/store';
import { CommunityCard } from '../components/cards/CommunityCard';
import { EventCard } from '../components/cards/EventCard';
import { OpportunityCard } from '../components/cards/OpportunityCard';
import { FeedPostCard } from '../components/common/FeedPostCard';

export const Explore: React.FC = () => {
  const {
    communities,
    interests,
    allUsers,
    currentUser,
    events,
    opportunities,
    posts,
    startOrOpenDirectMessage,
    navigate,
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');

  const filteredCommunities = communities.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesTopic =
      selectedTopic === 'All' || c.category.toLowerCase().includes(selectedTopic.toLowerCase());
    return matchesSearch && matchesTopic;
  });

  const otherUsers = allUsers.filter((u) => u.id !== currentUser?.id);

  return (
    <div className="space-y-8">
      {/* Top Header & Search Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <span className="text-xs font-bold text-[#145DA0] uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#0B7A75]" />
            <span>Curated Directory</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182230] mt-1">
            Explore trusted spaces & builders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Discover peer learning pods, open projects, upcoming workshops, and members with shared skills.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search communities, topics, people, opportunities..."
            className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none transition-all"
          />
        </div>

        {/* Topic Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
          <button
            onClick={() => setSelectedTopic('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedTopic === 'All'
                ? 'bg-[#145DA0] text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All Topics
          </button>
          {interests.map((int) => (
            <button
              key={int.id}
              onClick={() => setSelectedTopic(int.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedTopic === int.name
                  ? 'bg-[#145DA0] text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {int.name}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Communities Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#182230] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#145DA0]" />
              <span>Communities</span>
            </h2>
            <p className="text-xs text-slate-500">Peer groups centered on shared goals</p>
          </div>
          <button
            onClick={() => navigate('/communities')}
            className="text-xs font-semibold text-[#145DA0] hover:underline flex items-center gap-1"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCommunities.slice(0, 3).map((comm) => (
            <CommunityCard key={comm.id} community={comm} />
          ))}
        </div>
      </section>

      {/* People to Connect With */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[#182230]">People to connect with</h2>
          <p className="text-xs text-slate-500">Mentors, learners, and project collaborators</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar_url}
                    alt={user.full_name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="truncate">
                    <button
                      onClick={() => navigate(`/profile/${user.username}`)}
                      className="font-bold text-xs text-[#182230] hover:text-[#145DA0] transition-colors truncate block text-left"
                    >
                      {user.full_name}
                    </button>
                    <p className="text-[11px] text-slate-400 truncate">@{user.username}</p>
                  </div>
                </div>

                <p className="mt-2.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {user.bio}
                </p>

                {user.selected_interests && user.selected_interests.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {user.selected_interests.slice(0, 2).map((item, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium bg-slate-50 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#145DA0]">
                  {user.trust_points || 50} pts
                </span>
                <button
                  onClick={() => startOrOpenDirectMessage(user)}
                  className="flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
                >
                  <MessageSquare className="w-3 h-3 text-[#145DA0]" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Opportunities Spotlight */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#182230] flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#0B7A75]" />
              <span>Verified Opportunities</span>
            </h2>
            <p className="text-xs text-slate-500">Internships, mentorship pods, and collaborative gigs</p>
          </div>
          <button
            onClick={() => navigate('/opportunities')}
            className="text-xs font-semibold text-[#145DA0] hover:underline flex items-center gap-1"
          >
            <span>All opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {opportunities.slice(0, 2).map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      </section>

      {/* Upcoming Events Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#182230] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#145DA0]" />
              <span>Upcoming Workshops & Study Pods</span>
            </h2>
            <p className="text-xs text-slate-500">Live, interactive sessions happening soon</p>
          </div>
          <button
            onClick={() => navigate('/events')}
            className="text-xs font-semibold text-[#145DA0] hover:underline flex items-center gap-1"
          >
            <span>All events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {events.slice(0, 2).map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </section>

      {/* Trending Useful Discussions */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[#182230]">Trending useful discussions</h2>
          <p className="text-xs text-slate-500">Ranked by peer reactions and constructive answers</p>
        </div>
        <div className="space-y-4">
          {posts.slice(0, 2).map((p) => (
            <FeedPostCard key={p.id} post={p} />
          ))}
        </div>
      </section>
    </div>
  );
};
