import React from 'react';
import { AppLogo } from '../app-logo';

interface AuthCardProps {
  heading: string;
  supportingText?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  logoHref?: string;
  onLogoClick?: () => void;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  heading,
  supportingText,
  children,
  footer,
  onLogoClick,
}) => {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#182230] flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <button
          type="button"
          onClick={onLogoClick}
          className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0] rounded-xl p-1"
          aria-label="ConnectPurpose Homepage"
        >
          <AppLogo size="lg" />
        </button>
        <h1 className="mt-5 text-2xl sm:text-3xl font-extrabold text-[#182230] tracking-tight">
          {heading}
        </h1>
        {supportingText && (
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
            {supportingText}
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#FFFFFF] py-8 px-6 sm:px-9 shadow-lg rounded-2xl border border-slate-200/80 space-y-6">
          {children}

          {footer && (
            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              {footer}
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-[11px] text-slate-400">
          ConnectPurpose · Built for real opportunities & trusted learning
        </p>
      </div>
    </div>
  );
};
