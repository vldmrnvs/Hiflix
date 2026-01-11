# HIFLIX

AI-Curated Visual Media Platform for Physical Spaces

## Overview

HIFLIX is a visual media system designed for screens that need atmosphere, not attention. Built for clubs, hotels, museums, universities, and any space with a screen.

**Live Demo**: [Coming Soon]

---

## Features

- 🎬 **Curated Channels**: AI-curated visual content streams
- 📺 **TV Mode**: Immersive, fullscreen, keyboard-driven player
- 🎨 **Visual-First**: Designed for ambient display, not feeds
- 🛡️ **Admin Dashboard**: Content moderation and management
- 📊 **Analytics**: Track views and interactions
- 🤝 **Collaboration**: Artist and institution partnerships

---

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS v4
- **Backend**: Supabase (PostgreSQL, Auth, Storage, RLS)
- **Deployment**: Vercel
- **Email**: Resend (optional)
- **Icons**: Lucide React
- **Animations**: Framer Motion

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd HIFLIX
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp env.example .env.local
# Edit .env.local with your Supabase credentials
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions including:
- Supabase setup and migrations
- Vercel configuration
- Environment variables
- Admin user creation
- Troubleshooting

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/HIFLIX)

---

## Project Structure

```
HIFLIX/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (site)/            # Public site pages
│   │   │   ├── page.tsx       # Home
│   │   │   ├── product/       # Product page
│   │   │   └── about/         # About page
│   │   ├── admin/             # Admin dashboard
│   │   ├── studio/            # Creator studio
│   │   └── actions/           # Server actions
│   ├── components/            # React components
│   ├── lib/                   # Utilities
│   └── types/                 # TypeScript types
├── supabase/
│   └── migrations/            # Database migrations
├── scripts/                   # Utility scripts
└── public/                    # Static assets
```

---

## Environment Variables

Required variables (see `env.example`):

```bash
NEXT_PUBLIC_SUPABASE_URL=        # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Supabase anon key
SUPABASE_SERVICE_ROLE_KEY=       # Supabase service role key
RESEND_API_KEY=                  # (Optional) Resend API key
```

---

## Database Schema

Main tables:
- `channels` - Content channels
- `videos` - Video metadata
- `profiles` - User profiles with roles
- `feedback` - User feedback with audit trail
- `collaboration_requests` - Partnership inquiries

See `supabase/migrations/001_feedback_collab.sql` for complete schema.

---

## Admin Access

1. Create user in Supabase Auth
2. Set `role = 'admin'` in `profiles` table
3. Login at `/admin/login`

---

## Keyboard Shortcuts (TV Mode)

- **Space**: Pause/Play
- **Arrow Keys**: Navigate channels/videos
- **F**: Fullscreen
- **R**: Random mode

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## License

[Your License Here]

---

## Support

For deployment issues, see [DEPLOYMENT.md](./DEPLOYMENT.md)

For other questions, open an issue on GitHub.

