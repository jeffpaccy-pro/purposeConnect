# ConnectPurpose — Authentication Module

> Authentic, secure, and accessible authentication for ConnectPurpose: “Connect with people. Learn together. Build real opportunities.”

This repository implements the focused authentication module for **ConnectPurpose**, utilizing Next.js (App Router), TypeScript, Tailwind CSS, React Hook Form, Zod validation, and Supabase Auth with `@supabase/ssr` cookie-based session handling.

---

## 1. Project Purpose

ConnectPurpose is a purpose-driven community web platform engineered around authentic relationships, peer study groups, and verified opportunities. The authentication module is designed with strict security first principles:
- **No Account Enumeration**: Generic error responses prevent attackers from discovering registered emails during login, registration, or password reset.
- **Strong Password Policy**: 12+ characters with uppercase, lowercase, and numeric enforcement validated client- and server-side.
- **Open Redirect Protection**: Strict internal path sanitization on all `next` URL parameters.
- **Accessible UI**: Semantic labels, visible focus rings, `aria-live` alert regions, and clear inline validation.
- **Cookie-Based SSR Security**: Secure session verification and middleware route protection.

---

## 2. Tech Stack & Dependencies

- **Node.js**: v18.18+ or v20+ recommended
- **Framework**: Next.js 14/15 (App Router) & React 19
- **Authentication**: Supabase Auth (`@supabase/supabase-js`, `@supabase/ssr`)
- **Validation**: Zod + `@hookform/resolvers` + React Hook Form
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom design tokens

---

## 3. File Structure

```
├── app/
│   ├── layout.tsx                     # Root App Router layout
│   ├── globals.css                    # Base styling & brand variables
│   ├── page.tsx                       # Root route (redirects to /login)
│   ├── login/page.tsx                 # /login route
│   ├── register/page.tsx              # /register route
│   ├── check-email/page.tsx           # /check-email post-signup instructions
│   ├── forgot-password/page.tsx       # /forgot-password reset request
│   ├── reset-password/page.tsx        # /reset-password password update
│   ├── home/page.tsx                  # Protected /home dashboard
│   ├── account/page.tsx               # Protected /account settings
│   ├── auth/callback/route.ts         # Route handler exchanging OAuth/email codes
│   ├── privacy/page.tsx               # Privacy policy
│   └── terms/page.tsx                 # Terms of use
├── components/
│   ├── app-logo.tsx                   # “◉ ConnectPurpose” wordmark & symbol
│   └── auth/
│       ├── auth-card.tsx              # Centered white card on #F7F9FC canvas
│       ├── auth-error-alert.tsx       # Accessible aria-live alert container
│       ├── forgot-password-form.tsx   # Zod-validated password recovery form
│       ├── login-form.tsx             # Zod-validated login with remember-me
│       ├── password-field.tsx         # Input with show/hide toggle & requirements
│       ├── register-form.tsx          # Zod-validated registration with terms
│       ├── reset-password-form.tsx    # Password update with recovery verification
│       └── social-auth-buttons.tsx    # Google and Facebook OAuth buttons
├── lib/
│   ├── supabase/
│   │   ├── client.ts                  # Browser Supabase client (@supabase/ssr)
│   │   ├── server.ts                  # Server Component Supabase client
│   │   └── middleware.ts              # Session refreshing & route protection
│   ├── utils/
│   │   └── safe-next.ts               # Open redirect prevention utility
│   └── validations/
│       └── auth.ts                    # Zod schemas for all authentication forms
├── middleware.ts                      # Edge middleware protecting /home & /account
├── supabase/
│   └── migrations/
│       └── 001_auth_profiles.sql      # public.profiles table, RLS, and trigger
├── .env.example                       # Environment variables template
└── README.md                          # Architecture & setup guide
```

---

## 4. Setup & Installation

### Step 1: Clone & Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Populate the keys with your Supabase project credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **CRITICAL SECURITY NOTE:**
> Never expose `SUPABASE_SERVICE_ROLE_KEY`, database passwords, or JWT secrets to client bundles or public repositories. Only the `NEXT_PUBLIC_SUPABASE_ANON_KEY` is meant for client communication.

