import { NextResponse } from "next/server";
import { searchAll } from "@/lib/search";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? "";

  if (query.length > 100) {
    return NextResponse.json(
      { error: "Search query is too long." },
      { status: 400 },
    );
  }

  // Simulates a slow network so the loading state can be seen.
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json({ results: searchAll(query) });
}