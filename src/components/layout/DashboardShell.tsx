"use client";

import { useEffect, useState } from "react";
import { CurrentUserProvider } from "@/components/auth/CurrentUserProvider";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import type { SessionUser } from "@/lib/auth-types";

type DashboardShellProps = {
  user: SessionUser;
  children: React.ReactNode;
};

export default function DashboardShell({
  user,
  children,
}: DashboardShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <CurrentUserProvider user={user}>
      <div className="flex min-h-screen">
        <Sidebar
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            isCollapsed={isCollapsed}
            onToggleCollapse={() => setIsCollapsed((value) => !value)}
            onOpenMobile={() => setIsMobileOpen(true)}
          />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </CurrentUserProvider>
  );
}