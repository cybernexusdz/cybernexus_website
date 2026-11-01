import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const hasValidCreds =
  isValidUrl(supabaseUrl) &&
  Boolean(supabaseAnonKey && supabaseAnonKey !== "your_supabase_anon_key_here");

if (!hasValidCreds) {
  console.warn(
    "Supabase credentials not configured or invalid. Please set valid VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.",
  );
}

// Fallback dummy credentials to prevent createClient from throwing an uncaught error at startup
const clientUrl = isValidUrl(supabaseUrl)
  ? supabaseUrl!
  : "https://placeholder.supabase.co";
const clientKey =
  supabaseAnonKey && supabaseAnonKey !== "your_supabase_anon_key_here"
    ? supabaseAnonKey
    : "placeholder";

export const supabase = createClient(clientUrl, clientKey);

