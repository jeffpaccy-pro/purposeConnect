# ConnectPurpose MVP

> “Connect with people. Learn together. Build real opportunities.”

ConnectPurpose is a purpose-driven community web platform engineered to prioritize trusted relationships, skill development, collaborative project workspaces, study pods, and verified opportunities over infinite feeds, vanity metrics, and ad tracking.

---

## 1. Core Differentiators & Product Architecture

1. **Purpose-Driven Experience**:
   Every user defines their primary focus during onboarding:
   - Learn skills
   - Find opportunities
   - Build a project
   - Meet people
   - Sell locally
   - Support community

2. **Trust Instead of Popularity**:
   - Zero public follower counters.
   - Zero mindless "like" buttons.
   - Five meaningful, intent-focused peer reactions:
     - **Helpful** (constructive advice and support)
     - **I learned this** (knowledge and skill gained)
     - **Interested** (curiosity or follow-up)
     - **Trusted source** (verified expertise or credible insight)
     - **Needs checking** (fact-checking and constructive critique)

3. **Conversation-to-Action**:
   Conversations immediately branch into actionable tools:
   - **Help Requests**: Categorized peer questions with urgency tags (*Urgent*, *This week*, *No rush*).
   - **Collaborative Project Workspaces**: Shared task boards (*To Do*, *In Progress*, *Done*), milestone progress tracking, and co-builder invites.
   - **Study Pods & Events**: Online rooms and local workshops with real-time RSVP management (*Going*, *Interested*, *Decline*).
   - **Verified Opportunities**: Apprenticeships, mentorship cohorts, and collaboration briefs with required skill tags and remote status.

4. **Explainable Feed**:
   Every post in the user’s feed includes a **“Why am I seeing this?”** control that explains the exact signals:
   - Community membership
   - Matched skills and interests
   - Urgency or upcoming session schedule
   - Zero black-box virality algorithms.

5. **Privacy, Safety, & Data Ownership**:
   - Granular Direct Message controls (*Community members*, *Approved contacts only*, or *Nobody*).
   - Profile visibility (*Public*, *Community only*, *Private*).
   - User blocking and community-wide report submissions with reason tracking.
   - Complete personal data JSON export and downloadable full repository ZIP export.

---

## 2. Technology Stack

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 with custom brand tokens
- **Validation**: Zod schema validation across all creation forms
- **Icons**: Lucide React
- **Packaging & Export**: JSZip for live, client-side ZIP packaging of the entire codebase and SQL migrations
- **Database & Auth (Supabase Specification)**:
  - 24 normalized PostgreSQL tables
  - Row Level Security (RLS) policies for every table
  - Optimized B-tree indexes for fast queries
  - Seed migration script for instant onboarding verification

---

