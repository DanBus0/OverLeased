# Supabase Setup Instructions

## Current Status
This document tracks the migration to a new Supabase project for the OverLeased vReport application.

## Project Requirements

### Database Schema
The application requires ONE table: `lease_reports`

**Table: lease_reports**
- `id` (UUID, primary key, auto-generated)
- `created_at` (timestamp, auto-generated)
- `updated_at` (timestamp, auto-generated)
- `year` (text, required) - Vehicle year
- `make` (text, required) - Vehicle make
- `model` (text, required) - Vehicle model
- `current_mileage` (integer, required) - Current odometer reading
- `email` (text, required) - Customer email
- `zip_code` (text, required) - Customer ZIP code
- `payment_status` (text, default 'pending') - Payment status
- `payment_intent_id` (text, nullable) - Stripe payment intent ID
- `amount_paid` (integer, nullable) - Amount paid in cents
- `report_delivered` (boolean, default false) - Report delivery status
- `report_delivered_at` (timestamp, nullable) - When report was delivered

### Row Level Security (RLS)
- **Enabled**: YES
- **Anonymous INSERT**: Allowed (form submissions)
- **Anonymous SELECT**: Denied (privacy protection)
- **Anonymous UPDATE**: Denied (prevents tampering)
- **Anonymous DELETE**: Denied (data protection)

### Data Flow
1. User fills form on `/get-started` → data saved to sessionStorage
2. User clicks "Buy My Report" → redirect to `/checkout`
3. Checkout page creates Stripe payment intent
4. User completes payment → Stripe confirms payment
5. **ONE database insert** to `lease_reports` with payment details
6. Redirect to `/report-purchased`

### Security Features
- Rate limiting: 5 requests/60s (general), 3 requests/120s (payment)
- Honeypot field: Catches bot submissions
- Button disabling: Prevents double submissions
- Server-side validation: Validates all required fields
- Payment validation: Ensures amount is exactly $39

### Email Functionality
Currently NOT implemented. The application:
- Stores lead in database
- Shows success page
- Does NOT send automated emails (yet)

If email is added later:
- Use Supabase Edge Function or Next.js API route
- Trigger ONLY on successful payment
- Include idempotency key to prevent duplicates
- Rate limit email sending

## Environment Variables Required

### For .env.local (Development)
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...YOUR_ANON_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### For Vercel (Production)
Add these in Vercel Dashboard → Settings → Environment Variables:
1. `NEXT_PUBLIC_SUPABASE_URL` - Your project URL
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your anon/public key
3. `STRIPE_SECRET_KEY` - Your Stripe secret key
4. `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
5. `NEXT_PUBLIC_SITE_URL` - Your production URL

**IMPORTANT**: Never add `SUPABASE_SERVICE_ROLE_KEY` to Vercel environment variables - it should only be used in secure backend contexts.

## Testing Checklist

After setup, test:
- [ ] Form submission creates exactly ONE row in database
- [ ] Duplicate button clicks do NOT create duplicate rows
- [ ] Honeypot field blocks bot submissions
- [ ] Rate limiting blocks excessive requests
- [ ] Page refresh does NOT create database rows automatically
- [ ] Payment success creates database row with correct data
- [ ] Failed payment does NOT create database row
- [ ] Anonymous users cannot read/update/delete existing rows

## Verification Steps

1. **Submit Test Form**
   - Go to `/get-started`
   - Fill form with test data
   - Complete checkout with Stripe test card: `4242 4242 4242 4242`
   - Verify ONE row appears in Supabase dashboard

2. **Test Double-Click Protection**
   - Fill form
   - Double-click submit button rapidly
   - Verify only ONE payment intent created
   - Verify only ONE database row created

3. **Test Honeypot**
   - Use browser console: `document.getElementById('website').value = 'bot'`
   - Submit form
   - Verify submission is rejected

4. **Test Rate Limiting**
   - Submit form 6 times in 60 seconds
   - 6th request should return 429 error

5. **Verify RLS**
   - In browser console: `supabase.from('lease_reports').select('*')`
   - Should return empty array (not null) - RLS blocking reads

## Migration Notes

**Old Project**: nbxdfscgwnpqxigocgck.supabase.co (DO NOT DELETE)
**New Project**: Will be created by you

**Data Migration**: Not required - starting fresh
**Downtime**: None - update environment variables after creating new project