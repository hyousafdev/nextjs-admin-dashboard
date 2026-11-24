"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/actions/auth";
import AuthField from "@/components/auth/AuthField";
import { inputClass } from "@/components/auth/authStyles";
import PasswordInput from "@/components/auth/PasswordInput";
import SubmitButton from "@/components/auth/SubmitButton";

type LoginFormProps = {
  next?: string;
};

export default function LoginForm({ next }: LoginFormProps) {
  const [state, formAction] = useActionState(loginAction, undefined);
  const errors = state?.errors ?? {};

  return (
    <form action={formAction} noValidate className="space-y-5">
      <input type="hidden" name="next" value={next ?? ""} />

      {state?.message && (
        <p
          role="alert"
          className="rounded-lg border border-danger/40 bg-danger/10 p-3 text-sm text-danger"
        >
          {state.message}
        </p>
      )}

      <AuthField id="email" label="Email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={state?.values?.email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass}
        />
      </AuthField>

      <AuthField id="password" label="Password" error={errors.password}>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="current-password"
          hasError={Boolean(errors.password)}
        />
      </AuthField>

      <SubmitButton pendingText="Signing in...">Sign in</SubmitButton>

      <p className="text-center text-sm text-muted-foreground">
        Do not have an account?{" "}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}