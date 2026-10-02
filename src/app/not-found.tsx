'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/config/translations';

// Rendered for unknown URLs and for notFound() (e.g. a story slug that doesn't exist).
export default function NotFound() {
  const { nativeLanguage } = useLanguage();
  const t = (key: string) => getTranslation(nativeLanguage, key);

  return (
    <section className="max-w-[720px] mx-auto w-full px-[clamp(20px,5vw,48px)] py-[clamp(72px,12vw,160px)] flex flex-col items-center gap-4.5 text-center">
      <span className="font-story font-medium text-[clamp(72px,12vw,128px)] leading-none text-accent tracking-[-0.03em]">404</span>
      <h1 className="font-story font-semibold text-[clamp(28px,3.6vw,40px)] leading-[1.2] text-balance">{t('nf.title')}</h1>
      <p className="max-w-[30em] text-[17px] leading-relaxed text-muted text-pretty">{t('nf.desc')}</p>
      <div className="mt-3 flex flex-wrap justify-center gap-3">
        <Link
          href="/stories"
          className="inline-flex items-center justify-center min-h-[52px] px-7 py-3 rounded-full bg-primary text-on-primary font-semibold hover:bg-primary-hover"
        >
          {t('nf.stories')}
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center min-h-[52px] px-7 py-3 rounded-full border-[1.5px] border-border-strong font-semibold hover:border-accent"
        >
          {t('nf.home')}
        </Link>
      </div>
    </section>
  );
}
