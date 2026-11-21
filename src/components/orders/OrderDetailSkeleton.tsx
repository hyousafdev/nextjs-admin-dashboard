import { Card } from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

export default function OrderDetailSkeleton() {
  return (
    <div aria-busy="true" className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="mt-6 h-16 w-full" />
      </Card>

      <Card className="p-5">
        <Skeleton className="h-6 w-24" />
        <div className="mt-5 space-y-4">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-5">
          <Skeleton className="h-24 w-full" />
        </Card>
        <Card className="p-5">
          <Skeleton className="h-24 w-full" />
        </Card>
      </div>
    </div>
  );
}