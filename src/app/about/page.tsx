'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/config/translations';

// Metadata lives in ./layout.tsx (client pages can't export it).
export default function AboutPage() {
  const { nativeLanguage } = useLanguage();
  const t = (key: string) => getTranslation(nativeLanguage, key);

  return (
    <>
      <section className="page pt-[clamp(48px,7vw,104px)] pb-[clamp(40px,5vw,64px)] flex flex-col gap-5">
        <span className="eyebrow text-accent-ink">{t('about.eyebrow')}</span>
        <h1 className="max-w-[20em] font-story font-medium text-[clamp(30px,4.2vw,52px)] leading-[1.18] tracking-[-0.01em] text-balance">
          {t('about.lead')}
        </h1>
      </section>

      <section className="page grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-16 gap-y-10">
        {(['mission', 'why'] as const).map((key) => (
          <div key={key} className="flex flex-col gap-3 pt-7 border-t border-border-strong">
            <h2 className="font-story font-semibold text-[clamp(24px,2.6vw,30px)]">{t(`about.${key}Title`)}</h2>
            <p className="text-[17px] leading-[1.7] text-pretty">{t(`about.${key}Desc`)}</p>
          </div>
        ))}
      </section>

      <section className="page pt-[clamp(56px,7vw,96px)] flex flex-col gap-7">
        <h2 className="font-story font-semibold text-h2">{t('about.pillarsTitle')}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-surface border border-border rounded-card p-7 flex flex-col gap-2.5">
              <span className="font-story text-[15px] font-semibold text-accent-ink">0{n}</span>
              <h3 className="font-story text-[22px] font-semibold">{t(`about.pillar${n}Title`)}</h3>
              <p className="text-[15px] leading-relaxed text-muted text-pretty">{t(`about.pillar${n}Desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page pt-[clamp(56px,7vw,96px)] flex flex-col gap-6">
        <h2 className="font-story font-semibold text-h2">{t('about.featuresTitle')}</h2>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-12">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <li key={n} className="flex items-baseline gap-3.5 py-4 border-b border-border leading-normal">
              <span aria-hidden="true" className="flex-none size-2.5 rounded-full bg-accent -translate-y-px" />
              {t(`about.feature${n}`)}
            </li>
          ))}
        </ul>
      </section>

      <section className="page py-[clamp(56px,7vw,96px)]">
        <div className="bg-surface-2 rounded-panel p-[clamp(32px,5vw,56px)] flex flex-wrap gap-6 items-center justify-between">
          <h2 className="flex-[1_1_320px] font-story font-semibold text-[clamp(26px,3.2vw,38px)] leading-[1.2] text-balance">
            {t('about.ctaTitle')}
          </h2>
          <Link
            href="/stories"
            className="inline-flex items-center justify-center gap-2.5 min-h-[54px] px-7.5 py-3.5 rounded-full bg-primary text-on-primary font-semibold text-center hover:bg-primary-hover"
          >
            {t('about.ctaButton')} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
