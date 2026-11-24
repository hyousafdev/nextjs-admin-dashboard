import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Access denied",
};

export default function ForbiddenPage() {
  return (
    <Card>
      <EmptyState
        icon={ShieldAlert}
        title="Access denied"
        description="Your role does not have permission to view this page. Ask an administrator for access."
        action={
          <Link
            href="/dashboard"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Back to dashboard
          </Link>
        }
      />
    </Card>
  );
}