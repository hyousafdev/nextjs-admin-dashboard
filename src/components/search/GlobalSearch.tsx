"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Package, Search, ShoppingCart, Users, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useGlobalSearch } from "@/components/search/useGlobalSearch";
import type { SearchResult, SearchResultType } from "@/lib/search";
import { cn } from "@/lib/utils";

const groupConfig: { type: SearchResultType; label: string; icon: LucideIcon }[] =
  [
    { type: "user", label: "Users", icon: Users },
    { type: "product", label: "Products", icon: Package },
    { type: "order", label: "Orders", icon: ShoppingCart },
  ];

export default function GlobalSearch() {
  const router = useRouter();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { trimmed, hasQuery, minLength, results, isLoading, failed } =
    useGlobalSearch(query);

  const sections = groupConfig
    .map((group) => ({
      ...group,
      items: results.filter((result) => result.type === group.type),
    }))
    .filter((section) => section.items.length > 0);

  // Flat list in display order, used for keyboard navigation.
  const ordered = sections.flatMap((section) => section.items);
  const safeIndex = Math.min(activeIndex, Math.max(ordered.length - 1, 0));
  const hasList = isOpen && ordered.length > 0;
  const activeOptionId = hasList ? `${listId}-${safeIndex}` : undefined;

  // Ctrl + K (Windows, Linux) or Cmd + K (Mac) moves focus to the field.
  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (activeOptionId) {
      document
        .getElementById(activeOptionId)
        ?.scrollIntoView({ block: "nearest" });
    }
  }, [activeOptionId]);

  function handleSelect(result: SearchResult) {
    router.push(result.href);
    setQuery("");
    setIsOpen(false);
    inputRef.current?.blur();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const count = Math.max(ordered.length, 1);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((safeIndex + 1) % count);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((safeIndex - 1 + count) % count);
    } else if (event.key === "Enter") {
      if (hasList && ordered[safeIndex]) {
        event.preventDefault();
        handleSelect(ordered[safeIndex]);
      }
    } else if (event.key === "Escape") {
      if (isOpen) {
        setIsOpen(false);
      } else if (query) {
        setQuery("");
      } else {
        inputRef.current?.blur();
      }
    }
  }

  // Close the dropdown when focus leaves the whole search area.
  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsOpen(false);
    }
  }

  return (
    <div
      onBlur={handleBlur}
      className="ml-1 max-w-md flex-1 sm:relative"
    >
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-label="Search users, products and orders"
          aria-autocomplete="list"
          aria-expanded={hasList}
          aria-controls={hasList ? listId : undefined}
          aria-activedescendant={activeOptionId}
          autoComplete="off"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search users, products, orders..."
          className="h-9 w-full rounded-lg border bg-muted pl-9 pr-14 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
        />

        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-card hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border bg-card px-1.5 py-0.5 text-xs text-muted-foreground sm:inline">
            Ctrl K
          </kbd>
        )}
      </div>

      {isOpen && (
        <div className="absolute inset-x-4 top-full z-40 mt-1 max-h-96 overflow-y-auto rounded-xl border bg-card p-2 shadow-lg sm:inset-x-0 sm:mt-2">
          {sections.length > 0 && (
            <div id={listId} role="listbox" aria-label="Search results">
              {sections.map((section) => {
                const Icon = section.icon;

                return (
                  <div
                    key={section.type}
                    role="group"
                    aria-label={section.label}
                  >
                    <p className="px-3 pb-1 pt-2 text-xs font-medium text-muted-foreground">
                      {section.label}
                    </p>

                    {section.items.map((result) => {
                      const index = ordered.indexOf(result);

                      return (
                        <div
                          key={result.id}
                          id={`${listId}-${index}`}
                          role="option"
                          aria-selected={index === safeIndex}
                          onMouseDown={(event) => event.preventDefault()}
                          onMouseMove={() => setActiveIndex(index)}
                          onClick={() => handleSelect(result)}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2",
                            index === safeIndex && "bg-muted",
                          )}
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {result.title}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {result.subtitle}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}

          <div role="status" className="px-3 py-2 text-sm text-muted-foreground">
            {!hasQuery && (
              <p>
                Type at least {minLength} characters to search users, products
                and orders.
              </p>
            )}
            {isLoading && <p className="animate-pulse">Searching...</p>}
            {failed && (
              <p className="text-danger">
                Something went wrong. Please try again.
              </p>
            )}
            {hasQuery && !isLoading && !failed && results.length === 0 && (
              <p>
                No users, products or orders found for &quot;{trimmed}&quot;.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}