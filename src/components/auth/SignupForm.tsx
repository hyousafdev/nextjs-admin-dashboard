"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signupAction } from "@/actions/auth";
import AuthField from "@/components/auth/AuthField";
import { inputClass } from "@/components/auth/authStyles";
import PasswordInput from "@/components/auth/PasswordInput";
import SubmitButton from "@/components/auth/SubmitButton";

export default function SignupForm() {
  const [state, formAction] = useActionState(signupAction, undefined);
  const errors = state?.errors ?? {};

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state?.message && (
        <p
          role="alert"
          className="rounded-lg border border-danger/40 bg-danger/10 p-3 text-sm text-danger"
        >
          {state.message}
        </p>
      )}

      <AuthField id="name" label="Full name" error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          defaultValue={state?.values?.name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClass}
        />
      </AuthField>

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

      <AuthField
        id="password"
        label="Password"
        hint="At least 8 characters, with a letter and a number."
        error={errors.password}
      >
        <PasswordInput
          id="password"
          name="password"
          autoComplete="new-password"
          hasError={Boolean(errors.password)}
        />
      </AuthField>

      <AuthField
        id="confirmPassword"
        label="Confirm password"
        error={errors.confirmPassword}
      >
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="new-password"
          hasError={Boolean(errors.confirmPassword)}
        />
      </AuthField>

      <SubmitButton pendingText="Creating account...">
        Create account
      </SubmitButton>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}