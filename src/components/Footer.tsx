'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/config/translations';

export default function Footer() {
  const { nativeLanguage } = useLanguage();

  return (
    <footer className="bg-deep-blue text-white py-12 sm:py-16 px-6 sm:px-8 transition-colors mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 text-center">
        <div className="text-2xl font-black tracking-tighter">LearnWithHistories</div>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold text-white/60">
          <Link href="/" className="hover:text-golden-amber transition cursor-pointer">
            {getTranslation(nativeLanguage, 'nav.home') || 'Início'}
          </Link>
          <Link href="/stories" className="hover:text-golden-amber transition cursor-pointer">
            {getTranslation(nativeLanguage, 'nav.stories')}
          </Link>
          <Link href="/about" className="hover:text-golden-amber transition cursor-pointer">
            {getTranslation(nativeLanguage, 'nav.about')}
          </Link>
          <Link href="/terms" className="hover:text-golden-amber transition cursor-pointer">
            {getTranslation(nativeLanguage, 'nav.terms')}
          </Link>
          <Link href="/privacy" className="hover:text-golden-amber transition cursor-pointer">
            {getTranslation(nativeLanguage, 'nav.privacy') || 'Privacidade'}
          </Link>
        </nav>
        <div className="text-white/40 text-[10px] italic font-bold tracking-widest uppercase">
          © {new Date().getFullYear()} LearnWithHistories. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
