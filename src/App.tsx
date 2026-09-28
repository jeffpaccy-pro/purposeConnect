import React, { useState } from 'react';
import { AppProvider, useApp } from './lib/store';
import { ToastContainer } from './components/common/Toast';
import { AuthHeader } from './components/common/AuthHeader';
import { DesktopSidebar } from './components/common/DesktopSidebar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { CreateActionSheet } from './components/common/CreateActionSheet';
import { CreatePostModal } from './components/modals/CreatePostModal';
import { AskHelpModal } from './components/modals/AskHelpModal';

// Auth Components
import { AuthCard } from '../components/auth/auth-card';
import { LoginForm } from '../components/auth/login-form';
import { RegisterForm } from '../components/auth/register-form';
import { ForgotPasswordForm } from '../components/auth/forgot-password-form';
import { ResetPasswordForm } from '../components/auth/reset-password-form';

// Pages
import { PublicHome } from './pages/PublicHome';
import { LegalPage } from './pages/LegalPage';
import { Onboarding } from './pages/Onboarding';
import { HomeDashboard } from './pages/HomeDashboard';
import { Explore } from './pages/Explore';
import { Communities } from './pages/Communities';
import { CommunityDetail } from './pages/CommunityDetail';
import { Opportunities } from './pages/Opportunities';
import { NewOpportunity } from './pages/NewOpportunity';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { NewProject } from './pages/NewProject';
import { Events } from './pages/Events';
import { EventDetail } from './pages/EventDetail';
import { NewEvent } from './pages/NewEvent';
import { Messages } from './pages/Messages';
import { ProfilePage } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Mail, ArrowLeft } from 'lucide-react';
import { AppLogo } from './components/common/AppLogo';

