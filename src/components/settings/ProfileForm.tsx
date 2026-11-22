"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { getInitials } from "@/lib/utils";

type ProfileValues = {
  name: string;
  email: string;
  jobTitle: string;
  bio: string;
};

type FormErrors = Partial<Record<"name" | "email" | "bio", string>>;

const BIO_LIMIT = 160;

const fieldClass =
  "mt-1 w-full rounded-lg border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40 aria-invalid:border-danger";

export default function ProfileForm() {
  const { toast } = useToast();
  const [values, setValues] = useState<ProfileValues>({
    name: "Admin User",
    email: "admin@example.com",
    jobTitle: "Store Administrator",
    bio: "Managing the store, one order at a time.",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function updateField<K extends keyof ProfileValues>(
    key: K,
    value: ProfileValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};

    if (values.name.trim().length < 2) {
      nextErrors.name = "Please enter your full name";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address";
    }

    if (values.bio.length > BIO_LIMIT) {
      nextErrors.bio = `Bio can be at most ${BIO_LIMIT} characters`;
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      toast({
        variant: "success",
        title: "Profile updated",
        description: "Demo only: your changes are not stored.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
          {getInitials(values.name) || "?"}
        </div>
        <p className="text-sm text-muted-foreground">
          Your initials are used as your avatar.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="profile-name" className="text-sm font-medium">
            Full name
          </label>
          <input
            id="profile-name"
            type="text"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "profile-name-error" : undefined}
            className={`${fieldClass} h-9`}
          />
          {errors.name && (
            <p id="profile-name-error" role="alert" className="mt-1 text-sm text-danger">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="profile-email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="profile-email"
            type="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "profile-email-error" : undefined}
            className={`${fieldClass} h-9`}
          />
          {errors.email && (
            <p id="profile-email-error" role="alert" className="mt-1 text-sm text-danger">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="profile-job" className="text-sm font-medium">
          Job title
        </label>
        <input
          id="profile-job"
          type="text"
          value={values.jobTitle}
          onChange={(event) => updateField("jobTitle", event.target.value)}
          className={`${fieldClass} h-9`}
        />
      </div>

      <div>
        <label htmlFor="profile-bio" className="text-sm font-medium">
          Bio
        </label>
        <textarea
          id="profile-bio"
          rows={3}
          value={values.bio}
          onChange={(event) => updateField("bio", event.target.value)}
          aria-invalid={errors.bio ? true : undefined}
          aria-describedby="profile-bio-count"
          className={`${fieldClass} py-2`}
        />
        <p
          id="profile-bio-count"
          className={
            values.bio.length > BIO_LIMIT
              ? "mt-1 text-sm text-danger"
              : "mt-1 text-sm text-muted-foreground"
          }
        >
          {values.bio.length}/{BIO_LIMIT}
        </p>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save profile</Button>
      </div>
    </form>
  );
}