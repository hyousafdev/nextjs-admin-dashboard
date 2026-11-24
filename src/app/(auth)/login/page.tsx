import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";
import Skeleton from "@/components/ui/Skeleton";
import { getSafeRedirect } from "@/lib/auth-access";

export const metadata: Metadata = {
  title: "Sign in",
};

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function LoginSection({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;
  const nextPath = getSafeRedirect(Array.isArray(next) ? next[0] : next);

  return <LoginForm next={nextPath} />;
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Sign in to your account to continue.
      </p>

      <div className="mt-6">
        <Suspense
          fallback={
            <div aria-busy="true" className="space-y-5">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-10" />
            </div>
          }
        >
          <LoginSection searchParams={searchParams} />
        </Suspense>
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
        <p className="mt-2 text-muted-foreground">
          New sign ups get the viewer role.
        </p>
      </div>
    </>
  );
}