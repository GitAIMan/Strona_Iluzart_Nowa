"use client";

import Link from "next/link";
import { DraggableContainer, GridBody, GridItem } from "@frontend/components/blog/InfiniteDragScroll";

interface Post {
  id: string;
  title: string;
  slug: string;
  coverImageUrl: string | null;
}

export default function BlogDragGrid({ posts }: { posts: Post[] }) {
  return (
    <DraggableContainer variant="masonry">
      <GridBody>
        {posts.map((post, index) => (
          <GridItem
            key={post.id}
            className="relative h-40 w-28 md:h-64 md:w-44"
          >
            <Link href={`/blog/${post.slug}`} className="block h-full w-full">
              {post.coverImageUrl ? (
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="pointer-events-none absolute h-full w-full object-cover"
                  draggable={false}
                />
              ) : (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-navy/30 text-cream/40 text-xs font-sans px-2 text-center">
                  {post.title}
                </div>
              )}
            </Link>
          </GridItem>
        ))}
      </GridBody>
    </DraggableContainer>
  );
}
