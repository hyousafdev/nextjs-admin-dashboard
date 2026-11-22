import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <LayoutDashboard className="h-5 w-5" />
        </div>
        <span className="text-xl font-semibold">{siteConfig.name}</span>
      </Link>

      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm sm:p-8">
        {children}
      </div>

      <p className="mt-6 max-w-md text-center text-xs text-muted-foreground">
        This is a demo project. Accounts are kept in server memory only.
      </p>
    </div>
  );
}