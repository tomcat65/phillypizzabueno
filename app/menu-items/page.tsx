import { createServerClient } from "@/lib/supabase/server";

export default async function MenuItemsPage() {
  try {
    const supabase = await createServerClient();

    const { data: menuItems, error } = await supabase
      .from("menu_items")
      .select("*, menu_categories(name)")
      .order("name");

    if (error) {
      throw error;
    }

    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Menu Items</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{item.name}</td>
                  <td className="py-3">{item.menu_categories?.name}</td>
                  <td className="py-3">${item.base_price.toFixed(2)}</td>
                  <td className="py-3">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Total Items: {menuItems.length}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 p-4 rounded">
          <h2 className="text-red-700 font-bold mb-2">
            Error Loading Menu Items
          </h2>
          <p className="text-red-600">
            {error instanceof Error ? error.message : "Unknown error occurred"}
          </p>
        </div>
      </div>
    );
  }
}
