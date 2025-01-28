import { createClient } from "./client";

export async function getActiveCategories() {
  const supabase = createClient();
  return await supabase.from("active_categories").select("*");
}

export async function getActiveSpecials() {
  const supabase = createClient();
  return await supabase.from("active_specials").select("*");
}

export async function getAvailableBeverages() {
  const supabase = createClient();
  return await supabase.from("available_beverages").select("*");
}

export async function getCurrentPricingOverview() {
  const supabase = createClient();
  return await supabase.from("current_pricing_overview").select("*");
}

export async function getMenuSystemOverview() {
  const supabase = createClient();
  return await supabase.from("menu_system_overview").select("*");
}

export async function getSpecialMenuItems() {
  const supabase = createClient();
  return await supabase.from("special_menu_items").select("*");
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
