import { testConnection } from "@/lib/supabase/queries"
import type { ReactNode } from "react"

export default async function TestPage() {
  const result = await testConnection()

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      <div
        className={`p-4 rounded-md ${
          result.success ? "bg-green-100" : "bg-red-100"
        }`}
      >
        <p className={result.success ? "text-green-700" : "text-red-700"}>
          {result.message}
        </p>
        {!result.success && result.error && (
          <pre className="mt-2 text-sm text-red-600 overflow-auto">
            {JSON.stringify(result.error, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}
