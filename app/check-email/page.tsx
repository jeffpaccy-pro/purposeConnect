'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft } from 'lucide-react';
import { AppLogo } from '@/components/app-logo';

export default function CheckEmailPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#182230] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <button
          type="button"
          onClick={() => router.push('/login')}
          className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0] rounded-xl p-1"
          aria-label="ConnectPurpose Homepage"
        >
          <AppLogo size="lg" />
        </button>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#FFFFFF] py-8 px-6 sm:px-9 shadow-lg rounded-2xl border border-slate-200/80 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#145DA0] flex items-center justify-center mx-auto border border-blue-100">
            <Mail className="w-7 h-7" aria-hidden="true" />
          </div>

          <h1 className="text-2xl font-extrabold text-[#182230] tracking-tight">
            Check your email
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
            If you can use this email address, we sent instructions to continue setting up your ConnectPurpose account.
          </p>

          <div className="p-3.5 bg-[#F7F9FC] rounded-xl border border-slate-200/70 text-xs text-slate-500 text-left">
            <span className="font-semibold text-slate-700 block mb-0.5">
              Can&apos;t find the email?
            </span>
            Be sure to check your spam or junk folder. The link will remain active for 24 hours.
          </div>

          <div className="pt-2 space-y-3">
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="w-full py-3 px-4 bg-[#145DA0] hover:bg-[#0f487e] active:scale-[0.99] text-white font-bold rounded-xl shadow-xs transition-all text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0]"
            >
              Back to login
            </button>

            <div>
              <button
                type="button"
                onClick={() => router.push('/register')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#145DA0] font-semibold hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#145DA0] rounded"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Use a different email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
