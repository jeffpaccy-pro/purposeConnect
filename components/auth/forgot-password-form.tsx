import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, ArrowLeft, Send } from 'lucide-react';
import { forgotPasswordSchema, type ForgotPasswordInput } from '../../lib/validations/auth';
import { AuthAlert } from './auth-error-alert';
import { getSupabaseBrowserClient } from '../../lib/supabase/client';

interface ForgotPasswordFormProps {
  onNavigateToLogin: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onNavigateToLogin,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsSubmitting(true);
    setAuthError(null);
    setSuccessMessage(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const siteUrl =
        (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL) ||
        (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

      const redirectTo = `${siteUrl}/reset-password`;

      await supabase.auth.resetPasswordForEmail(data.email.trim(), {
        redirectTo,
      });

      // SECURITY: Always show generic message to prevent account enumeration
      setSuccessMessage(
        'If an account is available for this email address, reset instructions have been sent.'
      );
    } catch {
      // Still show the generic safe message on errors
      setSuccessMessage(
        'If an account is available for this email address, reset instructions have been sent.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {authError && <AuthAlert type="error" message={authError} />}
      {successMessage && <AuthAlert type="success" message={successMessage} />}

      {!successMessage ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <label htmlFor="forgot-email" className="block text-xs font-semibold text-[#182230]">
              Email address
            </label>
            <input
              {...register('email')}
              id="forgot-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'forgot-email-error' : undefined}
              className={`w-full bg-[#FFFFFF] border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#182230] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#145DA0] focus:border-transparent transition-all ${
                errors.email ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 hover:border-slate-300'
              }`}
            />
            {errors.email && (
              <p id="forgot-email-error" className="text-xs text-red-600 font-medium pt-0.5">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-[#145DA0] hover:bg-[#0f487e] active:scale-[0.99] text-white font-bold rounded-xl shadow-xs transition-all text-xs sm:text-sm flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>Sending reset link...</span>
              </>
            ) : (
              <>
                <span>Send reset link</span>
                <Send className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="space-y-3 text-center py-2">
          <p className="text-xs text-slate-600">
            Please check your spam or junk folder if you don&apos;t see the message in your primary inbox.
          </p>
        </div>
      )}

      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={onNavigateToLogin}
          className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#182230] font-semibold hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#145DA0] rounded"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to login</span>
        </button>
      </div>
    </div>
  );
};
