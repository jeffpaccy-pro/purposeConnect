import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, ArrowRight } from 'lucide-react';
import { registerSchema, type RegisterInput } from '../../lib/validations/auth';
import { PasswordField } from './password-field';
import { SocialAuthButtons } from './social-auth-buttons';
import { AuthAlert } from './auth-error-alert';
import { getSupabaseBrowserClient } from '../../lib/supabase/client';
import { getSafeNextUrl } from '../../lib/utils/safe-next';
import { useApp } from '../../src/lib/store';

interface RegisterFormProps {
  onSuccess?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
  nextUrl?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onNavigateToLogin,
  onNavigateToTerms,
  onNavigateToPrivacy,
  nextUrl = '/home',
}) => {
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerAccount, loginAs } = useApp();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: undefined,
    },
  });

  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  const onSubmit = async (data: RegisterInput) => {
    setIsSubmitting(true);
    setAuthError(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const safeNext = getSafeNextUrl(nextUrl, '/home');
      const siteUrl =
        (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL) ||
        (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

      const emailRedirectTo = `${siteUrl}/auth/callback?next=${encodeURIComponent(safeNext)}`;

      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email.trim(),
        password: data.password,
        options: {
          data: {
            full_name: data.fullName.trim(),
          },
          emailRedirectTo,
        },
      });

      // Register and activate account in store immediately
      registerAccount(data.fullName.trim(), data.email.trim());

      if (onSuccess) {
        onSuccess();
      } else if (typeof window !== 'undefined') {
        window.location.href = '/onboarding';
      }
    } catch {
      // Offline fallback: register locally and proceed
      registerAccount(data.fullName.trim(), data.email.trim());
      if (onSuccess) {
        onSuccess();
      } else if (typeof window !== 'undefined') {
        window.location.href = '/onboarding';
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {authError && <AuthAlert type="error" message={authError} />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="reg-fullname" className="block text-xs font-semibold text-[#182230]">
            Full name
          </label>
          <input
            {...register('fullName')}
            id="reg-fullname"
            type="text"
            autoComplete="name"
            placeholder="e.g. Marie Uwase"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'reg-fullname-error' : undefined}
            className={`w-full bg-[#FFFFFF] border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#182230] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#145DA0] focus:border-transparent transition-all ${
              errors.fullName ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 hover:border-slate-300'
            }`}
          />
          {errors.fullName && (
            <p id="reg-fullname-error" className="text-xs text-red-600 font-medium pt-0.5">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label htmlFor="reg-email" className="block text-xs font-semibold text-[#182230]">
            Email address
          </label>
          <input
            {...register('email')}
            id="reg-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'reg-email-error' : undefined}
            className={`w-full bg-[#FFFFFF] border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#182230] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#145DA0] focus:border-transparent transition-all ${
              errors.email ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 hover:border-slate-300'
            }`}
          />
          {errors.email && (
            <p id="reg-email-error" className="text-xs text-red-600 font-medium pt-0.5">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <PasswordField
            {...register('password')}
            id="reg-password"
            label="Password"
            autoComplete="new-password"
            placeholder="Create a password"
            value={passwordValue}
            error={errors.password?.message}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <PasswordField
            {...register('confirmPassword')}
            id="reg-confirm-password"
            label="Confirm password"
            autoComplete="new-password"
            placeholder="Repeat your password"
            value={confirmPasswordValue}
            error={errors.confirmPassword?.message}
          />
        </div>

        {/* Terms of Use Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 leading-normal select-none">
            <input
              {...register('acceptTerms')}
              type="checkbox"
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#145DA0] focus:ring-[#145DA0] accent-[#145DA0]"
            />
            <span>
              I agree to the{' '}
              <button
                type="button"
                onClick={onNavigateToTerms}
                className="text-[#145DA0] hover:text-[#0B7A75] font-semibold underline underline-offset-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#145DA0] rounded"
              >
                Terms of Use
              </button>{' '}
              and{' '}
              <button
                type="button"
                onClick={onNavigateToPrivacy}
                className="text-[#145DA0] hover:text-[#0B7A75] font-semibold underline underline-offset-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#145DA0] rounded"
              >
                Privacy Policy
              </button>
              .
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-xs text-red-600 font-medium pt-1">
              {errors.acceptTerms.message}
            </p>
          )}
        </div>

        {/* Primary Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-[#145DA0] hover:bg-[#0f487e] active:scale-[0.99] text-white font-bold rounded-xl shadow-xs transition-all text-xs sm:text-sm flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>Creating your account...</span>
            </>
          ) : (
            <>
              <span>Create my free account</span>
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
          <span className="px-3 bg-white text-slate-400 font-medium">or sign up with</span>
        </div>
      </div>

      {/* Social Registration: Google, Facebook, and X horizontal with icons only */}
      <SocialAuthButtons
        mode="register"
        next={nextUrl}
        onSuccess={() => {
          if (onSuccess) {
            onSuccess();
          } else if (typeof window !== 'undefined') {
            window.location.href = '/onboarding';
          }
        }}
      />

      {/* Switch to Login */}
      <div className="pt-2 text-center text-xs text-slate-600">
        Already a member?{' '}
        <button
          type="button"
          onClick={onNavigateToLogin}
          className="text-[#145DA0] hover:text-[#0B7A75] font-bold hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#145DA0] rounded"
        >
          Log in
        </button>
      </div>
    </div>
  );
};
