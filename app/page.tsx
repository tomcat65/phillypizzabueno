import type { Database } from "@/types/supabase";
import { Suspense } from "react";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingPage } from "@/components/ui/loading";
import { Pizza, UtensilsCrossed, Leaf, Heart } from "lucide-react";
import { MenuStyles } from "./components/menu-styles";

type MenuCategory = Database["public"]["Tables"]["menu_categories"]["Row"] & {
  menu_items: Database["public"]["Tables"]["menu_items"]["Row"][];
};

export default async function HomePage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: categories } = await supabase
    .from("menu_categories")
    .select("*, menu_items(*)")
    .eq("is_active", true)
    .order("display_order");

  return (
    <Suspense fallback={<LoadingPage />}>
      <main className="min-h-screen bg-gradient-to-b from-red-50 to-white">
        <MenuStyles />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Pizza className="h-12 w-12 text-red-600" />
              <h1 className="text-5xl font-bold text-gray-900">Our Menu</h1>
              <UtensilsCrossed className="h-12 w-12 text-red-600" />
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our delicious selection of authentic{" "}
              <span className="relative inline-flex items-center px-3 py-1 font-bold rounded-md overflow-hidden">
                <span className="absolute inset-0 bg-[linear-gradient(to_right,#008C45_33%,white_33%_66%,#CD212A_66%)] opacity-90"></span>
                <span className="relative z-10 text-white [text-shadow:1px_1px_0_#000,-1px_1px_0_#000,1px_-1px_0_#000,-1px_-1px_0_#000]">
                  Philly-Italian
                </span>
              </span>{" "}
              style pizzas,{" "}
              <span
                className="relative inline-flex items-center justify-center px-3 py-1 font-bold rounded-md overflow-hidden min-w-[100px] h-[32px]"
                style={{
                  background: "#B31942",
                  boxShadow: "inset 0 0 0 1000px rgba(255,255,255,.15)",
                }}
              >
                <span
                  className="absolute left-0 top-0 h-full w-[40%]"
                  style={{
                    background: "#041E42",
                    backgroundImage: `
                      radial-gradient(circle at 20% 35%, white 2px, transparent 2px),
                      radial-gradient(circle at 50% 35%, white 2px, transparent 2px),
                      radial-gradient(circle at 80% 35%, white 2px, transparent 2px),
                      radial-gradient(circle at 20% 65%, white 2px, transparent 2px),
                      radial-gradient(circle at 50% 65%, white 2px, transparent 2px),
                      radial-gradient(circle at 80% 65%, white 2px, transparent 2px)
                    `,
                    backgroundSize: "100% 100%",
                  }}
                />
                <span
                  className="absolute left-[40%] top-0 h-full w-[60%]"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      180deg,
                      #B31942 0%,
                      #B31942 15.4%,
                      white 15.4%,
                      white 30.8%
                    )`,
                  }}
                />
                <span className="relative z-20 text-white font-extrabold [text-shadow:1px_1px_0_#000,-1px_1px_0_#000,1px_-1px_0_#000,-1px_-1px_0_#000] whitespace-nowrap">
                  American
                </span>
              </span>{" "}
              wings, and more. Made with fresh ingredients
              <Leaf className="h-5 w-5 text-green-500 inline align-text-bottom mx-1" />
              and love{" "}
              <Heart className="h-4 w-4 text-red-500 fill-red-500 inline align-baseline" />
            </p>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {categories?.map((category: MenuCategory) => (
              <Link
                key={category.id}
                href={`/menu/${category.id}`}
                className="group transform transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center">
                  <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={category.image_url}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-red-600 uppercase tracking-wide">
                    {category.name}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Suspense>
  );
}
