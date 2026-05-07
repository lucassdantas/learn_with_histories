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
    <div className="min-h-screen bg-background text-deep-blue transition-colors duration-300 flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Header Section */}
        <section className="py-16 sm:py-24 px-6 sm:px-8 bg-gradient-to-b from-golden-amber/5 to-background border-b border-golden-amber/10">
          <div className="max-w-4xl mx-auto text-center sm:text-left">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-deep-blue mb-6">
              {getTranslation(nativeLanguage, 'terms.title')}
            </h1>
            <p className="text-deep-blue/60 font-bold">
              {getTranslation(nativeLanguage, 'terms.lastUpdated')} {new Date().toLocaleDateString(nativeLanguage, { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </section>

        <AdBanner />

        {/* Terms Content */}
        <section className="py-16 sm:py-24 px-6 sm:px-8">
          <div className="max-w-4xl mx-auto space-y-16">
            {sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-deep-blue flex items-center gap-4">
                  <span className="flex-none w-8 h-8 bg-golden-amber/10 text-golden-amber rounded-lg flex items-center justify-center text-sm">{index + 1}</span>
                  {getTranslation(nativeLanguage, section.key)}
                </h2>
                <p className="text-deep-blue/70 leading-relaxed text-lg font-medium text-justify">
                  {getTranslation(nativeLanguage, section.content)}
                </p>
              </div>
            ))}

            {/* Contact Section */}
            <div className="bg-deep-blue text-white p-8 sm:p-12 rounded-3xl shadow-xl shadow-deep-blue/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <h2 className="text-3xl font-black mb-6 relative">
                {getTranslation(nativeLanguage, 'common.contact')}
              </h2>
              <p className="text-white/80 leading-relaxed text-lg font-bold relative">
                {getTranslation(nativeLanguage, 'terms.contactUs')}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-deep-blue text-white py-12 sm:py-16 px-6 sm:px-8 transition-colors">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 text-center">
          <Link href="/" className="text-2xl font-black tracking-tighter hover:text-golden-amber transition">LearnWithHistories</Link>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold text-white/60">
            <Link href="/" className="hover:text-golden-amber transition cursor-pointer">
              {getTranslation(nativeLanguage, 'common.back')} to Home
            </Link>
            <Link href="/about" className="hover:text-golden-amber transition cursor-pointer">
              {getTranslation(nativeLanguage, 'nav.about')}
            </Link>
            <Link href="/stories" className="hover:text-golden-amber transition cursor-pointer">
              {getTranslation(nativeLanguage, 'nav.stories')}
            </Link>
            <Link href="/privacy" className="hover:text-golden-amber transition cursor-pointer">
              {getTranslation(nativeLanguage, 'nav.privacy')}
            </Link>
          </nav>
          <div className="text-white/40 text-[10px] italic font-bold tracking-widest uppercase">
            © {new Date().getFullYear()} LearnWithHistories. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
