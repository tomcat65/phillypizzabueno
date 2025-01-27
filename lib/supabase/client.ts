import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";

const getSupabaseUrl = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
};

const getSupabaseAnonKey = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
};

export function createClient() {
  return createBrowserClient<Database>(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookieOptions: {
      name: "sb-token",
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
    auth: {
      persistSession: true,
      autoRefreshToken: true,
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
