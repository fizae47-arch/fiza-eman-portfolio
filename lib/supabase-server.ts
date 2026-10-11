import { createClient } from "@supabase/supabase-js";

// Read-only client for server components. Returns null if env vars are missing,
// so the site falls back to built-in defaults instead of crashing.
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
