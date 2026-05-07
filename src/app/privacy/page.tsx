'use client';

import React from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/config/translations';
import AdBanner from '@/components/AdBanner';

export default function PrivacyPolicy() {
  const { nativeLanguage } = useLanguage();

  const sections = [
    { title: 'privacy.section1Title', content: 'privacy.section1Text' },
    { title: 'privacy.section2Title', content: 'privacy.section2Text' },
    { title: 'privacy.section3Title', content: 'privacy.section3Text' },
    { title: 'privacy.section4Title', content: 'privacy.section4Text' },
    { title: 'privacy.section5Title', content: 'privacy.section5Text' },
    { title: 'privacy.section6Title', content: 'privacy.section6Text' },
  ];

  return (
    <div className="min-h-screen bg-background text-deep-blue transition-colors duration-300 flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 sm:px-8 py-16 sm:py-24 w-full">
        <div className="text-center sm:text-left mb-16">
          <h1 className="text-4xl sm:text-6xl font-black mb-6 text-deep-blue tracking-tight">
            {getTranslation(nativeLanguage, 'nav.privacy')}
          </h1>
          <p className="text-deep-blue/60 font-bold text-lg max-w-2xl">
            {getTranslation(nativeLanguage, 'privacy.subtitle')}
          </p>
        </div>

        <AdBanner />

        <div className="space-y-12 mt-12">
          {sections.map((section, index) => (
            <section key={index} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-deep-blue flex items-center gap-4">
                <span className="flex-none w-8 h-8 bg-golden-amber/10 text-golden-amber rounded-lg flex items-center justify-center text-sm">{index + 1}</span>
                {getTranslation(nativeLanguage, section.title)}
              </h2>
              <div className="text-deep-blue/70 leading-relaxed text-lg font-medium text-justify space-y-4">
                {getTranslation(nativeLanguage, section.content).split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                {index === 1 && (
                  <p>
                    <a
                      href="https://www.google.com/settings/ads"
                      className="text-golden-amber hover:underline font-black"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Ads Settings
                    </a>
                  </p>
                )}
              </div>
            </section>
          ))}

          <section className="bg-golden-amber text-white p-8 sm:p-12 rounded-3xl shadow-xl shadow-golden-amber/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <h2 className="text-3xl font-black mb-6 relative">
              {getTranslation(nativeLanguage, 'common.contact')}
            </h2>
            <p className="text-white/90 leading-relaxed text-lg font-bold relative">
              {getTranslation(nativeLanguage, 'privacy.contactText')}
            </p>
          </section>
        </div>

        <div className="mt-20 pt-10 border-t border-golden-amber/10 text-center sm:text-left">
          <Link href="/" className="bg-deep-blue text-white px-8 py-4 rounded-2xl font-black hover:bg-deep-blue/90 transition shadow-lg shadow-deep-blue/20 inline-block active:scale-95">
            ← {getTranslation(nativeLanguage, 'common.back')}
          </Link>
        </div>
      </main>

      <footer className="bg-deep-blue text-white py-12 sm:py-16 px-6 sm:px-8 transition-colors">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 text-center">
          <Link href="/" className="text-2xl font-black tracking-tighter hover:text-golden-amber transition">LearnWithHistories</Link>
          <div className="text-white/40 text-[10px] italic font-bold tracking-widest uppercase">
            © {new Date().getFullYear()} LearnWithHistories. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
