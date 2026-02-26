
CREATE TABLE public.failed_contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  check_in_date TEXT,
  error_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.failed_contact_submissions ENABLE ROW LEVEL SECURITY;

-- Only allow inserts from service role (edge function)
-- No public read/write access needed
