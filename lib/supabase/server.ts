import { createServerClient as createClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

export async function createServerClient() {
  // Move cookies() inside the functions that need it to avoid sync execution issues
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: async (name: string) => {
          const cookieStore = cookies(); // Call inside async function
          const cookie = await cookieStore.get(name);
          return cookie?.value ?? "";
        },
        set: async (name: string, value: string, options: any) => {
          try {
            const cookieStore = cookies(); // Ensure fresh context
            await cookieStore.set(name, value, options);
          } catch (error) {
            console.error("Error setting cookie:", error);
          }
        },
        remove: async (name: string, options: any) => {
          try {
            const cookieStore = cookies();
            await cookieStore.delete(name);
          } catch (error) {
            console.error("Error removing cookie:", error);
          }
        },
      },
    }
  );
}

