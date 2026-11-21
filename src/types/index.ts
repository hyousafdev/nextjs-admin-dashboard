import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type Kpi = {
  id: string;
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
};

export type ActivityType = "order" | "user" | "payment" | "product";

export type Activity = {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  time: string;
};

export type RevenuePoint = {
  month: string;
  revenue: number;
};

export type CategorySales = {
  category: string;
  sales: number;
};

export type SortOrder = "asc" | "desc";

export type UserRole = "admin" | "manager" | "customer";

export type UserStatus = "active" | "inactive" | "pending";

export type UsersSortKey = "name" | "joinedAt" | "orders" | "totalSpent";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  country: string;
  joinedAt: string;
  orders: number;
  totalSpent: number;
};

export type ProductCategory =
  | "Electronics"
  | "Clothing"
  | "Home"
  | "Sports"
  | "Beauty"
  | "Toys";

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export type ProductsSort =
  | "name"
  | "price-asc"
  | "price-desc"
  | "stock-asc"
  | "sales";

export type ProductsView = "grid" | "table";

export type Product = {
  id: number;
  name: string;
  sku: string;
  category: ProductCategory;
  price: number;
  stock: number;
  rating: number;
  sales: number;
  description: string;
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "card" | "paypal" | "cod";

export type OrdersSort = "newest" | "oldest" | "total-desc" | "total-asc";

export type OrderItem = {
  productId: number;
  quantity: number;
};

export type Order = {
  id: string;
  customerId: number;
  status: OrderStatus;
  createdAt: string;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
};