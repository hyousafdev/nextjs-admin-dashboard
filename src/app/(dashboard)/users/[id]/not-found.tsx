import Link from "next/link";
import { UserX } from "lucide-react";
import { Card } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";

export default function UserNotFound() {
  return (
    <Card>
      <EmptyState
        icon={UserX}
        title="User not found"
        description="This user does not exist or may have been removed."
        action={
          <Link
            href="/users"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Back to users
          </Link>
        }
      />
    </Card>
  );
}