import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@backend/lib/prisma";
import { formatDate, readingTime } from "@shared/utils";
import PageTransition from "@frontend/components/layout/PageTransition";
import ScrollReveal from "@frontend/components/shared/ScrollReveal";
import ImagePlaceholder from "@frontend/components/ui/ImagePlaceholder";
import Button from "@frontend/components/ui/Button";
import PostReactions from "@frontend/components/blog/PostReactions";
import ShareButton from "@frontend/components/blog/ShareButton";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  try {
    return await prisma.post.findFirst({
      where: { slug, isPublished: true },
    });
  } catch {
    return null;
  }
}

async function getRelatedPosts(currentSlug: string) {
  try {
    return await prisma.post.findMany({
      where: { isPublished: true, slug: { not: currentSlug } },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Wpis nie znaleziony" };
  }

  return {
    title: `${post.title} - IluzArt Blog`,
    description: post.excerpt || undefined,
  };
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export const dynamicParams = true;
export const revalidate = 60;

function renderContent(content: string): string {
  try {
    const json = JSON.parse(content);
    return generateHTML(json, [StarterKit, TiptapImage, TiptapLink]);
  } catch {
    return content;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const html = renderContent(post.content);
  const minutes = readingTime(post.content);
  const relatedPosts = await getRelatedPosts(slug);
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/blog/${slug}`;

  return (
    <PageTransition>
      {/* Cover image banner */}
      <section className="relative w-full overflow-hidden bg-surface">
        {post.coverImageUrl ? (
          <div className="relative w-full max-w-5xl mx-auto">
            <div className="relative w-full" style={{ aspectRatio: "16/9", maxHeight: "400px" }}>
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        ) : (
          <div className="relative w-full h-[30vh] min-h-[200px]">
            <ImagePlaceholder
              aspectRatio="auto"
              className="absolute inset-0 h-full rounded-none"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(26,26,94,0.12)_0%,_transparent_60%)] pointer-events-none" />
      </section>

      {/* Post content */}
      <section className="relative pb-16 pt-10">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <header className="mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-cream leading-tight mb-4">
                {post.title}
              </h1>
              <div className="flex items-center flex-wrap gap-3 text-sm text-cream/40 font-sans">
                {post.publishedAt && (
                  <span>{formatDate(post.publishedAt)}</span>
                )}
                <span className="text-cream/20">|</span>
                <span>{minutes} min czytania</span>
                <span className="text-cream/20">|</span>
                <ShareButton url={postUrl} />
              </div>
            </header>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <article
              className="tiptap-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </ScrollReveal>

          {/* Reactions */}
          <ScrollReveal delay={0.15}>
            <div className="mt-12 border-t border-white/5 pt-2">
              <PostReactions postId={post.id} />
            </div>
          </ScrollReveal>

          {/* Back link */}
          <ScrollReveal delay={0.2}>
            <div className="pt-4 border-t border-white/5">
              <Link
                href="/blog"
                className="text-cream/60 hover:text-gold transition-colors duration-300 font-sans"
              >
                &larr; Wróć do bloga
              </Link>
            </div>
          </ScrollReveal>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <ScrollReveal delay={0.25}>
              <div className="mt-16">
                <h2 className="text-2xl font-serif text-cream mb-8">
                  Przeczytaj również
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group card-navy rounded-xl overflow-hidden p-0"
                    >
                      {related.coverImageUrl ? (
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <img
                            src={related.coverImageUrl}
                            alt={related.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <ImagePlaceholder aspectRatio="16/9" />
                      )}
                      <div className="p-4">
                        <h3 className="text-sm font-serif text-cream line-clamp-2 group-hover:text-gold transition-colors">
                          {related.title}
                        </h3>
                        {related.publishedAt && (
                          <p className="text-xs text-cream/30 mt-2">
                            {formatDate(related.publishedAt)}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* CTA section */}
          <ScrollReveal delay={0.3}>
            <div className="mt-16 glass rounded-2xl p-8 md:p-12 text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif text-cream">
                Chcesz zobaczyć magię na żywo?
              </h2>
              <p className="text-cream/60 font-sans max-w-md mx-auto">
                Zarezerwuj pokaz iluzji lub warsztaty na swoje wydarzenie.
              </p>
              <Button href="/kontakt" size="lg">
                Skontaktuj się
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