## 3. Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
\`\`\`bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
\`\`\`

The application dev server will launch at \`http://localhost:3000\`.

---

## 4. Supabase Setup & Migrations

ConnectPurpose includes complete, production-ready PostgreSQL SQL migrations and seed data in the \`supabase/\` directory:

1. **Create a Supabase Project**:
   Go to [supabase.com](https://supabase.com) and create a new project.

2. **Execute Schema Migration**:
   In your Supabase project dashboard, open the **SQL Editor**, and run the SQL found in:
   \`\`\`
   supabase/migrations/20260928000000_initial_schema.sql
   \`\`\`
   This provisions all 24 tables:
   - \`profiles\`, \`purposes\`, \`user_purposes\`, \`interests\`, \`user_interests\`
   - \`communities\`, \`community_members\`
   - \`posts\`, \`comments\`, \`reactions\`, \`saved_items\`
   - \`events\`, \`event_attendees\`
   - \`projects\`, \`project_members\`, \`tasks\`
   - \`opportunities\`
   - \`conversations\`, \`conversation_members\`, \`messages\`
   - \`notifications\`, \`reports\`, \`blocks\`, \`contributions\`
   along with all foreign key constraints, indexes, and Row Level Security policies.

3. **Execute Seed Data**:
   In the **SQL Editor**, run:
   \`\`\`
   supabase/seed.sql
   \`\`\`
   This populates demo communities (e.g. *Rwanda IT Learners*, *Web Builders*, *Kigali Creators*), demo users (*Aline*, *Eric*, *Chantal*, *David*, *Grace*), study events, collaborative projects, and verified opportunities.

4. **Configure Environment Variables**:
   Copy your API keys into \`.env\`:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Update \`VITE_SUPABASE_URL\` and \`VITE_SUPABASE_ANON_KEY\`.

---

## 5. Demo Accounts for Instant Evaluation

ConnectPurpose provides a built-in demo account switcher located in the user menu (top right of the authenticated header) and the login screen:

| Name | Username | Role / Specialty | Focus Area |
| :--- | :--- | :--- | :--- |
| **Aline Uwimana** | \`aline_u\` | Frontend Developer & Mentor | Study pods, CSS/React mentorship |
| **Eric Ndayishimiye** | \`eric_n\` | Student & IoT Learner | Open Agri-Sensor hardware, beginner web |
| **Chantal Mukamana** | \`chantal_m\` | UI/UX Product Designer | Accessible design systems, Figma workshops |
| **David Habimana** | \`david_h\` | Full-Stack Builder & Organizer | Open source infrastructure, community sprints |
| **Grace Uwase** | \`grace_u\` | Youth Coordinator | Health-tech internships, student opportunities |

---

## 6. Project File Structure

\`\`\`
.
├── .env.example                    # Environment variable template
├── README.md                       # Documentation & setup guide
├── index.html                      # HTML entry point with Plus Jakarta Sans & Cabinet Grotesk
├── metadata.json                   # Applet metadata
├── package.json                    # Project dependencies
├── supabase/
│   ├── migrations/
│   │   └── 20260928000000_initial_schema.sql  # 24 tables, indexes, RLS policies
│   └── seed.sql                    # Initial seed data for demo spaces and users
└── src/
    ├── App.tsx                     # Main application router and responsive shell
    ├── index.css                   # Tailwind CSS v4 design tokens and base styles
    ├── main.tsx                    # React DOM entry point
    ├── types/
    │   └── database.ts             # TypeScript models for all 24 entities
    ├── lib/
    │   ├── seed-data.ts            # High-fidelity realistic mock records
    │   ├── store.tsx               # Central reactive state, auth, and persistence engine
    │   ├── supabase.ts             # Supabase client wrapper & diagnostics
    │   └── zip-export.ts           # JSZip generator for 1-click codebase archive export
    ├── components/
    │   ├── common/
    │   │   ├── AppLogo.tsx         # Brand logo & mark
    │   │   ├── AuthHeader.tsx      # Desktop/mobile authenticated header with search & demo switcher
    │   │   ├── BlockUserDialog.tsx # Safety user block modal
    │   │   ├── CreateActionSheet.tsx # Bottom sheet / action launcher (+ button)
    │   │   ├── DesktopSidebar.tsx  # Responsive left navigation with community shortcuts
    │   │   ├── FeedPostCard.tsx    # Post card with meaningful reactions & explainable dialog
    │   │   ├── MeaningfulReactionBar.tsx # 5 intent-focused peer reactions
    │   │   ├── MobileBottomNav.tsx # Mobile navigation bar with center orange + button
    │   │   ├── NotificationDropdown.tsx # Real-time unread alerts & mark-all-read
    │   │   ├── PublicHeader.tsx    # Marketing top bar
    │   │   ├── ReportDialog.tsx    # Content & user reporting form
    │   │   ├── Toast.tsx           # Accessible notification toasts
    │   │   └── WhyThisPostDialog.tsx # Explainable feed transparency dialog
    │   ├── cards/
    │   │   ├── CommunityCard.tsx   # Community profile preview & join/leave action
    │   │   ├── EventCard.tsx       # Session card with RSVP buttons
    │   │   ├── OpportunityCard.tsx # Internship/mentorship card with save & apply
    │   │   └── ProjectCard.tsx     # Project card with milestone progress bar
    │   └── modals/
    │       ├── AskHelpModal.tsx    # Zod-validated help request creation modal
    │       ├── CreatePostModal.tsx # Zod-validated post publisher
    │       └── EditProfileModal.tsx# Profile details editor
    └── pages/
        ├── PublicHome.tsx          # Marketing homepage with 6 purpose cards & 4 benefit cards
        ├── Login.tsx               # Login with Google, email, and one-click demo accounts
        ├── Register.tsx            # Multi-requirement account registration
        ├── ForgotPassword.tsx      # Password reset link dispatcher
        ├── ResetPassword.tsx       # New password setter
        ├── LegalPage.tsx           # Privacy Policy, Terms, and Community Guidelines
        ├── Onboarding.tsx          # 6-step progress-tracked purpose calibration
        ├── HomeDashboard.tsx       # Purpose dashboard with "For you" feed & upcoming sessions
        ├── Explore.tsx             # Topic search, discovery, and member directory
        ├── Communities.tsx         # Directory of joined and public communities
        ├── CommunityDetail.tsx     # Community profile with Posts, Events, Projects, Members tabs
        ├── Opportunities.tsx       # Verified job/internship/mentorship filters
        ├── NewOpportunity.tsx      # Opportunity creation form
        ├── Projects.tsx            # Collaborative projects list
        ├── NewProject.tsx          # Project initialization form
        ├── ProjectDetail.tsx       # Workspace with interactive 3-column task board
        ├── Events.tsx              # Workshops and study sessions listing
        ├── NewEvent.tsx            # Session scheduler
        ├── EventDetail.tsx         # Workshop details with video room & RSVP controls
        ├── Messages.tsx            # Direct messaging with privacy enforcement
        ├── Profile.tsx             # Member profile with trust points & contributions
        └── Settings.tsx            # Privacy settings, feed priorities, and data export
\`\`\`

---

## 7. Checklist of Completed Features

- [x] **Full Purpose-Driven Architecture**: 6 primary purpose tracks and 12 interest tags.
- [x] **Public Landing & Marketing Experience**: Responsive hero, visual product mock card, 6 purpose cards, 3-step guide, and 4 benefit cards.
- [x] **Authentication Flow**: Login, Registration with password requirements, Forgot Password, Reset Password, Google authentication simulation, and 1-click demo switcher.
- [x] **6-Step Onboarding**: Progress-bar driven wizard for purposes, interests, custom tags, suggested communities, and privacy preferences.
- [x] **Desktop Sidebar & Mobile Bottom Navigation**: Responsive shell with sticky side navigation and center circular orange "+" button opening an action bottom sheet.
- [x] **Explainable "For you" Feed**: "Why am I seeing this?" modal on every post displaying clear, non-algorithmic reasons.
- [x] **Meaningful Reactions**: *Helpful*, *I learned this*, *Interested*, *Trusted source*, and *Needs checking* with live toggle state.
- [x] **Action Workspaces**:
  - Help Requests with urgency tags (*Urgent*, *This week*, *No rush*).
  - Collaborative Projects with interactive 3-column task boards (*To Do*, *In Progress*, *Done*).
  - Events with online video links and 3-state RSVP (*Going*, *Interested*, *Decline*).
  - Opportunities with category filters (*Internships*, *Mentorship*, *Collaboration*, *Jobs*).
- [x] **Direct Messaging**: Conversation list, message history, instant reply composer, and privacy gating.
- [x] **Trust & Contribution System**: Trust points, helpful responses count, and community member badges.
- [x] **Safety & Moderation**: Content report dialog, user blocking, and message privacy toggles.
- [x] **Data Ownership & ZIP Export**: Personal data JSON export + complete project repository ZIP download via JSZip.
- [x] **Supabase Migrations**: 24 tables with indexes, RLS policies, and comprehensive seed data in \`supabase/\`.

---

## 8. Intentionally Deferred Features (Post-MVP)

- Payment processing and escrow (keeping the MVP free and accessible).
- Audio/video live streaming (integrated external open rooms like Jitsi Meet for MVP).
- Proprietary proprietary vector ranking or opaque recommendation models (strictly explainable feed logic used).
- Cryptocurrency or token rewards (merit measured purely through transparent peer trust points).
