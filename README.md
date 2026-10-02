# UPREFR - U Prepare For Real Fresher

A quiz app that helps freshers practise real placement interview questions.
Sign up with email, pick a subject, choose Beginner, Medium or Advanced, and answer timed questions.

**Live demo:** _add your Vercel link here_

## Tech
React 19, Vite, Tailwind CSS 4, React Router, and Supabase (email authentication and a Postgres database).

## Features
- Email sign up and login
- Six subjects, three levels each, random rounds of up to 10 questions with a 30-second timer
- Best score (%) per subject and level saved to the database
- Contact form that stores queries in the database
- Row Level Security so users can only see their own data

## Run it locally
```bash
npm install
cp .env.example .env    # then add your Supabase URL and anon key
npm run dev
```

## Supabase setup (one time)
1. Create a project at supabase.com.
2. **SQL Editor > New query**: paste `supabase/schema.sql` and run it.
3. **Authentication > Providers > Email**: turn **Confirm email** off for the simplest signup flow (or leave it on and users confirm by email).
4. **Project Settings > API**: copy the **Project URL** and the **anon public** key into `.env`.

## Deploy (Vercel)
1. Push this repo to GitHub.
2. On vercel.com choose **Add New > Project** and import the repo.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under **Environment Variables**, then deploy.
4. In Supabase **Authentication > URL Configuration**, set **Site URL** to your Vercel link.

## Adding questions
Each subject has its own file in `src/data/` (for example `cn.js`), one question per line:
`level|question|right answer|wrong|wrong|wrong` where level is 0 (Beginner), 1 (Medium) or 2 (Advanced).

## Project structure
```
supabase/     schema.sql (tables and security rules)
src/
  components/   Navbar, Logo
  context/      AuthContext (Supabase auth state)
  data/         question bank, one file per subject
  lib/          db.js (database helpers)
  pages/        Landing, Auth, Home, Pick, Quiz, About, Contact
  supabase.js   client setup
```

## Ideas for later
More questions per level, a leaderboard, and password reset.
