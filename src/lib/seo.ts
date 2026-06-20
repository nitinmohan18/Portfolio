import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}

const DEFAULT_DESCRIPTION =
  "Nitin Mohan Pandey — AI & ML Student and Full Stack Developer building intelligent, scalable web applications.";

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  image = "/images/seo/og-image.png",
  path = "/",
  noIndex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | Nitin Mohan` : "Nitin Mohan — AI & ML Student";
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Nitin Mohan Portfolio",
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@NitinPandey494",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}