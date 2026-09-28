import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { AppLogo } from '@/components/app-logo';

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Effective Date: March 2026
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <section className="space-y-1.5">
              <h2 className="text-sm font-bold text-[#182230]">1. What We Collect and Why</h2>
              <p>
                We only collect information required to deliver purposeful community connections: your name, email, chosen username, and credentials. We never track your location in the background or monitor third-party browser activity.
              </p>
            </section>

            <section className="space-y-1.5">
              <h2 className="text-sm font-bold text-[#182230]">2. Zero Behavioral Advertising</h2>
              <p>
                ConnectPurpose contains zero commercial tracking pixels, zero algorithmic ad-retargeting scripts, and zero advertising auctions.
              </p>
            </section>

            <section className="space-y-1.5">
              <h2 className="text-sm font-bold text-[#182230]">3. Password & Credential Security</h2>
              <p>
                Passwords are never stored in plaintext and are salted and hashed using modern bcrypt cryptographic standards managed by Supabase Auth with Row Level Security.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
