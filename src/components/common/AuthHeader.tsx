import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, User, LogOut, Settings, Bookmark, Download, ArrowRight } from 'lucide-react';
import { AppLogo } from './AppLogo';
import { NotificationDropdown } from './NotificationDropdown';
import { useApp } from '../../lib/store';
import { exportProjectZip } from '../../lib/zip-export';

export const AuthHeader: React.FC = () => {
  const { currentUser, allUsers, loginAs, logout, navigate } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/home')}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0] rounded-lg"
            aria-label="ConnectPurpose Dashboard"
          >
            <AppLogo size="md" />
          </button>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md hidden sm:block relative" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search skills, projects, communities, opportunities..."
              className="w-full bg-[#F7F9FC] border border-slate-200/90 rounded-xl pl-10 pr-4 py-2 text-sm text-[#182230] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#145DA0] focus:bg-white transition-all"
            />
          </form>

          {isSearchFocused && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                Quick Search
              </div>
              <button
                onClick={() => {
                  navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
                  setIsSearchFocused(false);
                }}
                className="w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-slate-50 rounded-xl flex items-center justify-between text-slate-800"
              >
                <span>Search everything for &quot;{searchQuery}&quot;</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => {
                  navigate(`/communities?q=${encodeURIComponent(searchQuery)}`);
                  setIsSearchFocused(false);
                }}
                className="w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-slate-50 rounded-xl flex items-center justify-between text-slate-800"
              >
                <span>Find communities matching &quot;{searchQuery}&quot;</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Actions, Notifications, User Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => exportProjectZip()}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors"
            title="Download full project code as ZIP"
          >
            <Download className="w-3.5 h-3.5 text-[#145DA0]" />
            <span>Project ZIP</span>
          </button>

          <NotificationDropdown />

          {/* User Profile Dropdown & Demo Switcher */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0]"
            >
              <img
                src={currentUser?.avatar_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80'}
                alt={currentUser?.full_name || 'User'}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-xs"
                referrerPolicy="no-referrer"
              />
              <span className="hidden lg:inline text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                {currentUser?.full_name?.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3 border-b border-slate-100">
                  <p className="font-semibold text-sm text-[#182230] truncate">{currentUser?.full_name}</p>
                  <p className="text-xs text-slate-500">@{currentUser?.username}</p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-600">
                    <span className="font-medium text-[#145DA0]">{currentUser?.trust_points || 120} Trust points</span>
                    <span>·</span>
                    <span>{currentUser?.helpful_count || 48} Helpful responses</span>
                  </div>
                </div>

                <div className="py-1 border-b border-slate-100">
                  <button
                    onClick={() => {
                      if (currentUser) navigate(`/profile/${currentUser.username}`);
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate('/home');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    <Bookmark className="w-4 h-4 text-slate-400" />
                    <span>Saved Items</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate('/settings');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Settings & Privacy</span>
                  </button>
                </div>

                {/* Demo Switcher for fast verification */}
                <div className="py-2 border-b border-slate-100 px-3">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Demo Account Switcher
                  </p>
                  <div className="flex flex-col gap-1 max-h-36 overflow-y-auto">
                    {allUsers.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => {
                          loginAs(u.id);
                          setIsUserMenuOpen(false);
                        }}
                        className={`flex items-center gap-2 p-1.5 rounded-lg text-left text-xs transition-colors ${
                          u.id === currentUser?.id ? 'bg-[#145DA0]/10 text-[#145DA0] font-semibold' : 'hover:bg-slate-100 text-slate-600'
                        }`}
                      >
                        <img
                          src={u.avatar_url}
                          alt={u.full_name}
                          className="w-5 h-5 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="truncate">{u.full_name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
