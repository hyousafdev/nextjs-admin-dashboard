import type { OrderStatus, OrdersSort, PaymentMethod } from "@/types";

export const orderStatuses: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export const orderSortOptions: { value: OrdersSort; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "total-desc", label: "Total: High to Low" },
  { value: "total-asc", label: "Total: Low to High" },
];

export const paymentLabels: Record<PaymentMethod, string> = {
  card: "Credit card",
  paypal: "PayPal",
  cod: "Cash on delivery",
};