import type { Metadata } from "next";
import RevenueChart from "@/components/charts/RevenueChart";
import SalesByCategoryChart from "@/components/charts/SalesByCategoryChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardHeader } from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import {
  kpis,
  recentActivity,
  revenueData,
  salesByCategory,
} from "@/data/dashboard";

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
          <div className="p-5">
            <RevenueChart data={revenueData} />
          </div>
        </Card>

        <RecentActivity activities={recentActivity} />
      </div>

      <Card className="mt-6">
        <CardHeader
          title="Sales by category"
          description="Total sales per product category this month."
        />
        <div className="p-5">
          <SalesByCategoryChart data={salesByCategory} />
        </div>
      </Card>
    </>
  );
}