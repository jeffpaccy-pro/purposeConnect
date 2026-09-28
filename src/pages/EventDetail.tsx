import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Users,
  Check,
  ArrowLeft,
  Share2,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../lib/store';
import { RsvpStatus } from '../types/database';

interface EventDetailProps {
  id: string;
}

export const EventDetail: React.FC<EventDetailProps> = ({ id }) => {
  const { events, communities, allUsers, setRsvp, navigate, addToast } = useApp();

  const event = events.find((e) => e.id === id) || events[0];
  const community = communities.find((c) => c.id === event.community_id);
  const organizer = allUsers.find((u) => u.id === event.creator_id) || allUsers[0];

  const startDate = new Date(event.start_at);
  const formattedDate = startDate.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = startDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Event link copied to clipboard');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button
        onClick={() => navigate('/events')}
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#145DA0] font-semibold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events</span>
      </button>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-lg ${
                  event.event_mode === 'online'
                    ? 'bg-purple-50 text-purple-700'
                    : 'bg-emerald-50 text-[#16A34A]'
                }`}
              >
                {event.event_mode === 'online' ? 'Online Video Pod' : 'In-person Workshop'}
              </span>
              {community && (
                <span className="text-xs font-semibold text-[#145DA0]">
                  in {community.name}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182230]">
              {event.title}
            </h1>
          </div>

          <button
            onClick={handleShare}
            className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors shrink-0"
            title="Share event link"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Date & Location Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#145DA0] flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#182230]">{formattedDate}</p>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>Starts at {formattedTime} CAT</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#16A34A] flex items-center justify-center shrink-0">
              {event.event_mode === 'online' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-xs font-bold text-[#182230]">
                {event.event_mode === 'online' ? 'Interactive Video Meeting' : 'Location Venue'}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                {event.event_mode === 'online' ? (
                  <a
                    href={event.meeting_url || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#145DA0] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{event.meeting_url || 'https://meet.jit.si/...'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  event.location || 'Norrsken House Kigali'
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-[#182230]">About this session</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {event.description}
          </p>
        </div>

        {/* Organizer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={organizer.avatar_url}
              alt={organizer.full_name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-xs font-bold text-[#182230]">Organized by {organizer.full_name}</p>
              <p className="text-[11px] text-slate-500">@{organizer.username} · Community Mentor</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Users className="w-4 h-4 text-slate-400" />
            <span>{event.attendees_count} going</span>
          </div>
        </div>

        {/* RSVP Card */}
        <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-xs text-[#145DA0]">Are you attending this session?</p>
            <p className="text-[11px] text-slate-600">RSVP helps organizers reserve resources & seats.</p>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-blue-200 shadow-2xs">
            {(['going', 'interested', 'cannot_attend'] as RsvpStatus[]).map((status) => {
              const isSelected = event.user_rsvp === status;
              const labels = {
                going: 'Going',
                interested: 'Interested',
                cannot_attend: 'Decline',
              };
              return (
                <button
                  key={status}
                  onClick={() => setRsvp(event.id, status)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#145DA0] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isSelected && status === 'going' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{labels[status]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
