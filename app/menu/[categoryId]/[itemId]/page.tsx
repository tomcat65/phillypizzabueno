import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { ItemCustomizer } from "./item-customizer.client";
import { Database } from "@/types/supabase";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ItemLoading from "./loading";
import ItemError from "./error";

type PizzaSize = Database["public"]["Tables"]["pizza_sizes"]["Row"];
type WingQuantity = Database["public"]["Tables"]["wing_quantities"]["Row"];
type Topping = Database["public"]["Tables"]["toppings"]["Row"];
type WingSauce = Database["public"]["Tables"]["wing_sauces"]["Row"];
type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"];

interface ItemPageProps {
  params: {
    categoryId: string;
    itemId: string;
  };
}

async function getSupabaseClient() {
  const cookieStore = cookies();
  return createServerClient(
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
}

async function getItemData(itemId: string) {
  const supabase = await getSupabaseClient();
  const { data: item, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("id", itemId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!item) {
    notFound();
  }

  return item;
}

async function getCustomizationOptions(item: MenuItem) {
  const supabase = await getSupabaseClient();
  let sizes: (PizzaSize | WingQuantity)[] = [];
  let toppings: Topping[] = [];
  let sauces: WingSauce[] = [];

  try {
    if (item.category_id === "pizza") {
      const [pizzaSizesResult, pizzaToppingsResult] = await Promise.all([
        supabase.from("pizza_sizes").select("*").order("size_inches"),
        supabase
          .from("toppings")
          .select("*")
          .eq("is_active", true)
          .order("category"),
      ]);

      if (pizzaSizesResult.error) throw pizzaSizesResult.error;
      if (pizzaToppingsResult.error) throw pizzaToppingsResult.error;

      if (pizzaSizesResult.data) sizes = pizzaSizesResult.data;
      if (pizzaToppingsResult.data) toppings = pizzaToppingsResult.data;
    } else if (item.category_id === "wings") {
      const [quantitiesResult, wingSaucesResult] = await Promise.all([
        supabase.from("wing_quantities").select("*").order("pieces"),
        supabase
          .from("wing_sauces")
          .select("*")
          .eq("is_active", true)
          .order("heat_level"),
      ]);

      if (quantitiesResult.error) throw quantitiesResult.error;
      if (wingSaucesResult.error) throw wingSaucesResult.error;

      if (quantitiesResult.data) sizes = quantitiesResult.data;
      if (wingSaucesResult.data) sauces = wingSaucesResult.data;
    }

    return { sizes, toppings, sauces };
  } catch (error) {
    throw new Error("Failed to load customization options");
  }
}

export default async function ItemPage({ params }: ItemPageProps) {
  const item = await getItemData(params.itemId);
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
            categoryId={params.categoryId}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
