'use client';

import React, { useState } from 'react';
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
  const pathname = usePathname();

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

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-golden-amber/20 flex items-center sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-golden-amber group-hover:scale-105 transition-transform">
            <Image
              src={logoImg}
              alt="LearnWithHistories Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xl font-black text-deep-blue tracking-tighter hidden sm:block">
            LearnWithHistories
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition ${
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
        <div className="flex items-center gap-3">
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

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[10px] font-bold text-deep-blue/60 uppercase">
              {getTranslation(nativeLanguage, 'header.speak')}:
            </span>
            <select
              value={nativeLanguage}
              onChange={(e) => setNativeLanguage(e.target.value)}
              className="bg-white/50 dark:bg-black/20 border border-golden-amber/30 rounded-md text-xs font-bold p-1.5 focus:ring-2 focus:ring-golden-amber outline-none cursor-pointer text-deep-blue"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[10px] font-bold text-deep-blue/60 uppercase">
              {getTranslation(nativeLanguage, 'header.learn')}:
            </span>
            <select
              value={learningLanguage}
              onChange={(e) => setLearningLanguage(e.target.value)}
              className="bg-golden-amber/10 border border-golden-amber/30 rounded-md text-xs font-bold p-1.5 text-deep-blue focus:ring-2 focus:ring-golden-amber outline-none cursor-pointer"
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
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-golden-amber/20 bg-background">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 font-bold text-sm transition border-l-4 ${
                  isActive(link.href)
                    ? 'border-l-golden-amber bg-golden-amber/10 text-deep-blue'
                    : 'border-l-transparent text-deep-blue/70 hover:bg-golden-amber/5'
                }`}
              >
                {getTranslation(nativeLanguage, link.label)}
              </Link>
            ))}
          </nav>
          
          <div className="border-t border-golden-amber/20 px-4 py-3 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-deep-blue/60 uppercase">
                {getTranslation(nativeLanguage, 'header.speak')}:
              </span>
              <select
                value={nativeLanguage}
                onChange={(e) => setNativeLanguage(e.target.value)}
                className="bg-white/50 dark:bg-black/20 border border-golden-amber/30 rounded-md text-xs font-bold p-1.5 focus:ring-2 focus:ring-golden-amber outline-none cursor-pointer text-deep-blue"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-deep-blue/60 uppercase">
                {getTranslation(nativeLanguage, 'header.learn')}:
              </span>
              <select
                value={learningLanguage}
                onChange={(e) => setLearningLanguage(e.target.value)}
                className="bg-golden-amber/10 border border-golden-amber/30 rounded-md text-xs font-bold p-1.5 text-deep-blue focus:ring-2 focus:ring-golden-amber outline-none cursor-pointer"
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
      )}
    </header>
  );
}
