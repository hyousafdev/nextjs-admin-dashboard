import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Orders",
};

export default function OrdersPage() {
  return (
    <>
      <PageHeader title="Orders" description="Track and manage orders." />
      <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
        Orders page coming soon
      </div>
    </>
  );
}