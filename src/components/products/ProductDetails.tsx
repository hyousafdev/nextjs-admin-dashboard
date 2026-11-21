import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import CategoryIcon from "@/components/products/CategoryIcon";
import StockBadge from "@/components/products/StockBadge";
import { Card, CardHeader } from "@/components/ui/Card";
import { getProductById } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";

type ProductDetailsProps = {
  params: Promise<{ id: string }>;
};

type DetailRowProps = {
  label: string;
  children: React.ReactNode;
};

function DetailRow({ label, children }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{children}</dd>
    </div>
  );
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    notFound();
  }

  const revenue = product.price * product.sales;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <CategoryIcon
            category={product.category}
            className="h-40 w-full shrink-0 sm:w-40"
            iconClassName="h-14 w-14"
          />

          <div className="min-w-0 flex-1">
            <p className="text-sm text-muted-foreground">
              {product.category} / {product.sku}
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <StockBadge stock={product.stock} />
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-warning text-warning" />
                {product.rating.toFixed(1)}
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold">
              {formatCurrency(product.price)}
            </p>
            <p className="mt-4 text-muted-foreground">{product.description}</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Units sold</p>
          <p className="mt-2 text-2xl font-bold">
            {product.sales.toLocaleString("en-US")}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Revenue</p>
          <p className="mt-2 text-2xl font-bold">{formatCurrency(revenue)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Units in stock</p>
          <p className="mt-2 text-2xl font-bold">{product.stock}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Rating</p>
          <p className="mt-2 text-2xl font-bold">
            {product.rating.toFixed(1)} / 5
          </p>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Product details"
          description="Basic information about this product."
        />
        <dl className="divide-y">
          <DetailRow label="Name">{product.name}</DetailRow>
          <DetailRow label="SKU">{product.sku}</DetailRow>
          <DetailRow label="Category">{product.category}</DetailRow>
          <DetailRow label="Price">{formatCurrency(product.price)}</DetailRow>
          <DetailRow label="Stock status">
            <StockBadge stock={product.stock} />
          </DetailRow>
        </dl>
      </Card>
    </div>
  );
}