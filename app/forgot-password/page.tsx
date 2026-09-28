'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AuthCard } from '@/components/auth/auth-card';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

export default function ForgotPasswordPage() {
  const router = useRouter();

  return (
    <AuthCard
      heading="Reset your password"
      supportingText="Enter your email address and we will send reset instructions if an account is available."
      onLogoClick={() => router.push('/login')}
    >
      <ForgotPasswordForm onNavigateToLogin={() => router.push('/login')} />
    </AuthCard>
  );
}
