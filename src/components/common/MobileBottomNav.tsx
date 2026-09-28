import React from 'react';
import { Home, Compass, Plus, MessageSquare, User } from 'lucide-react';
import { useApp } from '../../lib/store';

export const MobileBottomNav: React.FC = () => {
  const { activeRoute, navigate, setIsCreateSheetOpen, currentUser } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex items-center justify-around">
      <button
        onClick={() => navigate('/home')}
        className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
          activeRoute === '/home' ? 'text-[#145DA0] font-bold' : 'text-slate-500 hover:text-slate-900'
        }`}
        aria-label="Home"
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </button>

      <button
        onClick={() => navigate('/explore')}
        className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
          activeRoute === '/explore' ? 'text-[#145DA0] font-bold' : 'text-slate-500 hover:text-slate-900'
        }`}
        aria-label="Explore"
      >
        <Compass className="w-5 h-5" />
        <span className="text-[10px]">Explore</span>
      </button>

      {/* Center circular orange '+' button */}
      <button
        onClick={() => setIsCreateSheetOpen(true)}
        className="w-12 h-12 -mt-5 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shadow-lg hover:bg-[#d98906] transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F59E0B]/30"
        aria-label="Create new item"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>

      <button
        onClick={() => navigate('/messages')}
        className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
          activeRoute === '/messages' ? 'text-[#145DA0] font-bold' : 'text-slate-500 hover:text-slate-900'
        }`}
        aria-label="Messages"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-[10px]">Messages</span>
      </button>

      <button
        onClick={() => {
          if (currentUser) navigate(`/profile/${currentUser.username}`);
          else navigate('/login');
        }}
        className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
          activeRoute.startsWith('/profile') ? 'text-[#145DA0] font-bold' : 'text-slate-500 hover:text-slate-900'
        }`}
        aria-label="Profile"
      >
        <User className="w-5 h-5" />
        <span className="text-[10px]">Profile</span>
      </button>
    </nav>
  );
};