function AppRouter() {
  const { activeRoute, navigate, isCreateSheetOpen, setIsCreateSheetOpen } = useApp();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isAskHelpOpen, setIsAskHelpOpen] = useState(false);

  // 1. Public Marketing Landing Page
  if (activeRoute === '/' || activeRoute === '/public') {
    return <PublicHome />;
  }

  // 2. Real Authentication Pages
  if (activeRoute === '/login') {
    return (
      <AuthCard
        heading="Welcome back"
        supportingText="Continue building what matters to you."
        onLogoClick={() => navigate('/')}
      >
        <LoginForm
          nextUrl="/home"
          onSuccess={(targetUrl) => navigate(targetUrl)}
          onNavigateToRegister={() => navigate('/register')}
          onNavigateToForgotPassword={() => navigate('/forgot-password')}
        />
      </AuthCard>
    );
  }

  if (activeRoute === '/register') {
    return (
      <AuthCard
        heading="Join with purpose"
        supportingText="Find people, opportunities, and projects that help you move forward."
        onLogoClick={() => navigate('/')}
      >
        <RegisterForm
          nextUrl="/home"
          onSuccess={() => navigate('/onboarding')}
          onNavigateToLogin={() => navigate('/login')}
          onNavigateToTerms={() => navigate('/terms')}
          onNavigateToPrivacy={() => navigate('/privacy')}
        />
      </AuthCard>
    );
  }

  if (activeRoute === '/forgot-password') {
    return (
      <AuthCard
        heading="Reset your password"
        supportingText="Enter your email address and we will send reset instructions if an account is available."
        onLogoClick={() => navigate('/login')}
      >
        <ForgotPasswordForm onNavigateToLogin={() => navigate('/login')} />
      </AuthCard>
    );
  }

  if (activeRoute === '/reset-password') {
    return (
      <AuthCard
        heading="Create a new password"
        supportingText="Choose a strong password you have not used elsewhere."
        onLogoClick={() => navigate('/login')}
      >
        <ResetPasswordForm
          onSuccessRedirect={(path) => navigate(path)}
          onNavigateToForgotPassword={() => navigate('/forgot-password')}
        />
      </AuthCard>
    );
  }

  if (activeRoute === '/check-email') {
    return (
      <div className="min-h-screen bg-[#F7F9FC] text-[#182230] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0] rounded-xl p-1"
          >
            <AppLogo size="lg" />
          </button>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-[#FFFFFF] py-8 px-6 sm:px-9 shadow-lg rounded-2xl border border-slate-200/80 text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#145DA0] flex items-center justify-center mx-auto border border-blue-100">
              <Mail className="w-7 h-7" aria-hidden="true" />
            </div>

            <h1 className="text-2xl font-extrabold text-[#182230] tracking-tight">
              Check your email
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              We sent instructions to continue setting up your ConnectPurpose account. Check your inbox to verify your credentials.
            </p>

            <div className="p-3.5 bg-[#F7F9FC] rounded-xl border border-slate-200/70 text-xs text-slate-500 text-left">
              <span className="font-semibold text-slate-700 block mb-0.5">
                Can&apos;t find the email?
              </span>
              Be sure to check your spam or junk folder. The link will remain active for 24 hours.
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="w-full py-3 px-4 bg-[#16A34A] hover:bg-[#13883d] active:scale-[0.99] text-white font-bold rounded-xl shadow-xs transition-all text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]"
              >
                Continue into ConnectPurpose →
              </button>

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full py-3 px-4 bg-[#145DA0] hover:bg-[#0f487e] active:scale-[0.99] text-white font-bold rounded-xl shadow-xs transition-all text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0]"
              >
                Back to login
              </button>

              <div>
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#145DA0] font-semibold hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Use a different email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Legal and Guidelines Pages
  if (activeRoute === '/terms') {
    return <LegalPage type="terms" />;
  }

  if (activeRoute === '/privacy') {
    return <LegalPage type="privacy" />;
  }

  if (activeRoute === '/guidelines') {
    return <LegalPage type="guidelines" />;
  }

  if (activeRoute === '/about') {
    return <LegalPage type="about" />;
  }

  // 4. Onboarding Flow
  if (activeRoute === '/onboarding') {
    return <Onboarding />;
  }

  // 5. Authenticated Platform Shell (Home, Communities, Opportunities, Projects, Events, Messages, Profile, Settings)
  const renderPlatformContent = () => {
    // Communities detail: /communities/:slug
    if (activeRoute.startsWith('/communities/')) {
      const slug = activeRoute.replace('/communities/', '').split('?')[0];
      return <CommunityDetail slug={slug} onOpenCreatePost={() => setIsCreatePostOpen(true)} />;
    }

    if (activeRoute === '/communities') {
      return <Communities />;
    }

    // Opportunities
    if (activeRoute === '/opportunities/new') {
      return <NewOpportunity />;
    }

    if (activeRoute.startsWith('/opportunities')) {
      return <Opportunities />;
    }

    // Projects
    if (activeRoute === '/projects/new') {
      return <NewProject />;
    }

    if (activeRoute.startsWith('/projects/')) {
      const id = activeRoute.replace('/projects/', '').split('?')[0];
      return <ProjectDetail id={id} />;
    }

    if (activeRoute === '/projects') {
      return <Projects />;
    }

    // Events
    if (activeRoute === '/events/new') {
      return <NewEvent />;
    }

    if (activeRoute.startsWith('/events/')) {
      const id = activeRoute.replace('/events/', '').split('?')[0];
      return <EventDetail id={id} />;
    }

    if (activeRoute === '/events') {
      return <Events />;
    }

    // Messages
    if (activeRoute === '/messages') {
      return <Messages />;
    }

    // Profile: /profile or /profile/:username
    if (activeRoute.startsWith('/profile')) {
      const username = activeRoute.replace('/profile/', '').replace('/profile', '').split('?')[0];
      return <ProfilePage username={username} />;
    }

    // Settings & Account
    if (activeRoute === '/settings' || activeRoute === '/account') {
      return <Settings />;
    }

    // Explore
    if (activeRoute.startsWith('/explore')) {
      return <Explore />;
    }

    // Saved filter view
    if (activeRoute === '/saved') {
      return (
        <HomeDashboard
          onOpenCreatePost={() => setIsCreatePostOpen(true)}
          onOpenAskHelp={() => setIsAskHelpOpen(true)}
        />
      );
    }

    // Default: Home Dashboard
    return (
      <HomeDashboard
        onOpenCreatePost={() => setIsCreatePostOpen(true)}
        onOpenAskHelp={() => setIsAskHelpOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#182230] flex flex-col pb-20 md:pb-6">
      {/* Top Application Header */}
      <AuthHeader />

      {/* Main Container with Sticky Sidebar and Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex gap-8">
        <DesktopSidebar />
        <main className="flex-1 min-w-0" role="main">
          {renderPlatformContent()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Center (+) Action Sheet */}
      <CreateActionSheet
        onOpenCreatePost={() => setIsCreatePostOpen(true)}
        onOpenAskHelp={() => setIsAskHelpOpen(true)}
      />

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />

      {/* Ask Help Modal */}
      <AskHelpModal
        isOpen={isAskHelpOpen}
        onClose={() => setIsAskHelpOpen(false)}
      />

      {/* Accessible Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
