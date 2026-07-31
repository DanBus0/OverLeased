# Switching Stripe to Live Mode for Production

This guide explains how to configure OverLeased to accept real payments in production while keeping test mode for development.

## Overview

- **Development/Preview**: Uses test keys (sk_test_..., pk_test_...) for safe testing
- **Production**: Uses live keys (sk_live_..., pk_live_...) for real payments

The code is already production-ready. You only need to update environment variables in Vercel.

## Current Payment Structure

✅ **Already Configured:**
- Personalized Lease Exit Guide: $39 (hardcoded as 3900 cents)
- Dealer Coordination Service: $60 (hardcoded as 6000 cents)
- No Price IDs needed - using Stripe PaymentIntents directly
- Duplicate payment protection via PaymentIntent metadata
- Server-side payment validation
- Supabase database tracking

## Step 1: Update Vercel Environment Variables

### Required Live Keys:

1. Go to your Vercel project: https://vercel.com/dashboard
2. Navigate to: **Settings → Environment Variables**
3. Add **Production** environment variables:

```
STRIPE_SECRET_KEY=sk_live_your_live_secret_key_here

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key_here

STRIPE_WEBHOOK_SECRET=whsec_live_your_webhook_signing_secret_here
```

**Get your live keys from:** https://dashboard.stripe.com/apikeys

### Important:
- ✅ Keep test keys for **Preview** and **Development** environments
- ✅ Only use live keys for **Production** environment
- ✅ After updating, redeploy your production site

## Step 2: Configure Stripe Webhooks (Production)

### Setup Production Webhook:

1. Go to Stripe Dashboard: https://dashboard.stripe.com/webhooks
2. Click **"Add endpoint"**
3. Configure:
   - **Endpoint URL**: `https://overleased.com/api/webhook`
   - **Description**: "OverLeased Production Webhook"
   - **Events to listen for**: Select these events:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `charge.refunded`

4. Click **"Add endpoint"**
5. Copy the **Signing secret** (starts with `whsec_`)
6. Add to Vercel environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_signing_secret_here
   ```

### Test Webhook (Development):

For local testing, use Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/webhook
```

## Step 3: Test Webhook in Sandbox Mode

### Pre-Launch Testing:

Before going live, test the complete payment and fulfillment flow in sandbox mode:

1. **Local Development Testing:**
   ```bash
   # Terminal 1: Start your dev server
   npm run dev
   
   # Terminal 2: Forward webhooks to local
   stripe listen --forward-to localhost:3000/api/webhook
   ```

2. **Use Stripe Test Cards:**
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Requires Auth: `4000 0025 0000 3155`

3. **Verify Complete Flow:**
   - [ ] Payment processes successfully
   - [ ] Database record created in Supabase
   - [ ] Webhook received and processed
   - [ ] Customer confirmation email sent
   - [ ] Support notification email sent
   - [ ] PaymentIntent ID recorded correctly
   - [ ] Payment status is "paid" or "succeeded"
   - [ ] No duplicate records or emails

4. **Test Failure Scenarios:**
   - [ ] Use declined test card → payment_status = "failed"
   - [ ] Close browser before completion → webhook creates record
   - [ ] Process same payment twice → no duplicate records (idempotency)

### Production Deployment Checklist:

- [ ] Live API keys added to Vercel Production environment only
- [ ] Test keys remain in Preview/Development environments
- [ ] Production webhook endpoint configured in Stripe Dashboard
- [ ] Webhook signing secret added to Vercel
- [ ] All sandbox tests passing
- [ ] Production deployment completed
- [ ] Monitor first few production payments closely

### What's Already Protected:

✅ **Security & Validation:**
- Secret key is server-side only (never exposed to browser)
- Payment amounts validated server-side ($39 and $60 only)
- Rate limiting on payment endpoints
- Honeypot fields block bots
- Payment success verified via Stripe PaymentIntent status
- Failed/abandoned payments not marked as paid

✅ **Customer Flow:**
- Confirmation emails sent after successful payment
- Database records created only after payment succeeds
- Support notifications for new purchases
- Proper error handling and user feedback

## Step 4: Configure Production Webhook

Webhooks provide authoritative backup for payment fulfillment, ensuring no customer gets charged without receiving their purchase even if their browser fails.

### 4.1 Create Webhook Endpoint in Stripe

1. Go to Stripe Dashboard: https://dashboard.stripe.com/webhooks
2. Click **"Add endpoint"**
3. Configure:
   - **Endpoint URL**: `https://overleased.com/api/webhook`
   - **Description**: "OverLeased Production Webhook"
   - **Events to listen for**: Select these events:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `charge.refunded`
   - **API Version**: Select the latest version (or 2025-02-24.acacia to match code)
4. Click **"Add endpoint"**
5. Copy the **Signing secret** (starts with `whsec_`)

### 4.2 Add Webhook Secret to Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add new variable:
   - **Name**: `STRIPE_WEBHOOK_SECRET`
   - **Value**: `whsec_...` (the signing secret from Stripe)
   - **Environment**: Production only
3. Save and redeploy

### 4.3 How the Webhook Works

**Idempotent fulfillment** - prevents duplicate charges and emails:
- Uses PaymentIntent ID as unique identifier
- Checks database before creating records
- Never sends duplicate emails
- Both browser flow and webhook can run safely

**Service Detection**:
- $39 payment → Lease Exit Guide
- $60 payment → Dealer Coordination Service
- Metadata includes all customer details

**Failure Handling**:
- `payment_intent.payment_failed` → marks payment as failed
- `charge.refunded` → updates status to refunded
- Customer never gets charged without database record

**Why Both Browser + Webhook?**:
- Browser flow: Immediate customer feedback and redirect
- Webhook: Authoritative backup if browser crashes/closes
- Both use same idempotency logic - safe to run together

## Rollback to Test Mode

If you need to switch back to test mode:

1. Go to Vercel → Settings → Environment Variables
2. Change Production environment variables back to test keys:
   - `STRIPE_SECRET_KEY=sk_test_...`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...`
3. Redeploy production

## Support

If payments fail after switching to live mode:

1. Check Stripe Dashboard → Logs for error details
2. Verify environment variables are set correctly in Vercel
3. Check webhook endpoint is receiving events
4. Review Vercel deployment logs for errors

## Price Changes (Future)

If you need to change prices later:

1. Update hardcoded amounts in:
   - `src/pages/api/create-payment-intent.ts` (lines with 3900 and 6000)
   - `src/pages/checkout.tsx` (display text)
   - `src/pages/dealer-coordination.tsx` (DEALER_COORDINATION_PRICE and DEALER_COORDINATION_AMOUNT)

2. No Stripe Price IDs to update - amounts are direct PaymentIntents

## Additional Notes

- All database records from test mode remain separate
- Customer emails from test mode went to test@example.com addresses
- Production will send real emails to support@overleased.com
- Stripe test data does not transfer to live mode
- Consider testing on staging/preview deployment first before production