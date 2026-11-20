-- Add email timestamp columns to lease_review_leads
ALTER TABLE lease_review_leads 
ADD COLUMN IF NOT EXISTS customer_email_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS support_email_sent_at TIMESTAMPTZ;

-- Add email timestamp columns to dealer_coordination_leads
ALTER TABLE dealer_coordination_leads 
ADD COLUMN IF NOT EXISTS customer_email_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS support_email_sent_at TIMESTAMPTZ;

-- Add indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_lease_review_leads_customer_email_sent 
ON lease_review_leads(customer_email_sent_at) 
WHERE customer_email_sent_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_lease_review_leads_support_email_sent 
ON lease_review_leads(support_email_sent_at) 
WHERE support_email_sent_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_dealer_coordination_leads_customer_email_sent 
ON dealer_coordination_leads(customer_email_sent_at) 
WHERE customer_email_sent_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_dealer_coordination_leads_support_email_sent 
ON dealer_coordination_leads(support_email_sent_at) 
WHERE support_email_sent_at IS NULL;