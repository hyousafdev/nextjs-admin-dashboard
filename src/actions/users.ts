"use server";

import { delay } from "@/lib/api";
import { can } from "@/lib/auth-access";
import { getSession } from "@/lib/session";

export type ActionResult = {
  ok: boolean;
  message: string;
};

export async function deleteUserAction(userId: number): Promise<ActionResult> {
  // The server never trusts the UI: permission is checked here as well.
  const session = await getSession();

  if (!session) {
    return { ok: false, message: "You must be signed in." };
  }

  if (!can(session.role, "deleteUsers")) {
    return {
      ok: false,
      message: "You do not have permission to delete users.",
    };
  }

  if (!Number.isInteger(userId) || userId < 1) {
    return { ok: false, message: "Invalid user." };
  }

  await delay(400);

  // Demo only: a real app would delete the user from the database here.
  return { ok: true, message: "User removed." };
}