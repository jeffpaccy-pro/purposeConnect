import React, { useState } from 'react';
import { Briefcase, Plus, Search, Filter } from 'lucide-react';
import { useApp } from '../lib/store';
import { OpportunityCard } from '../components/cards/OpportunityCard';
import { OpportunityType } from '../types/database';

export const Opportunities: React.FC = () => {
  const { opportunities, navigate } = useApp();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const types: { id: string; label: string }[] = [
    { id: 'all', label: 'All Opportunities' },
    { id: 'internship', label: 'Internships' },
    { id: 'mentorship', label: 'Mentorship' },
    { id: 'collaboration', label: 'Collaboration' },
    { id: 'job', label: 'Jobs' },
    { id: 'service', label: 'Services' },
    { id: 'volunteer', label: 'Volunteer' },
  ];

  const filtered = opportunities.filter((opp) => {
    const matchesType = selectedType === 'all' || opp.opportunity_type === selectedType;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.required_skills?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#0B7A75] uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-[#0B7A75]" />
            <span>Real Opportunities</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182230] mt-1">
            Verified Opportunities & Mentorship
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg">
            Discover peer apprenticeship pods, paid internships, and collaboration requests verified by community leads.
          </p>
        </div>

        <button
          onClick={() => navigate('/opportunities/new')}
          className="flex items-center gap-2 px-5 py-3 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-bold rounded-2xl shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post Opportunity</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedType === t.id
                  ? 'bg-[#145DA0] text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills, title..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
          />
        </div>
      </div>

      {/* Opportunity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-slate-200/80">
            <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-[#182230]">No opportunities found</p>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your filter or post the first opportunity in this category.
            </p>
            <button
              onClick={() => navigate('/opportunities/new')}
              className="mt-4 px-4 py-2 bg-[#145DA0] text-white text-xs font-semibold rounded-xl"
            >
              Share an opportunity
            </button>
          </div>
        ) : (
          filtered.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))
        )}
      </div>
    </div>
  );
};
