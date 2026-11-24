import { SignJWT, jwtVerify } from "jose";
import { authRoles } from "@/lib/auth-types";
import type { SessionUser } from "@/lib/auth-types";

export const SESSION_COOKIE = "nexus-session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET is missing or too short. Add a random value of at least 32 characters to .env.local and restart the dev server.",
    );
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({ name: user.name, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(
  token: string,
): Promise<SessionUser | null> {
  // A missing secret is a setup mistake, so it must fail loudly (not inside try).
  const key = getSecretKey();

  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    const { sub, name, email, role } = payload;

    if (
      typeof sub !== "string" ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof role !== "string"
    ) {
      return null;
    }

    const matchedRole = authRoles.find((item) => item === role);

    if (!matchedRole) {
      return null;
    }

    return { id: sub, name, email, role: matchedRole };
  } catch {
    // Expired, tampered or malformed token.
    return null;
  }
}