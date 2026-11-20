import { DollarSign, Percent, ShoppingCart, Users } from "lucide-react";
import type { Activity, CategorySales, Kpi, RevenuePoint } from "@/types";

export const kpis: Kpi[] = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "$48,290",
    change: 3.2,
    icon: DollarSign,
  },
  {
    id: "users",
    title: "Active Users",
    value: "2,847",
    change: 8.2,
    icon: Users,
  },
  {
    id: "orders",
    title: "Orders",
    value: "1,236",
    change: -3.1,
    icon: ShoppingCart,
  },
  {
    id: "conversion",
    title: "Conversion Rate",
    value: "3.48%",
    change: 0.6,
    icon: Percent,
  },
];

export const revenueData: RevenuePoint[] = [
  { month: "Dec", revenue: 31200 },
  { month: "Jan", revenue: 29800 },
  { month: "Feb", revenue: 33400 },
  { month: "Mar", revenue: 36100 },
  { month: "Apr", revenue: 38700 },
  { month: "May", revenue: 37900 },
  { month: "Jun", revenue: 41200 },
  { month: "Jul", revenue: 43600 },
  { month: "Aug", revenue: 42100 },
  { month: "Sep", revenue: 45300 },
  { month: "Oct", revenue: 46800 },
  { month: "Nov", revenue: 48290 },
];

export const salesByCategory: CategorySales[] = [
  { category: "Electronics", sales: 18400 },
  { category: "Clothing", sales: 12900 },
  { category: "Home", sales: 9700 },
  { category: "Sports", sales: 7300 },
  { category: "Beauty", sales: 5600 },
  { category: "Toys", sales: 3900 },
];

export const recentActivity: Activity[] = [
  {
    id: "a1",
    type: "order",
    title: "New order #ORD-10482",
    description: "Sophia Martinez purchased 3 items for $184.50",
    time: "2 min ago",
  },
  {
    id: "a2",
    type: "user",
    title: "New user registered",
    description: "Liam Johnson joined from the pricing page",
    time: "18 min ago",
  },
  {
    id: "a3",
    type: "payment",
    title: "Payment received",
    description: "$1,250.00 from Northwind Traders",
    time: "42 min ago",
  },
  {
    id: "a4",
    type: "product",
    title: "Low stock alert",
    description: "Wireless Headphones has only 4 units left",
    time: "1 hour ago",
  },
  {
    id: "a5",
    type: "order",
    title: "Order #ORD-10479 shipped",
    description: "Shipped to Austin, TX via FedEx",
    time: "2 hours ago",
  },
  {
    id: "a6",
    type: "user",
    title: "Profile updated",
    description: "Emma Wilson changed her billing address",
    time: "3 hours ago",
  },
];