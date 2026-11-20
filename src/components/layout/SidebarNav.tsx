"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type SidebarNavProps = {
  isCollapsed: boolean;
  onNavigate: () => void;
};

export default function SidebarNav({
  isCollapsed,
  onNavigate,
}: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="flex-1 space-y-1 p-3">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            title={item.label}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className={cn(isCollapsed && "lg:hidden")}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}