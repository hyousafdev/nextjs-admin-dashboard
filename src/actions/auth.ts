"use server";

import { redirect } from "next/navigation";
import { delay } from "@/lib/api";
import { createAccount, findAccountByEmail } from "@/lib/auth-store";
import { loginSchema, signupSchema } from "@/lib/auth-schemas";
import type { AuthFormState, FieldErrors } from "@/lib/auth-types";
import { verifyPassword } from "@/lib/password";
import type { z } from "zod";

function getString(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "");
}

// Keeps the first error message of every field.
function collectErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};

  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");

    if (!errors[key]) {
      errors[key] = issue.message;
    }
  }

  return errors;
}

export async function loginAction(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = getString(formData, "email");
  const password = getString(formData, "password");

  const parsed = loginSchema.safeParse({ email, password });

  if (!parsed.success) {
    return { errors: collectErrors(parsed.error), values: { email } };
  }

  // Simulates a slow network so the pending state can be seen.
  await delay(600);

  const account = await findAccountByEmail(parsed.data.email);
  const isValid = account
    ? await verifyPassword(parsed.data.password, account.passwordHash)
    : false;

  // The same message for "unknown email" and "wrong password",
  // so nobody can find out which emails have an account.
  if (!account || !isValid) {
    return {
      message: "Invalid email or password.",
      values: { email: parsed.data.email },
    };
  }

  redirect("/dashboard");
}

export async function signupAction(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const name = getString(formData, "name");
  const email = getString(formData, "email");

  const parsed = signupSchema.safeParse({
    name,
    email,
    password: getString(formData, "password"),
    confirmPassword: getString(formData, "confirmPassword"),
  });

  if (!parsed.success) {
    return { errors: collectErrors(parsed.error), values: { name, email } };
  }

  await delay(600);

  const existing = await findAccountByEmail(parsed.data.email);

  if (existing) {
    return {
      errors: { email: "An account with this email already exists." },
      values: { name: parsed.data.name, email: parsed.data.email },
    };
  }

  await createAccount({
    name: parsed.data.name,
    email: parsed.data.email,
    password: parsed.data.password,
  });

  redirect("/dashboard");
}