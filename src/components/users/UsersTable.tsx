import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import {
  UserRoleBadge,
  UserStatusBadge,
} from "@/components/users/UserBadges";
import UserActions from "./UserActions";
import { buildHref } from "@/lib/url";
import { toUsersParams } from "@/lib/users";
import type { UsersQuery } from "@/lib/users";
import { cn, formatCurrency, formatDate, getInitials } from "@/lib/utils";
import type { User, UsersSortKey } from "@/types";

type SortHeaderProps = {
  label: string;
  sortKey: UsersSortKey;
  query: UsersQuery;
  align?: "left" | "right";
};

function SortHeader({
  label,
  sortKey,
  query,
  align = "left",
}: SortHeaderProps) {
  const isActive = query.sort === sortKey;
  const nextOrder = isActive
    ? query.order === "asc"
      ? "desc"
      : "asc"
    : sortKey === "name"
      ? "asc"
      : "desc";
  const Icon = !isActive
    ? ArrowUpDown
    : query.order === "asc"
      ? ArrowUp
      : ArrowDown;
  const href = buildHref("/users", {
    ...toUsersParams(query),
    sort: sortKey,
    order: nextOrder,
    page: undefined,
  });

  return (
    <th
      scope="col"
      aria-sort={
        isActive
          ? query.order === "asc"
            ? "ascending"
            : "descending"
          : undefined
      }
      className={cn("px-4 py-3 font-medium", align === "right" && "text-right")}
    >
      <Link
        href={href}
        className={cn(
          "inline-flex items-center gap-1 hover:text-foreground",
          isActive && "text-foreground",
        )}
      >
        {label}
        <Icon className="h-3.5 w-3.5" />
      </Link>
    </th>
  );
}

type UsersTableProps = {
  users: User[];
  query: UsersQuery;
};

export default function UsersTable({ users, query }: UsersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] text-left text-sm">
        <thead className="border-b bg-muted/50 text-muted-foreground">
          <tr>
            <SortHeader label="User" sortKey="name" query={query} />
            <th scope="col" className="px-4 py-3 font-medium">
              Role
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Status
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Country
            </th>
            <SortHeader label="Joined" sortKey="joinedAt" query={query} />
            <SortHeader
              label="Orders"
              sortKey="orders"
              query={query}
              align="right"
            />
            <SortHeader
              label="Spent"
              sortKey="totalSpent"
              query={query}
              align="right"
            />
            <th scope="col" className="w-12 px-4 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-muted/40">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {getInitials(user.name)}
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/users/${user.id}`}
                      className="font-medium hover:underline"
                    >
                      {user.name}
                    </Link>
                    <p className="truncate text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <UserRoleBadge role={user.role} />
              </td>
              <td className="px-4 py-3">
                <UserStatusBadge status={user.status} />
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {user.country}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {formatDate(user.joinedAt)}
              </td>
              <td className="px-4 py-3 text-right">{user.orders}</td>
              <td className="px-4 py-3 text-right font-medium">
                {formatCurrency(user.totalSpent)}
              </td>
              <td className="px-4 py-3 text-right">
                <UserActions user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}