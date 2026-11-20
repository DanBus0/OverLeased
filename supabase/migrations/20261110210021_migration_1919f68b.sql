-- Drop existing problematic policies and create secure ones for dealer_coordination_leads
DROP POLICY IF EXISTS "anon_insert" ON dealer_coordination_leads;
DROP POLICY IF EXISTS "anon_insert_dealer_coordination" ON dealer_coordination_leads;
DROP POLICY IF EXISTS "authenticated_update_own" ON dealer_coordination_leads;
DROP POLICY IF EXISTS "public_read" ON dealer_coordination_leads;

-- Create new secure policy: anonymous users can INSERT only
CREATE POLICY "anonymous_insert_only" ON dealer_coordination_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- No SELECT policy for anonymous users (they cannot read any records)
-- No UPDATE policy for anonymous users (all updates go through service role API routes)