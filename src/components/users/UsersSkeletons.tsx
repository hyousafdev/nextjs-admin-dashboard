import Skeleton from "@/components/ui/Skeleton";

export function UsersFiltersSkeleton() {
  return (
    <div aria-busy="true" className="flex flex-col gap-3 sm:flex-row">
      <Skeleton className="h-9 flex-1" />
      <Skeleton className="h-9 w-full sm:w-36" />
      <Skeleton className="h-9 w-full sm:w-36" />
    </div>
  );
}

export function UsersTableSkeleton() {
  return (
    <div aria-busy="true" className="divide-y">
      {Array.from({ length: 8 }, (_, index) => (
        <div key={index} className="flex items-center gap-4 p-4">
          <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="hidden h-6 w-16 sm:block" />
          <Skeleton className="hidden h-6 w-16 sm:block" />
        </div>
      ))}
    </div>
  );
}