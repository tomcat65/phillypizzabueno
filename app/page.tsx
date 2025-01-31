import type { Database } from "@/types/supabase";
import { Suspense } from "react";
import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingPage } from "@/components/ui/loading";
import {
  Pizza,
  UtensilsCrossed,
  Leaf,
  Heart,
  Instagram,
  Facebook,
  Music2,
  Sparkles,
} from "lucide-react";
import { MenuStyles } from "./components/menu-styles";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type MenuCategory = Database["public"]["Tables"]["menu_categories"]["Row"] & {
  menu_items: Database["public"]["Tables"]["menu_items"]["Row"][];
};

type Special = {
  id: string;
  name: string | null;
  description: string | null;
  special_price: number | null;
  base_item_name: string | null;
  discount_percentage: number | null;
  start_date: string | null;
  end_date: string | null;
};

export default async function HomePage() {
  try {
    const cookieStore = cookies();
    const supabase = await createServerClient();

    // Fetch both categories and specials in parallel
    const [categoriesResponse, specialsResponse] = await Promise.all([
      supabase
        .from("menu_categories")
        .select("*, menu_items(*)")
        .eq("is_active", true)
        .order("display_order"),
      supabase.from("active_specials").select("*"),
    ]);

    const { data: categories, error: categoriesError } = categoriesResponse;
    const { data: specials, error: specialsError } = specialsResponse;

    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError);
      throw new Error("Failed to load menu categories");
    }

    if (specialsError) {
      console.error("Error fetching specials:", specialsError);
      throw new Error("Failed to load specials");
    }

    if (!categories || categories.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              No menu categories available
            </h1>
            <p className="text-gray-600 mt-2">Please check back later</p>
          </div>
        </div>
      );
    }

    return (
      <Suspense fallback={<LoadingPage />}>
        <main className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col">
          <MenuStyles />
          <div className="container mx-auto px-4 py-12 flex-grow">
            <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-3 mb-4">
                <Pizza className="h-12 w-12 text-[#E63946]" />
                <h1 className="text-5xl font-bold bg-gradient-to-r from-[#E63946] to-[#0074D9] text-transparent bg-clip-text">
                  PhillyPizzaBueno
                </h1>
                <UtensilsCrossed className="h-12 w-12 text-[#E63946]" />
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

            {/* Specials Section */}
            {specials && specials.length > 0 && (
              <div className="mb-16">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                    <h2 className="text-3xl font-bold text-[#E63946]">
                      Today's Specials
                    </h2>
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {specials.map((special) => (
                    <div
                      key={special.id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {special.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {special.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {special.special_price && (
                              <span className="text-2xl font-bold text-red-600">
                                ${special.special_price.toFixed(2)}
                              </span>
                            )}
                            {special.discount_percentage && (
                              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-medium">
                                {special.discount_percentage}% OFF
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/menu/specials/${special.id}`}
                            className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                          >
                            Order Now
                            <span className="ml-2">→</span>
                          </Link>
                        </div>
                        {special.end_date && (
                          <div className="mt-4 text-sm text-gray-500">
                            Valid until{" "}
                            {new Date(special.end_date).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 text-[#0074D9]">
                Our Menu
              </h1>
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
                        src={category.image_url || ""}
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

          {/* Footer */}
          <footer className="bg-red-700 text-white py-12 mt-auto">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold mb-6">@PhillyPizzaBueno</div>
                <div className="flex gap-6 mb-8">
                  <a
                    href="https://instagram.com/phillypizzabueno"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-200 transition-colors"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="https://facebook.com/phillypizzabueno"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-200 transition-colors"
                    aria-label="Follow us on Facebook"
                  >
                    <Facebook size={24} />
                  </a>
                  <a
                    href="https://tiktok.com/@phillypizzabueno"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-200 transition-colors"
                    aria-label="Follow us on TikTok"
                  >
                    <Music2 size={24} />
                  </a>
                </div>
                <div className="text-sm text-red-200">
                  © {new Date().getFullYear()} PhillyPizzaBueno. All rights
                  reserved.
                </div>
              </div>
            </div>
          </footer>
        </main>
      </Suspense>
    );
  } catch (error) {
    console.error("Error in HomePage:", error);
    notFound();
  }
}
