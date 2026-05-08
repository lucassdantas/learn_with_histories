import type { Metadata, Viewport } from "next";

import { Montserrat, Open_Sans, Poppins } from "next/font/google";

import "./globals.css";

import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

import AdScript from "@/components/AdScript";
import StructuredData from "@/components/StructuredData";
import Footer from "@/components/Footer";

import { generateSEO } from "@/lib/seo";

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
  themeColor: "#0f172a",
};

export const metadata: Metadata = generateSEO({
  title: "LearnWithHistories | Learn Languages Through Stories",

  description:
    "Learn English, Portuguese, French and other languages by reading interactive stories with instant translations. Improve vocabulary, reading and comprehension for free.",

  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`
        ${montserrat.variable}
        ${poppins.variable}
        ${openSans.variable}
        h-full
        antialiased
        transition-colors
        duration-300
      `}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans transition-colors duration-300">
        <StructuredData />

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