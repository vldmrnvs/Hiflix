# HIFLIX

A Supabase-first AI Video TV platform.

## Features
- **Channels & Playlists**: Curated content streams.
- **TV Mode**: Immersive, fullscreen, keyboard-driven player.
- **"Club-proof" Player**: Auto-skip on errors, robust buffering, kiosk interaction.
- **Admin Dashboard**: Upload and moderate videos directly to Supabase Storage.
- **Analytics**: Track views and interactions.

## Setup

### 1. Environment Variables
Create `.env.local` based on `.env.example`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 2. Supabase Setup
Run the SQL migration in `supabase/schema.sql` in your Supabase Dashboard SQL Editor.
This will create:
- `channels`, `videos`, `events` tables.
- RLS policies.
- (You must manually create a public bucket named `videos` in Storage).

### 3. Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 4. Admin Access
Navigate to `/admin/login`.
Default setup relies on Supabase Auth. Ensure you have a user account created in Supabase Auth panels.
(Ideally, implement a trigger to restrict admin access to specific emails, or RLS policies).

## Deployment (Vercel)
1. Push to GitHub.
2. Import in Vercel.
3. Add Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Redeploy.

## Keyboard Shortcuts (TV Mode)
- **Space**: Pause/Play
- **Arrows**: Next/Prev Channel Video
- **F**: Fullscreen
- **R**: Toggle Random Mode
