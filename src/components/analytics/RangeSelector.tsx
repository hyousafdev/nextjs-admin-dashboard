import Link from "next/link";
import { DEFAULT_ANALYTICS_RANGE, analyticsRanges } from "@/lib/analytics";
import { buildHref } from "@/lib/url";
import { cn } from "@/lib/utils";
import type { AnalyticsRange } from "@/types";

type RangeSelectorProps = {
  range: AnalyticsRange;
};

export default function RangeSelector({ range }: RangeSelectorProps) {
  return (
    <div
      role="group"
      aria-label="Date range"
      className="inline-flex rounded-lg border bg-card p-0.5"
    >
      {analyticsRanges.map((item) => (
        <Link
          key={item.value}
          href={buildHref("/analytics", {
            range:
              item.value === DEFAULT_ANALYTICS_RANGE ? undefined : item.value,
          })}
          aria-current={range === item.value ? "true" : undefined}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium",
            range === item.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}