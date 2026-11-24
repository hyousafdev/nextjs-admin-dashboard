export type AuthRole = "admin" | "manager" | "viewer";

export const authRoles: AuthRole[] = ["admin", "manager", "viewer"];

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
};

export type FieldErrors = Record<string, string>;

export type AuthFormState =
  | {
      errors?: FieldErrors;
      message?: string;
      values?: { name?: string; email?: string };
    }
  | undefined;