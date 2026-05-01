# Pokédex Lite

A production-quality Pokédex web app built with Next.js 14, React, Tailwind CSS, and Framer Motion.

## Features

- **Browse & Search** — 1,000+ Pokémon with live search and type filtering
- **Pagination** — 20 per page with smooth transitions
- **Detail View** — Modal with stats, abilities, moves, and flavor text
- **Favorites** — Persisted to localStorage; synced to Supabase when signed in
- **SSR Detail Pages** — `/pokemon/[name]` pre-rendered server-side with Open Graph meta
- **Animations** — Framer Motion grid stagger, card hover, stat bar fill, modal entrance
- **OAuth** — GitHub sign-in via Auth.js v5
- **Cloud Favorites** — Supabase integration with offline-to-online merge

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in values
cp .env.example .env.local

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See `.env.example` for the full list. For the app to work without any env vars, just run as-is — favorites use localStorage and OAuth is disabled.

To enable GitHub OAuth:
1. Go to github.com/settings/developers → New OAuth App
2. Set callback URL to `http://localhost:3000/api/auth/callback/github`
3. Add `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, and `AUTH_SECRET` to `.env.local`

To enable Supabase cloud favorites:
1. Create a free project at supabase.com
2. Run this SQL in the Supabase SQL editor:
   ```sql
   CREATE TABLE favorites (
     id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id text NOT NULL,
     pokemon_name text NOT NULL,
     created_at timestamptz DEFAULT now(),
     UNIQUE(user_id, pokemon_name)
   );
   ```
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`

## Tech Stack

| Tool | Why |
|------|-----|
| **Next.js 14** (App Router) | SSR for SEO, file-based routing, React Server Components |
| **Tailwind CSS** | Utility-first styling, no CSS files to maintain |
| **Framer Motion** | Production-quality animations respecting `prefers-reduced-motion` |
| **Auth.js v5 (next-auth)** | Turnkey OAuth with JWT sessions, minimal boilerplate |
| **Supabase** | Free Postgres with JS client; favorites sync across devices |
| **PokéAPI** | Free, comprehensive, no API key required |

## Project Structure

```
src/
├── app/             # Next.js App Router pages and layouts
│   ├── pokemon/[name]/page.jsx   # SSR detail page with generateMetadata
│   └── favorites/page.jsx
├── components/
│   ├── ui/          # Generic: Button, Input, Modal, Skeleton, Spinner, EmptyState
│   ├── pokemon/     # Domain: PokemonCard, PokemonGrid, PokemonDetail, TypeBadge
│   ├── filters/     # SearchBar, TypeFilter, FilterBar
│   ├── pagination/  # Pagination
│   └── layout/      # Navbar, Footer
├── context/         # FavoritesContext (local + cloud)
├── hooks/           # usePokemonList, useFavorites, useDebounce, useLocalStorage
├── lib/
│   ├── api/         # PokéAPI fetchers
│   ├── utils/       # cn, format, pagination helpers
│   ├── auth.js      # Auth.js config
│   └── supabase.js  # Supabase client and helpers
└── constants/       # Type colors, stat colors, config
```

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Push to GitHub and import into Vercel. Add the env vars in the Vercel project settings. The `generateStaticParams` in the detail page pre-renders the first 151 Pokémon at build time.
