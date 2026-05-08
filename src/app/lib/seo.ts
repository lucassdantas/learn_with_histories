import type { Metadata } from "next";

const SITE_NAME = "LearnWithHistories";

const SITE_URL =
  "https://learn-with-histories.devdantas.com.br";

const DEFAULT_OG =
  "/og-images/learn-with-histories-opengraph-image.jpg";

type SEOProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function generateSEO({
  title,
  description,
  path = "",
  image = DEFAULT_OG,
}: SEOProps = {}): Metadata {
  const seoTitle =
    title || "Learn Languages Through Stories";

  const seoDescription =
    description ||
    "Learn languages naturally with interactive stories and instant translations.";

  const url = `${SITE_URL}${path}`;

  return {
    metadataBase: new URL(SITE_URL),

    title: seoTitle,

    description: seoDescription,

    alternates: {
      canonical: url,
    },

    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,

      title: seoTitle,

      description: seoDescription,

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: seoTitle,

      description: seoDescription,

      images: [image],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}