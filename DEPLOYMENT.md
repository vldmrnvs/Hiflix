# HIFLIX - Deployment Guide

## Prerequisites

Before deploying, ensure you have:
- GitHub account with this repository
- Vercel account (free tier works)
- Supabase account (free tier works)
- Resend account (optional, for collaboration emails)

---

## 1. Supabase Setup

### Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and set:
   - **Name**: HIFLIX
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to your users

### Run Migrations
1. In Supabase Dashboard → SQL Editor
2. Copy and paste the content from `supabase/migrations/001_feedback_collab.sql`
3. Click "Run" to create tables and RLS policies

### Get API Keys
1. Go to Project Settings → API
2. Copy these values (you'll need them for Vercel):
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep secret!)

### Create Admin User
1. Go to Authentication → Users
2. Click "Add User" → "Create new user"
3. Set email and password
4. After creation, go to Table Editor → `profiles`
5. Find your user and set `role` to `'admin'`

---

## 2. Vercel Deployment

### Connect GitHub Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

### Configure Environment Variables
In Vercel project settings → Environment Variables, add:

```bash
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend (Optional - for collaboration form emails)
RESEND_API_KEY=re_your_resend_key
```

### Build Settings
Vercel should auto-detect these, but verify:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Deploy
1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Your site will be live at `https://your-project.vercel.app`

---

## 3. Post-Deployment Setup

### Seed Database (Optional)
If you want to populate with sample data:

```bash
# Install dependencies locally
npm install

# Set environment variables in .env.local
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...

# Run seed script
npx tsx scripts/seed-db.ts
```

### Configure Custom Domain (Optional)
1. In Vercel → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Test Admin Access
1. Visit `https://your-site.vercel.app/admin/login`
2. Login with the admin user you created
3. Verify you can access `/admin` dashboard

---

## 4. Resend Setup (Optional)

For collaboration form emails:

1. Go to [resend.com](https://resend.com)
2. Create account and verify domain (or use their test domain)
3. Go to API Keys → Create API Key
4. Copy key and add to Vercel env vars as `RESEND_API_KEY`
5. Redeploy to apply changes

---

## Environment Variables Summary

| Variable | Required | Where to Get | Purpose |
|----------|----------|--------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Yes | Supabase → Settings → API | Database connection |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Yes | Supabase → Settings → API | Public database access |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ Yes | Supabase → Settings → API | Admin operations |
| `RESEND_API_KEY` | ❌ No | Resend.com → API Keys | Collaboration emails |

---

## Troubleshooting

### Build Fails
- Check Vercel build logs for errors
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility (18.x+)

### Database Connection Issues
- Verify Supabase URL and keys are correct
- Check RLS policies are enabled
- Ensure migrations ran successfully

### Admin Login Not Working
- Verify admin user exists in `profiles` table with `role = 'admin'`
- Check browser console for auth errors
- Clear cookies and try again

### Collaboration Form Not Sending Emails
- Verify `RESEND_API_KEY` is set in Vercel
- Check Resend dashboard for delivery logs
- Form will still save to database even without Resend

---

## Continuous Deployment

Once connected to GitHub:
1. Push changes to your repository
2. Vercel automatically builds and deploys
3. Preview deployments for pull requests
4. Production deployment on merge to main

---

## Security Checklist

- ✅ RLS policies enabled on all tables
- ✅ `SUPABASE_SERVICE_ROLE_KEY` is secret (not in client code)
- ✅ Admin routes protected with `assertAdmin()`
- ✅ Honeypot and timestamp checks on public forms
- ✅ CORS configured in Supabase if needed

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Supabase logs (Database → Logs)
3. Review browser console errors
4. Verify all environment variables are set correctly
