'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthCard } from '@/components/auth/auth-card';
import { RegisterForm } from '@/components/auth/register-form';
import { getSafeNextUrl } from '@/lib/utils/safe-next';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawNext = searchParams?.get('next');
  const safeNext = getSafeNextUrl(rawNext, '/home');

  return (
    <AuthCard
      heading="Join with purpose"
      supportingText="Find people, opportunities, and projects that help you move forward."
      onLogoClick={() => router.push('/login')}
    >
      <RegisterForm
        nextUrl={safeNext}
        onSuccess={() => router.push('/check-email')}
        onNavigateToLogin={() => router.push(`/login?next=${encodeURIComponent(safeNext)}`)}
        onNavigateToTerms={() => router.push('/terms')}
        onNavigateToPrivacy={() => router.push('/privacy')}
      />
    </AuthCard>
  );
}
