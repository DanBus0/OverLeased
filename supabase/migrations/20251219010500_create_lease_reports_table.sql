-- Create lease_reports table for the new form structure
CREATE TABLE IF NOT EXISTS public.lease_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Customer information
    email TEXT NOT NULL,
    
    -- Vehicle information
    year TEXT NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    current_mileage INTEGER NOT NULL,
    zip_code TEXT NOT NULL,
    
    -- Payment information
    payment_status TEXT DEFAULT 'pending',
    payment_intent_id TEXT,
    amount_paid INTEGER,
    
    -- Report delivery
    report_delivered BOOLEAN DEFAULT false,
    report_delivered_at TIMESTAMP WITH TIME ZONE
);

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_lease_reports_email ON public.lease_reports(email);
CREATE INDEX IF NOT EXISTS idx_lease_reports_payment_status ON public.lease_reports(payment_status);
CREATE INDEX IF NOT EXISTS idx_lease_reports_created_at ON public.lease_reports(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.lease_reports ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your auth requirements)
CREATE POLICY "Enable read access for authenticated users" ON public.lease_reports
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for all users" ON public.lease_reports
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON public.lease_reports
    FOR UPDATE USING (auth.role() = 'authenticated');