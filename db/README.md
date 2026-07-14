DentalVault DB migrations

Location: db/migrations

Files:
- 0001_init.sql  -- initial schema (patients, visits, appointments, documents, clinic_settings, profiles)

How to run (Postgres / psql):

1) Locally with psql:

```bash
psql "postgresql://USER:PASS@HOST:PORT/DATABASE" -f db/migrations/0001_init.sql
```

2) With Supabase CLI (if using a remote project):

- You can apply the SQL directly with the `psql` command above, or use the Supabase SQL editor.
- If you prefer Migra/pg_dump workflows, adapt this file into your preferred migration system.

Notes:
- `profiles` references `auth.users` (Supabase Auth). Ensure Supabase Auth is enabled before creating `profiles` entries.
- Enable Row Level Security (RLS) and add policies before using in production.
