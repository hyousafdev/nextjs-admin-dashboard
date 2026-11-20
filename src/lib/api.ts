import {
  kpis,
  recentActivity,
  revenueData,
  salesByCategory,
} from "@/data/dashboard";
import type { Activity, CategorySales, Kpi, RevenuePoint } from "@/types";

// Simulates network latency so loading states can be seen.
function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function getKpis(): Promise<Kpi[]> {
  await delay(600);
  return kpis;
}

export async function getRevenueData(): Promise<RevenuePoint[]> {
  await delay(1000);
  return revenueData;
}

export async function getSalesByCategory(): Promise<CategorySales[]> {
  await delay(1400);
  return salesByCategory;
}

export async function getRecentActivity(): Promise<Activity[]> {
  await delay(1800);
  return recentActivity;
}