export type AuthRole = "admin" | "manager" | "viewer";

export type FieldErrors = Record<string, string>;

export type AuthFormState =
  | {
      errors?: FieldErrors;
      message?: string;
      values?: { name?: string; email?: string };
    }
  | undefined;