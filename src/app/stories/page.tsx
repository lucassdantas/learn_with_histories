'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Story } from '@/lib/stories';
import { getStoriesApi } from '@/lib/api';
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto px-4 py-8 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Stories</h1>
            <p className="text-gray-600">
              Reading in {learningLanguage.toUpperCase()} with {nativeLanguage.toUpperCase()} translations.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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
                className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition flex flex-col h-full"
              >
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition mb-2">
                  {story.title[learningLanguage] || story.title['en']}
                </h2>
                <p className="text-gray-600 text-sm flex-grow line-clamp-3 leading-relaxed">
                  {story.description[learningLanguage] || story.description['en']}
                </p>
                <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm">
                  Read Story
                  <svg
                    className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 shadow-inner">
            <p className="text-gray-500 font-medium">No stories found matching your search.</p>
          </div>
        ) }
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4">
          <Link href="/privacy" className="text-gray-500 hover:text-blue-600 text-sm">
            Privacy Policy
          </Link>
          <div className="text-gray-400 text-xs italic">
            © {new Date().getFullYear()} LinguaStories. Practice makes perfect.
          </div>
        </div>
      </footer>
    </div>
  );
}
