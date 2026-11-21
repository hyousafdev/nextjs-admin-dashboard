import type { ProductCategory, ProductsSort, StockStatus } from "@/types";

export const productCategories: { value: ProductCategory; label: string }[] = [
  { value: "Electronics", label: "Electronics" },
  { value: "Clothing", label: "Clothing" },
  { value: "Home", label: "Home" },
  { value: "Sports", label: "Sports" },
  { value: "Beauty", label: "Beauty" },
  { value: "Toys", label: "Toys" },
];

export const stockStatuses: { value: StockStatus; label: string }[] = [
  { value: "in-stock", label: "In stock" },
  { value: "low-stock", label: "Low stock" },
  { value: "out-of-stock", label: "Out of stock" },
];

export const productSortOptions: { value: ProductsSort; label: string }[] = [
  { value: "name", label: "Name (A-Z)" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "stock-asc", label: "Stock: Low to High" },
  { value: "sales", label: "Best selling" },
];

// Stock status is derived from the stock count instead of being stored.
export function getStockStatus(stock: number): StockStatus {
  if (stock === 0) {
    return "out-of-stock";
  }
  if (stock <= 10) {
    return "low-stock";
  }
  return "in-stock";
}