import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PackageSearch } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import ProductsFilters from "@/components/products/ProductsFilters";
import {
  ProductsFiltersSkeleton,
  ProductsResultsSkeleton,
} from "@/components/products/ProductsSkeletons";
import ProductsTable from "@/components/products/ProductsTable";
import ViewToggle from "@/components/products/ViewToggle";
import { Card } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Pagination from "@/components/ui/Pagination";
import {
  PRODUCTS_PAGE_SIZE,
  getProducts,
  parseProductsQuery,
  toProductsParams,
} from "@/lib/products";
import { buildHref } from "@/lib/url";

export const metadata: Metadata = {
  title: "Products",
};

type ProductsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function ProductsResults({ searchParams }: ProductsPageProps) {
  const query = parseProductsQuery(await searchParams);
  const result = await getProducts(query);

  if (result.total === 0) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="No products found"
        description="Try a different search or remove some filters."
        action={
          <Link href="/products" className="text-sm font-medium underline">
            Clear filters
          </Link>
        }
      />
    );
  }

  const from = (result.page - 1) * PRODUCTS_PAGE_SIZE + 1;
  const to = from + result.products.length - 1;

  return (
    <>
      <div className="flex items-center justify-between gap-3 p-4">
        <p className="text-sm text-muted-foreground">
          Showing {from}-{to} of {result.total} products
        </p>
        <ViewToggle query={query} />
      </div>

      {query.view === "table" ? (
        <ProductsTable products={result.products} />
      ) : (
        <div className="grid gap-4 px-4 pb-4 sm:grid-cols-2 xl:grid-cols-3">
          {result.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Page {result.page} of {result.totalPages}
        </p>
        <Pagination
          page={result.page}
          totalPages={result.totalPages}
          createHref={(page) =>
            buildHref("/products", {
              ...toProductsParams(query),
              page: page > 1 ? String(page) : undefined,
            })
          }
        />
      </div>
    </>
  );
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <>
      <PageHeader
        title="Products"
        description="Browse and manage your product catalog."
      />

      <Card>
        <div className="border-b p-4">
          <Suspense fallback={<ProductsFiltersSkeleton />}>
            <ProductsFilters />
          </Suspense>
        </div>

        <Suspense fallback={<ProductsResultsSkeleton />}>
          <ProductsResults searchParams={searchParams} />
        </Suspense>
      </Card>
    </>
  );
}