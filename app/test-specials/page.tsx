import { getCombinedSpecialsData } from "@/lib/supabase/queries";
import { Sparkles } from "lucide-react";

export default async function TestSpecialsPage() {
  try {
    const specialsData = await getCombinedSpecialsData();

    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-6 w-6 text-yellow-500" />
          <h1 className="text-2xl font-bold">Active Menu Specials</h1>
          <Sparkles className="h-6 w-6 text-yellow-500" />
        </div>

        {specialsData.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-gray-600">No active specials at the moment.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-6">
              {specialsData.map((special) => {
                const isCurrentlyActive =
                  new Date(special.start_date) <= new Date() &&
                  new Date(special.end_date) >= new Date();

                return (
                  <div key={special.id} className="border-b pb-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {special.menu_items?.name}
                      {isCurrentlyActive && (
                        <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                          Active Now
                        </span>
                      )}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium">Menu Item Details:</h3>
                        <p>
                          Regular Price: $
                          {special.menu_items?.base_price?.toFixed(2)}
                        </p>
                        <p>Description: {special.menu_items?.description}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Special Offer:</h3>
                        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                          <p className="text-lg font-medium text-green-600">
                            Special Price: ${special.special_price?.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            Save {special.discount_percentage}% OFF
                          </p>
                          <div className="mt-2 text-xs text-gray-500">
                            <p>
                              Valid from:{" "}
                              {new Date(
                                special.start_date
                              ).toLocaleDateString()}
                            </p>
                            <p>
                              Until:{" "}
                              {new Date(special.end_date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-600">
          Total Specials: {specialsData.length}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in TestSpecialsPage:", error);
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 p-4 rounded">
          <h2 className="text-red-700 font-bold mb-2">
            Error Loading Specials
          </h2>
          <p className="text-red-600">
            {error instanceof Error ? error.message : "Unknown error occurred"}
          </p>
        </div>
      </div>
    );
  }
}
