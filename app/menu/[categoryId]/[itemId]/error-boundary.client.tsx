"use client";

import type { FallbackProps } from "react-error-boundary";

export function ItemError({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
      <p className="text-red-800 font-medium">Error loading item:</p>
      <pre className="text-sm text-red-600 mt-2">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}
