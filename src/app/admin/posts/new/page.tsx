"use client";

import { useRouter } from "next/navigation";
import PostEditor from "@frontend/components/admin/PostEditor";

export default function NewPostPage() {
  const router = useRouter();

  const handleSave = async (data: {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    coverImageUrl?: string;
    isPublished: boolean;
  }) => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to create post");
    }

    router.push("/admin");
  };

  return (
    <div>
      <h1 className="text-3xl font-serif text-cream mb-8">Nowy wpis</h1>
      <PostEditor onSave={handleSave} />
    </div>
  );
}
