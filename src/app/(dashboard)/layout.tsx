import { Suspense } from "react";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/layout/DashboardShell";
import ShellSkeleton from "@/components/layout/ShellSkeleton";
import { getSession } from "@/lib/session";

type AuthenticatedShellProps = {
  children: React.ReactNode;
};

// Reading cookies is request-time data, so it lives inside a Suspense boundary.
async function AuthenticatedShell({ children }: AuthenticatedShellProps) {
  const user = await getSession();

  // The proxy already redirects, this is the second line of defense.
  if (!user) {
    redirect("/login");
  }

  return <DashboardShell user={user}>{children}</DashboardShell>;
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<ShellSkeleton />}>
      <AuthenticatedShell>{children}</AuthenticatedShell>
    </Suspense>
  );
}