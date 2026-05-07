'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/config/translations';
import Header from '@/components/Header';
import AdBanner from '@/components/AdBanner';

export default function AboutPage() {
  const { nativeLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 sm:py-20 px-6 sm:px-8 bg-gradient-to-b from-golden-amber/10 to-background">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-deep-blue mb-4 leading-tight">
              {getTranslation(nativeLanguage, 'about.title')}
            </h1>
            <p className="text-lg sm:text-xl text-deep-blue/70 font-medium">
              {getTranslation(nativeLanguage, 'about.missionText')}
            </p>
          </div>
        </section>

        <AdBanner />

        {/* Mission Section */}
        <section className="py-12 sm:py-16 px-6 sm:px-8 border-b border-golden-amber/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-8 text-golden-amber uppercase tracking-widest">
              {getTranslation(nativeLanguage, 'about.mission')}
            </h2>
            <p className="text-lg text-deep-blue/80 leading-relaxed mb-6 font-medium">
              {getTranslation(nativeLanguage, 'about.missionDescription')}
            </p>
          </div>
        </section>

        {/* Why Stories Section */}
        <section className="py-12 sm:py-16 px-6 sm:px-8 bg-white/50 border-b border-golden-amber/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-8 text-golden-amber uppercase tracking-widest">
              {getTranslation(nativeLanguage, 'about.why')}
            </h2>
            <p className="text-lg text-deep-blue/80 leading-relaxed mb-6 font-medium">
              {getTranslation(nativeLanguage, 'about.whyText')}
            </p>
            <div className="grid grid-cols-1 gap-6 mt-8">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-golden-amber/10 shadow-sm transition-transform hover:scale-[1.01]">
                <h3 className="text-xl font-black text-deep-blue mb-3">{getTranslation(nativeLanguage, 'about.contextualTitle')}</h3>
                <p className="text-deep-blue/70 font-medium leading-relaxed">
                  {getTranslation(nativeLanguage, 'about.contextualDesc')}
                </p>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-golden-amber/10 shadow-sm transition-transform hover:scale-[1.01]">
                <h3 className="text-xl font-black text-deep-blue mb-3">{getTranslation(nativeLanguage, 'about.culturalTitle')}</h3>
                <p className="text-deep-blue/70 font-medium leading-relaxed">
                  {getTranslation(nativeLanguage, 'about.culturalDesc')}
                </p>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-golden-amber/10 shadow-sm transition-transform hover:scale-[1.01]">
                <h3 className="text-xl font-black text-deep-blue mb-3">{getTranslation(nativeLanguage, 'about.naturalTitle')}</h3>
                <p className="text-deep-blue/70 font-medium leading-relaxed">
                  {getTranslation(nativeLanguage, 'about.naturalDesc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 px-6 sm:px-8 border-b border-golden-amber/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-8 text-golden-amber uppercase tracking-widest">
              {getTranslation(nativeLanguage, 'about.features')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white p-6 rounded-2xl border border-golden-amber/10 shadow-sm">
                <h3 className="font-black text-lg mb-3 text-deep-blue">{getTranslation(nativeLanguage, 'home.feature1Title')}</h3>
                <p className="text-deep-blue/70 font-medium">
                  {getTranslation(nativeLanguage, 'about.featureImmersive')}
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-golden-amber/10 shadow-sm">
                <h3 className="font-black text-lg mb-3 text-deep-blue">{getTranslation(nativeLanguage, 'home.feature2Title')}</h3>
                <p className="text-deep-blue/70 font-medium">
                  {getTranslation(nativeLanguage, 'about.featureFlexible')}
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-golden-amber/10 shadow-sm">
                <h3 className="font-black text-lg mb-3 text-deep-blue">{getTranslation(nativeLanguage, 'home.feature3Title')}</h3>
                <p className="text-deep-blue/70 font-medium">
                  {getTranslation(nativeLanguage, 'about.featureMultilingual')}
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-golden-amber/10 shadow-sm">
                <h3 className="font-black text-lg mb-3 text-deep-blue">{getTranslation(nativeLanguage, 'about.progressTitle')}</h3>
                <p className="text-deep-blue/70 font-medium">
                  {getTranslation(nativeLanguage, 'about.featureProgress')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 px-6 sm:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-6 text-deep-blue leading-tight">
              {getTranslation(nativeLanguage, 'about.getStarted')}
            </h2>
            <p className="text-lg text-deep-blue/60 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              {getTranslation(nativeLanguage, 'about.ctaSub')}
            </p>
            <Link
              href="/stories"
              className="bg-golden-amber text-white px-8 sm:px-12 py-5 rounded-2xl font-black text-lg hover:bg-golden-amber/90 transition inline-block shadow-xl shadow-golden-amber/20 active:scale-95"
            >
              {getTranslation(nativeLanguage, 'home.startReading')}
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-golden-amber/10 py-10 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto text-center text-sm text-deep-blue/40 font-bold">
          <p>{getTranslation(nativeLanguage, 'about.footer')}</p>
        </div>
      </footer>
    </div>
  );
}
