import { NextResponse } from "next/server";
import { STORIES, STORY_ARCS, CATEGORIES } from "@/data/stories";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "all";
  const limit = parseInt(searchParams.get("limit") || "20");
  const blindspot = searchParams.get("blindspot") === "true";

  let stories = [...STORIES];

  if (blindspot) {
    stories = stories.filter((s) => s.isBlindspot);
  } else if (category !== "all") {
    stories = stories.filter((s) => s.category === category);
  }

  return NextResponse.json({
    stories: stories.slice(0, limit),
    arcs: STORY_ARCS,
    categories: CATEGORIES,
    total: stories.length,
    timestamp: new Date().toISOString(),
  });
}
