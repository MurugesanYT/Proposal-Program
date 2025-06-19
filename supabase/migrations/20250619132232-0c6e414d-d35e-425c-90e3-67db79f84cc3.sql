
-- Create the trigger to automatically set the unique_slug when inserting a new proposal
CREATE OR REPLACE TRIGGER set_proposal_slug_trigger
  BEFORE INSERT ON public.proposals
  FOR EACH ROW
  EXECUTE FUNCTION public.set_proposal_slug();

-- Also create the trigger to update the updated_at timestamp
CREATE OR REPLACE TRIGGER update_proposal_updated_at
  BEFORE UPDATE ON public.proposals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
