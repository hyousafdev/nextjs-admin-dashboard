import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationProps = {
  page: number;
  totalPages: number;
  createHref: (page: number) => string;
};

function getPageNumbers(
  page: number,
  totalPages: number,
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = [
    ...new Set([1, totalPages, page - 1, page, page + 1]),
  ]
    .filter((value) => value >= 1 && value <= totalPages)
    .sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];

  pages.forEach((value, index) => {
    if (index > 0 && value - pages[index - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(value);
  });

  return result;
}

const baseClass =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm";

export default function Pagination({
  page,
  totalPages,
  createHref,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className="flex items-center gap-1">
      {page > 1 ? (
        <Link
          href={createHref(page - 1)}
          aria-label="Previous page"
          className={cn(baseClass, "hover:bg-muted")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className={cn(baseClass, "cursor-not-allowed opacity-40")}
        >
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {getPageNumbers(page, totalPages).map((item, index) =>
        item === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
            ...
          </span>
        ) : (
          <Link
            key={item}
            href={createHref(item)}
            aria-current={item === page ? "page" : undefined}
            className={cn(
              baseClass,
              item === page
                ? "border-primary bg-primary text-primary-foreground"
                : "hover:bg-muted",
            )}
          >
            {item}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link
          href={createHref(page + 1)}
          aria-label="Next page"
          className={cn(baseClass, "hover:bg-muted")}
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className={cn(baseClass, "cursor-not-allowed opacity-40")}
        >
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}