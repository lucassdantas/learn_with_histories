'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getStoryBySlugApi as getStoryApi } from '@/lib/api';
import { Story } from '@/lib/stories';
import { getTranslation } from '@/config/translations';
import Header from '@/components/Header';
import AdBanner from '@/components/AdBanner';
import { useParams } from 'next/navigation';

export default function StoryDetail() {
  const { slug } = useParams() as { slug: string };
  const { learningLanguage, nativeLanguage } = useLanguage();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTranslation, setShowTranslation] = useState<Record<number, boolean>>({});

  useEffect(() => {
    async function loadStory() {
      try {
        const data = await getStoryApi(slug);
        setStory(data);
      } catch (error) {
        console.error('Failed to load story:', error);
      } finally {
        setLoading(false);
      }
    }
    loadStory();
  }, [slug]);

  const toggleTranslation = (index: number) => {
    setShowTranslation((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
        <h1 className="text-2xl font-black text-foreground mb-4">Story not found</h1>
        <a href="/stories" className="text-golden-amber font-bold hover:underline">Return to stories</a>
      </div>
    );
  }

  const title = story.title[learningLanguage] || story.title['en'];

  return (
    <div className="min-h-screen bg-background flex flex-col transition-colors duration-300">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full text-foreground">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-lg text-foreground/60 font-bold max-w-2xl mx-auto italic">
            {story.description[learningLanguage] || story.description['en']}
          </p>
        </header>

        <AdBanner />

        <div className="space-y-10 sm:space-y-16 mt-12">
          {story.content.map((segment, index) => (
            <div key={index} className="flex flex-col gap-6 group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-start">
                {/* Learning Language Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-golden-amber/10 text-golden-amber flex items-center justify-center text-xs font-black shrink-0">
                      {index + 1}
                    </span>
                    <div className="h-[2px] flex-grow bg-gradient-to-r from-golden-amber/20 to-transparent"></div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold leading-relaxed text-foreground/90 pl-1 border-l-4 border-golden-amber/20 hover:border-golden-amber transition-colors py-2">
                    {segment.text[learningLanguage]?.split('\n\n').map((para, i) => (
                      <p key={i} className={i > 0 ? 'mt-4' : ''}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Translation Column */}
                <div className="flex flex-col pt-10 md:pt-12">
                  <button
                    onClick={() => toggleTranslation(index)}
                    className="self-start flex items-center gap-2 text-golden-amber hover:text-burnt-copper font-black text-sm uppercase tracking-widest mb-4 transition-all group-hover:translate-x-1"
                  >
                    <span className={`flex items-center justify-center w-6 h-6 rounded-lg bg-golden-amber/10 border border-golden-amber/20 transition-transform ${showTranslation[index] ? 'rotate-45' : ''}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                    {showTranslation[index] ? getTranslation(nativeLanguage, 'common.hideTranslation') : getTranslation(nativeLanguage, 'common.showTranslation')}
                  </button>

                  {showTranslation[index] && (
                    <div className="text-lg sm:text-xl font-medium leading-relaxed text-foreground/60 italic animate-in fade-in slide-in-from-top-2 duration-300 bg-card p-6 rounded-2xl border border-border-theme">
                      {segment.text[nativeLanguage]?.split('\n\n').map((para, i) => (
                        <p key={i} className={i > 0 ? 'mt-4' : ''}>{para}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-20 py-12 px-6 border-t border-border-theme text-center bg-card">
        <p className="text-foreground/40 font-black text-sm uppercase tracking-widest">
          {getTranslation(nativeLanguage, 'stories.endOfStory')}
        </p>
        <a
          href="/stories"
          className="inline-block mt-6 bg-golden-amber text-white px-8 py-4 rounded-2xl font-black hover:bg-golden-amber/90 transition shadow-lg shadow-golden-amber/20 active:scale-95"
        >
          {getTranslation(nativeLanguage, 'common.backToStories')}
        </a>
      </footer>
    </div>
  );
}
