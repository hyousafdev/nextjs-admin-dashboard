import Link from "next/link";
import { LayoutGrid, List } from "lucide-react";
import { toProductsParams } from "@/lib/products";
import type { ProductsQuery } from "@/lib/products";
import { buildHref } from "@/lib/url";
import { cn } from "@/lib/utils";

type ViewToggleProps = {
  query: ProductsQuery;
};

export default function ViewToggle({ query }: ViewToggleProps) {
  const items = [
    { view: "grid", label: "Grid view", icon: LayoutGrid },
    { view: "table", label: "Table view", icon: List },
  ] as const;

  return (
    <div className="inline-flex rounded-lg border p-0.5">
      {items.map(({ view, label, icon: Icon }) => (
        <Link
          key={view}
          href={buildHref("/products", {
            ...toProductsParams(query),
            view: view === "table" ? "table" : undefined,
          })}
          aria-label={label}
          aria-current={query.view === view ? "true" : undefined}
          className={cn(
            "rounded-md p-2",
            query.view === view
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted",
          )}
        >
          <Icon className="h-4 w-4" />
        </Link>
      ))}
    </div>
  );
}