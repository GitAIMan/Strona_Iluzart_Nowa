"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ImagePlaceholder from "@frontend/components/ui/ImagePlaceholder";
import { formatDate } from "@shared/utils";

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: Date | null;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-80 flex-shrink-0"
      style={{ scrollSnapAlign: "start" }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block glass rounded-lg overflow-hidden group border border-transparent hover:border-gold/30 transition-colors duration-500"
      >
        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden">
          {post.coverImageUrl ? (
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <ImagePlaceholder aspectRatio="16/9" />
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {post.publishedAt && (
            <time className="text-cream/40 font-sans text-xs block mb-2">
              {formatDate(post.publishedAt)}
            </time>
          )}

          <h3 className="font-serif text-lg text-cream line-clamp-2 mb-2 group-hover:text-gold transition-colors duration-300">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="text-cream/60 font-sans text-sm line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
