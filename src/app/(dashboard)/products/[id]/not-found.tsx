import Link from "next/link";
import { PackageX } from "lucide-react";
import { Card } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";

export default function ProductNotFound() {
  return (
    <Card>
      <EmptyState
        icon={PackageX}
        title="Product not found"
        description="This product does not exist or may have been removed."
        action={
          <Link
            href="/products"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Back to products
          </Link>
        }
      />
    </Card>
  );
}