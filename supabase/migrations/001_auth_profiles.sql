-- ==============================================================================
-- Migration: 001_auth_profiles.sql
-- Description: Sets up the public.profiles table and an automated trigger to sync
--              new auth.users registrations into public.profiles with Row Level Security.
-- ==============================================================================

-- 1. Create public.profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    username TEXT UNIQUE,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for username lookups
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);

-- 2. Trigger Function: automatically create a profile entry when auth.users is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    derived_username TEXT;
BEGIN
    -- Extract full_name from auth user metadata if provided
    -- Create a sensible default username from email prefix if not supplied
    derived_username := LOWER(SPLIT_PART(NEW.email, '@', 1));

    INSERT INTO public.profiles (id, full_name, username, avatar_url, created_at, updated_at)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        -- If username conflicts, append short random substring or fallback
        derived_username || '_' || SUBSTRING(NEW.id::text, 1, 4),
        NEW.raw_user_meta_data->>'avatar_url',
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO NOTHING;

    RETURN NEW;
END;
$$;

-- 3. Trigger on auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. Strict RLS Policies (Initial Phase)
-- Policy: Authenticated users can view only their own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

-- Policy: Users can update only their own profile
CREATE POLICY "Users can update own profile"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- ==============================================================================
-- NOTE ON PUBLIC PROFILE VIEWING (FUTURE EXTENSION):
-- When you later build public directories or community boards, you can add:
--
-- CREATE POLICY "Public profiles are readable by authenticated members"
--     ON public.profiles
--     FOR SELECT
--     TO authenticated
--     USING (true);
--
-- Ensure sensitive fields (like private email, internal roles, or phone numbers)
-- remain stored separately or protected with security-definer views or column-level
-- restrictions so users never inadvertently expose sensitive personal identifiers.
-- ==============================================================================
