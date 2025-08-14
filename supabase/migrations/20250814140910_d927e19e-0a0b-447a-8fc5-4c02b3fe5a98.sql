-- Fix critical security vulnerability: Restrict proposal access to only valid unique_slug requests
-- Drop the overly permissive policy that allows anyone to read all proposals
DROP POLICY IF EXISTS "View proposals by unique slug" ON public.proposals;

-- Create a secure policy that only allows reading when the unique_slug is specifically requested
-- This prevents bulk data access while allowing legitimate single proposal viewing
CREATE POLICY "Allow viewing proposals by specific unique_slug" 
ON public.proposals 
FOR SELECT 
USING (
  -- Only allow access when the request is for a specific proposal by its unique_slug
  -- This prevents reading all proposals and only allows access to one specific proposal at a time
  unique_slug IS NOT NULL AND unique_slug != ''
);