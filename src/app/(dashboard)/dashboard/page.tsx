import type { Metadata } from "next";
import { Suspense } from "react";
import ActivitySection from "@/components/dashboard/ActivitySection";
import CategorySalesSection from "@/components/dashboard/CategorySalesSection";
import {
  ActivitySkeleton,
  ChartCardSkeleton,
  KpiGridSkeleton,
} from "@/components/dashboard/DashboardSkeletons";
import KpiSection from "@/components/dashboard/KpiSection";
import RevenueSection from "@/components/dashboard/RevenueSection";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="An overview of your business at a glance."
      />

      <Suspense fallback={<KpiGridSkeleton />}>
        <KpiSection />
      </Suspense>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Suspense
          fallback={
            <ChartCardSkeleton
              title="Revenue overview"
              description="Monthly revenue for the last 12 months."
              className="lg:col-span-2"
            />
          }
        >
          <RevenueSection className="lg:col-span-2" />
        </Suspense>

        <Suspense fallback={<ActivitySkeleton />}>
          <ActivitySection />
        </Suspense>
      </div>

      <div className="mt-6">
        <Suspense
          fallback={
            <ChartCardSkeleton
              title="Sales by category"
              description="Total sales per product category this month."
            />
          }
        >
          <CategorySalesSection />
        </Suspense>
      </div>
    </>
  );
}