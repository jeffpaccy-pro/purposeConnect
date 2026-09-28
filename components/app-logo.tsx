import React from 'react';

interface AppLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-base gap-1.5',
    md: 'text-xl gap-2',
    lg: 'text-2xl gap-2.5',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div
      className={`inline-flex items-center font-bold tracking-tight select-none text-[#182230] ${sizeClasses[size]} ${className}`}
    >
      <span
        className={`inline-flex items-center justify-center text-[#145DA0] ${iconSizes[size]}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="12" cy="12" r="4" fill="#F59E0B" />
        </svg>
      </span>
      <span>
        Connect<span className="text-[#145DA0]">Purpose</span>
      </span>
    </div>
  );
};
