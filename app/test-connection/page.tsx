import { createServerClient } from "@/lib/supabase/server";

export default async function TestConnectionPage() {
  try {
    const supabase = createServerClient();

    // Test the connection by fetching pizza sizes
    const { data, error } = await supabase.from("pizza_sizes").select("*");

    if (error) {
      throw error;
    }

    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Pizza Sizes Data</h1>
        <div className="bg-green-100 p-4 rounded">
          <p className="text-green-700">✓ Successfully fetched pizza sizes</p>
          <pre className="mt-4 bg-white p-4 rounded overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching pizza sizes:", error);
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 p-4 rounded">
          <h2 className="text-red-700 font-bold mb-2">
            Error Loading Pizza Sizes
          </h2>
          <p className="text-red-600">
            {error instanceof Error ? error.message : "Unknown error occurred"}
          </p>
        </div>
      </div>
    );
  }
}
