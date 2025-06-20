
-- Update the unique_slug column to have a default value so it's not required in inserts
-- This will make the TypeScript types reflect that unique_slug is optional during inserts
ALTER TABLE public.proposals 
ALTER COLUMN unique_slug SET DEFAULT '';

-- Update the trigger to ensure it always sets the unique_slug on insert
CREATE OR REPLACE FUNCTION public.set_proposal_slug()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
  -- Always generate the slug on insert, regardless of what was passed
  NEW.unique_slug = generate_proposal_slug(NEW.partner_name, NEW.id);
  RETURN NEW;
END;
$function$;

-- Ensure the trigger exists and fires before insert
DROP TRIGGER IF EXISTS set_proposal_slug_trigger ON public.proposals;
CREATE TRIGGER set_proposal_slug_trigger
  BEFORE INSERT ON public.proposals
  FOR EACH ROW
  EXECUTE FUNCTION set_proposal_slug();
