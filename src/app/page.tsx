import { LayoutDashboard } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <LayoutDashboard className="h-6 w-6" />
      </div>
      <h1 className="text-3xl font-bold">{siteConfig.name}</h1>
      <p className="text-muted-foreground">Dashboard coming soon</p>
    </main>
  );
}