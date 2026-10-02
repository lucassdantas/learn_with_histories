import type { Metadata, Viewport } from "next";

import { Literata, Open_Sans } from "next/font/google";

import "./globals.css";

import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { THEME_SCRIPT } from "@/lib/theme-script";

import AdScript from "@/components/AdScript";
import StructuredData from "@/components/StructuredData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateSEO } from "@/app/lib/seo";

// Two families (design system): Literata for headings + story text, Open Sans for the UI.
// Both are variable fonts, self-hosted by next/font (no request to Google at runtime).
const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  display: "swap",
});

// Italic is only used for "With" in the wordmark: loaded on its own, not preloaded.
const literataItalic = Literata({
  variable: "--font-literata-italic",
  subsets: ["latin"],
  style: "italic",
  display: "swap",
  preload: false,
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4EBDD" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
};

export const metadata: Metadata = generateSEO({
  title: "LearnWithHistories | Learn Languages Through Stories",

  description:
    "Learn English, Portuguese and French by reading short stories with paragraph-by-paragraph translations. Free, no sign-up.",

  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      suppressHydrationWarning
      className={`${literata.variable} ${literataItalic.variable} ${openSans.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans text-base leading-normal">
        <StructuredData />

        <AdScript />

        <ThemeProvider>
          <LanguageProvider>
            <Header />

            <main className="flex-[1_0_auto]">{children}</main>

            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
