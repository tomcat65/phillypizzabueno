export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center" role="status">
      <div
        className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
        aria-hidden="true"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="container mx-auto px-4 py-8" role="status">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-48 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading page content...</span>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="animate-pulse space-y-4" role="status">
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-32 bg-gray-200 rounded" />
      <span className="sr-only">Loading card content...</span>
    </div>
  );
}
