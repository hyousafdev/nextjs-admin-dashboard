import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Analytics",
};

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader title="Analytics" description="Insights and performance." />
      <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
        Analytics page coming soon
      </div>
    </>
  );
}