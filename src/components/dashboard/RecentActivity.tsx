import { CreditCard, Package, ShoppingCart, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { Activity, ActivityType } from "@/types";

const activityStyles: Record<
  ActivityType,
  { icon: LucideIcon; className: string }
> = {
  order: { icon: ShoppingCart, className: "bg-primary/10 text-primary" },
  user: { icon: UserPlus, className: "bg-success/10 text-success" },
  payment: { icon: CreditCard, className: "bg-warning/10 text-warning" },
  product: { icon: Package, className: "bg-danger/10 text-danger" },
};

type RecentActivityProps = {
  activities: Activity[];
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader
        title="Recent activity"
        description="Latest events across your store."
      />

      <ul className="divide-y">
        {activities.map((activity) => {
          const { icon: Icon, className } = activityStyles[activity.type];

          return (
            <li key={activity.id} className="flex items-start gap-3 p-4">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                  className,
                )}
              >
                <Icon className="h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>

              <span className="shrink-0 text-xs text-muted-foreground">
                {activity.time}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}