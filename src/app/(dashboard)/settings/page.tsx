import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your profile and preferences."
      />
      <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
        Settings page coming soon
      </div>
    </>
  );
}