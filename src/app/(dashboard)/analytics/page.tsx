import type { Metadata } from "next";
import { Suspense } from "react";
import AnalyticsContent from "@/components/analytics/AnalyticsContent";
import {
  AnalyticsSkeleton,
  RangeSelectorSkeleton,
} from "@/components/analytics/AnalyticsSkeletons";
import RangeSelector from "@/components/analytics/RangeSelector";
import PageHeader from "@/components/ui/PageHeader";
import { parseAnalyticsRange } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Analytics",
};

type AnalyticsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function RangeSection({ searchParams }: AnalyticsPageProps) {
  const range = parseAnalyticsRange((await searchParams).range);

  return <RangeSelector range={range} />;
}

export default function AnalyticsPage({ searchParams }: AnalyticsPageProps) {
  return (
    <>
      <PageHeader
        title="Analytics"
        description="Insights and performance of your store."
      />

      <div className="mb-6">
        <Suspense fallback={<RangeSelectorSkeleton />}>
          <RangeSection searchParams={searchParams} />
        </Suspense>
      </div>

      <Suspense fallback={<AnalyticsSkeleton />}>
        <AnalyticsContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}