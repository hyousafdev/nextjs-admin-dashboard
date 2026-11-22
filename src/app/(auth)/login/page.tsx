import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Sign in to your account to continue.
      </p>

      <div className="mt-6">
        <LoginForm />
      </div>

      <div className="mt-6 rounded-lg bg-muted p-4 text-sm">
        <p className="font-medium">Demo accounts</p>
        <ul className="mt-2 space-y-1 text-muted-foreground">
          <li>
            Admin: <span className="font-mono">admin@example.com</span> /{" "}
            <span className="font-mono">Admin123!</span>
          </li>
          <li>
            Manager: <span className="font-mono">manager@example.com</span> /{" "}
            <span className="font-mono">Manager123!</span>
          </li>
        </ul>
      </div>
    </>
  );
}