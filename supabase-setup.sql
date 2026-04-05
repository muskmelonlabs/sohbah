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
-- 2. BOOKINGS TABLE — add all required columns
--    mentor_id (int) kept for legacy; mentor_uuid is the real link
--    learner_id (uuid) = auth.user.id of the learner who booked
--    status: 'pending' | 'accepted' | 'rejected'
-- ============================================================
ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS mentor_uuid UUID;

ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS learner_id UUID;

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

DROP POLICY IF EXISTS "bookings_update_policy" ON public.bookings;
CREATE POLICY "bookings_update_policy"
    ON public.bookings FOR UPDATE
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
-- HOW THE FULL BOOKING FLOW WORKS
-- ============================================================
-- 1. Learner logs in → visits a mentor profile
-- 2. Booking form shows (no name/email needed — auth user supplies this)
-- 3. JS resolves mentor's UUID from mentors table by name
-- 4. Inserts: topic, preferred_time, mentor_uuid, learner_id, status='pending'
-- 5. Mentor logs in → Dashboard queries bookings WHERE mentor_uuid = user.id
-- 6. Mentor clicks Accept/Reject → status updated in Supabase
-- 7. Learner logs in → My Sessions queries bookings WHERE learner_id = user.id
-- 8. Status shows as color-coded badge: yellow=pending, green=accepted, red=rejected
-- ============================================================
