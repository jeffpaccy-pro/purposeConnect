/**
 * ConnectPurpose Database & Application Types
 * Comprehensive TypeScript models for all 24 entities, enums, and UI contracts.
 */

export type PurposeSlug =
  | 'learn-skills'
  | 'find-opportunities'
  | 'build-project'
  | 'meet-people'
  | 'sell-locally'
  | 'support-community';

export type ReactionType =
  | 'helpful'
  | 'learned'
  | 'interested'
  | 'trusted'
  | 'needs_checking';

export type PostType = 'standard' | 'help_request' | 'update' | 'resource';
export type UrgencyLevel = 'no_rush' | 'this_week' | 'urgent';
export type VisibilityLevel = 'public' | 'community_only' | 'private';
export type OpportunityType =
  | 'job'
  | 'internship'
  | 'mentorship'
  | 'collaboration'
  | 'service'
  | 'volunteer';
export type ProjectStatus = 'planning' | 'active' | 'completed';
export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type EventMode = 'online' | 'in_person';
export type RsvpStatus = 'going' | 'interested' | 'cannot_attend';
export type CommunityRole = 'member' | 'moderator' | 'admin';
export type ProjectRole = 'owner' | 'collaborator' | 'viewer';
export type MessagePrivacy = 'community' | 'approved_only' | 'nobody';
export type ProfileVisibility = 'public' | 'community_only' | 'private';

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  website?: string;
  onboarding_completed: boolean;
  message_privacy: MessagePrivacy;
  profile_visibility: ProfileVisibility;
  feed_priority?: 'learning' | 'opportunities' | 'communities' | 'events' | 'popular';
  selected_purposes?: string[];
  selected_interests?: string[];
  created_at: string;
  updated_at: string;
  // Trust metric / helpful count calculated
  trust_points?: number;
  helpful_count?: number;
}

export interface Purpose {
  id: string;
  name: string;
  slug: PurposeSlug;
  description: string;
  icon: string;
}

export interface Interest {
  id: string;
  name: string;
  slug: string;
}

export interface Community {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  location?: string;
  cover_image_url?: string;
  created_by?: string;
  visibility: VisibilityLevel;
  rules?: string;
  created_at: string;
  member_count?: number;
  is_joined?: boolean;
}

export interface CommunityMember {
  community_id: string;
  user_id: string;
  role: CommunityRole;
  joined_at: string;
}

export interface Post {
  id: string;
  author_id: string;
  author?: Profile;
  community_id?: string;
  community?: Community;
  post_type: PostType;
  body: string;
  image_url?: string;
  visibility: VisibilityLevel;
  urgency?: UrgencyLevel;
  category?: string;
  skill_level?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  reactions: Record<ReactionType, number>;
  user_reactions: ReactionType[];
  comments_count: number;
  is_saved?: boolean;
  // Explainable Feed metadata
  feed_reasons?: string[];
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  author?: Profile;
  body: string;
  parent_comment_id?: string;
  created_at: string;
}

export interface SavedItem {
  id: string;
  user_id: string;
  item_type: 'post' | 'event' | 'project' | 'opportunity';
  item_id: string;
  created_at: string;
}

export interface EventItem {
  id: string;
  creator_id: string;
  creator?: Profile;
  community_id?: string;
  community?: Community;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  event_mode: EventMode;
  location?: string;
  meeting_url?: string;
  capacity?: number;
  visibility: VisibilityLevel;
  created_at: string;
  attendees_count: number;
  user_rsvp?: RsvpStatus;
}

export interface ProjectItem {
  id: string;
  creator_id: string;
  creator?: Profile;
  community_id?: string;
  community?: Community;
  title: string;
  goal: string;
  description: string;
  status: ProjectStatus;
  start_date?: string;
  target_date?: string;
  visibility: VisibilityLevel;
  required_skills?: string[];
  created_at: string;
  members_count: number;
  is_member?: boolean;
  tasks?: TaskItem[];
  progress?: number;
}

export interface TaskItem {
  id: string;
  project_id: string;
  assignee_id?: string;
  assignee?: Profile;
  title: string;
  description?: string;
  status: TaskStatus;
  due_date?: string;
  created_at: string;
}

export interface OpportunityItem {
  id: string;
  creator_id: string;
  creator?: Profile;
  community_id?: string;
  community?: Community;
  title: string;
  opportunity_type: OpportunityType;
  description: string;
  required_skills: string[];
  location?: string;
  is_remote: boolean;
  deadline?: string;
  contact_preference: 'platform' | 'email' | 'external_link';
  contact_info?: string;
  status: 'open' | 'closed';
  created_at: string;
  is_saved?: boolean;
}

export interface Conversation {
  id: string;
  conversation_type: 'direct' | 'group';
  created_at: string;
  other_user?: Profile;
  last_message?: MessageItem;
  unread_count?: number;
}

export interface MessageItem {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  created_at: string;
  edited_at?: string;
  sender?: Profile;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  actor_id?: string;
  actor?: Profile;
  notification_type: 'reaction' | 'comment' | 'rsvp' | 'invite' | 'opportunity' | 'help_response';
  entity_type: 'post' | 'event' | 'project' | 'opportunity' | 'message';
  entity_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ReportItem {
  id: string;
  reporter_id: string;
  target_type: 'post' | 'comment' | 'user' | 'community' | 'project';
  target_id: string;
  reason: string;
  details?: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  created_at: string;
}

export interface BlockItem {
  blocker_id: string;
  blocked_id: string;
  created_at: string;
}

export interface Contribution {
  id: string;
  user_id: string;
  contribution_type: 'answered_help' | 'hosted_session' | 'shared_resource' | 'founded_project';
  reference_type?: string;
  reference_id?: string;
  points: number;
  created_at: string;
}
