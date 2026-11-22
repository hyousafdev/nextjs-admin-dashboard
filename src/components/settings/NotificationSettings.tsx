"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";
import { useToast } from "@/components/ui/Toast";

type Preferences = {
  orderUpdates: boolean;
  lowStockAlerts: boolean;
  weeklyReport: boolean;
};

export default function NotificationSettings() {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<Preferences>({
    orderUpdates: true,
    lowStockAlerts: true,
    weeklyReport: false,
  });

  function updatePreference(key: keyof Preferences, value: boolean) {
    setPreferences((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="space-y-5 p-5">
      <Switch
        label="Order updates"
        description="Get an email when a new order is placed."
        checked={preferences.orderUpdates}
        onChange={(value) => updatePreference("orderUpdates", value)}
      />
      <Switch
        label="Low stock alerts"
        description="Be notified when a product is about to run out."
        checked={preferences.lowStockAlerts}
        onChange={(value) => updatePreference("lowStockAlerts", value)}
      />
      <Switch
        label="Weekly report"
        description="Receive a summary of sales and traffic every Monday."
        checked={preferences.weeklyReport}
        onChange={(value) => updatePreference("weeklyReport", value)}
      />

      <div className="flex justify-end">
        <Button
          onClick={() =>
            toast({
              variant: "success",
              title: "Preferences saved",
              description: "Demo only: your preferences are not stored.",
            })
          }
        >
          Save preferences
        </Button>
      </div>
    </div>
  );
}