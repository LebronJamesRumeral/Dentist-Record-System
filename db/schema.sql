-- db/schema.sql
-- Consolidated DentalVault schema for Postgres / Supabase
-- Run with: psql -h HOST -U USER -d DATABASE -f db/schema.sql

BEGIN;

-- enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Helper function to update "updated_at" timestamps
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Profiles (Supabase Auth users -> profiles)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  full_name text,
  role text NOT NULL DEFAULT 'dentist',
  phone text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER IF NOT EXISTS profiles_set_updated_at
  BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- Patients
CREATE TABLE IF NOT EXISTS patients (
  id serial PRIMARY KEY,
  owner_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  external_id uuid UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  age int NOT NULL,
  contact text,
  medical_notes text,
  last_visit date,
  last_note text,
  teeth_status jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS patients_owner_id_idx ON patients(owner_id);
CREATE INDEX IF NOT EXISTS patients_external_id_idx ON patients(external_id);
CREATE TRIGGER IF NOT EXISTS patients_set_updated_at
  BEFORE UPDATE ON patients FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- Visits (visit history)
CREATE TABLE IF NOT EXISTS visits (
  id serial PRIMARY KEY,
  patient_id int NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  performed_by uuid REFERENCES profiles(id),
  date date NOT NULL,
  procedure text NOT NULL,
  tooth text NOT NULL,
  condition text NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS visits_patient_id_idx ON visits(patient_id);
CREATE TRIGGER IF NOT EXISTS visits_set_updated_at
  BEFORE UPDATE ON visits FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
  id serial PRIMARY KEY,
  patient_id int REFERENCES patients(id) ON DELETE SET NULL,
  patient_external_id uuid REFERENCES patients(external_id) ON DELETE SET NULL,
  owner_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date date NOT NULL,
  time text NOT NULL,
  reason text NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'scheduled',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS appointments_owner_id_idx ON appointments(owner_id);
CREATE INDEX IF NOT EXISTS appointments_patient_id_idx ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS appointments_patient_external_id_idx ON appointments(patient_external_id);
CREATE TRIGGER IF NOT EXISTS appointments_set_updated_at
  BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- Documents metadata
CREATE TABLE IF NOT EXISTS documents (
  id serial PRIMARY KEY,
  patient_id int REFERENCES patients(id) ON DELETE SET NULL,
  owner_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_type text,
  notes text,
  uploaded_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS documents_owner_id_idx ON documents(owner_id);
CREATE INDEX IF NOT EXISTS documents_patient_id_idx ON documents(patient_id);

-- Clinic settings
CREATE TABLE IF NOT EXISTS clinic_settings (
  id serial PRIMARY KEY,
  owner_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  clinic_name text NOT NULL DEFAULT 'DentalVault Clinic',
  address text,
  contact_email text,
  phone text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS clinic_settings_owner_id_uq ON clinic_settings(owner_id);
CREATE TRIGGER IF NOT EXISTS clinic_settings_set_updated_at
  BEFORE UPDATE ON clinic_settings FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

COMMIT;
