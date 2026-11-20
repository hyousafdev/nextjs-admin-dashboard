import RevenueChart from "@/components/charts/RevenueChart";
import { Card, CardHeader } from "@/components/ui/Card";
import { getRevenueData } from "@/lib/api";

type RevenueSectionProps = {
  className?: string;
};

export default async function RevenueSection({
  className,
}: RevenueSectionProps) {
  const data = await getRevenueData();

  return (
    <Card className={className}>
      <CardHeader
        title="Revenue overview"
        description="Monthly revenue for the last 12 months."
      />
      <div className="p-5">
        <RevenueChart data={data} />
      </div>
    </Card>
  );
}