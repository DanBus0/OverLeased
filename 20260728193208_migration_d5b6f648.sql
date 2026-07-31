-- Add missing columns to lease_inquiries table
ALTER TABLE lease_inquiries 
ADD COLUMN IF NOT EXISTS make text,
ADD COLUMN IF NOT EXISTS model text;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_lease_inquiries_make ON lease_inquiries(make);
CREATE INDEX IF NOT EXISTS idx_lease_inquiries_model ON lease_inquiries(model);