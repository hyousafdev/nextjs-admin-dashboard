"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Package, Search, ShoppingCart, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { navItems } from "@/lib/navigation";
import type { SearchResult, SearchResultType } from "@/lib/search";
import { cn } from "@/lib/utils";

type PaletteGroup = "Pages" | "Users" | "Products" | "Orders";

type PaletteItem = {
  id: string;
  group: PaletteGroup;
  title: string;
  subtitle?: string;
  href: string;
  icon: LucideIcon;
};

type SearchState = {
  query: string;
  results: SearchResult[];
  failed: boolean;
};

const groups: PaletteGroup[] = ["Pages", "Users", "Products", "Orders"];

const typeConfig: Record<
  SearchResultType,
  { group: PaletteGroup; icon: LucideIcon }
> = {
  user: { group: "Users", icon: Users },
  product: { group: "Products", icon: Package },
  order: { group: "Orders", icon: ShoppingCart },
};

const MIN_QUERY_LENGTH = 2;

type PaletteContentProps = {
  onClose: () => void;
};

// This component is mounted only while the palette is open,
// so the query and results start fresh every time.
function PaletteContent({ onClose }: PaletteContentProps) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchState, setSearchState] = useState<SearchState | null>(null);

  const trimmed = query.trim();
  const hasQuery = trimmed.length >= MIN_QUERY_LENGTH;

  // Results are used only if they belong to the current query.
  // Loading is derived: we have a query but no matching results yet.
  const current =
    hasQuery && searchState?.query === trimmed ? searchState : null;
  const isLoading = hasQuery && current === null;

  useEffect(() => {
    if (!hasQuery) {
      return;
    }

    const controller = new AbortController();

    // Debounce: wait until the user stops typing.
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const data: { results: SearchResult[] } = await response.json();
        setSearchState({ query: trimmed, results: data.results, failed: false });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setSearchState({ query: trimmed, results: [], failed: true });
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [hasQuery, trimmed]);

  const items = useMemo<PaletteItem[]>(() => {
    const search = trimmed.toLowerCase();

    const pages: PaletteItem[] = navItems
      .filter((item) => search === "" || item.label.toLowerCase().includes(search))
      .map((item) => ({
        id: `page-${item.href}`,
        group: "Pages",
        title: item.label,
        href: item.href,
        icon: item.icon,
      }));

    const found: PaletteItem[] = (current?.results ?? []).map((result) => ({
      id: result.id,
      group: typeConfig[result.type].group,
      title: result.title,
      subtitle: result.subtitle,
      href: result.href,
      icon: typeConfig[result.type].icon,
    }));

    return [...pages, ...found];
  }, [trimmed, current]);

  const sections = groups
    .map((group) => ({
      group,
      items: items.filter((item) => item.group === group),
    }))
    .filter((section) => section.items.length > 0);

  // Flat list in display order, used for keyboard navigation.
  const ordered = sections.flatMap((section) => section.items);
  const safeIndex = Math.min(activeIndex, Math.max(ordered.length - 1, 0));
  const activeOptionId =
    ordered.length > 0 ? `${listId}-${safeIndex}` : undefined;

  useEffect(() => {
    if (activeOptionId) {
      document
        .getElementById(activeOptionId)
        ?.scrollIntoView({ block: "nearest" });
    }
  }, [activeOptionId]);

  function handleSelect(item: PaletteItem) {
    router.push(item.href);
    onClose();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((safeIndex + 1) % Math.max(ordered.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (safeIndex - 1 + Math.max(ordered.length, 1)) %
          Math.max(ordered.length, 1),
      );
    } else if (event.key === "Enter") {
      event.preventDefault();

      if (ordered[safeIndex]) {
        handleSelect(ordered[safeIndex]);
      }
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 border-b px-4">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          autoFocus
          type="text"
          role="combobox"
          aria-label="Search"
          aria-autocomplete="list"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={activeOptionId}
          autoComplete="off"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search pages, users, products and orders..."
          className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div id={listId} role="listbox" className="max-h-80 overflow-y-auto p-2">
        {sections.map((section) => (
          <div key={section.group} role="group" aria-label={section.group}>
            <p className="px-3 pb-1 pt-2 text-xs font-medium text-muted-foreground">
              {section.group}
            </p>

            {section.items.map((item) => {
              const index = ordered.indexOf(item);
              const isActive = index === safeIndex;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={isActive}
                  onMouseMove={() => setActiveIndex(index)}
                  onClick={() => handleSelect(item)}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2",
                    isActive && "bg-muted",
                  )}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    {item.subtitle && (
                      <p className="truncate text-xs text-muted-foreground">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div role="status" className="px-4 pb-3 text-sm text-muted-foreground">
        {isLoading && <p className="animate-pulse">Searching...</p>}
        {current?.failed && (
          <p className="text-danger">Something went wrong. Please try again.</p>
        )}
        {current && !current.failed && current.results.length === 0 && (
          <p>No users, products or orders found for &quot;{trimmed}&quot;.</p>
        )}
        {trimmed.length > 0 && !hasQuery && (
          <p>Type at least {MIN_QUERY_LENGTH} characters to search.</p>
        )}
      </div>

      <div className="hidden items-center gap-4 border-t px-4 py-2 text-xs text-muted-foreground sm:flex">
        <span>
          <kbd className="rounded border px-1">Up</kbd>{" "}
          <kbd className="rounded border px-1">Down</kbd> to navigate
        </span>
        <span>
          <kbd className="rounded border px-1">Enter</kbd> to open
        </span>
        <span>
          <kbd className="rounded border px-1">Esc</kbd> to close
        </span>
      </div>
    </div>
  );
}

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Search"
      variant="bare"
      className="max-w-xl overflow-hidden"
    >
      <PaletteContent onClose={onClose} />
    </Modal>
  );
}