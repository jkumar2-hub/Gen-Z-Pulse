import { NextRequest, NextResponse } from "next/server";
import { getStoryById, getAISummary, STORIES } from "@/data/stories";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { storyId, headline, summary, context, deepDive, source } = body;

    let story = storyId ? getStoryById(storyId) : undefined;

    if (!story && headline) {
      // Dynamic synthesis for custom news
      story = {
        id: "custom-" + Date.now(),
        category: "tech",
        headline: headline || "Breaking News Update",
        summary: summary || "",
        context: context || "",
        deepDive: deepDive || "",
        source: source || "Live Wire",
        imageUrl: "",
        credibilityScore: 9.0,
        politicalLean: "none",
        time: "Just now",
        readTime: 3,
        whyItMatters: "Directly affects consumer technology, finance, and career shifts.",
        consequences: ["Accelerated transformation", "New opportunities emerging"],
        actionPathways: [],
      };
    }

    if (!story) {
      return NextResponse.json({ error: "Story not found or insufficient parameters" }, { status: 400 });
    }

    const aiSummary = getAISummary(story);

    return NextResponse.json({
      success: true,
      storyId: story.id,
      headline: story.headline,
      source: story.source,
      sourceUrl: story.sourceUrl,
      aiSummary,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate AI summary" }, { status: 500 });
  }
}
