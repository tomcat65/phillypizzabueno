import type { Database } from "@/types/supabase";
import { Suspense } from "react";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingPage } from "@/components/ui/loading";
import { Pizza, UtensilsCrossed } from "lucide-react";

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
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Pizza className="h-12 w-12 text-red-600" />
              <h1 className="text-5xl font-bold text-gray-900">Our Menu</h1>
              <UtensilsCrossed className="h-12 w-12 text-red-600" />
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our delicious selection of authentic Italian pizzas,
              wings, and more. Made with fresh ingredients and love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories?.map((category: MenuCategory) => (
              <Card
                key={category.id}
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-red-500"
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-serif">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {category.menu_items?.length} items available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-6 text-lg group-hover:scale-105 transition-transform"
                  >
                    <Link href={`/menu/${category.id}`}>View Menu</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </Suspense>
  );
}
