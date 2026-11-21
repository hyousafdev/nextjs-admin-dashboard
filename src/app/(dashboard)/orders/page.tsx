import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ShoppingCart } from "lucide-react";
import OrdersFilters from "@/components/orders/OrdersFilters";
import {
  OrdersFiltersSkeleton,
  OrdersResultsSkeleton,
} from "@/components/orders/OrdersSkeletons";
import OrderStatusTabs from "@/components/orders/OrderStatusTabs";
import OrdersTable from "@/components/orders/OrdersTable";
import { Card } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Pagination from "@/components/ui/Pagination";
import {
  ORDERS_PAGE_SIZE,
  getOrders,
  parseOrdersQuery,
  toOrdersParams,
} from "@/lib/orders";
import { buildHref } from "@/lib/url";

export const metadata: Metadata = {
  title: "Orders",
};

type OrdersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function OrdersResults({ searchParams }: OrdersPageProps) {
  const query = parseOrdersQuery(await searchParams);
  const result = await getOrders(query);

  const from = (result.page - 1) * ORDERS_PAGE_SIZE + 1;
  const to = from + result.orders.length - 1;

  return (
    <>
      <OrderStatusTabs query={query} counts={result.statusCounts} />

      {result.total === 0 ? (
        <EmptyState
          icon={ShoppingCart}
          title="No orders found"
          description="Try a different search or choose another status."
          action={
            <Link href="/orders" className="text-sm font-medium underline">
              Clear filters
            </Link>
          }
        />
      ) : (
        <>
          <OrdersTable orders={result.orders} />

          <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {from}-{to} of {result.total} orders
            </p>
            <Pagination
              page={result.page}
              totalPages={result.totalPages}
              createHref={(page) =>
                buildHref("/orders", {
                  ...toOrdersParams(query),
                  page: page > 1 ? String(page) : undefined,
                })
              }
            />
          </div>
        </>
      )}
    </>
  );
}

export default function OrdersPage({ searchParams }: OrdersPageProps) {
  return (
    <>
      <PageHeader title="Orders" description="Track and manage customer orders." />

      <Card>
        <div className="border-b p-4">
          <Suspense fallback={<OrdersFiltersSkeleton />}>
            <OrdersFilters />
          </Suspense>
        </div>

        <Suspense fallback={<OrdersResultsSkeleton />}>
          <OrdersResults searchParams={searchParams} />
        </Suspense>
      </Card>
    </>
  );
}