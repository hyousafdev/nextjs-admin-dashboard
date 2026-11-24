import type { AuthRole } from "@/lib/auth-types";

const protectedPrefixes = [
  "/dashboard",
  "/users",
  "/products",
  "/orders",
  "/analytics",
  "/settings",
  "/forbidden",
];

const authPages = ["/login", "/signup"];

// Pages that only some roles may open.
const roleRoutes: { prefix: string; roles: AuthRole[] }[] = [
  { prefix: "/analytics", roles: ["admin", "manager"] },
];

function matchesPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function isProtectedPath(pathname: string): boolean {
  return protectedPrefixes.some((prefix) => matchesPrefix(pathname, prefix));
}

export function isAuthPage(pathname: string): boolean {
  return authPages.includes(pathname);
}

export function canAccess(pathname: string, role: AuthRole): boolean {
  const rule = roleRoutes.find((item) => matchesPrefix(pathname, item.prefix));

  return !rule || rule.roles.includes(role);
}

export type Permission = "editUsers" | "deleteUsers";

const permissions: Record<Permission, AuthRole[]> = {
  editUsers: ["admin", "manager"],
  deleteUsers: ["admin"],
};

export function can(role: AuthRole, permission: Permission): boolean {
  return permissions[permission].includes(role);
}

// Only internal paths are allowed after login (blocks open redirects).
export function getSafeRedirect(value: string | null | undefined): string {
  if (
    value &&
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.includes("\\")
  ) {
    return value;
  }

  return "/dashboard";
}