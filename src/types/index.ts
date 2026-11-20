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