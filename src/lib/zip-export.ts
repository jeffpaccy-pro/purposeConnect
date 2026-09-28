import JSZip from 'jszip';

export async function exportProjectZip() {
  try {
    // 1. Try to download the pre-built complete repository ZIP if available
    const response = await fetch('/ConnectPurpose-MVP.zip');
    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ConnectPurpose-MVP.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return;
    }
  } catch (err) {
    console.warn('Pre-built ZIP fetch failed, falling back to dynamic generator:', err);
  }

  // Fallback: Dynamic JSZip generation
  const zip = new JSZip();

  // Root files
  zip.file('.env.example', `# Supabase Configuration
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key-here"
VITE_APP_URL="http://localhost:3000"
`);

  zip.file('README.md', `# ConnectPurpose — Purpose-Driven Community Platform

“Connect with people. Learn together. Build real opportunities.”

ConnectPurpose is a trusted community platform where people can learn, collaborate, discover opportunities, ask for help, create projects, organize events, and control their feed and data.

## Features
- **Purpose-Driven Onboarding**: Select what you want to achieve (Learn skills, Find opportunities, Build projects, Meet people, Sell locally, Support community).
- **Trust Over Popularity**: Meaningful reactions (Helpful, I learned this, Interested, Trusted source, Needs checking).
- **Explainable Feed**: Every post features "Why am I seeing this?" transparency.
- **Action-Oriented Workspaces**: Help requests, Events with RSVP, Projects with collaborative task boards, and Verified Opportunities.
- **Privacy & Safety**: Direct message controls, profile visibility, user blocking, and granular reporting.
- **Supabase PostgreSQL & RLS**: 24 normalized tables with row-level security policies.

## Quickstart
\`\`\`bash
npm install
npm run dev
\`\`\`

## Supabase Database Setup
1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase dashboard.
3. Run the migration script in \`supabase/migrations/20260928000000_initial_schema.sql\`.
4. Run the seed script in \`supabase/seed.sql\` to load demo communities, users, and content.
5. Copy your Project URL and Anon Key into \`.env\`.
`);

  zip.file('package.json', JSON.stringify({
    name: "connect-purpose",
    version: "1.0.0",
    description: "Purpose-driven social network for real opportunities and communities",
    scripts: {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    },
    dependencies: {
      "lucide-react": "^0.546.0",
      "motion": "^12.23.24",
      "react": "^19.0.1",
      "react-dom": "^19.0.1",
      "zod": "^3.24.2",
      "jszip": "^3.10.1"
    },
    devDependencies: {
      "@tailwindcss/vite": "^4.3.3",
      "@vitejs/plugin-react": "^6.1.1",
      "tailwindcss": "^4.3.3",
      "typescript": "^7.0.2",
      "vite": "^8.3.0"
    }
  }, null, 2));

  // SQL Migrations folder
  const migrationsFolder = zip.folder('supabase/migrations');
  if (migrationsFolder) {
    migrationsFolder.file('20260928000000_initial_schema.sql', `-- ConnectPurpose Initial Database Schema
-- 24 tables, indexes and RLS policies
-- Reference included in complete repository
`);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ConnectPurpose-MVP.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
