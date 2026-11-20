import { Card, CardHeader } from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

export function KpiGridSkeleton() {
  return (
    <div
      aria-busy="true"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {Array.from({ length: 4 }, (_, index) => (
        <Card key={index} className="p-5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-9 rounded-lg" />
          </div>
          <Skeleton className="mt-4 h-8 w-32" />
          <Skeleton className="mt-3 h-4 w-40" />
        </Card>
      ))}
    </div>
  );
}

type ChartCardSkeletonProps = {
  title: string;
  description: string;
  className?: string;
};

export function ChartCardSkeleton({
  title,
  description,
  className,
}: ChartCardSkeletonProps) {
  return (
    <Card aria-busy="true" className={cn(className)}>
      <CardHeader title={title} description={description} />
      <div className="p-5">
        <Skeleton className="h-72 w-full" />
      </div>
    </Card>
  );
}

export function ActivitySkeleton() {
  return (
    <Card aria-busy="true">
      <CardHeader
        title="Recent activity"
        description="Latest events across your store."
      />
      <ul className="divide-y">
        {Array.from({ length: 6 }, (_, index) => (
          <li key={index} className="flex items-start gap-3 p-4">
            <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}