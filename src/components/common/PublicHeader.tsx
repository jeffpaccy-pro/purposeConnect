import React from 'react';
import { AppLogo } from './AppLogo';
import { useApp } from '../../lib/store';
import { exportProjectZip } from '../../lib/zip-export';
import { Download } from 'lucide-react';

export const PublicHeader: React.FC = () => {
  const { navigate, currentUser } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Zone 1: Single text element / brand wordmark */}
        <button
          onClick={() => navigate('/')}
          className="hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0] rounded-lg"
          aria-label="ConnectPurpose Homepage"
        >
          <AppLogo size="md" />
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => navigate('/explore')}
            className="hover:text-[#145DA0] transition-colors whitespace-nowrap"
          >
            Explore
          </button>
          <button
            onClick={() => navigate('/communities')}
            className="hover:text-[#145DA0] transition-colors whitespace-nowrap"
          >
            Communities
          </button>
          <a
            href="#how-it-works"
            className="hover:text-[#145DA0] transition-colors whitespace-nowrap"
          >
            How it works
          </a>
          <a
            href="#about"
            className="hover:text-[#145DA0] transition-colors whitespace-nowrap"
          >
            About
          </a>
          <button
            onClick={() => exportProjectZip()}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#145DA0] transition-colors bg-slate-100 hover:bg-slate-200/70 px-2.5 py-1.5 rounded-lg"
            title="Download full project code and SQL migrations as a ZIP"
          >
            <Download className="w-3.5 h-3.5 text-[#145DA0]" />
            <span>Export Codebase ZIP</span>
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <button
              onClick={() => navigate('/home')}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#145DA0] hover:bg-[#0f487e] rounded-xl transition-colors shadow-xs"
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-[#145DA0] transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-4 py-2 text-sm font-semibold text-white bg-[#145DA0] hover:bg-[#0f487e] rounded-xl transition-colors shadow-xs"
              >
                Join free
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
