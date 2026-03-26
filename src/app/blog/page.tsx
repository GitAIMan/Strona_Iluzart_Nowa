import Link from "next/link";
import { generatePageMetadata } from "@shared/metadata";
import PageTransition from "@frontend/components/layout/PageTransition";
import SectionHeading from "@frontend/components/ui/SectionHeading";
import ImagePlaceholder from "@frontend/components/ui/ImagePlaceholder";
import ScrollReveal from "@frontend/components/shared/ScrollReveal";
import { prisma } from "@backend/lib/prisma";
import { formatDate } from "@shared/utils";

export const metadata = generatePageMetadata({
  title: "Blog",
});

export const revalidate = 60;

async function getPosts() {
  try {
    return await prisma.post.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImageUrl: true,
        publishedAt: true,
      },
    });
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <PageTransition>
      {/* Hero section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-dark/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,26,94,0.15)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <SectionHeading title="Blog" subtitle="Najnowsze wpisy" />
        </div>
      </section>

      {/* Posts */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-cream/20 mx-auto mb-6"
              >
                <path d="M15 4V2" />
                <path d="M15 16v-2" />
                <path d="M8 9h2" />
                <path d="M20 9h2" />
                <path d="M17.8 11.8 19 13" />
                <path d="M15 9h0" />
                <path d="M17.8 6.2 19 5" />
                <path d="m3 21 9-9" />
                <path d="M12.2 6.2 11 5" />
              </svg>
              <p className="text-cream/40 text-lg font-sans">
                Wkrótce pojawią się nowe wpisy
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <ScrollReveal key={post.id} delay={index * 0.1}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block glass-hover rounded-xl overflow-hidden h-full"
                  >
                    {post.coverImageUrl ? (
                      <div
                        className="relative overflow-hidden"
                        style={{ aspectRatio: "16/9" }}
                      >
                        <img
                          src={post.coverImageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <ImagePlaceholder aspectRatio="16/9" />
                    )}
                    <div className="p-6 space-y-3">
                      <h3 className="text-xl font-serif text-cream group-hover:text-gold transition-colors duration-300">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-cream/60 leading-relaxed font-sans line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      {post.publishedAt && (
                        <p className="text-xs text-cream/40 font-sans">
                          {formatDate(post.publishedAt)}
                        </p>
                      )}
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
