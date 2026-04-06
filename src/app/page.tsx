import dynamic from "next/dynamic";
import { prisma } from "@backend/lib/prisma";
import HeroSection from "@frontend/components/sections/HeroSection";
import MarqueeSection from "@frontend/components/sections/MarqueeSection";
import AboutPreview from "@frontend/components/sections/AboutPreview";
import SectionDivider from "@frontend/components/ui/SectionDivider";
import SectionSkeleton from "@frontend/components/ui/SectionSkeleton";

const OfferPreview = dynamic(
  () => import("@frontend/components/sections/OfferPreview"),
  { loading: () => <SectionSkeleton /> }
);
const TestimonialsSection = dynamic(
  () => import("@frontend/components/sections/TestimonialsSection"),
  { loading: () => <SectionSkeleton /> }
);
const FAQSection = dynamic(
  () => import("@frontend/components/sections/FAQSection"),
  { loading: () => <SectionSkeleton /> }
);
const BlogPreview = dynamic(
  () => import("@frontend/components/sections/BlogPreview"),
  { loading: () => <SectionSkeleton /> }
);
const CTASection = dynamic(
  () => import("@frontend/components/sections/CTASection"),
  { loading: () => <SectionSkeleton /> }
);

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
      <SectionDivider variant="glow" />
      <AboutPreview />
      <SectionDivider variant="line" />
      <OfferPreview />
      <SectionDivider variant="glow" />
      <TestimonialsSection />
      <SectionDivider variant="line" />
      <FAQSection />
      <SectionDivider variant="glow" />
      <BlogPreview posts={posts} />
      <SectionDivider variant="glow" />
      <CTASection />
    </>
  );
}
