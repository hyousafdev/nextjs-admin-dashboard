import Link from "next/link";
import { notFound } from "next/navigation";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import OrderTimeline from "@/components/orders/OrderTimeline";
import { Card, CardHeader } from "@/components/ui/Card";
import { paymentLabels } from "@/lib/order-options";
import { getOrderById } from "@/lib/orders";
import { formatCurrency, formatDate } from "@/lib/utils";

type OrderDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetails({ params }: OrderDetailsProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{order.id}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Placed on {formatDate(order.createdAt)} /{" "}
              {paymentLabels[order.paymentMethod]}
            </p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="mt-6">
          <OrderTimeline status={order.status} />
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Items"
          description={`${order.itemCount} items in this order.`}
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b bg-muted/50 text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">
                  Product
                </th>
                <th scope="col" className="px-5 py-3 text-right font-medium">
                  Price
                </th>
                <th scope="col" className="px-5 py-3 text-right font-medium">
                  Qty
                </th>
                <th scope="col" className="px-5 py-3 text-right font-medium">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {order.lines.map((line) => (
                <tr key={line.product.id}>
                  <td className="px-5 py-3">
                    <Link
                      href={`/products/${line.product.id}`}
                      className="font-medium hover:underline"
                    >
                      {line.product.name}
                    </Link>
                    <p className="text-muted-foreground">{line.product.sku}</p>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {formatCurrency(line.product.price)}
                  </td>
                  <td className="px-5 py-3 text-right">{line.quantity}</td>
                  <td className="px-5 py-3 text-right font-medium">
                    {formatCurrency(line.lineTotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader title="Customer" />
          <div className="space-y-1 p-5 text-sm">
            {order.customer ? (
              <>
                <Link
                  href={`/users/${order.customer.id}`}
                  className="font-medium hover:underline"
                >
                  {order.customer.name}
                </Link>
                <p className="text-muted-foreground">{order.customer.email}</p>
                <p className="text-muted-foreground">
                  {order.customer.country}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">Unknown customer</p>
            )}
          </div>
        </Card>

        <Card>
          <CardHeader title="Summary" />
          <dl className="space-y-2 p-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatCurrency(order.total)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>Free</dd>
            </div>
            <div className="flex justify-between border-t pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatCurrency(order.total)}</dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  );
}