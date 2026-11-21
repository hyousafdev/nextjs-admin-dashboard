import { Card, CardHeader } from "@/components/ui/Card";

type ChartCardProps = {
  title: string;
  description: string;
  className?: string;
  children: React.ReactNode;
};

export default function ChartCard({
  title,
  description,
  className,
  children,
}: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader title={title} description={description} />
      <div className="p-5">{children}</div>
    </Card>
  );
}