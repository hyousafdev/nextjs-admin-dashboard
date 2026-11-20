"use client";

import {
  Bell,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
} from "lucide-react";

type TopbarProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenMobile: () => void;
};

export default function Topbar({
  isCollapsed,
  onToggleCollapse,
  onOpenMobile,
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

      <div className="relative ml-1 max-w-md flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search (coming soon)"
          aria-label="Search"
          disabled
          className="h-9 w-full rounded-lg border bg-muted pl-9 pr-3 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
        >
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          AU
        </div>
      </div>
    </header>
  );
}