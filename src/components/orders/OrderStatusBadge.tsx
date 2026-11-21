import Badge from "@/components/ui/Badge";
import type { BadgeVariant } from "@/components/ui/Badge";
import type { OrderStatus } from "@/types";

const variants: Record<OrderStatus, BadgeVariant> = {
  pending: "warning",
  processing: "info",
  shipped: "primary",
  delivered: "success",
  cancelled: "danger",
};

type OrderStatusBadgeProps = {
  status: OrderStatus;
};

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return <Badge variant={variants[status]}>{status}</Badge>;
}