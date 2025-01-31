import { createServerClient } from "@/lib/supabase/server";

export default async function TestConnectionPage() {
  try {
    const supabase = createServerClient();

    // Fetch data from all pizza-related tables
    const [basePizzasResult, pizzaSizesResult, pizzaVariantsResult] =
      await Promise.all([
        supabase.from("base_pizzas").select("*"),
        supabase.from("pizza_sizes").select("*"),
        supabase.from("pizza_variants").select("*"),
      ]);

    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8">Pizza Tables Data</h1>

        {/* Base Pizzas */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Base Pizzas</h2>
          <div className="bg-green-100 p-4 rounded">
            <pre className="mt-4 bg-white p-4 rounded overflow-auto">
              {JSON.stringify(basePizzasResult.data, null, 2)}
            </pre>
          </div>
        </div>

        {/* Pizza Sizes */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Pizza Sizes</h2>
          <div className="bg-green-100 p-4 rounded">
            <pre className="mt-4 bg-white p-4 rounded overflow-auto">
              {JSON.stringify(pizzaSizesResult.data, null, 2)}
            </pre>
          </div>
        </div>

        {/* Pizza Variants */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Pizza Variants</h2>
          <div className="bg-green-100 p-4 rounded">
            <pre className="mt-4 bg-white p-4 rounded overflow-auto">
              {JSON.stringify(pizzaVariantsResult.data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching pizza data:", error);
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 p-4 rounded">
          <h2 className="text-red-700 font-bold mb-2">
            Error Loading Pizza Data
          </h2>
          <p className="text-red-600">
            {error instanceof Error ? error.message : "Unknown error occurred"}
          </p>
        </div>
      </div>
    );
  }
}
