-- Make license_plate column optional by allowing NULL values
ALTER TABLE lease_inquiries 
ALTER COLUMN license_plate DROP NOT NULL;