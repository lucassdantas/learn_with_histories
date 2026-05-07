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
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-8 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-950">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl text-blue-600 dark:text-blue-500 mb-4">
              {getTranslation(nativeLanguage, 'about.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {getTranslation(nativeLanguage, 'about.missionText')}
            </p>
          </div>
        </section>

        <AdBanner />

        {/* Mission Section */}
        <section className="py-16 px-8 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-blue-600 dark:text-blue-500">
              {getTranslation(nativeLanguage, 'about.mission')}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {getTranslation(nativeLanguage, 'about.missionText')}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We founded LinguaStories with the belief that language learning should not be confined to classrooms or rigid curricula. 
              Language is alive, it evolves with culture and context. By immersing learners in stories, we tap into the same mechanism 
              that native speakers use to internalize their own languages.
            </p>
          </div>
        </section>

        {/* Why Stories Section */}
        <section className="py-16 px-8 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-blue-600 dark:text-blue-500">
              {getTranslation(nativeLanguage, 'about.why')}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {getTranslation(nativeLanguage, 'about.whyText')}
            </p>
            <div className="space-y-6 mt-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-3">Contextual Learning</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Words learned in isolation are often forgotten. But words encountered in a meaningful context stick with you. 
                  When you read "The Little Prince" and encounter the word "rose," you don't just learn a vocabulary item—
                  you learn it through the emotional journey of the prince's connection to his flower.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-3">Cultural Understanding</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Language and culture are inseparable. Through stories, you don't just learn words and grammar—
                  you gain insights into how native speakers think, what they value, and how they express themselves.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-3">Natural Progression</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Stories expose you to grammar, vocabulary, and expressions in a natural flow. Unlike textbooks that isolate grammar rules,
                  stories let you experience language as it's actually used.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-8 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-blue-600 dark:text-blue-500">
              {getTranslation(nativeLanguage, 'about.features')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-3 text-blue-900 dark:text-blue-400">Natural Immersion</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {getTranslation(nativeLanguage, 'about.featureImmersive')}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-3 text-purple-900 dark:text-purple-400">Flexible Approach</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {getTranslation(nativeLanguage, 'about.featureFlexible')}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-3 text-green-900 dark:text-green-400">Multilingual Support</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {getTranslation(nativeLanguage, 'about.featureMultilingual')}
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/10 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-3 text-orange-900 dark:text-orange-400">Your Progress</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {getTranslation(nativeLanguage, 'about.featureProgress')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              {getTranslation(nativeLanguage, 'about.getStarted')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of language learners who have discovered the power of learning through stories.
            </p>
            <Link
              href="/stories"
              className="bg-blue-600 dark:bg-blue-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition inline-block shadow-lg shadow-blue-200 dark:shadow-none"
            >
              {getTranslation(nativeLanguage, 'home.startReading')}
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 dark:border-gray-800 mt-16 py-8 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2024 LinguaStories. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
