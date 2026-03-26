import { MetadataRoute } from "next";
import { prisma } from "@backend/lib/prisma";
import { services } from "@shared/data/services";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), priority: 1, changeFrequency: "weekly" as const },
    { url: `${SITE_URL}/o-mnie`, lastModified: new Date(), priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/oferta`, lastModified: new Date(), priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/warsztaty`, lastModified: new Date(), priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${SITE_URL}/kontakt`, lastModified: new Date(), priority: 0.8, changeFrequency: "monthly" as const },
  ];

  const servicePages = services.map((s) => ({
    url: `${SITE_URL}/oferta/${s.slug}`,
    lastModified: new Date(),
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.post.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });
    blogPages = posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      priority: 0.6,
      changeFrequency: "weekly" as const,
    }));
  } catch {
    // DB may not be available during build
  }

  return [...staticPages, ...servicePages, ...blogPages];
}
