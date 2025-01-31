import { Suspense } from "react";
import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingPage } from "@/components/ui/loading";
import {
  Pizza,
  UtensilsCrossed,
  Instagram,
  Facebook,
  Music2,
} from "lucide-react";
import Link from "next/link";
import type { Database } from "@/types/supabase";
import { PizzaItem } from "./components/pizza-item";
import { DefaultItem } from "./components/default-item";

type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"] & {
  image_url?: string | null;
  description?: string | null;
  sizes?: Array<{
    id: string;
    size_inches?: number;
    price_modifier?: number;
  }>;
};

type MenuCategory = Database["public"]["Tables"]["menu_categories"]["Row"] & {
  menu_items: MenuItem[];
};

interface MenuCategoryPageProps {
  params: {
    categoryId: string;
  };
}

export async function generateMetadata({ params }: MenuCategoryPageProps) {
  const supabase = createServerClient();

  const { data: category } = await supabase
    .from("menu_categories")
    .select("name")
    .eq("id", params.categoryId)
    .single();

  return {
    title: category?.name ?? "Menu Category",
  };
}

function MenuItem({
  item,
  categoryId,
}: {
  item: MenuItem;
  categoryId: string;
}) {
  const isPizza = categoryId === "f85eeca1-7e83-47ab-9159-3708644b530f";

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      {item.image_url && (
        <div className="relative h-56 w-full">
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={false}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-serif text-gray-900 mb-3">{item.name}</h3>
        {item.description && (
          <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
        )}

        {/* Size and Price Information */}
        {isPizza && item.sizes && item.sizes.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {item.sizes.map((size) => (
              <div
                key={size.id}
                className="bg-gray-50 p-2 rounded-lg text-center hover:bg-gray-100 transition-colors"
              >
                <div className="text-sm font-medium text-gray-600">
                  {size.size_inches}"
                </div>
                <div className="text-base font-bold text-red-700">
                  ${(item.base_price * (size.price_modifier || 1)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xl font-medium text-red-700 mb-4">
            ${item.base_price.toFixed(2)}
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <Link
            href={`/menu/${categoryId}/${item.id}`}
            className="inline-flex items-center text-red-700 hover:text-red-800 font-medium transition-colors"
          >
            Customize
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

type BasePizza = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  menu_item_id: string;
};

type PizzaSize = {
  id: string;
  size_inches: number;
  price_modifier: number;
};

type PizzaVariant = {
  id: string;
  base_pizza_id: string;
  size_id: string;
  base_price: number;
};

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const supabase = createServerClient();
  const isPizzaCategory =
    params.categoryId === "f85eeca1-7e83-47ab-9159-3708644b530f";

  if (isPizzaCategory) {
    // Fetch all pizza-related data
    const [basePizzasResult, sizesResult, variantsResult] = await Promise.all([
      supabase.from("base_pizzas").select("*"),
      supabase
        .from("pizza_sizes")
        .select("id, size_inches, size_name")
        .order("size_inches"),
      supabase.from("pizza_variants").select("*"),
    ]);

    if (!basePizzasResult.data || !sizesResult.data || !variantsResult.data) {
      console.error("Error fetching pizza data");
      notFound();
    }

    // Process the data to create a complete pizza menu
    const pizzas = basePizzasResult.data.map((basePizza) => {
      // Get all variants for this base pizza
      const pizzaVariants = variantsResult.data
        .filter((variant) => variant.base_pizza_id === basePizza.id)
        .map((variant) => {
          // Find the size for this variant
          const size = sizesResult.data.find(
            (size) => size.id === variant.size_id
          );
          return {
            ...variant,
            size,
          };
        });

      return {
        ...basePizza,
        variants: pizzaVariants,
      };
    });

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-grow py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<LoadingPage />}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pizzas.map((pizza) => (
                  <PizzaItem
                    key={pizza.id}
                    pizza={pizza}
                    categoryId={params.categoryId}
                  />
                ))}
              </div>
            </Suspense>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-red-700 text-white py-12">
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
      </div>
    );
  }

  // For non-pizza categories, fetch regular menu items
  const { data: category, error: categoryError } = await supabase
    .from("menu_categories")
    .select("*, menu_items(*)")
    .eq("id", params.categoryId)
    .single();

  if (categoryError || !category) {
    console.error("Error fetching category:", categoryError);
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<LoadingPage />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.menu_items?.map((item) => (
                <DefaultItem
                  key={item.id}
                  item={item}
                  categoryId={params.categoryId}
                />
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
