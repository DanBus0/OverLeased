-- Apply the complete migration for lease_review_leads table
CREATE TABLE IF NOT EXISTS public.lease_review_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  
  -- Form data fields
  email TEXT NOT NULL,
  year TEXT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  current_mileage INTEGER NOT NULL,
  zip_code TEXT NOT NULL,
  
  -- Payment tracking
  payment_status TEXT DEFAULT 'pending',
  payment_intent_id TEXT,
  amount_paid INTEGER,
  
  -- Report delivery tracking
  report_delivered BOOLEAN DEFAULT false,
  report_delivered_at TIMESTAMPTZ
);

-- Enable Row Level Security
ALTER TABLE public.lease_review_leads ENABLE ROW LEVEL SECURITY;

-- Create anonymous INSERT-only policy
DROP POLICY IF EXISTS "allow_anonymous_insert" ON public.lease_review_leads;
CREATE POLICY "allow_anonymous_insert"
ON public.lease_review_leads
FOR INSERT
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_lease_review_leads_email ON public.lease_review_leads(email);
CREATE INDEX IF NOT EXISTS idx_lease_review_leads_created_at ON public.lease_review_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lease_review_leads_payment_status ON public.lease_review_leads(payment_status);

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_lease_review_leads_updated_at ON public.lease_review_leads;
CREATE TRIGGER update_lease_review_leads_updated_at
BEFORE UPDATE ON public.lease_review_leads
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add comment for documentation
COMMENT ON TABLE public.lease_review_leads IS 'Stores lease review form submissions with payment tracking';