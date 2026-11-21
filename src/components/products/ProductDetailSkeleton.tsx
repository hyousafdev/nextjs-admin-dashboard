import { Card } from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div aria-busy="true" className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <Skeleton className="h-40 w-full shrink-0 sm:w-40" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Card key={index} className="p-5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="mt-3 h-8 w-24" />
          </Card>
        ))}
      </div>
    </div>
  );
}