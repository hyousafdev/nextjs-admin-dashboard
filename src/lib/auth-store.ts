import "server-only";
import type { AuthRole } from "@/lib/auth-types";
import { hashPassword } from "@/lib/password";

export type Account = {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
  passwordHash: string;
};

const demoAccounts: {
  name: string;
  email: string;
  password: string;
  role: AuthRole;
}[] = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "Admin123!",
    role: "admin",
  },
  {
    name: "Maya Manager",
    email: "manager@example.com",
    password: "Manager123!",
    role: "manager",
  },
];

// Fake database: lives in server memory, so new accounts disappear when
// the dev server restarts. Hashing happens lazily on first use (never at
// import time), because Cache Components does not allow random values
// while prerendering.
let accountsPromise: Promise<Account[]> | null = null;

function getAccounts(): Promise<Account[]> {
  if (!accountsPromise) {
    accountsPromise = Promise.all(
      demoAccounts.map(async (demo, index) => ({
        id: `acc_${index + 1}`,
        name: demo.name,
        email: demo.email,
        role: demo.role,
        passwordHash: await hashPassword(demo.password),
      })),
    );
  }

  return accountsPromise;
}

export async function findAccountByEmail(
  email: string,
): Promise<Account | undefined> {
  const accounts = await getAccounts();

  return accounts.find(
    (account) => account.email.toLowerCase() === email.trim().toLowerCase(),
  );
}

type NewAccount = {
  name: string;
  email: string;
  password: string;
};

export async function createAccount(input: NewAccount): Promise<Account> {
  const accounts = await getAccounts();

  const account: Account = {
    id: `acc_${accounts.length + 1}`,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    role: "viewer",
    passwordHash: await hashPassword(input.password),
  };

  accounts.push(account);

  return account;
}