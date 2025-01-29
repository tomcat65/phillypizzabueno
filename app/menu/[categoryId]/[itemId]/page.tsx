import { createServerClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ItemLoading from "./loading";
import { ItemCustomizer } from "./item-customizer.client";
import { ItemError } from "./error-boundary.client";

type PizzaSize = Database["public"]["Tables"]["pizza_sizes"]["Row"];
type WingQuantity = Database["public"]["Tables"]["wing_quantities"]["Row"];
type Topping = Database["public"]["Tables"]["toppings"]["Row"];
type WingSauce = Database["public"]["Tables"]["wing_sauces"]["Row"];
type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"];

export default async function ItemPage({
  params,
}: {
  params: { categoryId: string; itemId: string };
}) {
  try {
    const categoryId = params.categoryId;
    const itemId = params.itemId;

    const item = await getItemData(itemId);
    const { sizes, toppings, sauces } = await getCustomizationOptions(item);

    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorBoundary FallbackComponent={ItemError}>
          <Suspense fallback={<ItemLoading />}>
            <ItemCustomizer
              item={item}
              sizes={sizes}
              toppings={toppings}
              sauces={sauces}
              categoryId={categoryId}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  } catch (error) {
    console.error("Error in ItemPage:", error);
    notFound();
  }
}

async function getItemData(itemId: string) {
  const supabase = await createServerClient();
  const { data: item, error } = await supabase
    .from("menu_items")
    .select("*, category:menu_categories(id, name)")
    .eq("id", itemId)
    .single();

  if (error) throw error;
  if (!item) notFound();

  return item;
}

async function getCustomizationOptions(item: MenuItem) {
  const supabase = await createServerClient();

  const [sizes, toppings, sauces] = await Promise.all([
    // Get sizes based on category
    item.category_id === "f85eeca1-7e83-47ab-9159-3708644b530f"
      ? supabase
          .from("pizza_sizes")
          .select("*")
          .eq("is_active", true)
          .order("size_inches")
      : item.category_id === "5089a01b-267d-4210-a9f3-d7f9205cb8d0"
      ? supabase
          .from("wing_quantities")
          .select("*")
          .eq("is_active", true)
          .order("quantity")
      : Promise.resolve({ data: [] }),

    // Get toppings if item allows them
    item.allows_toppings
      ? supabase
          .from("toppings")
          .select("*")
          .eq("is_active", true)
          .order("name")
      : Promise.resolve({ data: [] }),

    // Get sauces if item allows them
    item.allows_sauces
      ? supabase
          .from("wing_sauces")
          .select("*")
          .eq("is_active", true)
          .order("heat_level")
      : Promise.resolve({ data: [] }),
  ]);

  return {
    sizes: sizes.data || [],
    toppings: toppings.data || [],
    sauces: sauces.data || [],
  };
}
