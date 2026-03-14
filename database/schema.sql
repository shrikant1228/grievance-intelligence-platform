-- Add upvotes column for the Citizen Support Wow Feature
ALTER TABLE public.complaints ADD COLUMN IF NOT EXISTS upvotes INTEGER DEFAULT 0;