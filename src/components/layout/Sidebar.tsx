"use client";

import { Suspense } from "react";
import { LayoutDashboard, X } from "lucide-react";
import SidebarNav from "@/components/layout/SidebarNav";
import { siteConfig } from "@/lib/constants";
import { navItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type SidebarProps = {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
};

export default function Sidebar({
  isCollapsed,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) {
  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card transition-all duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "lg:w-[72px]" : "lg:w-64",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <span
              className={cn("text-lg font-semibold", isCollapsed && "lg:hidden")}
            >
              {siteConfig.name}
            </span>
          </div>

          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <Suspense
          fallback={
            <div className="flex-1 space-y-2 p-3">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="h-9 animate-pulse rounded-lg bg-muted"
                />
              ))}
            </div>
          }
        >
          <SidebarNav isCollapsed={isCollapsed} onNavigate={onCloseMobile} />
        </Suspense>
      </aside>
    </>
  );
}