import { Card } from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

export default function UserDetailSkeleton() {
  return (
    <div aria-busy="true" className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 shrink-0 rounded-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <Card key={index} className="p-5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="mt-3 h-8 w-24" />
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <Skeleton className="h-6 w-40" />
        <div className="mt-5 space-y-4">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-5 w-full" />
          ))}
        </div>
      </Card>
    </div>
  );
}