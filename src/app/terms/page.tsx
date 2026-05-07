'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/config/translations';
import Header from '@/components/Header';
import AdBanner from '@/components/AdBanner';

export default function TermsPage() {
  const { nativeLanguage } = useLanguage();

  const sections = [
    { key: 'terms.section1Title', content: 'terms.section1Text' },
    { key: 'terms.section2Title', content: 'terms.section2Text' },
    { key: 'terms.section3Title', content: 'terms.section3Text' },
    { key: 'terms.section4Title', content: 'terms.section4Text' },
    { key: 'terms.section5Title', content: 'terms.section5Text' },
    { key: 'terms.section6Title', content: 'terms.section6Text' },
    { key: 'terms.section7Title', content: 'terms.section7Text' },
    { key: 'terms.section8Title', content: 'terms.section8Text' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Header Section */}
        <section className="py-16 px-8 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-950 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl text-blue-600 dark:text-blue-500 mb-4">
              {getTranslation(nativeLanguage, 'terms.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {getTranslation(nativeLanguage, 'terms.lastUpdated')} January 1, 2024
            </p>
          </div>
        </section>

        <AdBanner />

        {/* Terms Content */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-4">
                  {getTranslation(nativeLanguage, section.key)}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  {getTranslation(nativeLanguage, section.content)}
                </p>
              </div>
            ))}

            {/* Contact Section */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {getTranslation(nativeLanguage, 'terms.contactUs')}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 dark:border-gray-800 mt-16 py-8 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2024 LinguaStories. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              {getTranslation(nativeLanguage, 'nav.about')}
            </Link>
            <Link href="/stories" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              {getTranslation(nativeLanguage, 'nav.stories')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
