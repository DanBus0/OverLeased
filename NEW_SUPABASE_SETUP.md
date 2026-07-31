# New Supabase Project Setup - Complete Guide

## Step 1: Create Supabase Project (5 minutes)

1. Visit https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - **Name**: `overleased-vreport` (or your choice)
   - **Database Password**: Generate a strong one (save it!)
   - **Region**: Choose closest to your users (e.g., US East, EU West)
4. Click "Create new project"
5. Wait 2-3 minutes for provisioning

## Step 2: Get Your Credentials (2 minutes)

Once created, go to **Project Settings** (gear icon) → **API**:

Copy these TWO values:
- **Project URL**: `https://abcdefgh.supabase.co`
- **anon public key**: `eyJhbGc...` (long string starting with eyJ)

**IMPORTANT**: Do NOT use the `service_role` key in your application!

## Step 3: Create Database Table (3 minutes)

Go to **SQL Editor** (lightning bolt icon) and run this:

```sql
-- Create the lease_reports table
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
CREATE POLICY "allow_anonymous_insert" 
ON public.lease_reports
FOR INSERT
WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies = anonymous users cannot read/modify data

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
```

Click **Run** (or press Ctrl+Enter)

**Verify**: You should see "Success. No rows returned"

## Step 4: Verify RLS Policies (1 minute)

Go to **Authentication** → **Policies**:

You should see:
- Table: `lease_reports`
- Policy: `allow_anonymous_insert`
- Operations: INSERT only
- ✅ Green checkmark means RLS is enabled

## Step 5: Update Your Application (5 minutes)

### Option A: Update .env.local manually

Edit `.env.local` in your project root:

```bash
# Replace these two lines with your NEW project credentials:
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_NEW_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...YOUR_NEW_ANON_KEY

# Keep your Stripe keys as-is:
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Option B: Let me update it for you

Provide me with:
1. Your new Project URL
2. Your new anon/public key

And I'll update the files automatically.

## Step 6: Update Vercel Environment Variables (3 minutes)

Go to Vercel Dashboard → Your Project → Settings → Environment Variables:

**Update these variables** (click pencil icon to edit):

1. `NEXT_PUBLIC_SUPABASE_URL`
   - New value: `https://YOUR_NEW_PROJECT_REF.supabase.co`

2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - New value: `eyJhbGc...YOUR_NEW_ANON_KEY`

**Keep these as-is:**
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

Click **Save** for each change.

## Step 7: Redeploy (2 minutes)

After updating Vercel environment variables:

1. Go to Deployments tab
2. Click "..." menu on latest deployment
3. Click "Redeploy"
4. Wait ~2 minutes for deployment

## Step 8: Test Everything (10 minutes)

### Test 1: Form Submission
1. Go to your site `/get-started`
2. Fill in vehicle info:
   - Year: 2022
   - Make: Toyota
   - Model: Camry
   - Mileage: 15,000
   - ZIP: 90210
   - Email: test@example.com
3. Click Continue
4. Click "Buy My Report - $39"
5. Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
6. Complete payment

**Expected**: Success page shows up

**Verify in Supabase**:
- Go to **Table Editor** → `lease_reports`
- You should see ONE row with your test data
- `payment_status` should be "paid"
- `amount_paid` should be 3900

### Test 2: Duplicate Prevention
1. Fill form again
2. **Double-click** the "Buy My Report" button rapidly
3. Complete payment

**Expected**: Only ONE new row created (not two)

### Test 3: Rate Limiting
Open browser console and run:

```javascript
// Try to create 6 payment intents rapidly
for(let i = 0; i < 6; i++) {
  fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({amount: 3900, formData: {
      email:'test@test.com', year:'2022', make:'Test', model:'Test', mileage:'10000', zipCode:'12345'
    }})
  }).then(r => r.json()).then(console.log);
}
```

**Expected**: First 3 succeed, then you get 429 errors with "Too many requests"

### Test 4: Honeypot Protection
1. Fill form
2. Open browser console
3. Run: `document.getElementById('website').value = 'bot-filled'`
4. Submit form

**Expected**: Form rejects with "Invalid submission detected"

### Test 5: Verify RLS (Read Protection)
Open browser console and run:

```javascript
// Try to read data as anonymous user
const { createClient } = window.supabase;
const client = createClient('YOUR_URL', 'YOUR_ANON_KEY');
const { data, error } = await client.from('lease_reports').select('*');
console.log('Data:', data); // Should be empty array []
console.log('Error:', error); // Should be null
```

**Expected**: Returns empty array (RLS blocks anonymous reads)

## Success Criteria

✅ All 5 tests pass
✅ One form submission = exactly one database row
✅ Duplicate clicks don't create duplicate rows
✅ Rate limiting works
✅ Honeypot blocks bots
✅ Anonymous users cannot read existing data

## Summary of Changes Made

**Code Changes:**
- Removed unused `submitToSupabase()` function from get-started.tsx
- Removed unused supabase import from get-started.tsx
- All other code remains the same (already has protections)

**Database:**
- Created new `lease_reports` table
- Enabled RLS with INSERT-only policy for anonymous users
- Added indexes for performance
- Added auto-update trigger for updated_at

**Environment:**
- Updated NEXT_PUBLIC_SUPABASE_URL
- Updated NEXT_PUBLIC_SUPABASE_ANON_KEY
- Stripe keys remain unchanged

## Troubleshooting

**"Cannot connect to database"**
- Check URL and anon key are correct in .env.local
- Restart Next.js dev server: `npm run dev`

**"Row Level Security violation"**
- Check RLS policy exists: Authentication → Policies
- Policy should be named "allow_anonymous_insert"
- Policy should allow INSERT with check (true)

**"Payment fails but no database row"**
- Check Stripe test keys are correct
- Check browser console for errors
- Check payment actually succeeded in Stripe Dashboard

**"Too many rows created"**
- This was the original problem - should NOT happen now
- If it does, check button disabled state and isProcessing checks

## Need Help?

Provide me with:
1. Your new Supabase project URL
2. Your new anon key
3. Any error messages you see

And I'll help troubleshoot!