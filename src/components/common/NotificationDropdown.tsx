import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Sparkles } from 'lucide-react';
import { useApp } from '../../lib/store';

export const NotificationDropdown: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, navigate } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0]"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F59E0B] rounded-full ring-2 ring-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200/90 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-[#182230]">Activity</h3>
              {unreadCount > 0 && (
                <span className="text-xs bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="text-xs text-[#145DA0] hover:text-[#0f487e] font-medium flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                No recent activity yet.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => {
                    markNotificationAsRead(notif.id);
                    if (notif.entity_type === 'event') navigate(`/events`);
                    if (notif.entity_type === 'opportunity') navigate(`/opportunities`);
                    if (notif.entity_type === 'post') navigate(`/home`);
                    setIsOpen(false);
                  }}
                  className={`p-3.5 text-xs sm:text-sm hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                    !notif.is_read ? 'bg-amber-50/40' : ''
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-[#145DA0]/10 text-[#145DA0] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-800 leading-snug">
                      <span className="font-semibold">{notif.actor?.full_name || 'A community member'}</span>{' '}
                      {notif.message}
                    </p>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      {new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {!notif.is_read && (
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B] shrink-0 mt-2" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
