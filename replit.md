# Sohbah - Islamic Mentorship Platform

## Project Overview
Sohbah is a static web application connecting Islamic learners with mentors. Features include mentor discovery, profile pages, Supabase Auth for both mentors and learners, auth-gated booking flow, mentor dashboard with Accept/Reject, and a learner "My Sessions" page with live status tracking.

## Architecture
- **Type**: Pure static site (HTML, CSS, vanilla JavaScript — no build step)
- **Backend**: Supabase (PostgreSQL database + Auth)
- **Served via**: `npx serve` on port 5000

## Key Files
- `index.html` — Main HTML entry point
- `script.js` — All app logic: mentor data, auth, bookings, dashboard, my sessions, renders
- `styles.css` — All styles
- `supabase-setup.sql` — Run ONCE in Supabase SQL Editor to set up schema

## Running Locally
```
npx serve . --listen tcp://0.0.0.0:5000
```

## Supabase Setup (run once)
See `supabase-setup.sql`. Creates/updates:
1. `mentors` table — UUID PK (= auth.user.id), name, email, title, bio, avatar_url
2. `bookings.status` column (TEXT: 'pending' | 'accepted' | 'rejected', default 'pending')
3. `bookings.mentor_uuid` column (UUID — links booking to real mentor auth ID)
4. `bookings.learner_id` column (UUID — links booking to real learner auth ID)
5. `bookings.created_at` column
6. RLS policies for both tables (INSERT, SELECT, UPDATE)

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

### Booking Flow (Auth-gated)
- Logged-out users see a "Sign In to Book" gate on mentor profiles
- Logged-in learners see form with only: topic + preferred_time (no manual name/email)
- `handleBookingSubmit` uses `supabase.auth.getUser()` to get learner identity
- Stores `learner_id` (UUID), `mentor_uuid` (UUID), `status: 'pending'`
- `_signupInProgress` guard prevents duplicate signup API calls

### Auth (Mentor + Learner)
- Login page: email + password
- Sign up: full_name + email + password + role selector (Mentor / Learner)
- Mentor signup → inserts into `mentors` table with `id = auth.user.id`
- Learner signup → Supabase Auth only (no separate table)
- Session persistent across page reloads
- Signup protected with `_signupInProgress` flag to prevent rate limit errors

### Mentor Dashboard
- Shows all bookings WHERE `mentor_uuid = currentUser.id`
- Table: Learner, Topic, Preferred Time, Received, Status, Actions
- **Accept** / **Reject** buttons per pending booking — calls `updateBookingStatus()`
- Status updates immediately re-render the dashboard

### Learner "My Sessions" Page
- Accessible via "My Sessions" nav link when logged in as a learner
- Queries bookings WHERE `learner_id = currentUser.id`
- Card view with mentor name, topic, preferred time, date
- Status badges: yellow=Pending, green=Accepted, red=Rejected
- Green/red notice banners on accepted/rejected sessions

### Nav (Role-Aware)
- Logged out: Login button
- Logged in as mentor: username + Dashboard link + Logout
- Logged in as learner: username + My Sessions link + Logout

## Critical — Do NOT Break
- `handleBookingSubmit()` — learner booking function (uses auth user)
- `selectedMentor` — tracks which mentor a learner is booking
- Supabase anon key / client initialization
- `mentor_id` (int) column in bookings — kept for backward compatibility
- `_signupInProgress` guard on `handleSignup`

## Avatar Images
- Computed by `getMentorAvatar(mentor)` using randomuser.me portrait API
- Female mentors detected by emoji (🧕, 👩‍🎓, 👩‍⚕️) → women portraits
- Male mentors → men portraits
- CSS classes: `.mentor-avatar-img` (72px card), `.profile-avatar-img` (120px profile)

## Deployment
- Configured as **static** deployment
- Public directory: `.` (project root)
