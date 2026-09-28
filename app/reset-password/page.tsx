'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AuthCard } from '@/components/auth/auth-card';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';

export default function ResetPasswordPage() {
  const router = useRouter();

  return (
    <AuthCard
      heading="Create a new password"
      supportingText="Choose a strong password you have not used elsewhere."
      onLogoClick={() => router.push('/login')}
    >
      <ResetPasswordForm
        onSuccessRedirect={(path) => router.push(path)}
        onNavigateToForgotPassword={() => router.push('/forgot-password')}
      />
    </AuthCard>
  );
}
