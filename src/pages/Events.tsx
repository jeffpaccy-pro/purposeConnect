import React, { useState } from 'react';
import { Calendar, Plus, Video, MapPin, Search } from 'lucide-react';
import { useApp } from '../lib/store';
import { EventCard } from '../components/cards/EventCard';
import { EventMode } from '../types/database';

export const Events: React.FC = () => {
  const { events, navigate } = useApp();
  const [formatFilter, setFormatFilter] = useState<'all' | 'online' | 'in_person'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = events.filter((e) => {
    const matchesFormat = formatFilter === 'all' || e.event_mode === formatFilter;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFormat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#145DA0] uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#145DA0]" />
            <span>Community Events</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182230] mt-1">
            Workshops, Study Pods & Clinics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg">
            Hands-on learning sessions, live code walkthroughs, and local community meetups.
          </p>
        </div>

        <button
          onClick={() => navigate('/events/new')}
          className="flex items-center gap-2 px-5 py-3 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-bold rounded-2xl shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Host a Session</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: 'All Sessions' },
            { id: 'online', label: 'Online Pods' },
            { id: 'in_person', label: 'In-person Workshops' },
          ].map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setFormatFilter(fmt.id as typeof formatFilter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                formatFilter === fmt.id
                  ? 'bg-[#145DA0] text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {fmt.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search upcoming events..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-slate-200/80">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-[#182230]">No sessions found</p>
            <p className="text-xs text-slate-500 mt-1">
              Host a study session or code review pod for your peers!
            </p>
            <button
              onClick={() => navigate('/events/new')}
              className="mt-4 px-4 py-2 bg-[#145DA0] text-white text-xs font-semibold rounded-xl"
            >
              Host a session
            </button>
          </div>
        ) : (
          filtered.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))
        )}
      </div>
    </div>
  );
};
