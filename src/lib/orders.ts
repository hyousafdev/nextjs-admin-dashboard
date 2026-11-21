import { orders as allOrders } from "@/data/orders";
import { delay } from "@/lib/api";
import { orderSortOptions, orderStatuses } from "@/lib/order-options";
import { findProductById } from "@/lib/products";
import { findUserById } from "@/lib/users";
import type { Order, OrderStatus, OrdersSort, Product, User } from "@/types";

export const ORDERS_PAGE_SIZE = 8;
export const DEFAULT_ORDERS_SORT: OrdersSort = "newest";

export type OrderLine = {
  product: Product;
  quantity: number;
  lineTotal: number;
};

export type OrderWithDetails = Order & {
  customer: User | undefined;
  lines: OrderLine[];
  itemCount: number;
  total: number;
};

export type OrdersQuery = {
  q: string;
  status: OrderStatus | "all";
  sort: OrdersSort;
  page: number;
};

export type OrdersResult = {
  orders: OrderWithDetails[];
  total: number;
  page: number;
  totalPages: number;
  statusCounts: Record<OrderStatus | "all", number>;
};

type RawSearchParams = Record<string, string | string[] | undefined>;

function toSingle(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

// Joins an order with its customer (users data) and products (products data).
function withDetails(order: Order): OrderWithDetails {
  const lines: OrderLine[] = order.items.flatMap((item) => {
    const product = findProductById(item.productId);

    if (!product) {
      return [];
    }

    return [
      {
        product,
        quantity: item.quantity,
        lineTotal: round(product.price * item.quantity),
      },
    ];
  });

  return {
    ...order,
    customer: findUserById(order.customerId),
    lines,
    itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: round(lines.reduce((sum, line) => sum + line.lineTotal, 0)),
  };
}

// URL input is never trusted: every value is checked against known options.
export function parseOrdersQuery(params: RawSearchParams): OrdersQuery {
  const status =
    orderStatuses.find((item) => item.value === toSingle(params.status))
      ?.value ?? "all";
  const sort =
    orderSortOptions.find((item) => item.value === toSingle(params.sort))
      ?.value ?? DEFAULT_ORDERS_SORT;

  const pageNumber = Number.parseInt(toSingle(params.page), 10);
  const page = Number.isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;

  return {
    q: toSingle(params.q).trim(),
    status,
    sort,
    page,
  };
}

export function toOrdersParams(
  query: OrdersQuery,
): Record<string, string | undefined> {
  return {
    q: query.q || undefined,
    status: query.status === "all" ? undefined : query.status,
    sort: query.sort === DEFAULT_ORDERS_SORT ? undefined : query.sort,
    page: query.page > 1 ? String(query.page) : undefined,
  };
}

export async function getOrders(query: OrdersQuery): Promise<OrdersResult> {
  await delay(500);

  const search = query.q.toLowerCase();

  const searched = allOrders.map(withDetails).filter((order) => {
    return (
      search === "" ||
      order.id.toLowerCase().includes(search) ||
      (order.customer?.name.toLowerCase().includes(search) ?? false) ||
      (order.customer?.email.toLowerCase().includes(search) ?? false)
    );
  });

  // Tab counts follow the search, but not the selected status.
  const statusCounts: Record<OrderStatus | "all", number> = {
    all: searched.length,
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  };

  searched.forEach((order) => {
    statusCounts[order.status] += 1;
  });

  const filtered = searched.filter(
    (order) => query.status === "all" || order.status === query.status,
  );

  const sorted = [...filtered].sort((a, b) => {
    switch (query.sort) {
      case "oldest":
        return a.createdAt === b.createdAt
          ? a.id.localeCompare(b.id)
          : a.createdAt < b.createdAt
            ? -1
            : 1;
      case "total-desc":
        return b.total - a.total;
      case "total-asc":
        return a.total - b.total;
      default:
        return a.createdAt === b.createdAt
          ? b.id.localeCompare(a.id)
          : a.createdAt < b.createdAt
            ? 1
            : -1;
    }
  });

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / ORDERS_PAGE_SIZE));
  const page = Math.min(query.page, totalPages);
  const start = (page - 1) * ORDERS_PAGE_SIZE;

  return {
    orders: sorted.slice(start, start + ORDERS_PAGE_SIZE),
    total,
    page,
    totalPages,
    statusCounts,
  };
}

export function findOrderById(id: string): OrderWithDetails | undefined {
  const order = allOrders.find((item) => item.id === id);
  return order ? withDetails(order) : undefined;
}

export async function getOrderById(
  id: string,
): Promise<OrderWithDetails | undefined> {
  await delay(400);
  return findOrderById(id);
}