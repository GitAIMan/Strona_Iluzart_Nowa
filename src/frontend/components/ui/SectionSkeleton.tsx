export default function SectionSkeleton() {
  return (
    <div className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading skeleton */}
        <div className="flex flex-col items-center mb-12">
          <div className="h-3 w-24 bg-white/5 rounded animate-pulse mb-4" />
          <div className="h-8 w-64 bg-white/5 rounded animate-pulse mb-3" />
          <div className="h-0.5 w-12 bg-white/5 rounded animate-pulse" />
        </div>
        {/* Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-48 bg-white/[0.02] rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
