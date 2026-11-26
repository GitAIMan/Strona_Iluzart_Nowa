import { generatePageMetadata } from "@shared/metadata";
import PageTransition from "@frontend/components/layout/PageTransition";
import BlogDeck, { type DeckPost } from "@frontend/components/blog/BlogDeck";
import { prisma } from "@backend/lib/prisma";
import { readingTime, contentSnippet } from "@shared/utils";

export const metadata = generatePageMetadata({
  title: "Blog | Iluzjonista Katowice",
  description:
    "Blog iluzjonisty z Katowic: kulisy pokazów, porady przed weselem i urodzinami, sztuczki do zrobienia w domu.",
});

export const revalidate = 60;

const WRAP = "max-w-7xl mx-auto px-5 sm:px-8 lg:px-10";

async function getPosts(): Promise<DeckPost[]> {
  try {
    const posts = await prisma.post.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImageUrl: true,
        publishedAt: true,
        content: true,
      },
    });
    return posts.map(({ content, ...p }) => ({ ...p, minutes: readingTime(content), snippet: p.excerpt || contentSnippet(content) }));
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <PageTransition>
      <section className="grain bg-suits min-h-[70vh]">
        <div className={`${WRAP} pt-32 pb-24`}>
          <div className="mb-10">
            <h1 className="font-serif text-cream text-5xl sm:text-6xl lg:text-[5.25rem] leading-[1]">
              Wyciągnij <em className="text-gold">kartę</em>
            </h1>
            <p className="mt-4 font-sans text-cream/60 text-lg max-w-xl">
              Każda karta to jeden wpis. Kulisy pokazów, porady przed weselem i
              sztuczki do zrobienia w domu.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="font-sans text-cream/50 text-lg py-16">Wkrótce pojawią się pierwsze wpisy.</p>
          ) : (
            <BlogDeck posts={posts} />
          )}
        </div>
      </section>
    </PageTransition>
  );
}
