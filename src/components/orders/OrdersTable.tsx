import Link from "next/link";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import type { OrderWithDetails } from "@/lib/orders";
import { formatCurrency, formatDate } from "@/lib/utils";

type OrdersTableProps = {
  orders: OrderWithDetails[];
};

export default function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b bg-muted/50 text-muted-foreground">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">
              Order
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Customer
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Date
            </th>
            <th scope="col" className="px-4 py-3 text-right font-medium">
              Items
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Status
            </th>
            <th scope="col" className="px-4 py-3 text-right font-medium">
              Total
            </th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-muted/40">
              <td className="px-4 py-3">
                <Link
                  href={`/orders/${order.id}`}
                  className="font-medium hover:underline"
                >
                  {order.id}
                </Link>
              </td>
              <td className="px-4 py-3">
                {order.customer ? (
                  <div className="min-w-0">
                    <Link
                      href={`/users/${order.customer.id}`}
                      className="hover:underline"
                    >
                      {order.customer.name}
                    </Link>
                    <p className="truncate text-muted-foreground">
                      {order.customer.email}
                    </p>
                  </div>
                ) : (
                  <span className="text-muted-foreground">Unknown customer</span>
                )}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {formatDate(order.createdAt)}
              </td>
              <td className="px-4 py-3 text-right">{order.itemCount}</td>
              <td className="px-4 py-3">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="px-4 py-3 text-right font-medium">
                {formatCurrency(order.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}