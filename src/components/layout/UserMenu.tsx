"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Settings } from "lucide-react";
import { logoutAction } from "@/actions/auth";
import { useCurrentUser } from "@/components/auth/CurrentUserProvider";
import Badge from "@/components/ui/Badge";
import DropdownMenu from "@/components/ui/DropdownMenu";
import { getInitials } from "@/lib/utils";

export default function UserMenu() {
  const user = useCurrentUser();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenu
      label="Account menu"
      header={
        <div className="px-3 py-2">
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          <Badge variant="primary" className="mt-2">
            {user.role}
          </Badge>
        </div>
      }
      items={[
        {
          label: "Settings",
          icon: Settings,
          onSelect: () => router.push("/settings"),
        },
        {
          label: isPending ? "Signing out..." : "Sign out",
          icon: LogOut,
          destructive: true,
          onSelect: () => {
            startTransition(async () => {
              await logoutAction();
            });
          },
        },
      ]}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
        {getInitials(user.name)}
      </span>
    </DropdownMenu>
  );
}