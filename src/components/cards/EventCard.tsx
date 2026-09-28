import React from 'react';
import { Calendar, Clock, MapPin, Video, Users, Check } from 'lucide-react';
import { EventItem, RsvpStatus } from '../../types/database';
import { useApp } from '../../lib/store';

interface EventCardProps {
  event: EventItem;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { setRsvp, communities, navigate } = useApp();
  const community = communities.find((c) => c.id === event.community_id);

  const startDate = new Date(event.start_at);
  const formattedDate = startDate.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = startDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-[#145DA0] font-semibold bg-blue-50 px-2 py-0.5 rounded-md">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{formattedTime}</span>
            </span>
          </div>

          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
              event.event_mode === 'online'
                ? 'bg-purple-50 text-purple-700'
                : 'bg-emerald-50 text-[#16A34A]'
            }`}
          >
            {event.event_mode === 'online' ? 'Online pod' : 'In-person'}
          </span>
        </div>

        <button
          onClick={() => navigate(`/events/${event.id}`)}
          className="mt-3 font-bold text-base text-[#182230] hover:text-[#145DA0] transition-colors text-left block"
        >
          {event.title}
        </button>

        <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 flex-wrap">
          {event.event_mode === 'online' ? (
            <span className="flex items-center gap-1 text-[#145DA0]">
              <Video className="w-3.5 h-3.5" />
              <span>Verified Video Room</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-slate-600 truncate">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{event.location || 'Norrsken House Kigali'}</span>
            </span>
          )}

          {community && (
            <span className="text-slate-400">· {community.name}</span>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span>{event.attendees_count} attending</span>
        </div>

        {/* RSVP button group */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl">
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
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                  isSelected
                    ? 'bg-white text-[#145DA0] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isSelected && status === 'going' && <Check className="w-3 h-3 text-[#16A34A]" />}
                <span>{labels[status]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
