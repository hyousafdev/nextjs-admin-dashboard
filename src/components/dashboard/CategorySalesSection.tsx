import SalesByCategoryChart from "@/components/charts/SalesByCategoryChart";
import { Card, CardHeader } from "@/components/ui/Card";
import { getSalesByCategory } from "@/lib/api";

export default async function CategorySalesSection() {
  const data = await getSalesByCategory();

  return (
    <Card>
      <CardHeader
        title="Sales by category"
        description="Total sales per product category this month."
      />
      <div className="p-5">
        <SalesByCategoryChart data={data} />
      </div>
    </Card>
  );
}