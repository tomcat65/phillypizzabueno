import { createServerClient } from "@/lib/supabase/server";

export default async function SchemaPage() {
  try {
    const supabase = await createServerClient();

    // Simple test query to verify connection
    const { data: test, error: testError } = await supabase
      .from("menu_categories")
      .select("*")
      .limit(1);

    if (testError) {
      throw new Error(`Connection test failed: ${testError.message}`);
    }

    // Get tables list
    const { data: tables, error: tablesError } = await supabase.rpc(
      "get_tables_and_views"
    );

    if (tablesError) {
      throw new Error(`Failed to fetch tables/views: ${tablesError.message}`);
    }

    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Database Schema</h1>

        <div className="bg-green-100 p-4 rounded mb-8">
          <p className="text-green-700">✓ Successfully connected to Supabase</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Tables ({tables?.length ?? 0})
          </h2>
          <div className="grid gap-4">
            {tables?.map((table) => (
              <div
                key={table.table_name}
                className="p-4 bg-white rounded-lg shadow"
              >
                <h3 className="font-medium">{table.table_name}</h3>
                <p className="text-sm text-gray-600">
                  Type: {table.table_type}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Database Schema</h1>

        <div className="bg-red-100 p-4 rounded">
          <h2 className="text-red-700 font-bold mb-2">Connection Error</h2>
          <p className="text-red-600">
            {error instanceof Error ? error.message : "Unknown error occurred"}
          </p>
        </div>
      </div>
    );
  }
}
