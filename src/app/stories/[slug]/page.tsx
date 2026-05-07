'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Story } from '@/lib/stories';
import { getStoryBySlugApi } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AdPopup from '@/components/AdPopup';
import Header from '@/components/Header';
import { ADS_CONFIG } from '@/config/ads';
import { getTranslation } from '@/config/translations';

export default function StoryDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { learningLanguage, nativeLanguage } = useLanguage();

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});
  const [showExitAd, setShowExitAd] = useState(false);
  const adPushedRef = useRef<boolean>(false);

  useEffect(() => {
    async function loadStory() {
      try {
        const data = await getStoryBySlugApi(slug);
        setStory(data);
      } catch (error) {
        console.error('Failed to load story:', error);
      } finally {
        setLoading(false);
      }
    }
    loadStory();
  }, [slug]);

  // Sidebar Ad Initialization
  useEffect(() => {
    if (!loading && story && !adPushedRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adPushedRef.current = true;
      } catch (e) {
        console.error('Sidebar AdSense error:', e);
      }
    }
  }, [loading, story]);

  const toggleTranslation = (id: string) => {
    setVisibleTranslations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowExitAd(true);
  };

  const closeAdAndGoBack = () => {
    setShowExitAd(false);
    router.push('/stories');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden-amber"></div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
        <h1 className="text-2xl font-black mb-4 text-deep-blue">{getTranslation(nativeLanguage, 'stories.notFound')}</h1>
        <Link href="/stories" className="text-golden-amber hover:underline font-bold cursor-pointer">
          {getTranslation(nativeLanguage, 'stories.goBack')}
        </Link>
      </div>
    );
  }

  const title = story.title[learningLanguage] || story.title['en'] || getTranslation(nativeLanguage, 'stories.untitled');

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      <Header />
      <AdPopup isOpen={showExitAd} onClose={closeAdAndGoBack} />

      <header className="border-b border-golden-amber/10 py-4 px-4 sm:px-6 flex items-center justify-between sticky top-14 sm:top-16 bg-background/80 backdrop-blur-md z-10 transition-colors">
        <button
          onClick={handleBack}
          className="flex items-center text-deep-blue/60 hover:text-golden-amber font-bold transition cursor-pointer"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden xs:inline">{getTranslation(nativeLanguage, 'stories.back')}</span>
        </button>
        <div className="text-[10px] sm:text-sm font-black text-golden-amber uppercase tracking-widest text-right">
          {getTranslation(nativeLanguage, 'stories.readingIn', { lang: learningLanguage.toUpperCase() })}
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <h1 className="text-3xl sm:text-4xl font-black mb-10 sm:mb-12 text-center sm:text-left leading-tight text-deep-blue">
            {title}
          </h1>

          <div className="space-y-12 sm:space-y-16 mb-16">
            {story.content.map((segment) => {
              const learningText = segment.text[learningLanguage];
              const nativeText = segment.text[nativeLanguage];
              const isVisible = visibleTranslations[segment.id];

              return (
                <div key={segment.id} className="group relative">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="flex-grow w-full order-2 sm:order-1">
                      <div className={`text-xl sm:text-2xl leading-relaxed text-deep-blue whitespace-pre-wrap font-serif transition-colors p-3 sm:p-4 rounded-2xl ${isVisible ? 'bg-golden-amber/10' : ''}`}>
                        {learningText || <span className="italic opacity-50">{getTranslation(nativeLanguage, 'stories.textNotAvailable')}</span>}
                      </div>

                      {isVisible && (
                        <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-background/60 rounded-2xl border-l-4 border-burnt-copper animate-in fade-in slide-in-from-top-1 duration-200">
                          <div className="text-lg sm:text-xl text-burnt-copper whitespace-pre-wrap font-serif font-medium">
                            {nativeText || <span className="italic opacity-50">{getTranslation(nativeLanguage, 'stories.translationNotAvailable')}</span>}
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => toggleTranslation(segment.id)}
                      className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer order-1 sm:order-2 self-end sm:self-start ${
                        isVisible
                          ? 'bg-burnt-copper text-white rotate-45'
                          : 'bg-background border border-golden-amber/20 text-golden-amber hover:bg-golden-amber hover:text-white'
                      }`}
                      title={isVisible ? getTranslation(nativeLanguage, 'stories.hideTranslation') : getTranslation(nativeLanguage, 'stories.showTranslation')}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-20 text-center">
            <button
              onClick={handleBack}
              className="px-10 py-4 bg-deep-blue text-white font-black rounded-2xl hover:bg-deep-blue/90 transition shadow-lg active:scale-95 cursor-pointer"
            >
              {getTranslation(nativeLanguage, 'stories.finish')}
            </button>
          </div>
        </div>

        {/* Sidebar for Desktop */}
        <div className="hidden lg:block">
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-40 space-y-6">
              <div className="p-5 bg-background/50 rounded-2xl border border-golden-amber/10 shadow-sm">
                <h3 className="font-black text-deep-blue mb-2 text-lg">{getTranslation(nativeLanguage, 'stories.instructionsTitle')}</h3>
                <p className="text-sm text-deep-blue/60 font-medium leading-relaxed">
                  {getTranslation(nativeLanguage, 'stories.instructionsDesc')}
                </p>
              </div>
              <div className="w-full h-[600px] bg-background/30 border border-dashed border-golden-amber/20 rounded-2xl flex flex-col items-center justify-center text-center p-4 overflow-hidden">
                <span className="text-[10px] text-deep-blue/40 font-black uppercase mb-4">{getTranslation(nativeLanguage, 'stories.advertisement')}</span>
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block', width: '100%', height: '500px' }}
                  data-ad-client={ADS_CONFIG.publisherId}
                  data-ad-slot={ADS_CONFIG.slots.sidebar}
                  data-ad-format="vertical"
                />
              </div>
            </div>
          </aside>
        </div>
      </main>

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pb-12">
        <AdBanner />
      </div>

      <footer className="bg-background/50 border-t border-golden-amber/10 py-16 mt-auto transition-colors">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-4">
          <Link href="/privacy" className="text-deep-blue/40 hover:text-golden-amber text-sm font-bold cursor-pointer transition-colors">
            {getTranslation(nativeLanguage, 'stories.privacyPolicy')}
          </Link>
          <p className="text-deep-blue/30 text-xs italic font-medium">
            LearnWithHistories - {getTranslation(nativeLanguage, 'stories.footerTagline')}
          </p>
        </div>
      </footer>
    </div>
  );
}
