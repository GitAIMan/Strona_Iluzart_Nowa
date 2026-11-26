import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@backend/lib/prisma";
import { formatDate, readingTime } from "@shared/utils";
import PageTransition from "@frontend/components/layout/PageTransition";
import PostReactions from "@frontend/components/blog/PostReactions";
import ShareButton from "@frontend/components/blog/ShareButton";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";

interface Props {
  params: Promise<{ slug: string }>;
}

const WRAP = "max-w-7xl mx-auto px-5 sm:px-8 lg:px-10";

async function getPost(slug: string) {
  try {
    return await prisma.post.findFirst({ where: { slug, isPublished: true } });
  } catch {
    return null;
  }
}

/* Poprzedni (starszy) i następny (nowszy) wpis */
async function getNeighbours(publishedAt: Date | null, id: string) {
  if (!publishedAt) return { prev: null, next: null };
  try {
    const select = { title: true, slug: true };
    const [prev, next] = await Promise.all([
      prisma.post.findFirst({
        where: { isPublished: true, id: { not: id }, publishedAt: { lt: publishedAt } },
        orderBy: { publishedAt: "desc" },
        select,
      }),
      prisma.post.findFirst({
        where: { isPublished: true, id: { not: id }, publishedAt: { gt: publishedAt } },
        orderBy: { publishedAt: "asc" },
        select,
      }),
    ]);
    return { prev, next };
  } catch {
    return { prev: null, next: null };
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Wpis nie znaleziony" };
  return {
    title: `${post.title} | Blog IluzArt`,
    description: post.excerpt || undefined,
  };
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({ where: { isPublished: true }, select: { slug: true } });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export const dynamicParams = true;
export const revalidate = 60;

function renderContent(content: string): string {
  try {
    return generateHTML(JSON.parse(content), [StarterKit, TiptapImage, TiptapLink]);
  } catch {
    return content;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const html = renderContent(post.content);
  const minutes = readingTime(post.content);
  const { prev, next } = await getNeighbours(post.publishedAt, post.id);
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/blog/${slug}`;

  return (
    <PageTransition>
      {/* 1. Tytuł + okładka w ramie */}
      <section className="grain bg-spot overflow-hidden">
        <div className={`${WRAP} pt-28 md:pt-32 pb-16 md:pb-20`}>
          <Link href="/blog" className="inline-flex items-center gap-2 font-sans text-sm text-cream/55 hover:text-gold transition-colors">
            <span aria-hidden>←</span> Wszystkie wpisy
          </Link>
          <div className={`mt-8 grid gap-12 items-center ${post.coverImageUrl ? "md:grid-cols-12" : ""}`}>
            <div className={post.coverImageUrl ? "md:col-span-7" : "max-w-4xl"}>
              <h1 className="font-serif text-cream text-4xl sm:text-5xl lg:text-6xl leading-[1.06]">{post.title}</h1>
              {post.excerpt && (
                <p className="mt-5 font-serif italic text-gold text-xl md:text-2xl leading-snug max-w-2xl">{post.excerpt}</p>
              )}
              <dl className="mt-8 flex flex-wrap border-y border-white/10 max-w-xl">
                {post.publishedAt && (
                  <div className="py-3 pr-5 mr-5 border-r border-white/10">
                    <dt className="font-sans text-[11px] uppercase tracking-[0.18em] text-cream/45">Data</dt>
                    <dd className="font-sans text-sm font-semibold text-cream">{formatDate(post.publishedAt)}</dd>
                  </div>
                )}
                <div className="py-3 pr-5 mr-5 border-r border-white/10">
                  <dt className="font-sans text-[11px] uppercase tracking-[0.18em] text-cream/45">Czytanie</dt>
                  <dd className="font-sans text-sm font-semibold text-cream">{minutes} min</dd>
                </div>
                <div className="py-3">
                  <dt className="font-sans text-[11px] uppercase tracking-[0.18em] text-cream/45">Udostępnij</dt>
                  <dd className="font-sans text-sm text-cream"><ShareButton url={postUrl} /></dd>
                </div>
              </dl>
            </div>
            {post.coverImageUrl && (
              <div className="md:col-span-5 flex justify-center md:justify-end">
                <div className="show-frame relative w-full max-w-[420px]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-surface">
                    <Image src={post.coverImageUrl} alt={post.title} fill priority sizes="(max-width: 768px) 100vw, 420px" quality={85} className="object-cover" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Treść + boczna ramka */}
      <section className="grain bg-lvl2">
        <div className={`${WRAP} py-16 md:py-20 grid lg:grid-cols-[minmax(0,1fr)_280px] gap-14`}>
          <article className="tiptap-content blog-prose min-w-0" dangerouslySetInnerHTML={{ __html: html }} />
          <aside className="lg:sticky lg:top-28 self-start grid gap-8">
            <div className="rounded-lg border border-gold/30 bg-lvl3 p-6">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold">
                Masz wydarzenie?
              </p>
              <h2 className="font-serif text-cream text-2xl leading-tight mt-2 mb-2">Sprawdź, czy jestem wolny</h2>
              <p className="font-sans text-sm text-cream/60 mb-5">Podaj datę i miejsce. Odpowiadam tego samego dnia.</p>
              <Link
                href="/#termin"
                className="inline-flex items-center justify-center rounded-md bg-gold px-5 py-3 font-sans font-semibold text-background transition-colors hover:bg-gold-light"
              >
                Sprawdź wolny termin
              </Link>
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-1">Jak Ci się podobało?</p>
              <PostReactions postId={post.id} compact />
            </div>
          </aside>
        </div>
      </section>

      {/* 3. Poprzedni / następny */}
      {(prev || next) && (
        <section className="bg-background">
          <div className={`${WRAP} py-14 md:py-20 grid sm:grid-cols-2 gap-5`}>
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="group block rounded-md bg-lvl2 p-6 hover:bg-wine-dark transition-colors">
                <small className="font-sans text-xs uppercase tracking-[0.16em] text-gold">← Poprzedni</small>
                <b className="block font-serif font-normal text-cream text-2xl mt-1.5 leading-tight">{prev.title}</b>
              </Link>
            ) : <span />}
            {next && (
              <Link href={`/blog/${next.slug}`} className="group block rounded-md bg-lvl2 p-6 hover:bg-wine-dark transition-colors sm:text-right">
                <small className="font-sans text-xs uppercase tracking-[0.16em] text-gold">Następny →</small>
                <b className="block font-serif font-normal text-cream text-2xl mt-1.5 leading-tight">{next.title}</b>
              </Link>
            )}
          </div>
        </section>
      )}
    </PageTransition>
  );
}
