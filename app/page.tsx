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

const categoryImages = {
  pizza: "/images/pizza-category.jpg",
  wings: "/images/wings-category.jpg",
  sides: "/images/sides-category.jpg",
  beverages: "/images/beverages-category.jpg",
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
                  Italian
                </span>
              </span>{" "}
              pizzas,{" "}
              <span className="relative inline-flex items-center px-3 py-1 font-bold rounded-md overflow-hidden">
                <span className="absolute inset-0">
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,#B31942_7.7%,white_7.7%,white_15.4%,#B31942_15.4%,#B31942_23.1%,white_23.1%,white_30.8%,#B31942_30.8%,#B31942_38.5%,white_38.5%,white_46.2%,#B31942_46.2%,#B31942_53.9%,white_53.9%)]"></div>
                  <div className="absolute top-0 left-0 w-[40%] h-[53.9%] bg-[#041E42] flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)_repeat] [background-size:10px_10px] opacity-90"></div>
                  </div>
                </span>
                <span className="relative z-10 text-white font-extrabold [text-shadow:2px_2px_4px_rgba(0,0,0,0.8),0_0_4px_rgba(0,0,0,0.4)]">
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
                      src={
                        categoryImages[
                          category.id as keyof typeof categoryImages
                        ] || "/images/default-category.jpg"
                      }
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
