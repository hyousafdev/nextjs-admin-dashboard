import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Users",
};

export default function UsersPage() {
  return (
    <>
      <PageHeader title="Users" description="Manage your users." />
      <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
        Users page coming soon
      </div>
    </>
  );
}