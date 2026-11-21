"use client";

import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  productCategories,
  productSortOptions,
  stockStatuses,
} from "@/lib/product-options";

const selectClass =
  "h-9 rounded-lg border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40";

export default function ProductsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuery = searchParams.get("q") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const currentStock = searchParams.get("stock") ?? "";
  const currentSort = searchParams.get("sort") ?? "name";

  // Keep the input in sync when the URL changes from outside
  // (Back button, "Clear filters" link), but not while the user is typing.
  useEffect(() => {
    if (timeoutRef.current !== null) {
      return;
    }
    if (inputRef.current && inputRef.current.value.trim() !== currentQuery) {
      inputRef.current.value = currentQuery;
    }
  }, [currentQuery]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function updateParams(
    updates: Record<string, string>,
    method: "push" | "replace" = "push",
  ) {
    const params = new URLSearchParams(window.location.search);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // A new filter always starts from the first page.
    params.delete("page");

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    if (method === "replace") {
      router.replace(url, { scroll: false });
    } else {
      router.push(url, { scroll: false });
    }
  }

  function handleSearchChange(value: string) {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      updateParams({ q: value.trim() }, "replace");
    }, 400);
  }

  function handleClear() {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    // Clear the filters but keep the chosen view (grid or table).
    const view = new URLSearchParams(window.location.search).get("view");
    router.push(view ? `${pathname}?view=${view}` : pathname, {
      scroll: false,
    });
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="search"
          defaultValue={currentQuery}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="Search by name or SKU..."
          aria-label="Search products"
          className="h-9 w-full rounded-lg border bg-card pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <select
        value={currentCategory}
        onChange={(event) => updateParams({ category: event.target.value })}
        aria-label="Filter by category"
        className={selectClass}
      >
        <option value="">All categories</option>
        {productCategories.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <select
        value={currentStock}
        onChange={(event) => updateParams({ stock: event.target.value })}
        aria-label="Filter by stock status"
        className={selectClass}
      >
        <option value="">All stock</option>
        {stockStatuses.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <select
        value={currentSort}
        onChange={(event) => updateParams({ sort: event.target.value })}
        aria-label="Sort products"
        className={selectClass}
      >
        {productSortOptions.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleClear}
        className="inline-flex h-9 items-center justify-center gap-1 rounded-lg px-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <X className="h-4 w-4" />
        Clear
      </button>
    </div>
  );
}