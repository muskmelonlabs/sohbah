# Sohbah - Islamic Mentorship Platform

## Project Overview
Sohbah is a static web application that connects Islamic learners with mentors. Users can browse mentor profiles, book sessions, and mentors can log in to manage booking requests.

## Architecture
- **Type**: Pure static site (HTML, CSS, vanilla JavaScript)
- **Backend**: Supabase (database + authentication)
- **No build system** — files are served directly via `npx serve`

## Key Files
- `index.html` — Main HTML entry point
- `script.js` — App logic, mentor data, Supabase integration, auth + dashboard
- `styles.css` — All styles
- `supabase-setup.sql` — One-time SQL to run in Supabase dashboard

## Running Locally
```
npx serve . --listen tcp://0.0.0.0:5000
```

## Supabase Integration
- **Project**: `ehynuqzwxwwuqbmjyymr.supabase.co`
- **Credentials**: Anon key hardcoded in `script.js` (public/safe)
- **Tables**:
  - `bookings` — learner booking requests (name, topic, preferred_time, mentor_id, status)
  - `mentors` — mentor profiles (name, email, bio, topics, experience, auth_user_id)
- **Auth**: Supabase email/password auth for mentors

## Features
### Learner Side
- Onboarding goal selector (routes to relevant mentors)
- Browse 30 mentor profiles with ratings, trust badges, urgency indicators
- Category filter pills + live search
- Book a session (writes to Supabase `bookings` table)

### Mentor Side
- Sign up: select profile from dropdown, email + password
- Login via Supabase Auth
- Dashboard: view all booking requests for their mentor ID
- Booking table: learner name, topic, preferred time, status

## CRITICAL: Do NOT break
- `handleBookingSubmit()` — the learner booking function
- `selectedMentor` — used by booking form to identify which mentor
- Supabase insert logic in `handleBookingSubmit`
- The anon key / Supabase client initialization

## Supabase Setup (run once)
See `supabase-setup.sql` — run in Supabase SQL Editor to:
1. Create `mentors` table
2. Add `status` column to `bookings`
3. Configure Row Level Security policies

## Deployment
- Configured as a **static** deployment
- Public directory: `.` (project root)
