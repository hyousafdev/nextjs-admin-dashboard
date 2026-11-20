import type { Metadata } from "next";
import RecentActivity from "@/components/dashboard/RecentActivity";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardHeader } from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { kpis, recentActivity } from "@/data/dashboard";

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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <StatCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Revenue overview"
            description="Monthly revenue for the last 12 months."
          />
          <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
            Revenue chart coming in the next step
          </div>
        </Card>

        <RecentActivity activities={recentActivity} />
      </div>
    </>
  );
}