### Step 3: Run the Database Migration
1. Go to your Supabase project dashboard at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** from the left navigation bar.
3. Open `supabase/migrations/001_auth_profiles.sql` and run the script.
4. This script automatically:
   - Provisions `public.profiles` with Row Level Security enabled.
   - Attaches the `on_auth_user_created` trigger to `auth.users` to automatically sync full names into `public.profiles`.
   - Restricts initial profile read/write access strictly to the authenticated user (`auth.uid() = id`).

### Step 4: Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Supabase Authentication Configuration

### Email Confirmation Setup
1. In the Supabase dashboard, navigate to **Authentication → URL Configuration**.
2. Set **Site URL** to:
   - Local: `http://localhost:3000`
   - Production: `https://your-production-domain.com`
3. In **Redirect URLs**, add:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/reset-password`
   - `https://your-production-domain.com/auth/callback`
   - `https://your-production-domain.com/reset-password`
4. Under **Authentication → Providers → Email**, ensure Email signup is enabled.

### Google OAuth Setup
1. Create a project in the [Google Cloud Console](https://console.cloud.google.com).
2. Navigate to **APIs & Services → Credentials**.
3. Create an **OAuth 2.0 Client ID** (Web Application).
4. Add to **Authorized redirect URIs**:
   `https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback`
5. In Supabase, navigate to **Authentication → Providers → Google**, toggle **Enable Google provider**, and paste your **Client ID** and **Client Secret**.

### Facebook OAuth Setup
1. Create an app in [Meta for Developers](https://developers.facebook.com).
2. Under **Facebook Login → Settings**, set **Valid OAuth Redirect URIs** to:
   `https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback`
3. In Supabase, navigate to **Authentication → Providers → Facebook**, toggle **Enable Facebook provider**, and paste your **App ID** and **App Secret**.

---

## 6. Route & Protection Matrix

| Route | Access | Behavior |
| :--- | :--- | :--- |
| `/login` | Public | Email/password login, Google/Facebook OAuth, redirect to `/home` on success. Redirects to `/home` if already authenticated. |
| `/register` | Public | Full name, email, strong password with checklist, terms agreement. Redirects to `/check-email`. |
| `/check-email` | Public | Friendly post-registration guidance with spam folder reminders. |
| `/forgot-password` | Public | Email input for password reset link. Anti-enumeration generic confirmation. |
| `/reset-password` | Recovery | Secure password update using session recovery tokens. |
| `/auth/callback` | Public | Server Route Handler that exchanges authorization codes for sessions. |
| `/home` | **Protected** | Accessible only to authenticated users. Displays user welcome card, account link, and logout button. |
| `/account` | **Protected** | Accessible only to authenticated users. Shows email, auth provider details, password change button, and logout button. |
| `/terms` & `/privacy` | Public | Static legal disclosures. |

---

## 7. Security Pre-Launch Checklist

- [x] **No Account Enumeration**: Authentication failure messages, registration responses, and password reset requests use generic copy to prevent attackers from querying whether an email exists.
- [x] **12+ Character Passwords**: Mandatory multi-character class requirement (uppercase, lowercase, number, 12+ length) stops common dictionary and brute-force attacks.
- [x] **Open Redirect Defense**: All incoming `next` parameters are strictly sanitized through `lib/utils/safe-next.ts` to ensure only relative internal paths (starting with `/`) are honored.
- [x] **Cookie-Based SSR Middleware**: Sessions are evaluated server-side using `@supabase/ssr` to prevent client-side token spoofing.
- [x] **Autocomplete Hygiene**: Fields specify `name`, `email`, `current-password`, and `new-password` for password manager compatibility without compromising security.
- [x] **No Plaintext Secrets**: No API keys or secrets are logged or exposed to the client.

---

## 8. Deployment to Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, click **Add New Project** and import the repository.
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.vercel.app`)
4. Click **Deploy**.
5. Once deployed, update your **Redirect URLs** in your Supabase project dashboard to include `https://your-domain.vercel.app/auth/callback` and `https://your-domain.vercel.app/reset-password`.

---

## 9. Future Security Enhancements (Post-MVP)

- **Multi-Factor Authentication (MFA / TOTP)**: Integrating Supabase Auth MFA (`supabase.auth.mfa.enroll()`) for authenticator apps.
- **Passkeys & WebAuthn**: Implementing FIDO2 hardware biometric logins.
- **Bot Protection & Rate Limiting**: Adding Cloudflare Turnstile or Supabase Captcha on `/login` and `/register` endpoints.
- **Active Session & Device Management**: Allowing users to audit and revoke active browser sessions across different devices.
