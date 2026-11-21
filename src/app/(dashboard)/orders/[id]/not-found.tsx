import Link from "next/link";
import { FileX } from "lucide-react";
import { Card } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";

export default function OrderNotFound() {
  return (
    <Card>
      <EmptyState
        icon={FileX}
        title="Order not found"
        description="This order does not exist or may have been removed."
        action={
          <Link
            href="/orders"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Back to orders
          </Link>
        }
      />
    </Card>
  );
}