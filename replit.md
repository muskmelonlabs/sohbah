# Sohbah - Islamic Mentorship Platform

## Project Overview
Sohbah is a static web application connecting Islamic learners with mentors. Features include mentor discovery, profile pages, real Supabase authentication for both mentors and learners, and a mentor dashboard to manage booking requests.

## Architecture
- **Type**: Pure static site (HTML, CSS, vanilla JavaScript — no build step)
- **Backend**: Supabase (PostgreSQL database + Auth)
- **Served via**: `npx serve` on port 5000

## Key Files
- `index.html` — Main HTML entry point
- `script.js` — All app logic: mentor data, auth, bookings, dashboard, renders
- `styles.css` — All styles
- `supabase-setup.sql` — Run ONCE in Supabase SQL Editor to set up schema

## Running Locally
```
npx serve . --listen tcp://0.0.0.0:5000
```

## Supabase Setup (run once)
See `supabase-setup.sql`. Creates:
1. `mentors` table — UUID PK (= auth.user.id), name, email, title, bio, avatar_url
2. `bookings.status` column (TEXT, default 'pending')
3. `bookings.mentor_uuid` column (UUID, links booking to real mentor)
4. `bookings.created_at` column
5. RLS policies for both tables

## Supabase Details
- **Project**: `ehynuqzwxwwuqbmjyymr.supabase.co`
- **Credentials**: Anon key hardcoded in `script.js` (public/safe for client-side)
- **Auth**: Email + password via `supabase.auth.signUp` / `signInWithPassword`

## Features

### Discovery (Learner Side)
- Onboarding goal selector → routes to matched mentors
- 30 mentor catalog with real portrait photos (randomuser.me)
- Ratings, trust badges, urgency indicators
- Category filter pills + live search
- Mentor profile page with reviews

### Booking Flow
- Learner fills form on mentor profile → writes to `bookings` table
- JS looks up mentor's UUID by name from `mentors` table
- Stores `mentor_uuid` (UUID) + `mentor_id` (int, legacy) + `status: 'pending'`

### Auth (Mentor + Learner)
- Login page: email + password
- Sign up: full_name + email + password + role selector (Mentor / Learner)
- Mentor signup → inserts into `mentors` table with `id = auth.user.id`
- Learner signup → Supabase Auth only (no separate table)
- Session persistent across page reloads

### Mentor Dashboard
- Shows all bookings WHERE `mentor_uuid = currentUser.id`
- Table: learner name, topic, preferred time, date received, status
- Accessible only to logged-in mentors

## Critical — Do NOT Break
- `handleBookingSubmit()` — learner booking function
- `selectedMentor` — tracks which mentor a learner is booking
- Supabase anon key / client initialization
- `mentor_id` (int) column in bookings — kept for backward compatibility

## Avatar Images
- Computed by `getMentorAvatar(mentor)` using randomuser.me portrait API
- Female mentors detected by emoji (🧕, 👩‍🎓, 👩‍⚕️) → women portraits
- Male mentors → men portraits
- No changes needed to the 30 mentor data objects

## Deployment
- Configured as **static** deployment
- Public directory: `.` (project root)
