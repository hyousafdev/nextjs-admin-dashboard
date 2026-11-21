import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SearchX } from "lucide-react";
import { Card } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Pagination from "@/components/ui/Pagination";
import UsersFilters from "@/components/users/UsersFilters";
import {
  UsersFiltersSkeleton,
  UsersTableSkeleton,
} from "@/components/users/UsersSkeletons";
import UsersTable from "@/components/users/UsersTable";
import { buildHref } from "@/lib/url";
import {
  USERS_PAGE_SIZE,
  getUsers,
  parseUsersQuery,
  toUsersParams,
} from "@/lib/users";

export const metadata: Metadata = {
  title: "Users",
};

type UsersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function UsersResults({ searchParams }: UsersPageProps) {
  const query = parseUsersQuery(await searchParams);
  const result = await getUsers(query);

  if (result.total === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No users found"
        description="Try a different search or remove some filters."
        action={
          <Link href="/users" className="text-sm font-medium underline">
            Clear filters
          </Link>
        }
      />
    );
  }

  const from = (result.page - 1) * USERS_PAGE_SIZE + 1;
  const to = from + result.users.length - 1;

  return (
    <>
      <UsersTable users={result.users} query={query} />

      <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {from}-{to} of {result.total} users
        </p>
        <Pagination
          page={result.page}
          totalPages={result.totalPages}
          createHref={(page) =>
            buildHref("/users", {
              ...toUsersParams(query),
              page: page > 1 ? String(page) : undefined,
            })
          }
        />
      </div>
    </>
  );
}

export default function UsersPage({ searchParams }: UsersPageProps) {
  return (
    <>
      <PageHeader
        title="Users"
        description="Search, filter and manage your users."
      />

      <Card>
        <div className="border-b p-4">
          <Suspense fallback={<UsersFiltersSkeleton />}>
            <UsersFilters />
          </Suspense>
        </div>

        <Suspense fallback={<UsersTableSkeleton />}>
          <UsersResults searchParams={searchParams} />
        </Suspense>
      </Card>
    </>
  );
}