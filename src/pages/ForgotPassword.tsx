import React, { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { AppLogo } from '../components/common/AppLogo';
import { useApp } from '../lib/store';

export const ForgotPassword: React.FC = () => {
  const { navigate, addToast } = useApp();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      addToast('Password reset link sent to your email');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <button
          onClick={() => navigate('/')}
          className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0] rounded-xl"
        >
          <AppLogo size="lg" />
        </button>
        <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-[#182230]">
          Reset your password
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Enter your registered email and we&apos;ll send you a recovery link.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-8 shadow-xl rounded-3xl border border-slate-200/90">
          {isSent ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#16A34A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#182230]">Check your inbox</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We sent a secure password reset link to <span className="font-semibold text-slate-800">{email}</span>. Click the link to update your credentials.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/reset-password')}
                  className="w-full py-2.5 px-4 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-bold rounded-xl"
                >
                  Continue to Set New Password
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    required
                    className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#145DA0] hover:bg-[#0f487e] text-white font-bold rounded-xl shadow-xs transition-colors text-xs flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isLoading ? 'Sending link...' : 'Send reset link'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-xs text-slate-600 hover:text-slate-900 font-semibold inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to log in</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
