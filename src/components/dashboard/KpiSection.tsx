import StatCard from "@/components/dashboard/StatCard";
import { getKpis } from "@/lib/api";

export default async function KpiSection() {
  const kpis = await getKpis();

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <StatCard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
}