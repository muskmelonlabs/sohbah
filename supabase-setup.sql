-- ============================================================
-- SOHBAH - Supabase Setup Script
-- Run this ONCE in your Supabase SQL Editor:
-- https://supabase.com/dashboard → your project → SQL Editor
-- ============================================================

-- ============================================================
-- 1. CREATE MENTORS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.mentors (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    bio TEXT,
    topics TEXT[],
    experience INT,
    auth_user_id UUID UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. ADD STATUS COLUMN TO BOOKINGS TABLE
-- ============================================================
ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- ============================================================
-- 3. ROW LEVEL SECURITY FOR BOOKINGS
-- (Allows public insert + public read — suitable for MVP)
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

-- ============================================================
-- DONE. Supabase Auth (email/password) is enabled by default.
-- No extra setup needed for authentication.
-- ============================================================
