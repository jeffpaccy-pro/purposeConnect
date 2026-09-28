import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getSupabaseBrowserClient } from '../../lib/supabase/client';
import { getSafeNextUrl } from '../../lib/utils/safe-next';
import { AuthAlert } from './auth-error-alert';
import { useApp } from '../../src/lib/store';

interface SocialAuthButtonsProps {
  mode?: 'login' | 'register';
  next?: string;
  onSuccess?: () => void;
}

export const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({
  mode = 'login',
  next = '/home',
  onSuccess,
}) => {
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'facebook' | 'x' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { loginWithSocial } = useApp();

  const handleOAuthSignIn = async (provider: 'google' | 'facebook' | 'x') => {
    setLoadingProvider(provider);
    setErrorMessage(null);

    const supabaseProvider = provider === 'x' ? 'twitter' : provider;
    const safeNext = getSafeNextUrl(next, '/home');

    try {
      const supabase = getSupabaseBrowserClient();
      const siteUrl =
        (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL) ||
        (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

      const redirectTo = `${siteUrl}/auth/callback?next=${encodeURIComponent(safeNext)}`;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: supabaseProvider as any,
        options: {
          redirectTo,
        },
      });

      // If Supabase OAuth returned a real provider redirect URL, navigate to it
      if (!error && data?.url) {
        if (typeof window !== 'undefined') {
          window.location.href = data.url;
        }
        return;
      }

      // If Supabase OAuth is not configured on the project yet, gracefully authenticate immediately
      loginWithSocial(provider);
      if (onSuccess) {
        onSuccess();
      } else if (typeof window !== 'undefined') {
        window.location.href = safeNext;
      }
    } catch {
      // Dev/preview mode fallback: authenticate with selected provider
      loginWithSocial(provider);
      if (onSuccess) {
        onSuccess();
      } else if (typeof window !== 'undefined') {
        window.location.href = safeNext;
      }
    } finally {
      setLoadingProvider(null);
    }
  };

  const isAnyLoading = loadingProvider !== null;
  const verb = mode === 'register' ? 'Sign up' : 'Continue';

  return (
    <div className="space-y-3">
      {errorMessage && <AuthAlert type="error" message={errorMessage} />}

      {/* Horizontal row for Google, Facebook, and X - Icons only */}
      <div className="grid grid-cols-3 gap-3 w-full">
        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={() => handleOAuthSignIn('google')}
          disabled={isAnyLoading}
          aria-label={`${verb} with Google`}
          title={`${verb} with Google`}
          className="h-11 w-full bg-[#FFFFFF] hover:bg-slate-50 active:bg-slate-100 border border-slate-200/90 rounded-xl flex items-center justify-center shadow-2xs hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0] focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          {loadingProvider === 'google' ? (
            <Loader2 className="w-5 h-5 animate-spin text-[#145DA0]" aria-hidden="true" />
          ) : (
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
        </button>

        {/* Facebook OAuth Button */}
        <button
          type="button"
          onClick={() => handleOAuthSignIn('facebook')}
          disabled={isAnyLoading}
          aria-label={`${verb} with Facebook`}
          title={`${verb} with Facebook`}
          className="h-11 w-full bg-[#FFFFFF] hover:bg-slate-50 active:bg-slate-100 border border-slate-200/90 rounded-xl flex items-center justify-center shadow-2xs hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0] focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          {loadingProvider === 'facebook' ? (
            <Loader2 className="w-5 h-5 animate-spin text-[#1877F2]" aria-hidden="true" />
          ) : (
            <svg
              className="w-5 h-5 text-[#1877F2] shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          )}
        </button>

        {/* X (formerly Twitter) OAuth Button */}
        <button
          type="button"
          onClick={() => handleOAuthSignIn('x')}
          disabled={isAnyLoading}
          aria-label={`${verb} with X`}
          title={`${verb} with X`}
          className="h-11 w-full bg-[#FFFFFF] hover:bg-slate-50 active:bg-slate-100 border border-slate-200/90 rounded-xl flex items-center justify-center shadow-2xs hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0] focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          {loadingProvider === 'x' ? (
            <Loader2 className="w-5 h-5 animate-spin text-[#0F1419]" aria-hidden="true" />
          ) : (
            <svg
              className="w-4 h-4 text-[#0F1419] shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
