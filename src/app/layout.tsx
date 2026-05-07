import type { Metadata, Viewport } from "next";
import { Montserrat, Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AdScript from "@/components/AdScript";
import StructuredData from "@/components/StructuredData";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  title: "LearnWithHistories - Learn Languages with Stories | Free Language Learning",
  description: "Master languages through immersive storytelling. Learn Portuguese, English, French and more with instant translations. Free interactive stories for language learners.",
  keywords: ["language learning", "stories", "translations", "Portuguese", "English", "French", "learn languages", "immersive learning"],
  authors: [{ name: "LearnWithHistories" }],
  creator: "LearnWithHistories",
  publisher: "LearnWithHistories",
  robots: "index, follow",
  alternates: {
    canonical: "https://learnwithhistories.com",
    languages: {
      "pt": "https://learnwithhistories.com",
      "en": "https://learnwithhistories.com",
      "fr": "https://learnwithhistories.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://learnwithhistories.com",
    siteName: "LearnWithHistories",
    title: "LearnWithHistories - Learn Languages with Stories",
    description: "Master languages through immersive storytelling with instant translations.",
    images: [
      {
        url: "https://learnwithhistories.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LearnWithHistories - Language Learning Platform",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LearnWithHistories - Learn Languages with Stories",
    description: "Master languages through immersive storytelling with instant translations.",
    images: ["https://learnwithhistories.com/og-image.jpg"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LearnWithHistories",
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
      className={`${montserrat.variable} ${poppins.variable} ${openSans.variable} h-full antialiased transition-colors duration-300`}
      suppressHydrationWarning
    >
      <head>
        <StructuredData />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="sitemap" href="/sitemap.xml" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300 font-sans">
        <AdScript />
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
