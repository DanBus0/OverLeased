-- Create the lease_reports table for new Supabase project
CREATE TABLE IF NOT EXISTS public.lease_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    
    -- Vehicle information (from form)
    year TEXT NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    current_mileage INTEGER NOT NULL,
    
    -- Customer information (from form)
    email TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    
    -- Payment tracking (from Stripe)
    payment_status TEXT DEFAULT 'pending',
    payment_intent_id TEXT,
    amount_paid INTEGER,
    
    -- Report delivery tracking
    report_delivered BOOLEAN DEFAULT false,
    report_delivered_at TIMESTAMPTZ
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.lease_reports ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT leads (form submissions)
-- This is the ONLY policy - anonymous users can ONLY insert, not read/update/delete
CREATE POLICY "allow_anonymous_insert" 
ON public.lease_reports
FOR INSERT
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_lease_reports_email ON public.lease_reports(email);
CREATE INDEX idx_lease_reports_created_at ON public.lease_reports(created_at DESC);
CREATE INDEX idx_lease_reports_payment_status ON public.lease_reports(payment_status);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_lease_reports_updated_at 
BEFORE UPDATE ON public.lease_reports 
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();