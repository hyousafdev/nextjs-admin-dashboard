import RecentActivity from "@/components/dashboard/RecentActivity";
import { getRecentActivity } from "@/lib/api";

export default async function ActivitySection() {
  const activities = await getRecentActivity();

  return <RecentActivity activities={activities} />;
}