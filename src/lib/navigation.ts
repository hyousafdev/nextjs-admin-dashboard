import {
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/users", icon: Users },
  { label: "Products", href: "/products", icon: Package },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "Analytics", href: "/analytics", icon: TrendingUp },
  { label: "Settings", href: "/settings", icon: Settings },
];