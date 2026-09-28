'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { AppLogo } from '@/components/app-logo';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!currentUser) {
        router.push('/login?next=/home');
        return;
      }

      setUser(currentUser);
      setLoading(false);
    }

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const supabase = getSupabaseBrowserClient();
      await supabase.auth.signOut();
    } catch {
      // ignore
    } finally {
      router.push('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#145DA0]" />
      </div>
    );
  }

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Member';

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#182230] flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <AppLogo size="md" />

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/account')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#145DA0] hover:bg-slate-100 rounded-xl transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Account</span>
            </button>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isLoggingOut ? 'Signing out...' : 'Log out'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-8 flex flex-col justify-center">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-10 text-center space-y-6 max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#16A34A] flex items-center justify-center mx-auto border border-emerald-100">
            <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182230] tracking-tight">
              Welcome back, {displayName}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              You are signed in to ConnectPurpose.
            </p>
          </div>

          <div className="p-4 bg-[#F7F9FC] rounded-xl border border-slate-200/70 text-xs text-slate-600 text-left space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-[#145DA0]">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              <span>Secure Authentication Active</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Session is verified and protected with Supabase SSR cookie security.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => router.push('/account')}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Account Details</span>
            </button>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full sm:w-auto px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4 text-slate-400" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
