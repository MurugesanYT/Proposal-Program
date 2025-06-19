
-- Add the proposal_type column to the proposals table if it doesn't exist
ALTER TABLE public.proposals 
ADD COLUMN IF NOT EXISTS proposal_type text NOT NULL DEFAULT 'marriage';
