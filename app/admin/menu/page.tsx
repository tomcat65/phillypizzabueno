import { getAllMenuData } from "@/lib/supabase/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminMenuPage() {
  const menuData = await getAllMenuData();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Menu Overview</h1>

      <div className="grid gap-8">
        {/* Active Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Active Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
              {JSON.stringify(menuData.activeCategories, null, 2)}
            </pre>
          </CardContent>
        </Card>

        {/* Active Specials */}
        <Card>
          <CardHeader>
            <CardTitle>Active Specials</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
              {JSON.stringify(menuData.activeSpecials, null, 2)}
            </pre>
          </CardContent>
        </Card>

        {/* Available Beverages */}
        <Card>
          <CardHeader>
            <CardTitle>Available Beverages</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
              {JSON.stringify(menuData.availableBeverages, null, 2)}
            </pre>
          </CardContent>
        </Card>

        {/* Current Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Current Pricing Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
              {JSON.stringify(menuData.currentPricing, null, 2)}
            </pre>
          </CardContent>
        </Card>

        {/* Menu System */}
        <Card>
          <CardHeader>
            <CardTitle>Menu System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
              {JSON.stringify(menuData.menuSystem, null, 2)}
            </pre>
          </CardContent>
        </Card>

        {/* Special Items */}
        <Card>
          <CardHeader>
            <CardTitle>Special Menu Items</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
              {JSON.stringify(menuData.specialItems, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
