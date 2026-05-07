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
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto px-4 py-8 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {getTranslation(nativeLanguage, 'stories.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {getTranslation(nativeLanguage, 'stories.reading', {
                learningLang: learningLangName,
                nativeLang: nativeLangName,
              })}
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder={getTranslation(nativeLanguage, 'stories.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100 cursor-text"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <AdBanner />

        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.slug}`}
                className="group bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md dark:hover:border-blue-900 transition flex flex-col h-full cursor-pointer"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition mb-2">
                  {story.title[learningLanguage] || story.title['en']}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow line-clamp-3 leading-relaxed">
                  {story.description[learningLanguage] || story.description['en']}
                </p>
                <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:translate-x-1 transition-transform">
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
                      strokeWidth={2}
                      d="9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 shadow-inner">
            <p className="text-gray-500 dark:text-gray-500 font-medium">
              {searchQuery ? getTranslation(nativeLanguage, 'stories.noResults') : getTranslation(nativeLanguage, 'stories.noStoriesYet')}
            </p>
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-12 mt-auto transition-colors">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4">
          <Link href="/terms" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm cursor-pointer">
            {getTranslation(nativeLanguage, 'nav.terms')}
          </Link>
          <div className="text-gray-400 dark:text-gray-500 text-xs italic">
            © {new Date().getFullYear()} LinguaStories. Practice makes perfect.
          </div>
        </div>
      </footer>
    </div>
  );
}
