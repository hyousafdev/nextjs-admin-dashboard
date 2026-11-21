import { users as allUsers } from "@/data/users";
import { delay } from "@/lib/api";
import { userRoles, userStatuses } from "@/lib/user-options";
import type {
  SortOrder,
  User,
  UserRole,
  UserStatus,
  UsersSortKey,
} from "@/types";

export const USERS_PAGE_SIZE = 8;
export const DEFAULT_USERS_SORT: UsersSortKey = "joinedAt";
export const DEFAULT_USERS_ORDER: SortOrder = "desc";

const sortKeys: UsersSortKey[] = ["name", "joinedAt", "orders", "totalSpent"];

export type UsersQuery = {
  q: string;
  status: UserStatus | "all";
  role: UserRole | "all";
  sort: UsersSortKey;
  order: SortOrder;
  page: number;
};

export type UsersResult = {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
};

type RawSearchParams = Record<string, string | string[] | undefined>;

function toSingle(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

// URL input is never trusted: every value is checked against known options.
export function parseUsersQuery(params: RawSearchParams): UsersQuery {
  const status =
    userStatuses.find((item) => item.value === toSingle(params.status))
      ?.value ?? "all";
  const role =
    userRoles.find((item) => item.value === toSingle(params.role))?.value ??
    "all";
  const sort =
    sortKeys.find((key) => key === toSingle(params.sort)) ??
    DEFAULT_USERS_SORT;

  const orderParam = toSingle(params.order);
  const order: SortOrder =
    orderParam === "asc" || orderParam === "desc"
      ? orderParam
      : DEFAULT_USERS_ORDER;

  const pageNumber = Number.parseInt(toSingle(params.page), 10);
  const page = Number.isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;

  return {
    q: toSingle(params.q).trim(),
    status,
    role,
    sort,
    order,
    page,
  };
}

export function toUsersParams(
  query: UsersQuery,
): Record<string, string | undefined> {
  return {
    q: query.q || undefined,
    status: query.status === "all" ? undefined : query.status,
    role: query.role === "all" ? undefined : query.role,
    sort: query.sort === DEFAULT_USERS_SORT ? undefined : query.sort,
    order: query.order === DEFAULT_USERS_ORDER ? undefined : query.order,
    page: query.page > 1 ? String(query.page) : undefined,
  };
}

export async function getUsers(query: UsersQuery): Promise<UsersResult> {
  await delay(500);

  const search = query.q.toLowerCase();

  const filtered = allUsers.filter((user) => {
    const matchesSearch =
      search === "" ||
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search);
    const matchesStatus = query.status === "all" || user.status === query.status;
    const matchesRole = query.role === "all" || user.role === query.role;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const direction = query.order === "asc" ? 1 : -1;

  const sorted = [...filtered].sort((a, b) => {
    switch (query.sort) {
      case "name":
        return a.name.localeCompare(b.name) * direction;
      case "orders":
        return (a.orders - b.orders) * direction;
      case "totalSpent":
        return (a.totalSpent - b.totalSpent) * direction;
      default:
        if (a.joinedAt === b.joinedAt) {
          return 0;
        }
        return (a.joinedAt < b.joinedAt ? -1 : 1) * direction;
    }
  });

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / USERS_PAGE_SIZE));
  const page = Math.min(query.page, totalPages);
  const start = (page - 1) * USERS_PAGE_SIZE;

  return {
    users: sorted.slice(start, start + USERS_PAGE_SIZE),
    total,
    page,
    totalPages,
  };
}