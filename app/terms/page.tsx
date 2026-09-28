import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { AppLogo } from '@/components/app-logo';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#182230] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          href="/register"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#145DA0] font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to registration</span>
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-10 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <AppLogo size="md" className="mb-3" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182230]">
              Terms of Use
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Effective Date: March 2026
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <section className="space-y-1.5">
              <h2 className="text-sm font-bold text-[#182230]">1. Purpose-Driven Engagement</h2>
              <p>
                ConnectPurpose is designed for honest collaboration, learning, and genuine community opportunities. Users must not deploy automated bots, scrapers, impersonation profiles, or unsolicited commercial mass messaging.
              </p>
            </section>

            <section className="space-y-1.5">
              <h2 className="text-sm font-bold text-[#182230]">2. Account Security & Verification</h2>
              <p>
                You are responsible for safeguarding your login credentials. We require strong 12+ character passwords with multi-character requirements to protect community integrity.
              </p>
            </section>

            <section className="space-y-1.5">
              <h2 className="text-sm font-bold text-[#182230]">3. Prohibited Content & Behavior</h2>
              <p>
                Harassment, hate speech, paid application recruiting scams, and deceptive content are strictly prohibited. Violators are immediately removed by community moderators.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
