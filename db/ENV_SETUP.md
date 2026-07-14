How to set environment variables for Supabase (local)

Files created:
- `.env.example`  -- template with placeholders
- `.env.local`    -- local override (gitignored by convention)

Steps:
1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Fill `.env.local` with values from your Supabase project dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Project URL and anon key (Settings → API)
   - `SUPABASE_SERVICE_ROLE_KEY`: Service role key for trusted server operations (keep secret)
   - `SUPABASE_LOCAL_DB_URL`: If using the Supabase local stack, set the local Postgres URL

3. Start Next.js dev server (reads `.env.local` automatically):

```bash
pnpm dev
# or
npm run dev
```

4. When deploying to Vercel, Netlify, or Supabase Edge Functions, set the same variables in the host's secrets/settings panel.

Security note:
- Never commit `.env.local` or any file containing real secrets. Use `.env.example` for templates only.
- Ensure `SUPABASE_SERVICE_ROLE_KEY` only runs on server code (API routes, server components). Do not leak to client.
