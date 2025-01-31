import { createServerClient } from "./server";

export async function testConnection() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("menu_categories")
      .select("count")
      .single();

    if (error) throw error;
    return { success: true, message: "Successfully connected to Supabase" };
  } catch (error) {
    console.error("Supabase connection test failed:", error);
    return { success: false, message: "Failed to connect to Supabase", error };
  }
}

export async function getActiveCategories() {
  const supabase = createServerClient();
  return await supabase.from("menu_categories").select("*");
}

export async function getActiveSpecials() {
  const supabase = createServerClient();
  return await supabase.from("active_specials").select("*");
}

export async function getAvailableBeverages() {
  const supabase = createServerClient();
  return await supabase.from("available_beverages").select("*");
}

export async function getCurrentPricingOverview() {
  const supabase = createServerClient();
  return await supabase.from("current_pricing_overview").select("*");
}

export async function getMenuSystemOverview() {
  const supabase = createServerClient();
  return await supabase.from("menu_system_overview").select("*");
}

export async function getSpecialMenuItems() {
  const supabase = createServerClient();
  return await supabase.from("special_menu_items").select("*");
}

export async function getCombinedSpecialsData() {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("menu_specials")
    .select(
      `
      id,
      special_price,
      discount_percentage,
      start_date,
      end_date,
      is_active,
      menu_items (
        id,
        name,
        description,
        base_price,
        category_id
      )
    `
    )
    .eq("is_active", true)
    .order("start_date", { ascending: true });

  if (error) {
    console.error("Error fetching combined specials:", error);
    throw error;
  }

  return data;
}

// Helper function to get all menu data at once
export async function getAllMenuData() {
  const [
    activeCategories,
    activeSpecials,
    availableBeverages,
    currentPricing,
    menuSystem,
    specialItems,
  ] = await Promise.all([
    getActiveCategories(),
    getActiveSpecials(),
    getAvailableBeverages(),
    getCurrentPricingOverview(),
    getMenuSystemOverview(),
    getSpecialMenuItems(),
  ]);

  return {
    activeCategories: activeCategories.data,
    activeSpecials: activeSpecials.data,
    availableBeverages: availableBeverages.data,
    currentPricing: currentPricing.data,
    menuSystem: menuSystem.data,
    specialItems: specialItems.data,
  };
}
