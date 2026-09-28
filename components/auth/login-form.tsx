import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, ArrowRight } from 'lucide-react';
import { loginSchema, type LoginInput } from '../../lib/validations/auth';
import { PasswordField } from './password-field';
import { SocialAuthButtons } from './social-auth-buttons';
import { AuthAlert } from './auth-error-alert';
import { getSupabaseBrowserClient } from '../../lib/supabase/client';
import { getSafeNextUrl } from '../../lib/utils/safe-next';
import { useApp } from '../../src/lib/store';

interface LoginFormProps {
  onSuccess?: (targetUrl: string) => void;
  onNavigateToRegister?: () => void;
  onNavigateToForgotPassword?: () => void;
  nextUrl?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onNavigateToRegister,
  onNavigateToForgotPassword,
  nextUrl = '/home',
}) => {
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loginWithEmail, loginAs, allUsers } = useApp();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'aline_u@example.com',
      password: 'password123',
      keepSignedIn: true,
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (data: LoginInput) => {
    setIsSubmitting(true);
    setAuthError(null);

    const safeTarget = getSafeNextUrl(nextUrl, '/home');

    try {
      const supabase = getSupabaseBrowserClient();
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email.trim(),
        password: data.password,
      });

      if (!error && authData?.user) {
        loginWithEmail(data.email.trim(), data.password);
        if (onSuccess) {
          onSuccess(safeTarget);
        } else if (typeof window !== 'undefined') {
          window.location.href = safeTarget;
        }
        return;
      }

      // If Supabase is not yet configured or returned an error, fallback to graceful local demo login
      const localSuccess = loginWithEmail(data.email.trim(), data.password);
      if (localSuccess) {
        if (onSuccess) {
          onSuccess(safeTarget);
        } else if (typeof window !== 'undefined') {
          window.location.href = safeTarget;
        }
        return;
      }

      // If both fail:
      setAuthError('We could not sign you in. Check your details or use a demo account.');
    } catch {
      // Safe fallback for offline / unconfigured dev environment
      const localSuccess = loginWithEmail(data.email.trim(), data.password);
      if (localSuccess) {
        if (onSuccess) {
          onSuccess(safeTarget);
        } else if (typeof window !== 'undefined') {
          window.location.href = safeTarget;
        }
      } else {
        setAuthError('We could not sign you in. Check your details and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {authError && <AuthAlert type="error" message={authError} />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Email Address */}
        <div className="space-y-1.5">
          <label htmlFor="login-email" className="block text-xs font-semibold text-[#182230]">
            Email address
          </label>
          <input
            {...register('email')}
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            className={`w-full bg-[#FFFFFF] border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#182230] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#145DA0] focus:border-transparent transition-all ${
              errors.email ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 hover:border-slate-300'
            }`}
          />
          {errors.email && (
            <p id="login-email-error" className="text-xs text-red-600 font-medium pt-0.5">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <PasswordField
            {...register('password')}
            id="login-password"
            label="Password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={passwordValue}
            error={errors.password?.message}
          />
        </div>

        {/* Controls Row: Keep signed in & Forgot password */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
            <input
              {...register('keepSignedIn')}
              type="checkbox"
              className="w-4 h-4 rounded border-slate-300 text-[#145DA0] focus:ring-[#145DA0] accent-[#145DA0]"
            />
            <span>Keep me signed in</span>
          </label>

          <button
            type="button"
            onClick={onNavigateToForgotPassword}
            className="text-[#145DA0] hover:text-[#0B7A75] font-semibold hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#145DA0] rounded"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-[#145DA0] hover:bg-[#0f487e] active:scale-[0.99] text-white font-bold rounded-xl shadow-xs transition-all text-xs sm:text-sm flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Log in</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      {/* Social Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-white text-slate-400 font-medium">or continue with</span>
        </div>
      </div>

      {/* Social Authentication: Google, Facebook, and X in a horizontal line with icons only */}
      <SocialAuthButtons
        mode="login"
        next={nextUrl}
        onSuccess={() => {
          if (onSuccess) onSuccess('/home');
        }}
      />

      {/* Quick Demo Switcher */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Quick 1-Click Demo
          </span>
          <span className="text-[10px] text-slate-400">Pre-seeded accounts</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {allUsers.slice(0, 4).map((user) => (
            <button
              key={user.id}
              type="button"
              onClick={() => {
                setValue('email', `${user.username}@example.com`);
                setValue('password', 'password123');
                loginAs(user.id);
                if (onSuccess) onSuccess('/home');
              }}
              className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-left transition-colors flex items-center gap-2 group"
            >
              <img
                src={user.avatar_url}
                alt={user.full_name}
                className="w-5 h-5 rounded-full object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs font-medium text-slate-700 group-hover:text-[#145DA0] truncate">
                {user.full_name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Switch to Register */}
      <div className="pt-1 text-center text-xs text-slate-600">
        New here?{' '}
        <button
          type="button"
          onClick={onNavigateToRegister}
          className="text-[#145DA0] hover:text-[#0B7A75] font-bold hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#145DA0] rounded"
        >
          Create a free account
        </button>
      </div>
    </div>
  );
};
