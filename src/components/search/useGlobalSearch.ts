import { useEffect, useState } from "react";
import type { SearchResult } from "@/lib/search";

// Same value as in lib/search.ts. It is repeated here on purpose: importing
// a value from that file would put all the users/products data in the browser.
const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 250;

type SearchState = {
  query: string;
  results: SearchResult[];
  failed: boolean;
};

export function useGlobalSearch(query: string) {
  const [searchState, setSearchState] = useState<SearchState | null>(null);

  const trimmed = query.trim();
  const hasQuery = trimmed.length >= MIN_QUERY_LENGTH;

  // Results are used only if they belong to the current query.
  // Loading is derived: we have a query but no matching results yet.
  const current =
    hasQuery && searchState?.query === trimmed ? searchState : null;

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
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [hasQuery, trimmed]);

  return {
    trimmed,
    hasQuery,
    minLength: MIN_QUERY_LENGTH,
    results: current?.results ?? [],
    isLoading: hasQuery && current === null,
    failed: current?.failed ?? false,
  };
}