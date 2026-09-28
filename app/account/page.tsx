'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Shield, KeyRound, LogOut, ArrowLeft, Loader2 } from 'lucide-react';
import { AppLogo } from '@/components/app-logo';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    async function loadAccount() {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!currentUser) {
        router.push('/login?next=/account');
        return;
      }

      setUser(currentUser);
      setLoading(false);
    }

    loadAccount();
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

  const providers = user?.app_metadata?.providers || [user?.app_metadata?.provider || 'email'];

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#182230] flex flex-col">
      <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <AppLogo size="md" />

          <button
            onClick={() => router.push('/home')}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#145DA0] font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-4 sm:p-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-9 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#182230]">
              Account Settings
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage your credentials and authentication security.
            </p>
          </div>

          <div className="space-y-4">
            {/* Full Name */}
            {user?.user_metadata?.full_name && (
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F7F9FC] border border-slate-200/70">
                <User className="w-4 h-4 text-[#145DA0] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                    Full Name
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#182230]">
                    {user.user_metadata.full_name}
                  </p>
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F7F9FC] border border-slate-200/70">
              <Mail className="w-4 h-4 text-[#145DA0] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Email Address
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#182230]">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Provider Information */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F7F9FC] border border-slate-200/70">
              <Shield className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Authentication Provider
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {providers.map((p: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 text-xs font-semibold bg-white border border-slate-200 rounded-md text-slate-700 capitalize"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => router.push('/reset-password')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-slate-400" />
              <span>Change Password</span>
            </button>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              <span>{isLoggingOut ? 'Logging out...' : 'Log out'}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
