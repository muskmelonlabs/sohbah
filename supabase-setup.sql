-- ============================================================
-- SOHBAH - Supabase Setup Script
-- Run this ONCE in your Supabase SQL Editor:
-- https://supabase.com/dashboard → your project → SQL Editor
-- ============================================================

-- ============================================================
-- 1. CREATE MENTORS TABLE
--    id = auth.user.id (UUID) — linked to Supabase Auth
-- ============================================================
CREATE TABLE IF NOT EXISTS public.mentors (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    title TEXT DEFAULT '',
    bio TEXT DEFAULT '',
    avatar_url TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. ADD STATUS + MENTOR_UUID COLUMNS TO BOOKINGS TABLE
--    mentor_uuid links to real mentor's Supabase auth user id
--    mentor_id (int) is kept for backward compatibility
-- ============================================================
ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS mentor_uuid UUID;

ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- ============================================================
-- 3. ROW LEVEL SECURITY FOR BOOKINGS
-- ============================================================
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "bookings_insert_policy" ON public.bookings;
CREATE POLICY "bookings_insert_policy"
    ON public.bookings FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "bookings_select_policy" ON public.bookings;
CREATE POLICY "bookings_select_policy"
    ON public.bookings FOR SELECT
    USING (true);

-- ============================================================
-- 4. ROW LEVEL SECURITY FOR MENTORS
-- ============================================================
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "mentors_insert_policy" ON public.mentors;
CREATE POLICY "mentors_insert_policy"
    ON public.mentors FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "mentors_select_policy" ON public.mentors;
CREATE POLICY "mentors_select_policy"
    ON public.mentors FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "mentors_upsert_policy" ON public.mentors;
CREATE POLICY "mentors_upsert_policy"
    ON public.mentors FOR UPDATE
    USING (true);

-- ============================================================
-- HOW THE BOOKING FLOW WORKS
-- ============================================================
-- 1. Learner views a mentor profile and submits booking form
-- 2. JS looks up the mentor by name in the mentors table
-- 3. If found: stores their UUID in bookings.mentor_uuid
-- 4. Mentor logs in → dashboard queries bookings WHERE mentor_uuid = auth.user.id
-- 5. End-to-end connected when mentor has signed up on the platform
-- ============================================================
