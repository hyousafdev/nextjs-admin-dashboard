import Skeleton from "@/components/ui/Skeleton";

export function OrdersFiltersSkeleton() {
  return (
    <div aria-busy="true" className="flex flex-col gap-3 sm:flex-row">
      <Skeleton className="h-9 flex-1" />
      <Skeleton className="h-9 w-full sm:w-44" />
    </div>
  );
}

export function OrdersResultsSkeleton() {
  return (
    <div aria-busy="true">
      <div className="flex gap-4 border-b px-4 py-3">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className="h-5 w-20" />
        ))}
      </div>
      <div className="divide-y">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="flex items-center gap-4 p-4">
            <Skeleton className="h-5 w-24" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-56" />
            </div>
            <Skeleton className="hidden h-6 w-20 sm:block" />
            <Skeleton className="hidden h-6 w-16 sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
}