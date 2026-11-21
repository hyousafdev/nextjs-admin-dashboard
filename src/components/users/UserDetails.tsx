import { notFound } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/Card";
import {
  UserRoleBadge,
  UserStatusBadge,
} from "@/components/users/UserBadges";
import { getUserById } from "@/lib/users";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";

type UserDetailsProps = {
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

export default async function UserDetails({ params }: UserDetailsProps) {
  const { id } = await params;
  const userId = Number(id);

  // Demo only: this id intentionally throws so that error.tsx can be seen.
  if (userId === 666) {
    throw new Error("Simulated server error");
  }

  const user = await getUserById(userId);

  if (!user) {
    notFound();
  }

  const averageOrder = user.orders > 0 ? user.totalSpent / user.orders : 0;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary">
            {getInitials(user.name)}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
            <p className="truncate text-muted-foreground">{user.email}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <UserRoleBadge role={user.role} />
              <UserStatusBadge status={user.status} />
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Orders</p>
          <p className="mt-2 text-2xl font-bold">{user.orders}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Total spent</p>
          <p className="mt-2 text-2xl font-bold">
            {formatCurrency(user.totalSpent)}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Average order</p>
          <p className="mt-2 text-2xl font-bold">
            {formatCurrency(averageOrder)}
          </p>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Account details"
          description="Basic information about this user."
        />
        <dl className="divide-y">
          <DetailRow label="Full name">{user.name}</DetailRow>
          <DetailRow label="Email">{user.email}</DetailRow>
          <DetailRow label="Role">
            <UserRoleBadge role={user.role} />
          </DetailRow>
          <DetailRow label="Status">
            <UserStatusBadge status={user.status} />
          </DetailRow>
          <DetailRow label="Country">{user.country}</DetailRow>
          <DetailRow label="Joined">{formatDate(user.joinedAt)}</DetailRow>
        </dl>
      </Card>
    </div>
  );
}