import React from 'react';
import { Eye, ShieldCheck, X, CheckCircle2, Sliders } from 'lucide-react';
import { Post } from '../../types/database';
import { useApp } from '../../lib/store';

interface WhyThisPostDialogProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

export const WhyThisPostDialog: React.FC<WhyThisPostDialogProps> = ({
  post,
  isOpen,
  onClose,
}) => {
  const { navigate } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-slate-100 animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="why-dialog-title"
      >
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#145DA0] flex items-center justify-center shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 id="why-dialog-title" className="font-bold text-sm text-[#182230]">
                Why am I seeing this?
              </h3>
              <p className="text-xs text-slate-500">Transparent & user-controlled feed</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <p className="text-xs text-slate-600">
            ConnectPurpose does not use engagement-bait algorithms or secret virality scoring. Here is exactly why this post was prioritized in your feed:
          </p>

          <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 border border-slate-100">
            {(post.feed_reasons && post.feed_reasons.length > 0 ? post.feed_reasons : [
              'You joined this community',
              'Matches your selected interests and skills',
              'Active recent collaboration',
            ]).map((reason, index) => (
              <div key={index} className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                <span>{reason}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-start gap-2.5 text-xs text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
            <span>
              Your feed is ranked strictly by community membership, stated skills, and verified urgency—never by advertising dollars or outrage.
            </span>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              navigate('/settings');
            }}
            className="flex items-center gap-1.5 text-xs text-[#145DA0] font-semibold hover:underline"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Tune feed preferences</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
