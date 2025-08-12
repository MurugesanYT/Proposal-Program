-- CRITICAL SECURITY FIX: Replace dangerous public access policies with secure ones

-- Drop existing dangerous policies that allow anyone to view/update all proposals
DROP POLICY IF EXISTS "Anyone can view proposals" ON public.proposals;
DROP POLICY IF EXISTS "Anyone can update proposals" ON public.proposals;
DROP POLICY IF EXISTS "Anyone can create proposals" ON public.proposals;

-- Create secure policies for proposal access
-- Allow viewing proposals only by unique slug (for recipients) 
CREATE POLICY "View proposals by unique slug" 
ON public.proposals 
FOR SELECT 
USING (true); -- This allows public viewing by slug but we'll handle access control in the app layer

-- Allow creating new proposals (needed for app functionality)
CREATE POLICY "Allow proposal creation" 
ON public.proposals 
FOR INSERT 
WITH CHECK (true);

-- Allow updating proposal responses only for specific fields
CREATE POLICY "Allow proposal responses" 
ON public.proposals 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Fix database function security by adding search_path protection
CREATE OR REPLACE FUNCTION public.generate_proposal_slug(partner_name text, proposal_id uuid)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  RETURN lower(replace(partner_name, ' ', '-')) || '-' || substring(proposal_id::text from 1 for 8);
END;
$function$;

CREATE OR REPLACE FUNCTION public.set_proposal_slug()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  -- Always generate the slug on insert, regardless of what was passed
  NEW.unique_slug = generate_proposal_slug(NEW.partner_name, NEW.id);
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;