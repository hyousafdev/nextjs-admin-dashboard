"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/ui/Button";
import { userRoles, userStatuses } from "@/lib/user-options";
import type { User, UserRole, UserStatus } from "@/types";

export type EditUserValues = {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

type FormErrors = Partial<Record<"name" | "email", string>>;

type EditUserFormProps = {
  user: User;
  onCancel: () => void;
  onSave: (values: EditUserValues) => void;
};

const fieldClass =
  "mt-1 h-9 w-full rounded-lg border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40 aria-invalid:border-danger";

export default function EditUserForm({
  user,
  onCancel,
  onSave,
}: EditUserFormProps) {
  const [values, setValues] = useState<EditUserValues>({
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function updateField<K extends keyof EditUserValues>(
    key: K,
    value: EditUserValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};

    if (values.name.trim().length < 2) {
      nextErrors.name = "Please enter the full name";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      onSave({
        ...values,
        name: values.name.trim(),
        email: values.email.trim(),
      });
    }
  }

  const nameId = `edit-name-${user.id}`;
  const emailId = `edit-email-${user.id}`;
  const roleId = `edit-role-${user.id}`;
  const statusId = `edit-status-${user.id}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor={nameId} className="text-sm font-medium">
          Full name
        </label>
        <input
          id={nameId}
          type="text"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${nameId}-error` : undefined}
          className={fieldClass}
        />
        {errors.name && (
          <p id={`${nameId}-error`} role="alert" className="mt-1 text-sm text-danger">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={emailId} className="text-sm font-medium">
          Email
        </label>
        <input
          id={emailId}
          type="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          className={fieldClass}
        />
        {errors.email && (
          <p id={`${emailId}-error`} role="alert" className="mt-1 text-sm text-danger">
            {errors.email}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={roleId} className="text-sm font-medium">
            Role
          </label>
          <select
            id={roleId}
            value={values.role}
            onChange={(event) =>
              updateField("role", event.target.value as UserRole)
            }
            className={fieldClass}
          >
            {userRoles.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={statusId} className="text-sm font-medium">
            Status
          </label>
          <select
            id={statusId}
            value={values.status}
            onChange={(event) =>
              updateField("status", event.target.value as UserStatus)
            }
            className={fieldClass}
          >
            {userStatuses.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}