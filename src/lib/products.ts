import { products as allProducts } from "@/data/products";
import { delay } from "@/lib/api";
import {
  getStockStatus,
  productCategories,
  productSortOptions,
  stockStatuses,
} from "@/lib/product-options";
import type {
  Product,
  ProductCategory,
  ProductsSort,
  ProductsView,
  StockStatus,
} from "@/types";

export const PRODUCTS_PAGE_SIZE = 9;
export const DEFAULT_PRODUCTS_SORT: ProductsSort = "name";

export type ProductsQuery = {
  q: string;
  category: ProductCategory | "all";
  stock: StockStatus | "all";
  sort: ProductsSort;
  view: ProductsView;
  page: number;
};

export type ProductsResult = {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
};

type RawSearchParams = Record<string, string | string[] | undefined>;

function toSingle(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

// URL input is never trusted: every value is checked against known options.
export function parseProductsQuery(params: RawSearchParams): ProductsQuery {
  const category =
    productCategories.find((item) => item.value === toSingle(params.category))
      ?.value ?? "all";
  const stock =
    stockStatuses.find((item) => item.value === toSingle(params.stock))
      ?.value ?? "all";
  const sort =
    productSortOptions.find((item) => item.value === toSingle(params.sort))
      ?.value ?? DEFAULT_PRODUCTS_SORT;
  const view: ProductsView = toSingle(params.view) === "table" ? "table" : "grid";

  const pageNumber = Number.parseInt(toSingle(params.page), 10);
  const page = Number.isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;

  return {
    q: toSingle(params.q).trim(),
    category,
    stock,
    sort,
    view,
    page,
  };
}

export function toProductsParams(
  query: ProductsQuery,
): Record<string, string | undefined> {
  return {
    q: query.q || undefined,
    category: query.category === "all" ? undefined : query.category,
    stock: query.stock === "all" ? undefined : query.stock,
    sort: query.sort === DEFAULT_PRODUCTS_SORT ? undefined : query.sort,
    view: query.view === "table" ? "table" : undefined,
    page: query.page > 1 ? String(query.page) : undefined,
  };
}

export async function getProducts(
  query: ProductsQuery,
): Promise<ProductsResult> {
  await delay(500);

  const search = query.q.toLowerCase();

  const filtered = allProducts.filter((product) => {
    const matchesSearch =
      search === "" ||
      product.name.toLowerCase().includes(search) ||
      product.sku.toLowerCase().includes(search);
    const matchesCategory =
      query.category === "all" || product.category === query.category;
    const matchesStock =
      query.stock === "all" || getStockStatus(product.stock) === query.stock;

    return matchesSearch && matchesCategory && matchesStock;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (query.sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "stock-asc":
        return a.stock - b.stock;
      case "sales":
        return b.sales - a.sales;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / PRODUCTS_PAGE_SIZE));
  const page = Math.min(query.page, totalPages);
  const start = (page - 1) * PRODUCTS_PAGE_SIZE;

  return {
    products: sorted.slice(start, start + PRODUCTS_PAGE_SIZE),
    total,
    page,
    totalPages,
  };
}

export function findProductById(id: number): Product | undefined {
  return allProducts.find((product) => product.id === id);
}

export async function getProductById(id: number): Promise<Product | undefined> {
  await delay(400);
  return findProductById(id);
}