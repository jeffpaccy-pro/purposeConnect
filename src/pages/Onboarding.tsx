import React, { useState } from 'react';
import {
  GraduationCap,
  Compass,
  Layers,
  Users,
  Store,
  HeartHandshake,
  Check,
  Plus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { AppLogo } from '../components/common/AppLogo';
import { useApp } from '../lib/store';

export const Onboarding: React.FC = () => {
  const { purposes, interests, communities, completeOnboarding } = useApp();

  const [step, setStep] = useState(1);
  const totalSteps = 6;

  // Selections
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>(['learn-skills', 'find-opportunities']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Web development', 'Technology']);
  const [customInterest, setCustomInterest] = useState('');
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([
    communities[0]?.id || 'c1',
    communities[1]?.id || 'c2',
  ]);
  const [messagePrivacy, setMessagePrivacy] = useState<'community' | 'approved_only' | 'nobody'>('community');
  const [feedPriority, setFeedPriority] = useState<'learning' | 'opportunities' | 'communities' | 'events' | 'popular'>('learning');

  const purposeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    'learn-skills': GraduationCap,
    'find-opportunities': Compass,
    'build-project': Layers,
    'meet-people': Users,
    'sell-locally': Store,
    'support-community': HeartHandshake,
  };

  const togglePurpose = (slug: string) => {
    setSelectedPurposes((prev) =>
      prev.includes(slug) ? prev.filter((p) => p !== slug) : [...prev, slug]
    );
  };

  const toggleInterest = (name: string) => {
    setSelectedInterests((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const addCustomInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      setSelectedInterests((prev) => [...prev, customInterest.trim()]);
      setCustomInterest('');
    }
  };

  const toggleCommunity = (id: string) => {
    setSelectedCommunities((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    completeOnboarding({
      purposes: selectedPurposes,
      interests: selectedInterests,
      joinedCommunities: selectedCommunities,
      messagePrivacy,
      feedPriority,
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#182230] flex flex-col justify-between py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between pb-6">
        <AppLogo size="md" />
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">
            Step {step} of {totalSteps}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto w-full mb-8">
        <div className="w-full bg-slate-200/70 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-[#145DA0] h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Form Content Container */}
      <div className="max-w-2xl mx-auto w-full bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200/80 flex-1 flex flex-col justify-between">
        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#145DA0] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182230] tracking-tight">
              Let&apos;s make ConnectPurpose useful for you.
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              ConnectPurpose has no advertisements, vanity follower counts, or engagement-trap feeds. You tell us why you are here, and we connect you directly with the people, study sessions, and opportunities that help you achieve it.
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs text-slate-500">
              💡 <strong>Note:</strong> You can adjust every preference, interest, or community subscription anytime in your Settings.
            </div>
          </div>
        )}

        {/* Step 2: Purposes */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold text-[#145DA0] uppercase tracking-wider">
                Purpose Discovery
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#182230] mt-1">
                What would you like to do first?
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select one or more goals to calibrate your spaces.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {purposes.map((p) => {
                const Icon = purposeIcons[p.slug] || Sparkles;
                const isSelected = selectedPurposes.includes(p.slug);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePurpose(p.slug)}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-[#145DA0] bg-blue-50/60 shadow-xs'
                        : 'border-slate-200/80 hover:border-slate-300 bg-[#F7F9FC]'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#145DA0] text-white' : 'bg-white text-slate-600 border border-slate-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-[#182230]">{p.name}</p>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Interests */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold text-[#145DA0] uppercase tracking-wider">
                Your Interests
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#182230] mt-1">
                What topics matter most to you?
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select from our primary topics or add custom skills.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {interests.map((int) => {
                const isSelected = selectedInterests.includes(int.name);
                return (
                  <button
                    key={int.id}
                    type="button"
                    onClick={() => toggleInterest(int.name)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#145DA0] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    <span>{int.name}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={addCustomInterest} className="flex gap-2 pt-3">
              <input
                type="text"
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                placeholder="Add custom skill or interest (e.g. Next.js, Robotics)..."
                className="flex-1 bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={!customInterest.trim()}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-semibold rounded-xl flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>
        )}

        {/* Step 4: Suggested Communities */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold text-[#145DA0] uppercase tracking-wider">
                Peer Pods
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#182230] mt-1">
                Suggested communities to join
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Join spaces where real discussions and projects happen daily.
              </p>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {communities.map((c) => {
                const isSelected = selectedCommunities.includes(c.id);
                return (
                  <div
                    key={c.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-300 bg-emerald-50/40'
                        : 'border-slate-200/80 bg-[#F7F9FC]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-200 overflow-hidden shrink-0">
                        <img
                          src={c.cover_image_url}
                          alt={c.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-[#182230]">{c.name}</p>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{c.description}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleCommunity(c.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shrink-0 ml-2 ${
                        isSelected
                          ? 'bg-[#16A34A] text-white'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected ? 'Joined' : 'Join'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Privacy & Feed Preferences */}
        {step === 5 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold text-[#145DA0] uppercase tracking-wider">
                Control & Comfort
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#182230] mt-1">
                Privacy & feed preferences
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                You decide who can reach you and what your feed emphasizes.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Who can send you direct messages?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { val: 'community', title: 'Community members', desc: 'Any fellow member' },
                    { val: 'approved_only', title: 'People I approve', desc: 'Accept requests first' },
                    { val: 'nobody', title: 'Nobody for now', desc: 'Disable DMs completely' },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setMessagePrivacy(opt.val as 'community' | 'approved_only' | 'nobody')}
                      className={`p-3 rounded-xl border text-left transition-colors ${
                        messagePrivacy === opt.val
                          ? 'border-[#145DA0] bg-blue-50/50 text-[#145DA0]'
                          : 'border-slate-200 bg-[#F7F9FC] text-slate-600'
                      }`}
                    >
                      <p className="font-semibold text-xs">{opt.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  What should your feed prioritize?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { val: 'learning', title: 'Learning and mentorship', desc: 'Study pods & Q&As' },
                    { val: 'opportunities', title: 'Opportunities', desc: 'Internships & projects' },
                    { val: 'communities', title: 'My communities', desc: 'Updates from joined groups' },
                    { val: 'events', title: 'Nearby events', desc: 'Upcoming workshops & dates' },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setFeedPriority(opt.val as 'learning' | 'opportunities' | 'communities' | 'events')}
                      className={`p-3 rounded-xl border text-left transition-colors ${
                        feedPriority === opt.val
                          ? 'border-[#145DA0] bg-blue-50/50 text-[#145DA0]'
                          : 'border-slate-200 bg-[#F7F9FC] text-slate-600'
                      }`}
                    >
                      <p className="font-semibold text-xs">{opt.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Completion */}
        {step === 6 && (
          <div className="space-y-4 text-center py-6 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#16A34A] flex items-center justify-center mx-auto mb-2">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182230]">
              Your community space is ready.
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              We tailored your feed with active study sessions, relevant opportunities, and verified peers in Rwanda IT Learners.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>All preferences saved to your database profile</span>
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
          {step > 1 && step < 6 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#145DA0] hover:bg-[#0f487e] text-white shadow-xs transition-colors"
            >
              <span>{step === 1 ? 'Start setup' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-xs font-bold bg-[#145DA0] hover:bg-[#0f487e] text-white shadow-md transition-colors"
            >
              <span>Go to my home</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
