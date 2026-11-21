import Badge from "@/components/ui/Badge";
import type { BadgeVariant } from "@/components/ui/Badge";
import { getStockStatus } from "@/lib/product-options";
import type { StockStatus } from "@/types";

const variants: Record<StockStatus, BadgeVariant> = {
  "in-stock": "success",
  "low-stock": "warning",
  "out-of-stock": "danger",
};

const labels: Record<StockStatus, string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "out-of-stock": "Out of stock",
};

type StockBadgeProps = {
  stock: number;
};

export default function StockBadge({ stock }: StockBadgeProps) {
  const status = getStockStatus(stock);

  return <Badge variant={variants[status]}>{labels[status]}</Badge>;
}