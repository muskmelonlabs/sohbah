# Sohbah - Islamic Mentorship Platform

## Project Overview
Sohbah is a static web application that connects Islamic learners with mentors. Users can browse mentor profiles and book sessions.

## Architecture
- **Type**: Pure static site (HTML, CSS, vanilla JavaScript)
- **Backend**: Supabase (external hosted database for bookings)
- **No build system** — files are served directly

## Key Files
- `index.html` — Main HTML entry point
- `script.js` — App logic, mentor data, Supabase integration
- `styles.css` — All styles
- `data/mentors.json` — Mentor data reference
- `docs/` — MVP and PRD documentation

## Running Locally
The app is served via `npx serve` on port 5000:
```
npx serve . --listen tcp://0.0.0.0:5000
```

## Supabase Integration
- The app uses Supabase for storing booking requests in a `bookings` table
- Connection credentials are hardcoded in `script.js` (anon/public key)
- Supabase project: `ehynuqzwxwwuqbmjyymr.supabase.co`

## Deployment
- Configured as a **static** deployment
- Public directory: `.` (project root)
