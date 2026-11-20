import type { Metadata } from "next";
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
      <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
        Dashboard overview coming soon
      </div>
    </>
  );
}