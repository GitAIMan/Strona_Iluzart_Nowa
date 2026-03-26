import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@backend/lib/prisma";

const VALID_EMOJIS = ["fire", "heart", "clap", "wow", "magic"];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const visitorId = request.nextUrl.searchParams.get("visitorId") || "";

  try {
    // Get counts per emoji
    const reactions = await prisma.postReaction.groupBy({
      by: ["emoji"],
      where: { postId: id },
      _count: { emoji: true },
    });

    const counts: Record<string, number> = {};
    for (const emoji of VALID_EMOJIS) {
      counts[emoji] = 0;
    }
    for (const r of reactions) {
      counts[r.emoji] = r._count.emoji;
    }

    // Get which emojis this visitor already reacted with
    let userReactions: string[] = [];
    if (visitorId) {
      const userReacted = await prisma.postReaction.findMany({
        where: { postId: id, visitorId },
        select: { emoji: true },
      });
      userReactions = userReacted.map((r) => r.emoji);
    }

    return NextResponse.json({ counts, userReactions });
  } catch {
    return NextResponse.json(
      { counts: {}, userReactions: [] },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { emoji, visitorId } = await request.json();

    if (!VALID_EMOJIS.includes(emoji)) {
      return NextResponse.json({ error: "Invalid emoji" }, { status: 400 });
    }

    if (!visitorId) {
      return NextResponse.json({ error: "No visitor ID" }, { status: 400 });
    }

    // Check if already reacted (unique constraint will also catch this)
    const existing = await prisma.postReaction.findFirst({
      where: { postId: id, emoji, visitorId },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Already reacted" },
        { status: 409 }
      );
    }

    await prisma.postReaction.create({
      data: { postId: id, emoji, visitorId },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
