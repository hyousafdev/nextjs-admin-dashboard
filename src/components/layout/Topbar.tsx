"use client";

import {
  Bell,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
} from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";

type TopbarProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenMobile: () => void;
  onOpenSearch: () => void;
};

export default function Topbar({
  isCollapsed,
  onToggleCollapse,
  onOpenMobile,
  onOpenSearch,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-card/80 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onOpenMobile}
        aria-label="Open sidebar"
        className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={onToggleCollapse}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="hidden rounded-lg p-2 text-muted-foreground hover:bg-muted lg:inline-flex"
      >
        {isCollapsed ? (
          <PanelLeftOpen className="h-5 w-5" />
        ) : (
          <PanelLeftClose className="h-5 w-5" />
        )}
      </button>

      <button
        type="button"
        onClick={onOpenSearch}
        aria-label="Open search"
        className="ml-1 flex h-9 max-w-md flex-1 items-center gap-2 rounded-lg border bg-muted px-3 text-sm text-muted-foreground hover:bg-muted/70"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="hidden rounded border bg-card px-1.5 py-0.5 text-xs sm:inline">
          Ctrl K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
        >
          <Bell className="h-5 w-5" />
        </button>
        <div className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          AU
        </div>
      </div>
    </header>
  );
}