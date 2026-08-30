import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Server-side client for read-only public data (winter_weeks has an
// "anyone can read" RLS policy). Reuses the same public URL/key the
// browser client uses — no service role key needed here.
export function getSupabaseServerClient() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error('Missing VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY');
  }
  return createClient<Database>(url, key);
}
