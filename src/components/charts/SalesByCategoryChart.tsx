"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  axisTick,
  tooltipLabelStyle,
  tooltipStyle,
} from "@/components/charts/chartTheme";
import type { CategorySales } from "@/types";

type SalesByCategoryChartProps = {
  data: CategorySales[];
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function SalesByCategoryChart({
  data,
}: SalesByCategoryChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            vertical={false}
          />
          <XAxis
            dataKey="category"
            tickLine={false}
            axisLine={false}
            tick={axisTick}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={48}
            tick={axisTick}
            tickFormatter={(value: number) => `$${value / 1000}k`}
          />
          <Tooltip
            cursor={{ fill: "var(--muted)" }}
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value) => [currency.format(Number(value)), "Sales"]}
          />
          <Bar dataKey="sales" fill="var(--primary)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}