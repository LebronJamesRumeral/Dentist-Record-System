-- 0001_init.sql
-- Initial schema for DentalVault app (Supabase / Postgres)
-- Run with: psql -h HOST -U USER -d DATABASE -f db/migrations/0001_init.sql

-- Helper function to update "updated_at" timestamps
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Profiles (Supabase Auth users -> profiles)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role text not null default 'dentist',
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger if not exists profiles_set_updated_at
  before update on profiles for each row execute procedure set_updated_at();

-- Patients
create table if not exists patients (
  id serial primary key,
  owner_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  age int not null,
  contact text,
  medical_notes text,
  last_visit date,
  last_note text,
  teeth_status jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists patients_owner_id_idx on patients(owner_id);
create trigger if not exists patients_set_updated_at
  before update on patients for each row execute procedure set_updated_at();

-- Visits (visit history)
create table if not exists visits (
  id serial primary key,
  patient_id int not null references patients(id) on delete cascade,
  performed_by uuid references profiles(id),
  date date not null,
  procedure text not null,
  tooth text not null,
  condition text not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists visits_patient_id_idx on visits(patient_id);
create trigger if not exists visits_set_updated_at
  before update on visits for each row execute procedure set_updated_at();

-- Appointments
create table if not exists appointments (
  id serial primary key,
  patient_id int references patients(id) on delete set null,
  owner_id uuid not null references profiles(id) on delete cascade,
  date date not null,
  time text not null,
  reason text not null,
  notes text,
  status text not null default 'scheduled',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists appointments_owner_id_idx on appointments(owner_id);
create index if not exists appointments_patient_id_idx on appointments(patient_id);
create trigger if not exists appointments_set_updated_at
  before update on appointments for each row execute procedure set_updated_at();

-- Documents metadata
create table if not exists documents (
  id serial primary key,
  patient_id int references patients(id) on delete set null,
  owner_id uuid not null references profiles(id) on delete cascade,
  file_name text not null,
  file_url text not null,
  file_type text,
  notes text,
  uploaded_at timestamptz not null default now()
);
create index if not exists documents_owner_id_idx on documents(owner_id);
create index if not exists documents_patient_id_idx on documents(patient_id);

-- Clinic settings
create table if not exists clinic_settings (
  id serial primary key,
  owner_id uuid not null references profiles(id) on delete cascade,
  clinic_name text not null default 'DentalVault Clinic',
  address text,
  contact_email text,
  phone text,
  updated_at timestamptz not null default now()
);
create unique index if not exists clinic_settings_owner_id_uq on clinic_settings(owner_id);
create trigger if not exists clinic_settings_set_updated_at
  before update on clinic_settings for each row execute procedure set_updated_at();

-- Simple permissions note: use Supabase Row Level Security (RLS) policies in production to restrict access.

-- End of migration
