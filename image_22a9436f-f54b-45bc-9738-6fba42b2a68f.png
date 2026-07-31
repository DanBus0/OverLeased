-- Add UNIQUE constraint to payment_intent_id in lease_review_leads
ALTER TABLE lease_review_leads 
ADD CONSTRAINT lease_review_leads_payment_intent_id_unique 
UNIQUE (payment_intent_id);

-- Add UNIQUE constraint to payment_intent_id in dealer_coordination_leads
ALTER TABLE dealer_coordination_leads 
ADD CONSTRAINT dealer_coordination_leads_payment_intent_id_unique 
UNIQUE (payment_intent_id);