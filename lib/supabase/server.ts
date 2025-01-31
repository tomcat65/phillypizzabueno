import { createServerClient as createClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

export function createServerClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: async (name: string) => {
          const cookieStore = await cookies(); // Await the cookies() call
          const cookie = await cookieStore.get(name); // Correctly await async operation
          return cookie?.value ?? "";
        },
        set: async (name: string, value: string, options: any) => {
          try {
            const cookieStore = await cookies(); // Await the cookies() call
            await cookieStore.set(name, value, options); // Async setting
          } catch (error) {
            console.error("Error setting cookie:", error);
          }
        },
        remove: async (name: string, options: any) => {
          try {
            const cookieStore = await cookies(); // Await the cookies() call
            await cookieStore.delete(name); // Async deletion
          } catch (error) {
            console.error("Error removing cookie:", error);
          }
        },
      },
    }
  );
}
