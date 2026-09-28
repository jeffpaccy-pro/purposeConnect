import React from 'react';
import { PublicHeader } from '../components/common/PublicHeader';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useApp } from '../lib/store';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'guidelines' | 'about';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const { navigate } = useApp();

  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Your personal data belongs to you. No ad-tracking, no data selling.',
      lastUpdated: 'March 2026',
      sections: [
        {
          heading: '1. What We Collect and Why',
          text: 'We only collect information required to deliver purposeful community connections: your name, email, chosen username, purpose selections, stated skills, and content you deliberately publish. We do not track your location in the background or monitor third-party browser activity.',
        },
        {
          heading: '2. Zero Behavioral Advertising',
          text: 'ConnectPurpose contains zero commercial tracking pixels, zero algorithmic ad-retargeting scripts, and zero advertising auctions. Your feed is ordered strictly by your explicit choices (joined communities, stated goals, upcoming events).',
        },
        {
          heading: '3. Data Ownership & Export',
          text: 'You may export your full data archive or delete your entire account at any time from Account Settings. Deletion permanently erases your personal profile, credentials, and private direct messages.',
        },
      ],
    },
    terms: {
      title: 'Terms of Service',
      subtitle: 'Guidelines governing purposeful participation and mutual respect on ConnectPurpose.',
      lastUpdated: 'March 2026',
      sections: [
        {
          heading: '1. Authentic Participation',
          text: 'ConnectPurpose is designed for sincere collaboration, skill growth, and genuine opportunities. Users must not deploy automated bots, scrapers, impersonation profiles, or unsolicited commercial mass-messaging.',
        },
        {
          heading: '2. Community Integrity',
          text: 'All members agree not to post deceptive job opportunities, multi-level marketing pitches, pay-to-apply schemes, or plagiarized work. Verified community organizers reserve the right to remove non-compliant content.',
        },
        {
          heading: '3. Accountability & Safety',
          text: 'We enforce prompt moderation for harassment, hate speech, or abuse. Violating these standards leads to suspension or permanent banishment across all network spaces.',
        },
      ],
    },
    guidelines: {
      title: 'Community Guidelines',
      subtitle: 'How we build trusted study pods, respectful collaboration, and safe workspaces.',
      lastUpdated: 'March 2026',
      sections: [
        {
          heading: '1. Lead with Constructive Support',
          text: 'When reviewing peer code or design work, offer actionable, encouraging feedback. Remember that beginners and experienced builders are learning alongside each other.',
        },
        {
          heading: '2. Meaningful Reactions Over Vanity Metrics',
          text: 'Use reactions intentionally: tag items as "Helpful" or "I learned this" when someone contributes real value, or "Needs checking" if information requires factual clarification.',
        },
        {
          heading: '3. Transparent Opportunities',
          text: 'Whenever posting an internship, mentorship, or collaborative project, clearly outline expectations, compensation/stipend status, and time commitments.',
        },
      ],
    },
    about: {
      title: 'About ConnectPurpose',
      subtitle: 'Reclaiming social technology for human learning and meaningful action.',
      lastUpdated: 'March 2026',
      sections: [
        {
          heading: 'Our Purpose',
          text: 'Mainstream social networks were engineered to maximize screentime, outrage, and passive consumption. ConnectPurpose is built on the inverse principle: minimizing friction between wanting to learn a skill and building real projects with trusted peers.',
        },
        {
          heading: 'Origin & Community Roots',
          text: 'Born out of active developer, creator, and student communities in Rwanda and beyond, ConnectPurpose turns chats into study sessions, project boards, and verified apprenticeships.',
        },
      ],
    },
  };

  const page = contentMap[type] || contentMap.about;

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#182230] flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-4xl mx-auto w-full py-12 px-4 sm:px-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#145DA0] font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/90">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#145DA0] uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-[#0B7A75]" />
            <span>ConnectPurpose Trust & Safety</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182230] tracking-tight">
            {page.title}
          </h1>

          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            {page.subtitle}
          </p>

          <div className="mt-2 text-[11px] text-slate-400">
            Last updated: {page.lastUpdated}
          </div>

          <div className="mt-8 space-y-6 pt-6 border-t border-slate-100">
            {page.sections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h2 className="text-base font-bold text-[#182230]">
                  {section.heading}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
