import { orders } from "@/data/orders";
import { products } from "@/data/products";
import { users } from "@/data/users";
import { formatCurrency } from "@/lib/utils";

export type SearchResultType = "user" | "product" | "order";

export type SearchResult = {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  href: string;
};

const MAX_PER_TYPE = 5;
export const MIN_QUERY_LENGTH = 2;

export function searchAll(rawQuery: string): SearchResult[] {
  const query = rawQuery.trim().toLowerCase();

  if (query.length < MIN_QUERY_LENGTH) {
    return [];
  }

  const userResults: SearchResult[] = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    )
    .slice(0, MAX_PER_TYPE)
    .map((user) => ({
      id: `user-${user.id}`,
      type: "user",
      title: user.name,
      subtitle: user.email,
      href: `/users/${user.id}`,
    }));

  const productResults: SearchResult[] = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query),
    )
    .slice(0, MAX_PER_TYPE)
    .map((product) => ({
      id: `product-${product.id}`,
      type: "product",
      title: product.name,
      subtitle: `${product.sku} / ${formatCurrency(product.price)}`,
      href: `/products/${product.id}`,
    }));

  const orderResults: SearchResult[] = orders
    .map((order) => ({
      order,
      customer: users.find((user) => user.id === order.customerId),
    }))
    .filter(
      ({ order, customer }) =>
        order.id.toLowerCase().includes(query) ||
        (customer?.name.toLowerCase().includes(query) ?? false) ||
        (customer?.email.toLowerCase().includes(query) ?? false),
    )
    .slice(0, MAX_PER_TYPE)
    .map(({ order, customer }) => ({
      id: `order-${order.id}`,
      type: "order",
      title: order.id,
      subtitle: `${customer?.name ?? "Unknown customer"} / ${order.status}`,
      href: `/orders/${order.id}`,
    }));

  return [...userResults, ...productResults, ...orderResults];
}