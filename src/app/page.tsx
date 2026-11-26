import dynamic from "next/dynamic";
import { prisma } from "@backend/lib/prisma";
import HeroSection from "@frontend/components/sections/HeroSection";
import {
  ProofStrip,
  ShowreelSection,
  AudiencePaths,
  QuoteSteps,
} from "@frontend/components/sections/HomeSections";
import SectionSkeleton from "@frontend/components/ui/SectionSkeleton";

const FAQSection = dynamic(
  () => import("@frontend/components/sections/FAQSection"),
  { loading: () => <SectionSkeleton /> }
);
const BlogPreview = dynamic(
  () => import("@frontend/components/sections/BlogPreview"),
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
      <ProofStrip />
      <ShowreelSection />
      <AudiencePaths />
      <QuoteSteps />
      <FAQSection />
      {posts.length > 0 && <BlogPreview posts={posts} />}
    </>
  );
}
