# Center for Bereaved Mothers

Initial production-oriented MVP foundation for the global nonprofit platform described in the project specification.

## Stack

- Next.js / React / TypeScript
- Tailwind CSS
- Supabase / PostgreSQL
- Supabase Auth, Storage and Realtime ready
- i18n-ready
- Responsive / PWA-ready architecture

## Run locally

1. Install Node.js 20+.
2. Install dependencies:

   npm install

3. Copy environment variables:

   cp .env.example .env.local

4. Add your Supabase URL and anon key to `.env.local`.
5. Apply `supabase/schema.sql` in the Supabase SQL Editor.
6. Start:

   npm run dev

Open http://localhost:3000.

## Deploy to Vercel

1. Create a GitHub repository and push this project.
2. Import the repository into Vercel.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Deploy.
5. Add your custom domain in Vercel.
6. Configure the domain in Supabase Authentication settings.

## Important

This repository is the first functional foundation, not a claim that every module in the long-form specification is production-complete. Before collecting real sensitive member data, complete authentication flows, email verification, password recovery, RLS review, storage policies, moderation, audit logging, rate limiting, backups, monitoring, privacy/legal documents and a security review.
