import React from 'react';
import {
  GraduationCap,
  Compass,
  Layers,
  Users,
  Store,
  HeartHandshake,
  ShieldCheck,
  Eye,
  Sparkles,
  Lock,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Code2,
} from 'lucide-react';
import { PublicHeader } from '../components/common/PublicHeader';
import { useApp } from '../lib/store';
import { exportProjectZip } from '../lib/zip-export';

export const PublicHome: React.FC = () => {
  const { navigate, purposes } = useApp();

  const purposeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    'learn-skills': GraduationCap,
    'find-opportunities': Compass,
    'build-project': Layers,
    'meet-people': Users,
    'sell-locally': Store,
    'support-community': HeartHandshake,
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#182230] flex flex-col">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-semibold text-[#145DA0] mb-5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0B7A75]" />
              <span>A trusted, algorithm-free community platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#182230] leading-[1.15] text-balance">
              Connect with people. Learn together.{' '}
              <span className="text-[#145DA0]">Build real opportunities.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl text-balance">
              Join trusted communities where conversations become study groups, collaborative projects, peer mentorship, and local opportunities.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-3.5 bg-[#145DA0] hover:bg-[#0f487e] text-white font-bold rounded-2xl shadow-sm transition-all text-sm flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0]"
              >
                <span>Join your community</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/opportunities')}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-2xl border border-slate-200 shadow-2xs transition-all text-sm"
              >
                Explore opportunities
              </button>
            </div>

            <div className="mt-8 flex items-center gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                Zero vanity likes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                Explainable feed
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                Verified peer pods
              </span>
            </div>
          </div>

          {/* Right Column: Visual Mock Product Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-xl border border-slate-200/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#145DA0]/10 text-[#145DA0] flex items-center justify-center font-bold text-xs">
                    CP
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#182230]">Purpose Pathway</p>
                    <p className="text-[11px] text-slate-400">Personalized Goal Match</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold bg-emerald-50 text-[#16A34A] border border-emerald-200 px-2 py-0.5 rounded-full">
                  Active Pod
                </span>
              </div>

              {/* Requirement: Mock Product Card */}
              <div className="p-4 bg-[#F7F9FC] rounded-2xl border border-slate-200/70">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Selected Purpose
                </span>
                <p className="text-sm font-bold text-[#182230] flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#145DA0]" />
                  &ldquo;I want to learn web development&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-center py-0.5 text-slate-400">
                <div className="h-6 w-0.5 bg-slate-200" />
              </div>

              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100">
                <span className="text-[11px] font-semibold text-[#145DA0] uppercase tracking-wider block mb-1">
                  Community Match
                </span>
                <p className="text-xs font-semibold text-[#182230]">
                  Study group + Mentor + Learning challenge
                </p>
                <p className="text-[11px] text-slate-600 mt-1">
                  Paired with <span className="font-semibold text-[#145DA0]">Aline Uwimana</span> in Rwanda IT Learners.
                </p>
              </div>

              <div className="flex items-center justify-center py-0.5 text-slate-400">
                <div className="h-6 w-0.5 bg-slate-200" />
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#16A34A] uppercase tracking-wider block mb-0.5">
                    Real-world Result
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    3 study sessions completed this week
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#16A34A] text-white flex items-center justify-center shadow-xs">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "What brings you here today?" Section */}
      <section className="py-16 bg-white border-y border-slate-200/80 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#145DA0] uppercase tracking-widest">
              Purpose First
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182230] mt-2">
              What brings you here today?
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Select how you want to participate. We configure your feed, tools, and connections around your intentions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {purposes.map((p) => {
              const Icon = purposeIcons[p.slug] || Sparkles;
              return (
                <div
                  key={p.id}
                  onClick={() => navigate('/register')}
                  className="p-6 rounded-2xl border border-slate-200/90 hover:border-[#145DA0] hover:shadow-md transition-all bg-[#F7F9FC] cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#145DA0] group-hover:bg-[#145DA0] group-hover:text-white transition-colors mb-4 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base text-[#182230] group-hover:text-[#145DA0] transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#145DA0] group-hover:translate-x-1 transition-transform">
                    <span>Start with this purpose</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Three-step "How it works" Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">
              Simple & Action-Oriented
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182230] mt-2">
              How ConnectPurpose works
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Three clear steps that transform casual discussions into verified real-world outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col items-start">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#145DA0] font-mono font-extrabold text-sm flex items-center justify-center mb-4 border border-blue-200/60">
                01
              </div>
              <h3 className="font-bold text-lg text-[#182230]">Join a purpose</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Declare whether you are here to learn skills, find opportunities, build open source apps, or support local communities.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col items-start">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#F59E0B] font-mono font-extrabold text-sm flex items-center justify-center mb-4 border border-amber-200/60">
                02
              </div>
              <h3 className="font-bold text-lg text-[#182230]">Find trusted people</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Connect with verified peers in focused pods like Rwanda IT Learners or Kigali Creators, backed by meaningful trust indicators.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col items-start">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#16A34A] font-mono font-extrabold text-sm flex items-center justify-center mb-4 border border-emerald-200/60">
                03
              </div>
              <h3 className="font-bold text-lg text-[#182230]">Take action</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Launch projects, assign tasks, RSVP for weekly study sessions, ask for urgent code help, or apply for verified apprenticeships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Four Benefit Cards */}
      <section id="about" className="py-16 bg-white border-y border-slate-200/80 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182230]">
              Built differently from ground up
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              We eliminated the toxic features of legacy social networks to preserve your time and focus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F7F9FC] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#145DA0] flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#182230]">Trust, not likes</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                No public follower counts. Helpful reactions like &quot;I learned this&quot; and &quot;Trusted source&quot; prioritize real merit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F9FC] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0B7A75] flex items-center justify-center mb-3">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#182230]">A feed you can understand</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Every item features a clear &quot;Why am I seeing this?&quot; explanation so you stay in total control of what appears.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F9FC] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#182230]">Conversations become action</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Direct pathways from asking a beginner question to joining an active project sprint or scheduling a mentoring clinic.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F9FC] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#182230]">Your data stays yours</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Zero behavioral tracking, zero algorithmic ad-targeting, and complete data export capabilities at any moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#145DA0] to-[#0B7A75] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to build what matters to you?
            </h2>
            <p className="text-sm text-blue-100 mt-2 leading-relaxed">
              Join free today. Meet peers who want to learn, collaborate on projects, and create genuine opportunities.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-3.5 bg-[#F59E0B] hover:bg-[#d98906] text-white font-bold rounded-2xl shadow-sm transition-colors text-sm"
            >
              Get started free
            </button>
            <button
              onClick={() => exportProjectZip()}
              className="px-4 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl backdrop-blur-xs transition-colors text-sm"
            >
              Export ZIP
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200/80 py-10 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#182230]">ConnectPurpose</span>
            <span>·</span>
            <span>Purpose-Driven Social Platform</span>
          </div>

          <div className="flex items-center gap-6 flex-wrap font-medium">
            <button onClick={() => navigate('/about')} className="hover:text-[#145DA0]">About</button>
            <button onClick={() => navigate('/guidelines')} className="hover:text-[#145DA0]">Community Guidelines</button>
            <button onClick={() => navigate('/privacy')} className="hover:text-[#145DA0]">Privacy Policy</button>
            <button onClick={() => navigate('/terms')} className="hover:text-[#145DA0]">Terms of Service</button>
            <a href="mailto:support@connectpurpose.org" className="hover:text-[#145DA0]">Contact</a>
            <button onClick={() => exportProjectZip()} className="hover:text-[#145DA0] font-semibold text-[#145DA0]">
              Download ZIP Archive
            </button>
          </div>

          <div>
            © {new Date().getFullYear()} ConnectPurpose. Built with purpose.
          </div>
        </div>
      </footer>
    </div>
  );
};
