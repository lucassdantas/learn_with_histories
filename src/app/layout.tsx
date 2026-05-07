import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AdScript from "@/components/AdScript";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  title: "LinguaStories - Learn Languages with Stories | Free Language Learning",
  description: "Master languages through immersive storytelling. Learn Portuguese, English, French and more with instant translations. Free interactive stories for language learners.",
  keywords: ["language learning", "stories", "translations", "Portuguese", "English", "French", "learn languages", "immersive learning"],
  authors: [{ name: "LinguaStories" }],
  creator: "LinguaStories",
  publisher: "LinguaStories",
  robots: "index, follow",
  alternates: {
    canonical: "https://linguastories.com",
    languages: {
      "pt": "https://linguastories.com",
      "en": "https://linguastories.com",
      "fr": "https://linguastories.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://linguastories.com",
    siteName: "LinguaStories",
    title: "LinguaStories - Learn Languages with Stories",
    description: "Master languages through immersive storytelling with instant translations.",
    images: [
      {
        url: "https://linguastories.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LinguaStories - Language Learning Platform",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LinguaStories - Learn Languages with Stories",
    description: "Master languages through immersive storytelling with instant translations.",
    images: ["https://linguastories.com/og-image.jpg"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LinguaStories",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased transition-colors duration-300`}
      suppressHydrationWarning
    >
      <head>
        <StructuredData />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="sitemap" href="/sitemap.xml" />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <AdScript />
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
