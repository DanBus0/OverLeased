-- Add firstname and customer_goal columns to lease_review_leads table
ALTER TABLE lease_review_leads 
ADD COLUMN IF NOT EXISTS firstname TEXT,
ADD COLUMN IF NOT EXISTS customer_goal TEXT;

COMMENT ON COLUMN lease_review_leads.firstname IS 'Customer first name';
COMMENT ON COLUMN lease_review_leads.customer_goal IS 'Customer goal: no-longer-need, different-vehicle, keep-current, lower-cost, not-sure';