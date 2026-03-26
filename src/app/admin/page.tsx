import { prisma } from "@backend/lib/prisma";
import Button from "@frontend/components/ui/Button";
import PostList from "@frontend/components/admin/PostList";

export default async function AdminDashboard() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      isPublished: true,
      createdAt: true,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-cream">Wpisy blogowe</h1>
        <Button href="/admin/posts/new" size="sm">
          Nowy wpis
        </Button>
      </div>
      <PostList
        posts={posts.map((p) => ({
          ...p,
          createdAt: p.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
