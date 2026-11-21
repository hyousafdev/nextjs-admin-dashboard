import Link from "next/link";
import CategoryIcon from "@/components/products/CategoryIcon";
import StockBadge from "@/components/products/StockBadge";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

type ProductsTableProps = {
  products: Product[];
};

export default function ProductsTable({ products }: ProductsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-y bg-muted/50 text-muted-foreground">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">
              Product
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Category
            </th>
            <th scope="col" className="px-4 py-3 text-right font-medium">
              Price
            </th>
            <th scope="col" className="px-4 py-3 text-right font-medium">
              Stock
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Status
            </th>
            <th scope="col" className="px-4 py-3 text-right font-medium">
              Sold
            </th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-muted/40">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <CategoryIcon
                    category={product.category}
                    className="h-10 w-10 shrink-0"
                    iconClassName="h-5 w-5"
                  />
                  <div className="min-w-0">
                    <Link
                      href={`/products/${product.id}`}
                      className="font-medium hover:underline"
                    >
                      {product.name}
                    </Link>
                    <p className="text-muted-foreground">{product.sku}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {product.category}
              </td>
              <td className="px-4 py-3 text-right font-medium">
                {formatCurrency(product.price)}
              </td>
              <td className="px-4 py-3 text-right">{product.stock}</td>
              <td className="px-4 py-3">
                <StockBadge stock={product.stock} />
              </td>
              <td className="px-4 py-3 text-right text-muted-foreground">
                {product.sales.toLocaleString("en-US")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}