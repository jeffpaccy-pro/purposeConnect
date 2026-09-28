import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, ArrowRight } from 'lucide-react';
import { resetPasswordSchema, type ResetPasswordInput } from '../../lib/validations/auth';
import { PasswordField } from './password-field';
import { AuthAlert } from './auth-error-alert';
import { getSupabaseBrowserClient } from '../../lib/supabase/client';

interface ResetPasswordFormProps {
  onSuccessRedirect?: (path: string) => void;
  onNavigateToForgotPassword?: () => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSuccessRedirect,
  onNavigateToForgotPassword,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  const onSubmit = async (data: ResetPasswordInput) => {
    setIsSubmitting(true);
    setAuthError(null);
    setSuccessMessage(null);

    try {
      const supabase = getSupabaseBrowserClient();

      // Ensure user session exists from recovery link
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setAuthError(
          'Your password reset session has expired or is invalid. Please request a new recovery link.'
        );
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        setAuthError(
          error.message || 'Unable to update your password. Please request a new recovery link.'
        );
        setIsSubmitting(false);
        return;
      }

      setSuccessMessage('Your password has been successfully updated. Redirecting to sign in...');
      setTimeout(() => {
        if (onSuccessRedirect) {
          onSuccessRedirect('/home');
        } else if (typeof window !== 'undefined') {
          window.location.href = '/home';
        }
      }, 1500);
    } catch {
      setAuthError('An unexpected error occurred while updating your password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {authError && <AuthAlert type="error" message={authError} />}
      {successMessage && <AuthAlert type="success" message={successMessage} />}

      {authError && authError.includes('expired') ? (
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onNavigateToForgotPassword}
            className="text-xs text-[#145DA0] font-bold hover:underline"
          >
            Request a new reset link
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <PasswordField
              {...register('password')}
              id="reset-password"
              label="New password"
              autoComplete="new-password"
              placeholder="Enter your new password"
              value={passwordValue}
              error={errors.password?.message}
            />
          </div>

          <div>
            <PasswordField
              {...register('confirmPassword')}
              id="reset-confirm-password"
              label="Confirm new password"
              autoComplete="new-password"
              placeholder="Repeat your new password"
              value={confirmPasswordValue}
              error={errors.confirmPassword?.message}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || Boolean(successMessage)}
            className="w-full py-3 px-4 bg-[#145DA0] hover:bg-[#0f487e] active:scale-[0.99] text-white font-bold rounded-xl shadow-xs transition-all text-xs sm:text-sm flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>Saving new password...</span>
              </>
            ) : (
              <>
                <span>Save new password</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
