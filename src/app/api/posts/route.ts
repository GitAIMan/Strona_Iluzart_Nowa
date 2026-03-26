import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@backend/lib/auth";
import { prisma } from "@backend/lib/prisma";
import { postSchema } from "@shared/types";
import { slugify } from "@shared/utils";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  }

  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const slug = slugify(body.title || "");
    const validated = postSchema.parse({ ...body, slug });

    const post = await prisma.post.create({
      data: {
        title: validated.title,
        slug: validated.slug,
        content: validated.content,
        excerpt: validated.excerpt || null,
        coverImageUrl: validated.coverImageUrl || null,
        isPublished: validated.isPublished,
        publishedAt: validated.isPublished ? new Date() : null,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
