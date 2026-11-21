import Link from "next/link";
import { Star } from "lucide-react";
import CategoryIcon from "@/components/products/CategoryIcon";
import StockBadge from "@/components/products/StockBadge";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col p-4 transition-shadow hover:shadow-md">
      <CategoryIcon category={product.category} className="h-28 w-full" />

      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-xs text-muted-foreground">{product.category}</p>
        <Link
          href={`/products/${product.id}`}
          className="mt-1 font-semibold hover:underline"
        >
          {product.name}
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold">{formatCurrency(product.price)}</p>
          <StockBadge stock={product.stock} />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            {product.rating.toFixed(1)}
          </span>
          <span>{product.sales.toLocaleString("en-US")} sold</span>
        </div>
      </div>
    </Card>
  );
}