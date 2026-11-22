import type { Metadata } from "next";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import ProfileForm from "@/components/settings/ProfileForm";
import { Card, CardHeader } from "@/components/ui/Card";
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

      <div className="max-w-3xl space-y-6">
        <Card>
          <CardHeader
            title="Profile"
            description="Your personal information shown across the dashboard."
          />
          <ProfileForm />
        </Card>

        <Card>
          <CardHeader
            title="Appearance"
            description="Choose how the dashboard looks to you."
          />
          <AppearanceSettings />
        </Card>

        <Card>
          <CardHeader
            title="Notifications"
            description="Decide which updates you want to receive."
          />
          <NotificationSettings />
        </Card>
      </div>
    </>
  );
}