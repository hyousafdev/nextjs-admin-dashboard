import Skeleton from "@/components/ui/Skeleton";

export default function ShellSkeleton() {
  return (
    <div aria-busy="true" className="flex min-h-screen">
      <div className="hidden w-64 shrink-0 border-r bg-card lg:block">
        <div className="flex h-16 items-center gap-3 border-b px-4">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="space-y-2 p-3">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-9" />
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-16 items-center border-b bg-card px-6">
          <Skeleton className="h-9 w-72" />
        </div>
        <div className="space-y-4 p-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}