import {
  ChartCardSkeleton,
  KpiGridSkeleton,
} from "@/components/dashboard/DashboardSkeletons";
import Skeleton from "@/components/ui/Skeleton";

export function RangeSelectorSkeleton() {
  return <Skeleton aria-busy="true" className="h-10 w-72" />;
}

export function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      <KpiGridSkeleton />

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCardSkeleton
          className="lg:col-span-2"
          title="Traffic"
          description="Visitors and page views."
        />
        <ChartCardSkeleton
          title="Traffic sources"
          description="Where your visitors come from."
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCardSkeleton
          className="lg:col-span-2"
          title="Revenue"
          description="Revenue for the selected period."
        />
        <ChartCardSkeleton
          title="Orders by status"
          description="Share of all orders by their current status."
        />
      </div>

      <ChartCardSkeleton
        title="Top products by revenue"
        description="Best performing products across all non-cancelled orders."
      />
    </div>
  );
}