import { Ban, Check, Clock, Package, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types";

const steps = [
  { status: "pending", label: "Pending", icon: Clock },
  { status: "processing", label: "Processing", icon: Package },
  { status: "shipped", label: "Shipped", icon: Truck },
  { status: "delivered", label: "Delivered", icon: Check },
] as const;

type OrderTimelineProps = {
  status: OrderStatus;
};

export default function OrderTimeline({ status }: OrderTimelineProps) {
  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-3 rounded-lg bg-danger/10 p-4 text-sm text-danger">
        <Ban className="h-5 w-5 shrink-0" />
        This order was cancelled.
      </div>
    );
  }

  const currentIndex = steps.findIndex((step) => step.status === status);

  return (
    <ol className="grid grid-cols-4 gap-2">
      {steps.map((step, index) => {
        const isDone = index <= currentIndex;
        const Icon = step.icon;

        return (
          <li
            key={step.status}
            className="flex flex-col items-center gap-2 text-center"
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                isDone
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span
              className={cn(
                "text-xs font-medium",
                isDone ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}