import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import UserDetailSkeleton from "@/components/users/UserDetailSkeleton";
import UserDetails from "@/components/users/UserDetails";
import { users } from "@/data/users";
import { findUserById } from "@/lib/users";

type UserPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return users.map((user) => ({ id: String(user.id) }));
}

export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  const { id } = await params;
  const user = findUserById(Number(id));

  if (!user) {
    return { title: "User not found" };
  }

  return {
    title: user.name,
    description: `Profile and account details of ${user.name}.`,
  };
}

export default function UserPage({ params }: UserPageProps) {
  return (
    <>
      <Link
        href="/users"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to users
      </Link>

      <Suspense fallback={<UserDetailSkeleton />}>
        <UserDetails params={params} />
      </Suspense>
    </>
  );
}