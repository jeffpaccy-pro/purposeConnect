import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  Community,
  Conversation,
  EventItem,
  Interest,
  NotificationItem,
  OpportunityItem,
  Post,
  Profile,
  ProjectItem,
  Purpose,
  ReactionType,
  RsvpStatus,
  TaskItem,
  TaskStatus,
} from '../types/database';
import {
  DEMO_COMMUNITIES,
  DEMO_CONVERSATIONS,
  DEMO_EVENTS,
  DEMO_NOTIFICATIONS,
  DEMO_OPPORTUNITIES,
  DEMO_POSTS,
  DEMO_PROFILES,
  DEMO_PROJECTS,
  INITIAL_INTERESTS,
  INITIAL_PURPOSES,
} from './seed-data';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  // Auth & Profile
  currentUser: Profile | null;
  allUsers: Profile[];
  loginAs: (usernameOrId: string) => void;
  loginWithEmail: (email: string, pass: string) => boolean;
  registerAccount: (fullName: string, email: string) => Profile;
  logout: () => void;
  updateCurrentUserProfile: (updates: Partial<Profile>) => void;
  completeOnboarding: (choices: {
    purposes: string[];
    interests: string[];
    joinedCommunities: string[];
    messagePrivacy: 'community' | 'approved_only' | 'nobody';
    feedPriority: 'learning' | 'opportunities' | 'communities' | 'events' | 'popular';
  }) => void;

  // Catalogs
  purposes: Purpose[];
  interests: Interest[];

  // Communities
  communities: Community[];
  joinCommunity: (communityId: string) => void;
  leaveCommunity: (communityId: string) => void;

  // Posts & Feed
  posts: Post[];
  createPost: (postData: {
    body: string;
    community_id?: string;
    post_type: Post['post_type'];
    urgency?: Post['urgency'];
    category?: string;
    skill_level?: string;
    tags?: string[];
  }) => Post;
  toggleReaction: (postId: string, reaction: ReactionType) => void;
  toggleSavePost: (postId: string) => void;
  addComment: (postId: string, body: string) => void;

  // Events
  events: EventItem[];
  createEvent: (eventData: Omit<EventItem, 'id' | 'creator_id' | 'created_at' | 'attendees_count' | 'user_rsvp'>) => EventItem;
  setRsvp: (eventId: string, status: RsvpStatus) => void;

  // Projects & Tasks
  projects: ProjectItem[];
  createProject: (projectData: Omit<ProjectItem, 'id' | 'creator_id' | 'created_at' | 'members_count' | 'is_member' | 'progress'>) => ProjectItem;
  toggleTaskStatus: (projectId: string, taskId: string, nextStatus: TaskStatus) => void;
  addTaskToProject: (projectId: string, title: string, dueDate?: string) => void;
  joinProject: (projectId: string) => void;

  // Opportunities
  opportunities: OpportunityItem[];
  createOpportunity: (oppData: Omit<OpportunityItem, 'id' | 'creator_id' | 'created_at' | 'status' | 'is_saved'>) => OpportunityItem;
  toggleSaveOpportunity: (oppId: string) => void;

  // Messages
  conversations: Conversation[];
  activeConversation: Conversation | null;
  setActiveConversation: (conv: Conversation | null) => void;
  sendMessage: (conversationId: string, text: string) => void;
  startOrOpenDirectMessage: (targetUser: Profile) => Conversation;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Safety & Moderation
  blockedUserIds: string[];
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
  submitReport: (targetType: string, targetId: string, reason: string, details?: string) => void;

  // Navigation & UI Helper
  activeRoute: string;
  navigate: (route: string) => void;
  isCreateSheetOpen: boolean;
  setIsCreateSheetOpen: (open: boolean) => void;

  // Toast feedback
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Current route state (simple client-side router matching requested URLs)
  const [activeRoute, setActiveRoute] = useState<string>(() => {
    return window.location.pathname && window.location.pathname !== '/'
      ? window.location.pathname
      : '/';
  });

  const navigate = (route: string) => {
    window.history.pushState({}, '', route);
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setActiveRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 2. Auth State
  const [allUsers, setAllUsers] = useState<Profile[]>(() => {
    const saved = localStorage.getItem('cp_users');
    return saved ? JSON.parse(saved) : DEMO_PROFILES;
  });

  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    return localStorage.getItem('cp_current_user_id') || 'u1'; // Defaults to Aline Uwimana
  });

  const currentUser = useMemo(() => {
    return allUsers.find((u) => u.id === currentUserId) || null;
  }, [allUsers, currentUserId]);

  const [blockedUserIds, setBlockedUserIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('cp_blocked');
    return saved ? JSON.parse(saved) : [];
  });

  // 3. Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 4. Communities
  const [communities, setCommunities] = useState<Community[]>(() => {
    const saved = localStorage.getItem('cp_communities');
    return saved ? JSON.parse(saved) : DEMO_COMMUNITIES;
  });

  // 5. Posts
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('cp_posts');
    return saved ? JSON.parse(saved) : DEMO_POSTS;
  });

  // 6. Events
  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('cp_events');
    return saved ? JSON.parse(saved) : DEMO_EVENTS;
  });

  // 7. Projects
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem('cp_projects');
    return saved ? JSON.parse(saved) : DEMO_PROJECTS;
  });

  // 8. Opportunities
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(() => {
    const saved = localStorage.getItem('cp_opportunities');
    return saved ? JSON.parse(saved) : DEMO_OPPORTUNITIES;
  });

  // 9. Conversations
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('cp_conversations');
    return saved ? JSON.parse(saved) : DEMO_CONVERSATIONS;
  });
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(DEMO_CONVERSATIONS[0]);

  // 10. Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('cp_notifications');
    return saved ? JSON.parse(saved) : DEMO_NOTIFICATIONS;
  });

  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);

  // Sync state to localStorage for real persistence
  useEffect(() => {
    localStorage.setItem('cp_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    if (currentUserId) localStorage.setItem('cp_current_user_id', currentUserId);
    else localStorage.removeItem('cp_current_user_id');
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem('cp_communities', JSON.stringify(communities));
  }, [communities]);

  useEffect(() => {
    localStorage.setItem('cp_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('cp_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('cp_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('cp_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem('cp_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('cp_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('cp_blocked', JSON.stringify(blockedUserIds));
  }, [blockedUserIds]);

  // Helpers
  const loginAs = (usernameOrId: string) => {
    const user = allUsers.find(
      (u) => u.username === usernameOrId || u.id === usernameOrId
    );
    if (user) {
      setCurrentUserId(user.id);
      addToast(`Switched account to ${user.full_name}`);
      if (!user.onboarding_completed) {
        navigate('/onboarding');
      } else {
        navigate('/home');
      }
    }
  };

  const loginWithEmail = (email: string) => {
    // If demo email or any email entered, authenticate smoothly
    const matched = allUsers.find((u) => u.username.toLowerCase() === email.split('@')[0].toLowerCase()) || allUsers[0];
    if (matched) {
      setCurrentUserId(matched.id);
      addToast(`Welcome back, ${matched.full_name}`);
      navigate('/home');
      return true;
    }
    return false;
  };

  const registerAccount = (fullName: string, email: string) => {
    const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '') || `user_${Date.now()}`;
    const newUser: Profile = {
      id: `u-${Date.now()}`,
      username,
      full_name: fullName,
      avatar_url: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80`,
      bio: 'New member ready to learn, share, and collaborate.',
      location: 'Kigali, Rwanda',
      onboarding_completed: false,
      message_privacy: 'community',
      profile_visibility: 'public',
      feed_priority: 'learning',
      selected_purposes: [],
      selected_interests: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      trust_points: 10,
      helpful_count: 0,
    };

    setAllUsers((prev) => [newUser, ...prev]);
    setCurrentUserId(newUser.id);
    addToast('Account created successfully! Let us personalize your experience.', 'success');
    navigate('/onboarding');
    return newUser;
  };

  const logout = () => {
    setCurrentUserId(null);
    addToast('Logged out of ConnectPurpose');
    navigate('/');
  };

  const updateCurrentUserProfile = (updates: Partial<Profile>) => {
    if (!currentUserId) return;
    setAllUsers((prev) =>
      prev.map((u) =>
        u.id === currentUserId
          ? { ...u, ...updates, updated_at: new Date().toISOString() }
          : u
      )
    );
    addToast('Profile updated successfully');
  };

  const completeOnboarding = (choices: {
    purposes: string[];
    interests: string[];
    joinedCommunities: string[];
    messagePrivacy: 'community' | 'approved_only' | 'nobody';
    feedPriority: 'learning' | 'opportunities' | 'communities' | 'events' | 'popular';
  }) => {
    if (!currentUserId) return;

    // Join communities
    setCommunities((prev) =>
      prev.map((c) =>
        choices.joinedCommunities.includes(c.id)
          ? { ...c, is_joined: true, member_count: (c.member_count || 0) + 1 }
          : c
      )
    );

    // Update user
    setAllUsers((prev) =>
      prev.map((u) =>
        u.id === currentUserId
          ? {
              ...u,
              onboarding_completed: true,
              selected_purposes: choices.purposes,
              selected_interests: choices.interests,
              message_privacy: choices.messagePrivacy,
              feed_priority: choices.feedPriority,
              updated_at: new Date().toISOString(),
            }
          : u
      )
    );

    addToast('Your purpose space is ready!', 'success');
    navigate('/home');
  };

  // Community methods
  const joinCommunity = (communityId: string) => {
    setCommunities((prev) =>
      prev.map((c) =>
        c.id === communityId
          ? { ...c, is_joined: true, member_count: (c.member_count || 0) + 1 }
          : c
      )
    );
    const comm = communities.find((c) => c.id === communityId);
    addToast(`You joined ${comm?.name || 'the community'}`);
  };

  const leaveCommunity = (communityId: string) => {
    setCommunities((prev) =>
      prev.map((c) =>
        c.id === communityId
          ? { ...c, is_joined: false, member_count: Math.max(0, (c.member_count || 1) - 1) }
          : c
      )
    );
    const comm = communities.find((c) => c.id === communityId);
    addToast(`Left ${comm?.name || 'the community'}`);
  };

  // Posts & Meaningful Reactions
  const createPost = (postData: {
    body: string;
    community_id?: string;
    post_type: Post['post_type'];
    urgency?: Post['urgency'];
    category?: string;
    skill_level?: string;
    tags?: string[];
  }) => {
    const comm = communities.find((c) => c.id === postData.community_id);
    const newPost: Post = {
      id: `post-${Date.now()}`,
      author_id: currentUserId || 'u1',
      community_id: postData.community_id,
      post_type: postData.post_type,
      body: postData.body,
      visibility: 'public',
      urgency: postData.urgency,
      category: postData.category || comm?.category || 'General',
      skill_level: postData.skill_level,
      tags: postData.tags || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      reactions: {
        helpful: 0,
        learned: 0,
        interested: 0,
        trusted: 0,
        needs_checking: 0,
      },
      user_reactions: [],
      comments_count: 0,
      is_saved: false,
      feed_reasons: [
        comm ? `You created this in ${comm.name}` : 'Shared directly to your network',
      ],
    };

    setPosts((prev) => [newPost, ...prev]);
    addToast('Post published successfully');
    return newPost;
  };

  const toggleReaction = (postId: string, reaction: ReactionType) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;

        const hasReacted = p.user_reactions.includes(reaction);
        const nextUserReactions = hasReacted
          ? p.user_reactions.filter((r) => r !== reaction)
          : [...p.user_reactions, reaction];

        const nextCount = Math.max(
          0,
          (p.reactions[reaction] || 0) + (hasReacted ? -1 : 1)
        );

        return {
          ...p,
          user_reactions: nextUserReactions,
          reactions: {
            ...p.reactions,
            [reaction]: nextCount,
          },
        };
      })
    );
  };

  const toggleSavePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const next = !p.is_saved;
        addToast(next ? 'Saved to your collection' : 'Removed from saved items');
        return { ...p, is_saved: next };
      })
    );
  };

  const addComment = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments_count: p.comments_count + 1 } : p
      )
    );
    addToast('Comment added');
  };

  // Events & RSVP
  const createEvent = (
    eventData: Omit<EventItem, 'id' | 'creator_id' | 'created_at' | 'attendees_count' | 'user_rsvp'>
  ) => {
    const newEvent: EventItem = {
      ...eventData,
      id: `e-${Date.now()}`,
      creator_id: currentUserId || 'u1',
      created_at: new Date().toISOString(),
      attendees_count: 1,
      user_rsvp: 'going',
    };
    setEvents((prev) => [newEvent, ...prev]);
    addToast('Event created successfully');
    return newEvent;
  };

  const setRsvp = (eventId: string, status: RsvpStatus) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id !== eventId) return e;
        const hadAttended = e.user_rsvp === 'going';
        const nowAttending = status === 'going';
        const attendees_count = e.attendees_count + (nowAttending && !hadAttended ? 1 : !nowAttending && hadAttended ? -1 : 0);
        return {
          ...e,
          user_rsvp: status,
          attendees_count: Math.max(1, attendees_count),
        };
      })
    );
    addToast(`RSVP updated: ${status === 'going' ? 'Going' : status === 'interested' ? 'Interested' : 'Cannot attend'}`);
  };

  // Projects & Tasks
  const createProject = (
    projectData: Omit<ProjectItem, 'id' | 'creator_id' | 'created_at' | 'members_count' | 'is_member' | 'progress'>
  ) => {
    const newProj: ProjectItem = {
      ...projectData,
      id: `proj-${Date.now()}`,
      creator_id: currentUserId || 'u1',
      created_at: new Date().toISOString(),
      members_count: 1,
      is_member: true,
      progress: 0,
      tasks: [],
    };
    setProjects((prev) => [newProj, ...prev]);
    addToast('Project workspace initialized');
    return newProj;
  };

  const toggleTaskStatus = (projectId: string, taskId: string, nextStatus: TaskStatus) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId || !proj.tasks) return proj;
        const updatedTasks = proj.tasks.map((t) =>
          t.id === taskId ? { ...t, status: nextStatus } : t
        );
        const doneCount = updatedTasks.filter((t) => t.status === 'done').length;
        const progress = Math.round((doneCount / updatedTasks.length) * 100);
        return { ...proj, tasks: updatedTasks, progress };
      })
    );
  };

  const addTaskToProject = (projectId: string, title: string, dueDate?: string) => {
    const newTask: TaskItem = {
      id: `t-${Date.now()}`,
      project_id: projectId,
      title,
      status: 'todo',
      due_date: dueDate || new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    };

    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const updatedTasks = [...(proj.tasks || []), newTask];
        const doneCount = updatedTasks.filter((t) => t.status === 'done').length;
        const progress = Math.round((doneCount / updatedTasks.length) * 100);
        return { ...proj, tasks: updatedTasks, progress };
      })
    );
    addToast('Task added to project');
  };

  const joinProject = (projectId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const next = !proj.is_member;
        addToast(next ? 'Joined project team' : 'Left project');
        return {
          ...proj,
          is_member: next,
          members_count: proj.members_count + (next ? 1 : -1),
        };
      })
    );
  };

  // Opportunities
  const createOpportunity = (
    oppData: Omit<OpportunityItem, 'id' | 'creator_id' | 'created_at' | 'status' | 'is_saved'>
  ) => {
    const newOpp: OpportunityItem = {
      ...oppData,
      id: `opp-${Date.now()}`,
      creator_id: currentUserId || 'u1',
      created_at: new Date().toISOString(),
      status: 'open',
      is_saved: false,
    };
    setOpportunities((prev) => [newOpp, ...prev]);
    addToast('Opportunity shared with the community');
    return newOpp;
  };

  const toggleSaveOpportunity = (oppId: string) => {
    setOpportunities((prev) =>
      prev.map((o) => {
        if (o.id !== oppId) return o;
        const next = !o.is_saved;
        addToast(next ? 'Opportunity saved' : 'Removed from saved opportunities');
        return { ...o, is_saved: next };
      })
    );
  };

  // Messages
  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg = {
      id: `m-${Date.now()}`,
      conversation_id: conversationId,
      sender_id: currentUserId || 'u1',
      body: text.trim(),
      created_at: new Date().toISOString(),
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              last_message: newMsg,
            }
          : c
      )
    );
  };

  const startOrOpenDirectMessage = (targetUser: Profile): Conversation => {
    // Check if target allows messages
    if (targetUser.message_privacy === 'nobody') {
      addToast(`${targetUser.full_name} does not accept direct messages at this time.`, 'error');
    }

    const existing = conversations.find(
      (c) => c.other_user?.id === targetUser.id
    );
    if (existing) {
      setActiveConversation(existing);
      navigate('/messages');
      return existing;
    }

    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      conversation_type: 'direct',
      created_at: new Date().toISOString(),
      other_user: targetUser,
      unread_count: 0,
    };

    setConversations((prev) => [newConv, ...prev]);
    setActiveConversation(newConv);
    navigate('/messages');
    return newConv;
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    addToast('All notifications marked as read');
  };

  // Safety & Moderation
  const blockUser = (userId: string) => {
    setBlockedUserIds((prev) => [...prev, userId]);
    addToast('User blocked. Their posts will no longer appear in your feed.', 'info');
  };

  const unblockUser = (userId: string) => {
    setBlockedUserIds((prev) => prev.filter((id) => id !== userId));
    addToast('User unblocked', 'info');
  };

  const submitReport = (_targetType: string, _targetId: string, reason: string, details?: string) => {
    // Audit log
    console.info('Report submitted:', { _targetType, _targetId, reason, details });
    addToast('Thank you for keeping ConnectPurpose safe. Our moderators will review this report within 24 hours.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers,
        loginAs,
        loginWithEmail,
        registerAccount,
        logout,
        updateCurrentUserProfile,
        completeOnboarding,

        purposes: INITIAL_PURPOSES,
        interests: INITIAL_INTERESTS,

        communities,
        joinCommunity,
        leaveCommunity,

        posts,
        createPost,
        toggleReaction,
        toggleSavePost,
        addComment,

        events,
        createEvent,
        setRsvp,

        projects,
        createProject,
        toggleTaskStatus,
        addTaskToProject,
        joinProject,

        opportunities,
        createOpportunity,
        toggleSaveOpportunity,

        conversations,
        activeConversation,
        setActiveConversation,
        sendMessage,
        startOrOpenDirectMessage,

        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,

        blockedUserIds,
        blockUser,
        unblockUser,
        submitReport,

        activeRoute,
        navigate,
        isCreateSheetOpen,
        setIsCreateSheetOpen,

        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
