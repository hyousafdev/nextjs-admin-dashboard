import Badge from "@/components/ui/Badge";
import type { BadgeVariant } from "@/components/ui/Badge";
import type { UserRole, UserStatus } from "@/types";

const statusVariants: Record<UserStatus, BadgeVariant> = {
  active: "success",
  inactive: "neutral",
  pending: "warning",
};

const roleVariants: Record<UserRole, BadgeVariant> = {
  admin: "primary",
  manager: "warning",
  customer: "neutral",
};

export function UserStatusBadge({ status }: { status: UserStatus }) {
  return <Badge variant={statusVariants[status]}>{status}</Badge>;
}

export function UserRoleBadge({ role }: { role: UserRole }) {
  return <Badge variant={roleVariants[role]}>{role}</Badge>;
}