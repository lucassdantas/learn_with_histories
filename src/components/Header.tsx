'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { getTranslation } from '@/config/translations';
import { usePathname } from 'next/navigation';
import logoImg from '@/assets/logo-learn-with-histories.png';

export default function Header() {
  const { nativeLanguage, setNativeLanguage, learningLanguage, setLearningLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const languages = [
    { code: 'pt', name: 'PT' },
    { code: 'en', name: 'EN' },
    { code: 'fr', name: 'FR' },
  ];

  const navLinks = [
    { href: '/', label: 'nav.home' },
    { href: '/stories', label: 'nav.stories' },
    { href: '/about', label: 'nav.about' },
  ];

  const isActive = (href: string) => pathname === href;

  // Prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-golden-amber/20 flex items-center sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer group shrink-0">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 overflow-hidden rounded-full border-2 border-golden-amber group-hover:scale-105 transition-transform">
            <Image
              src={logoImg}
              alt="LearnWithHistories Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-lg sm:text-xl font-black text-deep-blue tracking-tighter hidden xs:block">
            LearnWithHistories
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg font-bold text-sm transition ${
                isActive(link.href)
                  ? 'bg-golden-amber text-white'
                  : 'text-deep-blue hover:bg-golden-amber/10'
              }`}
            >
              {getTranslation(nativeLanguage, link.label)}
            </Link>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-1 sm:gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-golden-amber/10 transition cursor-pointer text-deep-blue"
            title={getTranslation(nativeLanguage, 'header.toggleTheme')}
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-golden-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            )}
          </button>

          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[10px] font-bold text-deep-blue/60 uppercase">
              {getTranslation(nativeLanguage, 'header.speak')}:
            </span>
            <select
              value={nativeLanguage}
              onChange={(e) => setNativeLanguage(e.target.value)}
              className="bg-background/50 border border-golden-amber/30 rounded-md text-xs font-bold p-1 focus:ring-2 focus:ring-golden-amber outline-none cursor-pointer text-deep-blue"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[10px] font-bold text-deep-blue/60 uppercase">
              {getTranslation(nativeLanguage, 'header.learn')}:
            </span>
            <select
              value={learningLanguage}
              onChange={(e) => setLearningLanguage(e.target.value)}
              className="bg-background/50 border border-golden-amber/30 rounded-md text-xs font-bold p-1 text-deep-blue focus:ring-2 focus:ring-golden-amber outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-golden-amber/10 transition text-deep-blue"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 border-b border-golden-amber/20 bg-background shadow-xl md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col p-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl font-bold text-base transition ${
                  isActive(link.href)
                    ? 'bg-golden-amber/10 text-golden-amber'
                    : 'text-deep-blue hover:bg-golden-amber/5'
                }`}
              >
                {getTranslation(nativeLanguage, link.label)}
              </Link>
            ))}

            <div className="mt-2 pt-2 border-t border-golden-amber/10 grid grid-cols-2 gap-2">
              <div className="p-3 bg-background/50 rounded-xl space-y-2">
                <span className="text-[10px] font-black text-deep-blue/40 uppercase tracking-widest block">
                  {getTranslation(nativeLanguage, 'header.speak')}
                </span>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setNativeLanguage(lang.code)}
                      className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${
                        nativeLanguage === lang.code
                          ? 'bg-deep-blue text-white shadow-md shadow-deep-blue/20'
                          : 'bg-background text-deep-blue/60 border border-golden-amber/20'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-background/50 rounded-xl space-y-2">
                <span className="text-[10px] font-black text-deep-blue/40 uppercase tracking-widest block">
                  {getTranslation(nativeLanguage, 'header.learn')}
                </span>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLearningLanguage(lang.code)}
                      className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${
                        learningLanguage === lang.code
                          ? 'bg-golden-amber text-white shadow-md shadow-golden-amber/20'
                          : 'bg-background text-deep-blue/60 border border-golden-amber/20'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
