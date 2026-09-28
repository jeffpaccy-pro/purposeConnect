import React from 'react';

interface AppLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      <div
        className={`${iconSizes[size]} rounded-xl bg-[#145DA0] text-white flex items-center justify-center shadow-xs flex-shrink-0 relative overflow-hidden`}
      >
        {/* Subtle geometric connection symbol */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4/5 h-4/5 text-[#F59E0B]"
        >
          <circle cx="7" cy="7" r="3" fill="#145DA0" />
          <circle cx="17" cy="17" r="3" fill="#0B7A75" />
          <path d="M9.5 9.5L14.5 14.5" stroke="#FFFFFF" />
          <path d="M17 7a3 3 0 1 0-3 3" stroke="#F59E0B" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`${textSizes[size]} font-extrabold text-[#182230] tracking-tight`}>
          Connect<span className="text-[#145DA0]">Purpose</span>
        </span>
      </div>
    </div>
  );
};
