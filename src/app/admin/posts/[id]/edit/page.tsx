"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PostEditor from "@frontend/components/admin/PostEditor";

interface PostData {
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  isPublished: boolean;
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/posts/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      }
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  const handleSave = async (data: {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    coverImageUrl?: string;
    isPublished: boolean;
  }) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to update post");
    }

    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-cream/20 border-t-cream rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <p className="text-cream/40 text-lg">Nie znaleziono wpisu</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-serif text-cream mb-8">Edytuj wpis</h1>
      <PostEditor
        initialData={{
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt || undefined,
          coverImageUrl: post.coverImageUrl || undefined,
          isPublished: post.isPublished,
        }}
        onSave={handleSave}
      />
    </div>
  );
}
