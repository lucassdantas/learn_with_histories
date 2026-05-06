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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-950">
        <h1 className="text-2xl font-bold mb-4">Story not found</h1>
        <Link href="/stories" className="text-blue-600 hover:underline cursor-pointer">
          Go back to stories
        </Link>
      </div>
    );
  }

  const title = story.title[learningLanguage] || story.title['en'] || 'Untitled';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300">
      <Header />
      <AdPopup isOpen={showExitAd} onClose={closeAdAndGoBack} />

      <header className="border-b border-gray-100 dark:border-gray-800 py-4 px-6 flex items-center justify-between sticky top-16 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-10 transition-colors">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition cursor-pointer"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Reading in {learningLanguage.toUpperCase()}
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-12 flex flex-col md:flex-row gap-8">
        <div className="flex-grow">
          <h1 className="text-4xl font-black mb-12 text-center md:text-left leading-tight">
            {title}
          </h1>

          <div className="space-y-16 mb-16">
            {story.content.map((segment) => {
              const learningText = segment.text[learningLanguage];
              const nativeText = segment.text[nativeLanguage];
              const isVisible = visibleTranslations[segment.id];

              return (
                <div key={segment.id} className="group relative">
                  <div className="flex items-start gap-4">
                    <div className="flex-grow">
                      <div className="text-xl md:text-2xl leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                        {learningText || <span className="italic text-gray-400">Text not available in this language</span>}
                      </div>

                      {isVisible && (
                        <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border-l-4 border-blue-400 animate-in fade-in slide-in-from-top-1 duration-200">
                          <div className="text-lg md:text-xl text-blue-800 dark:text-blue-300 whitespace-pre-wrap">
                            {nativeText || <span className="italic text-red-500">Translation not available for this section</span>}
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => toggleTranslation(segment.id)}
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-all cursor-pointer ${
                        isVisible
                          ? 'bg-blue-600 text-white rotate-45'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                      title={isVisible ? "Hide translation" : "Show translation"}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="12 4v16m8-8H4" />
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
              className="px-10 py-4 bg-gray-900 dark:bg-blue-600 text-white font-bold rounded-2xl hover:bg-gray-800 dark:hover:bg-blue-700 transition shadow-lg active:scale-95 cursor-pointer"
            >
              Finish Reading
            </button>
          </div>
        </div>

        {/* Sidebar for Desktop */}
        <div className="hidden lg:block">
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-40 space-y-6">
              <div className="p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-lg">Instructions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Read the text in your target language. If you need help with a section, click the <span className="font-bold text-blue-600 dark:text-blue-400">+</span> button to see the translation.
                </p>
              </div>
              <div className="w-full h-[600px] bg-gray-50 dark:bg-gray-900 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col items-center justify-center text-center p-4 overflow-hidden">
                <span className="text-[10px] text-gray-400 uppercase mb-4">Advertisement</span>
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

      <div className="max-w-4xl mx-auto w-full px-6 pb-12">
        <AdBanner />
      </div>

      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-16 mt-auto transition-colors">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-4">
          <Link href="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm cursor-pointer">
            Privacy Policy
          </Link>
          <p className="text-gray-400 dark:text-gray-500 text-xs italic">
            LinguaStories - Your journey to fluency starts here.
          </p>
        </div>
      </footer>
    </div>
  );
}
