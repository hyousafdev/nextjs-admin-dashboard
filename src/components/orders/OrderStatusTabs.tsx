import Link from "next/link";
import { orderStatuses } from "@/lib/order-options";
import { toOrdersParams } from "@/lib/orders";
import type { OrdersQuery, OrdersResult } from "@/lib/orders";
import { buildHref } from "@/lib/url";
import { cn } from "@/lib/utils";

type OrderStatusTabsProps = {
  query: OrdersQuery;
  counts: OrdersResult["statusCounts"];
};

export default function OrderStatusTabs({
  query,
  counts,
}: OrderStatusTabsProps) {
  const tabs = [
    { value: "all", label: "All" },
    ...orderStatuses,
  ] as const;

  return (
    <div className="overflow-x-auto border-b px-4">
      <nav aria-label="Order status" className="flex gap-1">
        {tabs.map((tab) => {
          const isActive = query.status === tab.value;

          return (
            <Link
              key={tab.value}
              href={buildHref("/orders", {
                ...toOrdersParams(query),
                status: tab.value === "all" ? undefined : tab.value,
                page: undefined,
              })}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "-mb-px flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium",
                isActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                {counts[tab.value]}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}