import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Products",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader title="Products" description="Manage your product catalog." />
      <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
        Products page coming soon
      </div>
    </>
  );
}