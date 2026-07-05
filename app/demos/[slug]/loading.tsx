export default function DemoLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="skeleton h-9 w-9 rounded-full" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-40 rounded" />
              <div className="skeleton h-3 w-28 rounded" />
            </div>
          </div>
          <div className="skeleton h-10 w-48 rounded-xl" />
        </div>
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="mx-auto skeleton h-6 w-32 rounded-full" />
        <div className="mx-auto mt-5 skeleton h-12 w-3/4 rounded" />
        <div className="mx-auto mt-4 skeleton h-4 w-2/3 rounded" />
        <div className="mt-8 flex justify-center gap-3">
          <div className="skeleton h-12 w-40 rounded-xl" />
          <div className="skeleton h-12 w-32 rounded-xl" />
        </div>
      </div>

      {/* Cards grid */}
      <div className="mx-auto max-w-5xl px-4 pb-24">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton aspect-square w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
