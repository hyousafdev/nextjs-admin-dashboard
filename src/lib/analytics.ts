import { Clock, Eye, Percent, Users } from "lucide-react";
import { revenueData } from "@/data/dashboard";
import { orders } from "@/data/orders";
import { delay } from "@/lib/api";
import { orderStatuses } from "@/lib/order-options";
import { findProductById } from "@/lib/products";
import type {
  AnalyticsRange,
  ChartSlice,
  Kpi,
  OrderStatus,
  RevenuePoint,
  TopProduct,
  TrafficPoint,
} from "@/types";

export const DEFAULT_ANALYTICS_RANGE: AnalyticsRange = "30d";

export const analyticsRanges: {
  value: AnalyticsRange;
  label: string;
  description: string;
}[] = [
  { value: "7d", label: "7 days", description: "the last 7 days" },
  { value: "30d", label: "30 days", description: "the last 30 days" },
  { value: "90d", label: "90 days", description: "the last 90 days" },
  { value: "12m", label: "12 months", description: "the last 12 months" },
];

export type AnalyticsData = {
  kpis: Kpi[];
  traffic: TrafficPoint[];
  revenue: RevenuePoint[];
  sources: ChartSlice[];
  statuses: ChartSlice[];
  topProducts: TopProduct[];
};

type RawRange = string | string[] | undefined;

export function parseAnalyticsRange(value: RawRange): AnalyticsRange {
  const raw = Array.isArray(value) ? value[0] : value;

  return (
    analyticsRanges.find((item) => item.value === raw)?.value ??
    DEFAULT_ANALYTICS_RANGE
  );
}

type RangeConfig = {
  points: number;
  stepDays: number;
  visitors: number;
  revenue: number;
  stats: {
    pageViews: string;
    visitors: string;
    session: string;
    conversion: string;
  };
  changes: [number, number, number, number];
};

const rangeConfigs: Record<AnalyticsRange, RangeConfig> = {
  "7d": {
    points: 7,
    stepDays: 1,
    visitors: 1450,
    revenue: 1650,
    stats: {
      pageViews: "29,840",
      visitors: "10,420",
      session: "3m 08s",
      conversion: "3.4%",
    },
    changes: [4.2, 3.1, 1.5, 0.3],
  },
  "30d": {
    points: 30,
    stepDays: 1,
    visitors: 1500,
    revenue: 1600,
    stats: {
      pageViews: "126,400",
      visitors: "44,870",
      session: "3m 21s",
      conversion: "3.5%",
    },
    changes: [8.6, 6.9, 2.8, 0.4],
  },
  "90d": {
    points: 13,
    stepDays: 7,
    visitors: 10200,
    revenue: 11200,
    stats: {
      pageViews: "371,900",
      visitors: "131,200",
      session: "3m 17s",
      conversion: "3.3%",
    },
    changes: [12.4, 10.1, -1.2, 0.2],
  },
  "12m": {
    points: 12,
    stepDays: 30,
    visitors: 42000,
    revenue: 40000,
    stats: {
      pageViews: "1,482,000",
      visitors: "512,400",
      session: "3m 24s",
      conversion: "3.6%",
    },
    changes: [18.9, 15.3, 4.6, 0.8],
  },
};

// Fixed end date: "today" is never read, so the output is the same every time.
const END_DATE_MS = Date.UTC(2026, 10, 21);
const DAY_MS = 24 * 60 * 60 * 1000;

function formatLabel(date: Date, stepDays: number): string {
  return date.toLocaleDateString(
    "en-US",
    stepDays >= 30
      ? { month: "short", timeZone: "UTC" }
      : { month: "short", day: "numeric", timeZone: "UTC" },
  );
}

// Deterministic "random-looking" variation using sine and cosine waves.
function getWave(index: number): number {
  return Math.sin(index * 0.9) * 0.14 + Math.cos(index * 0.37) * 0.07;
}

function getPointDate(config: RangeConfig, index: number): Date {
  const offsetDays = (config.points - 1 - index) * config.stepDays;
  return new Date(END_DATE_MS - offsetDays * DAY_MS);
}

function buildTraffic(config: RangeConfig): TrafficPoint[] {
  return Array.from({ length: config.points }, (_, index) => {
    const trend = 1 + (index / config.points) * 0.12;
    const visitors = Math.round(config.visitors * (1 + getWave(index)) * trend);

    return {
      label: formatLabel(getPointDate(config, index), config.stepDays),
      visitors,
      pageViews: Math.round(visitors * 2.8),
    };
  });
}

function buildRevenue(range: AnalyticsRange, config: RangeConfig): RevenuePoint[] {
  // The 12 month view reuses the dashboard data so both pages agree.
  if (range === "12m") {
    return revenueData;
  }

  return Array.from({ length: config.points }, (_, index) => {
    const trend = 1 + (index / config.points) * 0.1;
    const value = config.revenue * (1 + getWave(index + 3)) * trend;

    return {
      month: formatLabel(getPointDate(config, index), config.stepDays),
      revenue: Math.round(value / 10) * 10,
    };
  });
}

function buildKpis(config: RangeConfig): Kpi[] {
  return [
    {
      id: "page-views",
      title: "Page views",
      value: config.stats.pageViews,
      change: config.changes[0],
      icon: Eye,
    },
    {
      id: "visitors",
      title: "Unique visitors",
      value: config.stats.visitors,
      change: config.changes[1],
      icon: Users,
    },
    {
      id: "session",
      title: "Avg. session",
      value: config.stats.session,
      change: config.changes[2],
      icon: Clock,
    },
    {
      id: "conversion",
      title: "Conversion rate",
      value: config.stats.conversion,
      change: config.changes[3],
      icon: Percent,
    },
  ];
}

const trafficSources: ChartSlice[] = [
  { name: "Direct", value: 38, color: "#6366f1" },
  { name: "Organic search", value: 29, color: "#0ea5e9" },
  { name: "Social", value: 18, color: "#22c55e" },
  { name: "Referral", value: 10, color: "#f59e0b" },
  { name: "Email", value: 5, color: "#ef4444" },
];

const statusColors: Record<OrderStatus, string> = {
  pending: "#f59e0b",
  processing: "#0ea5e9",
  shipped: "#6366f1",
  delivered: "#22c55e",
  cancelled: "#ef4444",
};

// Derived from the real orders data.
function getStatusBreakdown(): ChartSlice[] {
  return orderStatuses.map((status) => ({
    name: status.label,
    value: orders.filter((order) => order.status === status.value).length,
    color: statusColors[status.value],
  }));
}

// Derived from the real orders and products data (cancelled orders excluded).
function getTopProducts(): TopProduct[] {
  const revenueByProduct = new Map<number, number>();

  orders
    .filter((order) => order.status !== "cancelled")
    .forEach((order) => {
      order.items.forEach((item) => {
        const product = findProductById(item.productId);

        if (product) {
          revenueByProduct.set(
            product.id,
            (revenueByProduct.get(product.id) ?? 0) +
              product.price * item.quantity,
          );
        }
      });
    });

  return [...revenueByProduct.entries()]
    .map(([id, revenue]) => ({
      name: findProductById(id)?.name ?? `Product ${id}`,
      revenue: Math.round(revenue * 100) / 100,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 6);
}

export async function getAnalytics(
  range: AnalyticsRange,
): Promise<AnalyticsData> {
  await delay(700);

  const config = rangeConfigs[range];

  return {
    kpis: buildKpis(config),
    traffic: buildTraffic(config),
    revenue: buildRevenue(range, config),
    sources: trafficSources,
    statuses: getStatusBreakdown(),
    topProducts: getTopProducts(),
  };
}