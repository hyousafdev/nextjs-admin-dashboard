import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import OrderDetailSkeleton from "@/components/orders/OrderDetailSkeleton";
import OrderDetails from "@/components/orders/OrderDetails";
import { orders } from "@/data/orders";
import { findOrderById } from "@/lib/orders";

type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return orders.map((order) => ({ id: order.id }));
}

export async function generateMetadata({
  params,
}: OrderPageProps): Promise<Metadata> {
  const { id } = await params;
  const order = findOrderById(id);

  if (!order) {
    return { title: "Order not found" };
  }

  return {
    title: `Order ${order.id}`,
    description: `Details and status of order ${order.id}.`,
  };
}

export default function OrderPage({ params }: OrderPageProps) {
  return (
    <>
      <Link
        href="/orders"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to orders
      </Link>

      <Suspense fallback={<OrderDetailSkeleton />}>
        <OrderDetails params={params} />
      </Suspense>
    </>
  );
}