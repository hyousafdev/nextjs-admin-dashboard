import { Card } from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

export function ProductsFiltersSkeleton() {
  return (
    <div aria-busy="true" className="flex flex-col gap-3 lg:flex-row">
      <Skeleton className="h-9 flex-1" />
      <Skeleton className="h-9 w-full lg:w-36" />
      <Skeleton className="h-9 w-full lg:w-32" />
      <Skeleton className="h-9 w-full lg:w-40" />
    </div>
  );
}

export function ProductsResultsSkeleton() {
  return (
    <div aria-busy="true" className="p-4">
      <Skeleton className="mb-4 h-5 w-48" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Card key={index} className="p-4">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="mt-4 h-4 w-16" />
            <Skeleton className="mt-2 h-5 w-40" />
            <Skeleton className="mt-4 h-6 w-full" />
          </Card>
        ))}
      </div>
    </div>
  );
}