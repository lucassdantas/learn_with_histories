'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Story } from '@/lib/stories';
import { getStoryBySlugApi } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AdPopup from '@/components/AdPopup';

export default function StoryDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { learningLanguage, nativeLanguage } = useLanguage();

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});
  const [showExitAd, setShowExitAd] = useState(false);

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
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Story not found</h1>
        <Link href="/stories" className="text-blue-600 hover:underline">
          Go back to stories
        </Link>
      </div>
    );
  }

  const title = story.title[learningLanguage] || story.title['en'] || 'Untitled';

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <AdPopup isOpen={showExitAd} onClose={closeAdAndGoBack} />

      <header className="border-b border-gray-100 py-4 px-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
          {learningLanguage} → {nativeLanguage}
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-12 flex flex-col md:flex-row gap-8">
        <div className="flex-grow">
          <h1 className="text-4xl font-black mb-12 text-center md:text-left leading-tight">
            {title}
          </h1>

          <div className="space-y-12 mb-16">
            {story.content.map((paragraph) => {
              const learningText = paragraph.text[learningLanguage];
              const nativeText = paragraph.text[nativeLanguage];
              const isVisible = visibleTranslations[paragraph.id];

              return (
                <div key={paragraph.id} className="group relative">
                  <div className="flex items-start gap-4">
                    <div className="flex-grow">
                      <p className="text-xl md:text-2xl leading-relaxed text-gray-800">
                        {learningText || <span className="italic text-gray-400">Text not available in this language</span>}
                      </p>

                      {isVisible && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400 animate-in fade-in slide-in-from-top-1 duration-200">
                          <p className="text-lg md:text-xl text-blue-800">
                            {nativeText || <span className="italic text-red-500">Translation not available for this section</span>}
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => toggleTranslation(paragraph.id)}
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isVisible
                          ? 'bg-blue-600 text-white rotate-45'
                          : 'bg-gray-100 text-gray-400 hover:bg-blue-100 hover:text-blue-600'
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
              className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition shadow-lg active:scale-95"
            >
              Finish Reading
            </button>
          </div>
        </div>

        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">Instructions</h3>
              <p className="text-sm text-gray-600">
                Read the text in your target language. If you get stuck, click the <span className="font-bold">+</span> button to see the translation.
              </p>
            </div>
            <div className="w-full h-96 bg-gray-100 border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-center p-4">
              <div>
                <p className="text-[10px] text-gray-400 uppercase mb-2">Advertisement</p>
                <div className="font-bold text-gray-400">Side Ad Banner</div>
                <p className="text-[10px] text-gray-400 mt-2">ca-pub-3940256099942544/6300978111</p>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <div className="max-w-4xl mx-auto w-full px-6 pb-8">
        <AdBanner />
      </div>

      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm italic">
            Keep practicing every day to improve your skills!
          </p>
        </div>
      </footer>
    </div>
  );
}
