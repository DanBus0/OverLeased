-- Add trim and vehicle_condition columns to lease_review_leads table
ALTER TABLE lease_review_leads
ADD COLUMN IF NOT EXISTS trim TEXT,
ADD COLUMN IF NOT EXISTS vehicle_condition TEXT;

COMMENT ON COLUMN lease_review_leads.trim IS 'Vehicle trim level (e.g., SE, Limited, or "I''m not sure")';
COMMENT ON COLUMN lease_review_leads.vehicle_condition IS 'Vehicle condition: excellent, good, fair, poor';