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
                <span className="relative z-10 text-white text-shadow-sm">
                  Philly-Italian
                </span>
              </span>{" "}
              pizzas,{" "}
              <span className="relative inline-flex items-center px-3 py-1 font-bold rounded-md overflow-hidden">
                <span className="absolute inset-0">
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,#B31942_7.69%,#B31942_15.38%,white_15.38%,white_23.07%)]" />
                  <div className="absolute top-0 left-0 bg-[#041E42] h-[53.85%] w-[40%] z-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at 20% 20%, white 1.5px, transparent 2px),
                                  radial-gradient(circle at 50% 20%, white 1.5px, transparent 2px),
                                  radial-gradient(circle at 80% 20%, white 1.5px, transparent 2px),
                                  radial-gradient(circle at 20% 50%, white 1.5px, transparent 2px),
                                  radial-gradient(circle at 50% 50%, white 1.5px, transparent 2px),
                                  radial-gradient(circle at 80% 50%, white 1.5px, transparent 2px),
                                  radial-gradient(circle at 20% 80%, white 1.5px, transparent 2px),
                                  radial-gradient(circle at 50% 80%, white 1.5px, transparent 2px),
                                  radial-gradient(circle at 80% 80%, white 1.5px, transparent 2px)`,
                        backgroundSize: "100% 100%",
                      }}
                    />
                  </div>
                </span>
                <span className="relative z-20 text-white font-extrabold [text-shadow:1px_1px_0_#000,-1px_1px_0_#000,1px_-1px_0_#000,-1px_-1px_0_#000]">
                  American
                </span>
              </span>{" "}
              wings, and more. Made with fresh ingredients
              <Leaf className="h-5 w-5 text-green-500 inline align-text-bottom mx-1" />
              and love
              <Heart className="h-5 w-5 text-red-500 fill-red-500 inline align-text-bottom ml-1" />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {categories?.map((category: MenuCategory) => (
              <Link
                key={category.id}
                href={`/menu/${category.id}`}
                className="group transform transition-all duration-300 hover:scale-[1.02]"
              >
                <Card className="overflow-hidden border-2 hover:border-red-500 transition-colors">
                  <div className="relative h-64 w-full">
                    <Image
                      src={category.image_url}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <CardHeader className="absolute bottom-0 left-0 right-0 text-white">
                      <CardTitle className="text-3xl font-serif text-center">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Suspense>
  );
}
