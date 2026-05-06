'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const { nativeLanguage, setNativeLanguage, learningLanguage, setLearningLanguage } = useLanguage();

  const languages = [
    { code: 'pt', name: 'PT' },
    { code: 'en', name: 'EN' },
    { code: 'fr', name: 'FR' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
        <Link href="/" className="text-xl font-black text-blue-600 tracking-tighter">
          LinguaStories
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase hidden sm:inline">Speak:</span>
            <select
              value={nativeLanguage}
              onChange={(e) => setNativeLanguage(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-md text-xs font-semibold p-1.5 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase hidden sm:inline">Learn:</span>
            <select
              value={learningLanguage}
              onChange={(e) => setLearningLanguage(e.target.value)}
              className="bg-blue-50 border border-blue-100 rounded-md text-xs font-semibold p-1.5 text-blue-700 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
