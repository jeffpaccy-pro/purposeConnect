/**
 * Supabase Client Integration & Configuration Helper
 * Provides standard environment configuration and connection validation.
 */

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  !SUPABASE_URL.includes('your-project') &&
  !SUPABASE_ANON_KEY.includes('your-anon-key')
);

// Helpful diagnostics for developer dashboard
export function getSupabaseStatus() {
  return {
    isConfigured: isSupabaseConfigured,
    url: SUPABASE_URL ? `${SUPABASE_URL.substring(0, 20)}...` : 'Not configured (using local live store)',
  };
}
