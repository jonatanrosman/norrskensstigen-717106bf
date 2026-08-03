-- Ensure no Data API role can reach the table
REVOKE ALL ON public.failed_contact_submissions FROM anon;
REVOKE ALL ON public.failed_contact_submissions FROM authenticated;
GRANT ALL ON public.failed_contact_submissions TO service_role;

ALTER TABLE public.failed_contact_submissions ENABLE ROW LEVEL SECURITY;

-- Explicit deny policies: this table is server-only (written by the
-- notify-form-error edge function using the service role, which bypasses RLS).
DROP POLICY IF EXISTS "No client read access to failed submissions" ON public.failed_contact_submissions;
CREATE POLICY "No client read access to failed submissions"
  ON public.failed_contact_submissions
  FOR SELECT
  TO anon, authenticated
  USING (false);

DROP POLICY IF EXISTS "No client insert access to failed submissions" ON public.failed_contact_submissions;
CREATE POLICY "No client insert access to failed submissions"
  ON public.failed_contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

DROP POLICY IF EXISTS "No client update access to failed submissions" ON public.failed_contact_submissions;
CREATE POLICY "No client update access to failed submissions"
  ON public.failed_contact_submissions
  FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "No client delete access to failed submissions" ON public.failed_contact_submissions;
CREATE POLICY "No client delete access to failed submissions"
  ON public.failed_contact_submissions
  FOR DELETE
  TO anon, authenticated
  USING (false);