import Link from "next/link";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";
import { Database } from "@/types/database.types";

async function getMenuData() {
  const cookieStore = await cookies();
  const supabase = createServerClient<Database>(
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

  const { data: menuOverview } = await supabase.rpc("get_menu_system_overview");

  const { data: categories } = await supabase
    .from("active_categories")
    .select("*")
    .order("display_order");

  const { data: beverages } = await supabase.rpc("get_available_beverages");

  return {
    overview: menuOverview || [],
    categories: categories || [],
    beverages: beverages || [],
  };
}

export default async function Home() {
  const { categories, overview } = await getMenuData();
  const totalItems = overview?.length || 0;
  const specialsCount =
    overview?.filter((item) => item.is_special)?.length || 0;

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/25" />
        <div className="relative h-[600px] bg-primary/10">
          <div className="container flex h-full flex-col justify-center gap-4">
            <h1 className="max-w-2xl text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              The Best Pizza in Philadelphia
            </h1>
            <p className="max-w-[600px] text-lg sm:text-xl">
              Explore our menu of {totalItems} delicious items
              {specialsCount > 0 &&
                ` including ${specialsCount} daily specials`}
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href="/menu">View Full Menu</Link>
              </Button>
              {specialsCount > 0 && (
                <Button asChild variant="outline" size="lg">
                  <Link href="/specials">Today's Specials</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Categories Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-8 text-3xl font-bold">Our Menu</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const itemCount =
                overview?.filter((item) => item.category_id === category.id)
                  ?.length || 0;

              return (
                <Link
                  key={category.id}
                  href={`/menu#${category.name?.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-lg border bg-card"
                >
                  <div className="aspect-video overflow-hidden bg-muted">
                    {category.image_url && (
                      <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        style={{
                          backgroundImage: `url('${category.image_url}')`,
                        }}
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {itemCount} {itemCount === 1 ? "item" : "items"} available
                    </p>
                    <Button variant="ghost" className="mt-2 w-full">
                      Browse Category
                    </Button>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
