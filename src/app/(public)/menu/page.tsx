import Link from "next/link";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";
import { Database } from "@/types/database.types";

interface MenuItem {
  id: number;
  item_name: string;
  menu_category: string;
  description: string | null;
  starting_price: number;
  is_available: boolean;
  has_size_options: boolean;
  allows_toppings: boolean;
}

async function getMenuItems() {
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

  const { data: menuItems } = await supabase.rpc("get_menu_system_overview");
  return (menuItems || []) as MenuItem[];
}

export default async function MenuPage() {
  const menuItems = await getMenuItems();

  // Filter out any items without an ID and group by category
  const itemsByCategory = menuItems.reduce(
    (acc, item) => {
      if (!item.menu_category) return acc;
      if (!acc[item.menu_category]) {
        acc[item.menu_category] = [];
      }
      acc[item.menu_category].push(item);
      return acc;
    },
    {} as Record<string, MenuItem[]>
  );

  const categories = Object.keys(itemsByCategory).sort();

  return (
    <main className="flex-1">
      <div className="container py-8">
        <h1 className="mb-8 text-4xl font-bold">Our Menu</h1>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">{category}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {itemsByCategory[category]
                .filter((item) => item.is_available)
                .map((item) => (
                  <div
                    key={`${category}-${item.id}-${item.item_name}`}
                    className="group relative overflow-hidden rounded-lg border bg-card"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{item.item_name}</h3>
                        <p className="font-medium">
                          ${item.starting_price.toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.has_size_options && (
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs">
                            Multiple Sizes
                          </span>
                        )}
                        {item.allows_toppings && (
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs">
                            Customizable Toppings
                          </span>
                        )}
                      </div>
                      <Button asChild className="mt-4 w-full">
                        <Link
                          href={`/menu/${category.toLowerCase()}/${item.id}`}
                        >
                          Order Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
