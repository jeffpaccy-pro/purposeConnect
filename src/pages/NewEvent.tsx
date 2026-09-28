import React, { useState } from 'react';
import { ArrowLeft, Send, Calendar, Video, MapPin, ShieldCheck } from 'lucide-react';
import { useApp } from '../lib/store';
import { EventMode, VisibilityLevel } from '../types/database';
import { z } from 'zod';

const eventSchema = z.object({
  title: z.string().min(5, 'Event title must be at least 5 characters'),
  description: z.string().min(15, 'Please provide an agenda and what attendees will learn'),
  date: z.string().min(1, 'Date is required'),
  start_time: z.string().min(1, 'Start time is required'),
  end_time: z.string().min(1, 'End time is required'),
});

export const NewEvent: React.FC = () => {
  const { createEvent, communities, navigate } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [startTime, setStartTime] = useState('17:00');
  const [endTime, setEndTime] = useState('18:30');
  const [eventMode, setEventMode] = useState<EventMode>('online');
  const [meetingUrl, setMeetingUrl] = useState('https://meet.jit.si/connect-purpose-pod');
  const [location, setLocation] = useState('Norrsken House Kigali, Town Hall');
  const [capacity, setCapacity] = useState(40);
  const [communityId, setCommunityId] = useState(communities[0]?.id || '');
  const [visibility, setVisibility] = useState<VisibilityLevel>('public');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = eventSchema.safeParse({
      title,
      description,
      date,
      start_time: startTime,
      end_time: endTime,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) fieldErrors[issue.path[0].toString()] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const startAt = new Date(`${date}T${startTime}:00Z`).toISOString();
      const endAt = new Date(`${date}T${endTime}:00Z`).toISOString();

      const newEvt = createEvent({
        title,
        description,
        start_at: startAt,
        end_at: endAt,
        event_mode: eventMode,
        meeting_url: eventMode === 'online' ? meetingUrl : undefined,
        location: eventMode === 'in_person' ? location : undefined,
        capacity: Number(capacity),
        community_id: communityId || undefined,
        visibility,
      });

      setIsLoading(false);
      navigate(`/events/${newEvt.id}`);
    }, 400);
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

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/90 space-y-6">
        <div>
          <span className="text-xs font-bold text-[#145DA0] uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#145DA0]" />
            <span>Community Scheduling</span>
          </span>
          <h1 className="text-2xl font-extrabold text-[#182230] mt-1">
            Host a study pod, code clinic, or workshop
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create an open, welcoming session for your community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Event title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Python Study Session: Hands-on Data Parsing"
              className={`w-full bg-[#F7F9FC] border rounded-xl px-3.5 py-2.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none ${
                errors.title ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.title && <p className="text-xs text-red-600 mt-1 font-medium">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Session description & agenda
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will attendees learn? What should they prepare or bring?..."
              rows={4}
              className={`w-full bg-[#F7F9FC] border rounded-2xl p-3.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none resize-none ${
                errors.description ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.description && (
              <p className="text-xs text-red-600 mt-1 font-medium">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Start time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                End time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Session format
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEventMode('online')}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    eventMode === 'online'
                      ? 'border-[#145DA0] bg-blue-50 text-[#145DA0]'
                      : 'border-slate-200 bg-[#F7F9FC] text-slate-600'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Online Room</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEventMode('in_person')}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    eventMode === 'in_person'
                      ? 'border-[#16A34A] bg-emerald-50 text-[#16A34A]'
                      : 'border-slate-200 bg-[#F7F9FC] text-slate-600'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>In-person</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {eventMode === 'online' ? 'Meeting link (URL)' : 'Physical location'}
              </label>
              <input
                type="text"
                value={eventMode === 'online' ? meetingUrl : location}
                onChange={(e) =>
                  eventMode === 'online' ? setMeetingUrl(e.target.value) : setLocation(e.target.value)
                }
                placeholder={eventMode === 'online' ? 'https://meet.jit.si/...' : 'Kigali venue / room'}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Associated community
              </label>
              <select
                value={communityId}
                onChange={(e) => setCommunityId(e.target.value)}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              >
                <option value="">Public Event</option>
                {communities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Attendee capacity
              </label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                min={5}
                max={200}
                className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/events')}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-bold rounded-xl shadow-xs transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Scheduling...' : 'Publish Event'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
