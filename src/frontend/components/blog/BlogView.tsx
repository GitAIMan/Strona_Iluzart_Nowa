"use client";

import { useState } from "react";
import Link from "next/link";
import ImagePlaceholder from "@frontend/components/ui/ImagePlaceholder";
import ScrollReveal from "@frontend/components/shared/ScrollReveal";
import BlogDragGrid from "@frontend/components/blog/BlogDragGrid";
import { formatDate } from "@shared/utils";
import { cn } from "@shared/utils";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: Date | null;
}

export default function BlogView({ posts }: { posts: Post[] }) {
  const [view, setView] = useState<"drag" | "grid">("drag");

  return (
    <div>
      <div className="max-w-6xl mx-auto px-6 flex justify-center sm:justify-end mb-6">
        <div className="inline-flex glass rounded-full p-1 gap-1">
          <button
            onClick={() => setView("drag")}
            className={cn(
              "px-4 py-2 text-sm rounded-full transition-colors font-sans",
              view === "drag"
                ? "bg-navy text-cream"
                : "text-cream/50 hover:text-cream"
            )}
          >
            Galeria
          </button>
          <button
            onClick={() => setView("grid")}
            className={cn(
              "px-4 py-2 text-sm rounded-full transition-colors font-sans",
              view === "grid"
                ? "bg-navy text-cream"
                : "text-cream/50 hover:text-cream"
            )}
          >
            Kafelki
          </button>
        </div>
      </div>

      {view === "drag" ? (
        <div className="relative">
          <BlogDragGrid posts={posts} />
          <p className="text-center text-xs text-cream/30 font-sans mt-3">
            Przeciągnij, aby przeglądać
          </p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 auto-rows-[220px] gap-4">
          {posts.map((post, index) => {
            const big = index % 5 === 0;
            return (
              <ScrollReveal
                key={post.id}
                delay={index * 0.05}
                className={cn(
                  big ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
                )}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block glass-hover rounded-xl overflow-hidden h-full relative"
                >
                  {post.coverImageUrl ? (
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <ImagePlaceholder aspectRatio="16/9" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                    <h3
                      className={cn(
                        "font-serif text-cream group-hover:text-gold transition-colors duration-300 line-clamp-2",
                        big ? "text-2xl" : "text-base"
                      )}
                    >
                      {post.title}
                    </h3>
                    {post.publishedAt && (
                      <p className="text-xs text-cream/50 font-sans">
                        {formatDate(post.publishedAt)}
                      </p>
                    )}
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
