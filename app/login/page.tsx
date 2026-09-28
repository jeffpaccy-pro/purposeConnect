'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthCard } from '@/components/auth/auth-card';
import { LoginForm } from '@/components/auth/login-form';
import { getSafeNextUrl } from '@/lib/utils/safe-next';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawNext = searchParams?.get('next');
  const safeNext = getSafeNextUrl(rawNext, '/home');

  return (
    <AuthCard
      heading="Welcome back"
      supportingText="Continue building what matters to you."
      onLogoClick={() => router.push('/login')}
    >
      <LoginForm
        nextUrl={safeNext}
        onSuccess={(targetUrl) => router.push(targetUrl)}
        onNavigateToRegister={() => router.push(`/register?next=${encodeURIComponent(safeNext)}`)}
        onNavigateToForgotPassword={() => router.push('/forgot-password')}
      />
    </AuthCard>
  );
}
