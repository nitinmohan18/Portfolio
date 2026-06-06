import type { Metadata } from 'next';
import { SITE_URL } from './constants';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function generateMetadata({
  title = 'Nitin Mohan — AI & Machine Learning Student',
  description = 'Portfolio of Nitin Mohan, an AI & ML student passionate about intelligent systems, deep learning, and building impactful technology.',
  image = '/images/seo/og-image.png',
  url = SITE_URL,
}: SeoProps = {}): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description,
      url,
      siteName: 'Nitin Mohan Portfolio',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@NitinPandey494',
    },
    robots: { index: true, follow: true },
    icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  };
}