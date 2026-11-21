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