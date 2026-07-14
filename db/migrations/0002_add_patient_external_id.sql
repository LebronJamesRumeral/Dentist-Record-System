-- 0002_add_patient_external_id.sql
-- Add a UUID external_id to patients for stable external identifiers

-- enable pgcrypto for gen_random_uuid()
create extension if not exists pgcrypto;

alter table patients
  add column if not exists external_id uuid unique default gen_random_uuid();

-- populate existing rows with uuids if any are null
update patients set external_id = gen_random_uuid() where external_id is null;

-- create index for faster lookup
create index if not exists patients_external_id_idx on patients(external_id);
