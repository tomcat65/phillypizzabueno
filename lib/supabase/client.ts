import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export function createClient() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    cookies: {
      name: "sb-token",
      lifetime: 60 * 60 * 24 * 7, // 7 days
      domain: "",
      path: "/",
      sameSite: "lax",
    },
  });
}

let browserClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseBrowserClient() {
  if (typeof window === "undefined") return null;
  if (!browserClient) {
    browserClient = createClient();
  }
  return browserClient;
}

export const supabase = getSupabaseBrowserClient();
