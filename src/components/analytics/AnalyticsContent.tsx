import DonutChart from "@/components/charts/DonutChart";
import ChartCard from "@/components/charts/ChartCard";
import RevenueChart from "@/components/charts/RevenueChart";
import TopProductsChart from "@/components/charts/TopProductsChart";
import TrafficChart from "@/components/charts/TrafficChart";
import StatCard from "@/components/dashboard/StatCard";
import {
  analyticsRanges,
  getAnalytics,
  parseAnalyticsRange,
} from "@/lib/analytics";

type AnalyticsContentProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AnalyticsContent({
  searchParams,
}: AnalyticsContentProps) {
  const range = parseAnalyticsRange((await searchParams).range);
  const data = await getAnalytics(range);
  const description =
    analyticsRanges.find((item) => item.value === range)?.description ?? "";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.kpis.map((kpi) => (
          <StatCard
            key={kpi.id}
            kpi={kpi}
            comparisonLabel="vs previous period"
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard
          className="lg:col-span-2"
          title="Traffic"
          description={`Visitors and page views for ${description}.`}
        >
          <TrafficChart data={data.traffic} />
        </ChartCard>

        <ChartCard
          title="Traffic sources"
          description="Where your visitors come from."
        >
          <DonutChart data={data.sources} />
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard
          className="lg:col-span-2"
          title="Revenue"
          description={`Revenue for ${description}.`}
        >
          <RevenueChart data={data.revenue} />
        </ChartCard>

        <ChartCard
          title="Orders by status"
          description="Share of all orders by their current status."
        >
          <DonutChart data={data.statuses} />
        </ChartCard>
      </div>

      <ChartCard
        title="Top products by revenue"
        description="Best performing products across all non-cancelled orders."
      >
        <TopProductsChart data={data.topProducts} />
      </ChartCard>
    </div>
  );
}