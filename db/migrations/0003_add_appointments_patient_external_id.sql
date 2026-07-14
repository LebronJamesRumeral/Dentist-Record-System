-- Add patient_external_id to appointments and try to populate from existing patient names
BEGIN;

ALTER TABLE IF EXISTS appointments ADD COLUMN patient_external_id uuid;

-- Attempt best-effort population by matching patient name (case-insensitive)
UPDATE appointments
SET patient_external_id = patients.external_id
FROM patients
WHERE lower(appointments.patient) = lower(patients.name);

-- Add foreign key constraint referencing patients.external_id (nullable)
ALTER TABLE appointments
  ADD CONSTRAINT fk_appointments_patient_external_id FOREIGN KEY (patient_external_id) REFERENCES patients(external_id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_appointments_patient_external_id ON appointments (patient_external_id);

COMMIT;
