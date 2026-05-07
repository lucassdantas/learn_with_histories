import { Metadata } from "next";

export function generateHomeMetadata(): Metadata {
  return {
    title: "LinguaStories - Learn Languages with Stories | Free Language Learning",
    description: "Master languages through immersive storytelling. Learn Portuguese, English, French and more with instant translations. Free interactive stories for language learners.",
    openGraph: {
      type: "website",
      url: "https://linguastories.com",
      title: "LinguaStories - Learn Languages with Stories",
      description: "Master languages through immersive storytelling with instant translations.",
      images: [
        {
          url: "https://linguastories.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "LinguaStories - Language Learning Platform",
        },
      ],
    },
  };
}

export function generateAboutMetadata(): Metadata {
  return {
    title: "About LinguaStories | Learn Languages Through Stories",
    description: "Discover how LinguaStories uses storytelling to make language learning natural, engaging, and effective. Learn about our mission and unique approach.",
    openGraph: {
      type: "website",
      url: "https://linguastories.com/about",
      title: "About LinguaStories",
      description: "Discover how we make language learning through stories natural and effective.",
    },
  };
}

export function generateStoriesMetadata(): Metadata {
  return {
    title: "Stories | LinguaStories - Learn Languages",
    description: "Explore our collection of immersive stories in multiple languages. Read with instant translations tailored to your language level.",
    openGraph: {
      type: "website",
      url: "https://linguastories.com/stories",
      title: "Available Stories",
      description: "Explore immersive stories with instant translations.",
    },
  };
}

export function generateTermsMetadata(): Metadata {
  return {
    title: "Terms of Use | LinguaStories",
    description: "Read our terms of use, including information about advertising, third-party services, and your rights.",
    robots: "index, follow",
  };
}

export function generatePrivacyMetadata(): Metadata {
  return {
    title: "Privacy Policy | LinguaStories",
    description: "Learn how LinguaStories collects, uses, and protects your information. Understand our stance on data privacy and third-party services.",
    robots: "index, follow",
  };
}
