'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Story } from '@/lib/stories';
import { getStoriesApi } from '@/lib/api';
import { getTranslation, languageNames } from '@/config/translations';
import AdBanner from '@/components/AdBanner';
import Header from '@/components/Header';

export default function StoriesPage() {
  const { learningLanguage, nativeLanguage } = useLanguage();
  const [stories, setStories] = useState<Story[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStories() {
      try {
        const data = await getStoriesApi();
        setStories(data);
      } catch (error) {
        console.error('Failed to load stories:', error);
      } finally {
        setLoading(false);
      }
    }
    loadStories();
  }, []);

  const filteredStories = stories.filter((story) => {
    const title = story.title[learningLanguage] || story.title['en'] || '';
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const learningLangName = languageNames[nativeLanguage]?.[learningLanguage] || learningLanguage.toUpperCase();
  const nativeLangName = languageNames[nativeLanguage]?.[nativeLanguage] || nativeLanguage.toUpperCase();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden-amber"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col transition-colors duration-300 overflow-x-hidden">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto px-6 py-12 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-deep-blue mb-3">
              {getTranslation(nativeLanguage, 'stories.title')}
            </h1>
            <p className="text-deep-blue/60 font-medium max-w-md">
              {getTranslation(nativeLanguage, 'stories.reading', {
                learningLang: learningLangName,
                nativeLang: nativeLangName,
              })}
            </p>
          </div>

          <div className="relative w-full md:w-80 group">
            <input
              type="text"
              placeholder={getTranslation(nativeLanguage, 'stories.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-golden-amber/20 rounded-2xl focus:ring-2 focus:ring-golden-amber focus:outline-none shadow-sm transition-all placeholder:text-deep-blue/30 text-deep-blue font-bold cursor-text"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-golden-amber group-focus-within:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <AdBanner />

        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.slug}`}
                className="group bg-white p-8 rounded-3xl shadow-sm border border-golden-amber/5 hover:shadow-xl hover:shadow-golden-amber/5 hover:border-golden-amber/20 transition-all flex flex-col h-full cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-golden-amber/5 rounded-bl-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>

                <h2 className="text-2xl font-black text-deep-blue group-hover:text-golden-amber transition mb-3 leading-tight relative">
                  {story.title[learningLanguage] || story.title['en']}
                </h2>
                <p className="text-deep-blue/60 text-sm flex-grow line-clamp-3 leading-relaxed font-bold relative">
                  {story.description[learningLanguage] || story.description['en']}
                </p>
                <div className="mt-6 flex items-center text-golden-amber font-black text-sm group-hover:translate-x-2 transition-transform relative">
                  {getTranslation(nativeLanguage, 'home.startReading')}
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/50 rounded-3xl border-2 border-dashed border-golden-amber/10">
            <p className="text-deep-blue/40 font-black text-lg">
              {searchQuery ? getTranslation(nativeLanguage, 'stories.noResults') : getTranslation(nativeLanguage, 'stories.noStoriesYet')}
            </p>
          </div>
        )}
      </main>

      <footer className="bg-deep-blue text-white py-12 sm:py-16 px-6 sm:px-8 mt-12 transition-colors">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 text-center">
          <Link href="/" className="text-2xl font-black tracking-tighter hover:text-golden-amber transition">LearnWithHistories</Link>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold text-white/60">
            <Link href="/about" className="hover:text-golden-amber transition cursor-pointer">
              {getTranslation(nativeLanguage, 'nav.about')}
            </Link>
            <Link href="/terms" className="hover:text-golden-amber transition cursor-pointer">
              {getTranslation(nativeLanguage, 'nav.terms')}
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
