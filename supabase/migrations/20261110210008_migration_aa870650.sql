-- Drop existing problematic policies and create secure ones for lease_review_leads
DROP POLICY IF EXISTS "anon_insert" ON lease_review_leads;
DROP POLICY IF EXISTS "anon_insert_lease_review_leads" ON lease_review_leads;
DROP POLICY IF EXISTS "authenticated_update_own" ON lease_review_leads;
DROP POLICY IF EXISTS "public_read" ON lease_review_leads;

-- Create new secure policy: anonymous users can INSERT only
CREATE POLICY "anonymous_insert_only" ON lease_review_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- No SELECT policy for anonymous users (they cannot read any records)
-- No UPDATE policy for anonymous users (all updates go through service role API routes)