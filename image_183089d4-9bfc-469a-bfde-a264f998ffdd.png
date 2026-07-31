-- Create dealer_coordination_leads table to track Dealer Coordination Service purchases
CREATE TABLE IF NOT EXISTS dealer_coordination_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  
  -- Customer information
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  
  -- Payment tracking
  payment_status text NOT NULL DEFAULT 'pending',
  payment_intent_id text,
  amount_paid integer,
  
  -- Service delivery tracking
  service_completed boolean DEFAULT false,
  service_completed_at timestamp with time zone,
  notes text
);

-- Add comment
COMMENT ON TABLE dealer_coordination_leads IS 'Stores Dealer Coordination Service form submissions with payment tracking';

-- Add column comments
COMMENT ON COLUMN dealer_coordination_leads.first_name IS 'Customer first name';
COMMENT ON COLUMN dealer_coordination_leads.last_name IS 'Customer last name';
COMMENT ON COLUMN dealer_coordination_leads.email IS 'Customer email address';
COMMENT ON COLUMN dealer_coordination_leads.phone IS 'Customer phone number';
COMMENT ON COLUMN dealer_coordination_leads.payment_status IS 'Payment status: pending, succeeded, failed';
COMMENT ON COLUMN dealer_coordination_leads.payment_intent_id IS 'Stripe Payment Intent ID';
COMMENT ON COLUMN dealer_coordination_leads.amount_paid IS 'Amount paid in cents';
COMMENT ON COLUMN dealer_coordination_leads.service_completed IS 'Whether the coordination service has been completed';
COMMENT ON COLUMN dealer_coordination_leads.service_completed_at IS 'Timestamp when service was marked complete';
COMMENT ON COLUMN dealer_coordination_leads.notes IS 'Internal notes about the coordination process';

-- Enable RLS
ALTER TABLE dealer_coordination_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (customers submitting the form)
CREATE POLICY "allow_anonymous_insert"
ON dealer_coordination_leads
FOR INSERT
TO public
WITH CHECK (true);

-- Create indexes for common queries
CREATE INDEX idx_dealer_coordination_created_at ON dealer_coordination_leads(created_at DESC);
CREATE INDEX idx_dealer_coordination_email ON dealer_coordination_leads(email);
CREATE INDEX idx_dealer_coordination_payment_status ON dealer_coordination_leads(payment_status);