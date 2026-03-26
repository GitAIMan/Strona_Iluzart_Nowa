import ScrollReveal from "@frontend/components/shared/ScrollReveal";
import SectionHeading from "@frontend/components/ui/SectionHeading";
import DragScrollContainer from "@frontend/components/blog/DragScrollContainer";
import BlogCard from "@frontend/components/blog/BlogCard";

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: Date | null;
}

interface BlogPreviewProps {
  posts: BlogPost[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading title="Z bloga" subtitle="Najnowsze wpisy" />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <DragScrollContainer>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </DragScrollContainer>
        </ScrollReveal>
      </div>
    </section>
  );
}
