'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { getTranslation } from '@/config/translations';
import { LogoMark, Wordmark } from '@/components/Logo';
import LanguageSelect from '@/components/LanguageSelect';

const NAV_LINKS = [
  { href: '/', label: 'nav.home' },
  { href: '/stories', label: 'nav.stories' },
  { href: '/about', label: 'nav.about' },
];

// Sticky 68px header. ≥1000px (`nav:`): links + language selects. Below: theme + hamburger panel.
export default function Header() {
  const { nativeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = (key: string) => getTranslation(nativeLanguage, key);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="page h-17 flex items-center gap-5">
        <Link href="/" onClick={closeMenu} className="mr-auto flex items-center gap-2.5 min-h-touch min-w-0 text-foreground no-underline">
          <LogoMark size={40} />
          <Wordmark className="text-[19px]" />
        </Link>

        <nav aria-label="Main" className="hidden nav:flex gap-1">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center min-h-touch px-3 text-[15px] border-b-2 hover:text-accent-ink ${
                  active ? 'font-bold border-accent' : 'font-medium border-transparent'
                }`}
              >
                {t(link.label)}
              </Link>
            );
          })}
        </nav>

        <div aria-hidden="true" className="hidden nav:block w-px h-7 bg-border" />

        <div className="hidden nav:flex items-center gap-3">
          <LanguageSelect kind="native" label={t('header.speak')} variant="compact" />
          <LanguageSelect kind="learning" label={t('header.learn')} variant="compact" />
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? t('header.toLight') : t('header.toDark')}
          title={theme === 'dark' ? t('header.toLight') : t('header.toDark')}
          className="flex-none size-touch rounded-full border border-border-strong bg-surface text-foreground flex items-center justify-center cursor-pointer hover:border-accent"
        >
          <span aria-hidden="true" className="size-4.5 rounded-full border-2 border-current bg-[linear-gradient(90deg,currentColor_50%,transparent_50%)]" />
        </button>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? t('header.closeMenu') : t('header.openMenu')}
          className="nav:hidden flex-none size-touch rounded-control border border-border-strong bg-surface text-foreground flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          {menuOpen ? (
            <span aria-hidden="true" className="relative size-4.5">
              <span className="absolute left-0 top-2 w-4.5 h-0.5 rounded bg-current rotate-45" />
              <span className="absolute left-0 top-2 w-4.5 h-0.5 rounded bg-current -rotate-45" />
            </span>
          ) : (
            <>
              <span aria-hidden="true" className="w-4.5 h-0.5 rounded bg-current" />
              <span aria-hidden="true" className="w-4.5 h-0.5 rounded bg-current" />
              <span aria-hidden="true" className="w-4.5 h-0.5 rounded bg-current" />
            </>
          )}
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="nav:hidden absolute inset-x-0 top-full bg-surface border-b border-border shadow-raised px-5 pt-2 pb-6">
          <nav aria-label="Main" className="flex flex-col">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center justify-between min-h-14 border-b border-border font-story text-xl ${
                    active ? 'font-bold' : 'font-medium'
                  }`}
                >
                  {t(link.label)}
                  <span aria-hidden="true" className={`size-2 rounded-full ${active ? 'bg-accent' : 'bg-transparent'}`} />
                </Link>
              );
            })}
          </nav>
          <div className="mt-5 eyebrow text-xs text-muted">{t('header.languages')}</div>
          <div className="mt-2.5 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
            <LanguageSelect kind="native" label={t('header.speak')} variant="full" selectClassName="bg-background" />
            <LanguageSelect kind="learning" label={t('header.learn')} variant="full" selectClassName="bg-background" />
          </div>
        </div>
      )}
    </header>
  );
}
