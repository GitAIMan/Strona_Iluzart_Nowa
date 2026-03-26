import { prisma } from "@backend/lib/prisma";
import HeroSection from "@frontend/components/sections/HeroSection";
import MarqueeSection from "@frontend/components/sections/MarqueeSection";
import AboutPreview from "@frontend/components/sections/AboutPreview";
import OfferPreview from "@frontend/components/sections/OfferPreview";
import TestimonialsSection from "@frontend/components/sections/TestimonialsSection";
import BlogPreview from "@frontend/components/sections/BlogPreview";
import CTASection from "@frontend/components/sections/CTASection";

async function getLatestPosts() {
  try {
    return await prisma.post.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: 4,
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

export default async function HomePage() {
  const posts = await getLatestPosts();

  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <AboutPreview />
      <OfferPreview />
      <TestimonialsSection />
      <BlogPreview posts={posts} />
      <CTASection />
    </>
  );
}
