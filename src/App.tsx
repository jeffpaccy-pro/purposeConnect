import React, { useState } from 'react';
import { AppProvider, useApp } from './lib/store';
import { ToastContainer } from './components/common/Toast';
import { AuthHeader } from './components/common/AuthHeader';
import { DesktopSidebar } from './components/common/DesktopSidebar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { CreateActionSheet } from './components/common/CreateActionSheet';
import { CreatePostModal } from './components/modals/CreatePostModal';
import { AskHelpModal } from './components/modals/AskHelpModal';

// Public pages
import { PublicHome } from './pages/PublicHome';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { LegalPage } from './pages/LegalPage';
import { Onboarding } from './pages/Onboarding';

// Authenticated pages
import { HomeDashboard } from './pages/HomeDashboard';
import { Explore } from './pages/Explore';
import { Communities } from './pages/Communities';
import { CommunityDetail } from './pages/CommunityDetail';
import { Opportunities } from './pages/Opportunities';
import { NewOpportunity } from './pages/NewOpportunity';
import { Projects } from './pages/Projects';
import { NewProject } from './pages/NewProject';
import { ProjectDetail } from './pages/ProjectDetail';
import { Events } from './pages/Events';
import { NewEvent } from './pages/NewEvent';
import { EventDetail } from './pages/EventDetail';
import { Messages } from './pages/Messages';
import { ProfilePage } from './pages/Profile';
import { Settings } from './pages/Settings';

const MainRouter: React.FC = () => {
  const { activeRoute, currentUser } = useApp();

  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isAskHelpOpen, setIsAskHelpOpen] = useState(false);

  // 1. Standalone Public Routes
  if (activeRoute === '/') {
    return <PublicHome />;
  }
  if (activeRoute === '/login') {
    return <Login />;
  }
  if (activeRoute === '/register') {
    return <Register />;
  }
  if (activeRoute === '/forgot-password') {
    return <ForgotPassword />;
  }
  if (activeRoute === '/reset-password') {
    return <ResetPassword />;
  }
  if (activeRoute === '/privacy') {
    return <LegalPage type="privacy" />;
  }
  if (activeRoute === '/terms') {
    return <LegalPage type="terms" />;
  }
  if (activeRoute === '/guidelines') {
    return <LegalPage type="guidelines" />;
  }
  if (activeRoute === '/about') {
    return <LegalPage type="about" />;
  }

  // 2. Onboarding Route
  if (activeRoute === '/onboarding') {
    return <Onboarding />;
  }

  // 3. Protected Routes Authentication Check
  if (!currentUser) {
    return <Login />;
  }

  // If user hasn't completed onboarding, prompt them
  if (!currentUser.onboarding_completed && activeRoute !== '/onboarding') {
    return <Onboarding />;
  }

  // 4. Resolve Authenticated View
  const renderAuthenticatedPage = () => {
    // Communities detail route: /communities/:slug
    if (activeRoute.startsWith('/communities/')) {
      const slug = activeRoute.replace('/communities/', '').split('?')[0];
      return (
        <CommunityDetail
          slug={slug}
          onOpenCreatePost={() => setIsCreatePostOpen(true)}
        />
      );
    }

    // Projects detail route: /projects/:id
    if (activeRoute.startsWith('/projects/') && activeRoute !== '/projects/new') {
      const id = activeRoute.replace('/projects/', '').split('?')[0];
      return <ProjectDetail id={id} />;
    }

    // Events detail route: /events/:id
    if (activeRoute.startsWith('/events/') && activeRoute !== '/events/new') {
      const id = activeRoute.replace('/events/', '').split('?')[0];
      return <EventDetail id={id} />;
    }

    // Profile route: /profile/:username
    if (activeRoute.startsWith('/profile/')) {
      const username = activeRoute.replace('/profile/', '').split('?')[0];
      return <ProfilePage username={username} />;
    }

    switch (activeRoute) {
      case '/explore':
        return <Explore />;
      case '/communities':
        return <Communities />;
      case '/opportunities':
        return <Opportunities />;
      case '/opportunities/new':
        return <NewOpportunity />;
      case '/projects':
        return <Projects />;
      case '/projects/new':
        return <NewProject />;
      case '/events':
        return <Events />;
      case '/events/new':
        return <NewEvent />;
      case '/messages':
        return <Messages />;
      case '/settings':
        return <Settings />;
      case '/home':
      default:
        return (
          <HomeDashboard
            onOpenCreatePost={() => setIsCreatePostOpen(true)}
            onOpenAskHelp={() => setIsAskHelpOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#182230] flex flex-col antialiased selection:bg-[#145DA0]/15 selection:text-[#145DA0]">
      <AuthHeader />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-start gap-8">
        <DesktopSidebar />
        <main className="flex-1 w-full py-6 pb-24 md:pb-12 min-w-0">
          {renderAuthenticatedPage()}
        </main>
      </div>

      <MobileBottomNav />

      {/* Global Modals */}
      <CreateActionSheet
        onOpenCreatePost={() => setIsCreatePostOpen(true)}
        onOpenAskHelp={() => setIsAskHelpOpen(true)}
      />
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />
      <AskHelpModal
        isOpen={isAskHelpOpen}
        onClose={() => setIsAskHelpOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
      <ToastContainer />
    </AppProvider>
  );
}
