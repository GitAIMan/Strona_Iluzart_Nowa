"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { DraggableContainer, GridBody, GridItem } from "@frontend/components/blog/InfiniteDragScroll";

interface Post {
  id: string;
  title: string;
  slug: string;
  coverImageUrl: string | null;
}

const COLUMNS = 6;
const DRAG_THRESHOLD = 8;

export default function BlogDragGrid({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const filledCount = Math.ceil(posts.length / COLUMNS) * COLUMNS || COLUMNS;
  const tiles = Array.from(
    { length: filledCount },
    (_, i) => posts[i % posts.length]
  );

  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent, slug: string) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const dx = Math.abs(e.clientX - start.x);
    const dy = Math.abs(e.clientY - start.y);
    if (dx <= DRAG_THRESHOLD && dy <= DRAG_THRESHOLD) {
      router.push(`/blog/${slug}`);
    }
  };

  return (
    <DraggableContainer variant="default">
      <GridBody>
        {tiles.map((post, i) => (
          <GridItem
            key={`${post.id}-${i}`}
            className="relative h-56 w-40 md:h-96 md:w-64"
          >
            <div
              className="block h-full w-full cursor-pointer"
              onPointerDown={handlePointerDown}
              onPointerUp={(e) => handlePointerUp(e, post.slug)}
            >
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
            </div>
          </GridItem>
        ))}
      </GridBody>
    </DraggableContainer>
  );
}
