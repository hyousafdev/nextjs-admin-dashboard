import { Card } from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

export default function DashboardLoading() {
  return (
    <div aria-busy="true">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      <Card className="p-5">
        <Skeleton className="h-6 w-40" />
        <div className="mt-6 space-y-3">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      </Card>
    </div>
  );
}