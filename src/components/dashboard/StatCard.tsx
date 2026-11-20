import { TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { Kpi } from "@/types";

type StatCardProps = {
  kpi: Kpi;
};

export default function StatCard({ kpi }: StatCardProps) {
  const isPositive = kpi.change >= 0;
  const Icon = kpi.icon;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          {kpi.title}
        </p>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <p className="mt-3 text-3xl font-bold tracking-tight">{kpi.value}</p>

      <p
        className={cn(
          "mt-2 flex items-center gap-1 text-sm font-medium",
          isPositive ? "text-success" : "text-danger",
        )}
      >
        <TrendIcon className="h-4 w-4" />
        {isPositive ? "+" : ""}
        {kpi.change}%
        <span className="font-normal text-muted-foreground">vs last month</span>
      </p>
    </Card>
  );
}