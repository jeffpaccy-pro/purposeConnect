import React from 'react';
import {
  Home,
  Compass,
  Users,
  Briefcase,
  FolderKanban,
  Calendar,
  MessageSquare,
  Bookmark,
  Settings,
  Plus,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '../../lib/store';

export const DesktopSidebar: React.FC = () => {
  const { activeRoute, navigate, setIsCreateSheetOpen, communities } = useApp();

  const navItems = [
    { label: 'Home', path: '/home', icon: Home },
    { label: 'Explore', path: '/explore', icon: Compass },
    { label: 'Communities', path: '/communities', icon: Users },
    { label: 'Opportunities', path: '/opportunities', icon: Briefcase },
    { label: 'Projects', path: '/projects', icon: FolderKanban },
    { label: 'Events', path: '/events', icon: Calendar },
    { label: 'Messages', path: '/messages', icon: MessageSquare },
    { label: 'Saved', path: '/saved', icon: Bookmark },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const joinedCommunities = communities.filter((c) => c.is_joined);

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col gap-6 py-6 pr-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      {/* Primary Action Button */}
      <button
        onClick={() => setIsCreateSheetOpen(true)}
        className="w-full py-3 px-4 bg-[#F59E0B] hover:bg-[#d98906] text-white font-bold rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
      >
        <Plus className="w-5 h-5 stroke-[2.5]" />
        <span>Create / Action</span>
      </button>

      {/* Main Navigation */}
      <nav className="flex flex-col gap-1 text-sm font-medium">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeRoute === item.path ||
            (item.path !== '/home' && activeRoute.startsWith(item.path));
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path === '/saved' ? '/home?filter=saved' : item.path)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-left ${
                isActive
                  ? 'bg-[#145DA0] text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Joined Communities Quick List */}
      <div className="pt-4 border-t border-slate-200/70">
        <div className="flex items-center justify-between px-3.5 mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Your Communities
          </span>
          <button
            onClick={() => navigate('/communities')}
            className="text-xs text-[#145DA0] hover:underline flex items-center gap-0.5"
          >
            <span>All</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {joinedCommunities.length === 0 ? (
            <p className="px-3.5 py-2 text-xs text-slate-400">Join a community to see it here.</p>
          ) : (
            joinedCommunities.slice(0, 4).map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(`/communities/${c.slug}`)}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100 transition-colors text-left truncate"
              >
                <div className="w-5 h-5 rounded-md bg-[#145DA0]/10 text-[#145DA0] font-bold flex items-center justify-center shrink-0 text-[10px]">
                  {c.name.substring(0, 1)}
                </div>
                <span className="truncate">{c.name}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Purpose Manifesto Reminder */}
      <div className="mt-auto p-4 bg-gradient-to-br from-blue-50/60 to-emerald-50/50 rounded-2xl border border-blue-100/60 text-xs text-slate-600">
        <p className="font-semibold text-[#145DA0] mb-1">Purpose-First Promise</p>
        <p className="leading-relaxed">
          No vanity algorithms. Real actions, peer study pods, and verifiable local opportunities.
        </p>
      </div>
    </aside>
  );
};
