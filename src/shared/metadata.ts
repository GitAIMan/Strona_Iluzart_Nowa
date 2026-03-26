import { Metadata } from "next";
import { SITE } from "./constants";

interface PageMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export function generatePageMetadata(options: PageMetadataOptions = {}): Metadata {
  const {
    title,
    description = SITE.description,
    image = "/images/og-image.jpg",
    noIndex = false,
  } = options;

  return {
    title: title,
    description,
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: title || SITE.ogTitle,
      description: description || SITE.ogDescription,
      type: "website",
      locale: SITE.locale,
      siteName: SITE.name,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: title || SITE.ogTitle,
      description: description || SITE.ogDescription,
      images: [image],
    },
  };
}
