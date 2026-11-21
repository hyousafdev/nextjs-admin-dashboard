export function buildHref(
  pathname: string,
  params: Record<string, string | undefined>,
): string {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      search.set(key, value);
    }
  });

  const query = search.toString();
  return query ? `${pathname}?${query}` : pathname;
}