import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  return NextResponse.json({
    supabase: {
      url: {
        exists: !!supabaseUrl,
        value: supabaseUrl?.slice(0, 8) + "..." + supabaseUrl?.slice(-5),
      },
      anonKey: {
        exists: !!supabaseAnonKey,
        length: supabaseAnonKey?.length ?? 0,
        preview:
          supabaseAnonKey?.slice(0, 5) + "..." + supabaseAnonKey?.slice(-5),
      },
      serviceKey: {
        exists: !!supabaseServiceKey,
        length: supabaseServiceKey?.length ?? 0,
        preview:
          supabaseServiceKey?.slice(0, 5) +
          "..." +
          supabaseServiceKey?.slice(-5),
      },
    },
  });
}
