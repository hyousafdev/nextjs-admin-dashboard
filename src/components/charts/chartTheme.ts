import type { CSSProperties } from "react";

export const tooltipStyle: CSSProperties = {
  backgroundColor: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  color: "var(--foreground)",
  fontSize: 12,
};

export const tooltipLabelStyle: CSSProperties = {
  color: "var(--foreground)",
  fontWeight: 600,
};

export const axisTick = {
  fill: "var(--muted-foreground)",
  fontSize: 12,
};