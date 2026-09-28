import React, { useState } from 'react';
import { Users, Plus, Search, MapPin } from 'lucide-react';
import { useApp } from '../lib/store';
import { CommunityCard } from '../components/cards/CommunityCard';

export const Communities: React.FC = () => {
  const { communities, addToast } = useApp();
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const joinedCommunities = communities.filter((c) => c.is_joined);
  const categories = ['All', 'Technology', 'Web development', 'Design & Arts', 'Education & Careers', 'Entrepreneurship'];

  const filtered = communities.filter((c) => {
    const matchesCategory = filterCategory === 'All' || c.category === filterCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#145DA0] uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#0B7A75]" />
            <span>Community Circles</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182230] mt-1">
            Communities & Study Pods
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg">
            Join groups with aligned purposes. Collaborate on local hackathons, peer code reviews, and project sprints.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-bold rounded-2xl shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Community</span>
        </button>
      </div>

      {/* Your Joined Communities Section */}
      {joinedCommunities.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-base font-bold text-[#182230]">
            Your Joined Communities ({joinedCommunities.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {joinedCommunities.map((c) => (
              <CommunityCard key={c.id} community={c} />
            ))}
          </div>
        </section>
      )}

      {/* Discover Communities Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-bold text-[#182230]">
            Discover Communities
          </h2>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name or topic..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filterCategory === cat
                  ? 'bg-[#145DA0] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((comm) => (
            <CommunityCard key={comm.id} community={comm} />
          ))}
        </div>
      </section>

      {/* Modal: Create Community (Placeholder / Proposer) */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-slate-100 space-y-4">
            <h3 className="font-bold text-base text-[#182230]">Propose a New Community</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To keep ConnectPurpose focused and high-trust, new community spaces require 3 co-founding members and a clear charter.
            </p>
            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 text-xs text-[#145DA0] space-y-1">
              <p className="font-bold">Community Creation Charter</p>
              <p className="text-slate-600">
                1. Stated learning or collaboration goal.<br />
                2. Agreed peer moderation rules.<br />
                3. Commitment to regular study pods or sprints.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsCreateOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsCreateOpen(false);
                  addToast('Community proposal registered! You will receive moderator feedback soon.', 'success');
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#145DA0] text-white rounded-xl hover:bg-[#0f487e]"
              >
                Submit Charter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
