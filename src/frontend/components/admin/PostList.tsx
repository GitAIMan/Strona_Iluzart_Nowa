"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Badge from "@frontend/components/ui/Badge";
import { formatDate } from "@shared/utils";

interface Post {
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  createdAt: string;
}

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Czy na pewno chcesz usunąć ten wpis?")) return;

    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    }
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-cream/40 text-lg">
          Brak wpisów. Utwórz pierwszy wpis blogowy!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-white/5 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left px-6 py-4 text-sm font-medium text-cream/50">
              Tytuł
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-cream/50">
              Status
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-cream/50">
              Data
            </th>
            <th className="text-right px-6 py-4 text-sm font-medium text-cream/50">
              Akcje
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
            >
              <td className="px-6 py-4">
                <span className="text-cream font-medium">{post.title}</span>
              </td>
              <td className="px-6 py-4">
                <Badge variant={post.isPublished ? "success" : "draft"}>
                  {post.isPublished ? "Opublikowany" : "Szkic"}
                </Badge>
              </td>
              <td className="px-6 py-4 text-sm text-cream/50">
                {formatDate(post.createdAt)}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="text-sm text-cream/50 hover:text-cream transition-colors"
                  >
                    Edytuj
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-sm text-cream/50 hover:text-red-400 transition-colors"
                  >
                    Usuń
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
