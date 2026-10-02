'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import type { StorySummary } from '@/lib/stories';
import { getTranslation, languageNames } from '@/config/translations';
import AdBanner from '@/components/AdBanner';
import StoryCard from '@/components/StoryCard';

// Accent- and case-insensitive ("cafe" finds "Café").
const normalize = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function StoriesList({ stories }: Readonly<{ stories: StorySummary[] }>) {
  const { learningLanguage, nativeLanguage } = useLanguage();
  const [query, setQuery] = useState('');
  const t = (key: string, params?: Record<string, string>) => getTranslation(nativeLanguage, key, params);

  const q = normalize(query.trim());
  const filtered = stories.filter((story) => {
    if (!q) return true;
    const title = story.title[learningLanguage] || story.title.en;
    const description = story.description[learningLanguage] || story.description.en;
    return normalize(`${title} ${description}`).includes(q);
  });

  const names = languageNames[nativeLanguage] ?? languageNames.en;

  return (
    <>
      <section className="page pt-[clamp(40px,6vw,72px)] pb-2 flex flex-wrap gap-x-12 gap-y-6 items-end justify-between">
        <div className="flex-[1_1_360px] min-w-0 flex flex-col gap-2.5">
          <h1 className="font-story font-semibold text-[clamp(34px,4.2vw,52px)] leading-[1.1] tracking-[-0.01em]">
            {t('stories.title')}
          </h1>
          <p className="text-[17px] leading-[1.55] text-muted">
            {t('stories.readingLine', { l: names[learningLanguage], n: names[nativeLanguage] })}
          </p>
        </div>
        <label className="relative block flex-[1_1_320px] max-w-[440px] min-w-0">
          <span className="sr-only">{t('stories.search')}</span>
          <span aria-hidden="true" className="absolute left-[18px] top-[17px] size-3.5 rounded-full border-2 border-muted" />
          <span aria-hidden="true" className="absolute left-[30px] top-[30px] w-[7px] h-0.5 rounded bg-muted rotate-45" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('stories.search')}
            className="w-full min-h-[52px] pl-12 pr-5 border border-border-strong rounded-full bg-surface text-foreground text-base placeholder:text-muted"
          />
        </label>
      </section>

      <AdBanner className="py-8" />

      <section className="page pt-2 pb-[clamp(56px,7vw,96px)]">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-5">
            {filtered.map((story) => (
              <StoryCard key={story.id} story={story} lang={learningLanguage} as="h2" cta={t('stories.start')} />
            ))}
          </div>
        ) : (
          <div role="status" className="border-[1.5px] border-dashed border-border-strong rounded-[20px] px-6 py-[clamp(40px,7vw,72px)] flex flex-col items-center gap-3 text-center">
            <span aria-hidden="true" className="size-touch rounded-full border-2 border-accent" />
            <h2 className="mt-2 font-story font-semibold text-[26px]">{t('stories.emptyTitle')}</h2>
            <p className="max-w-[30em] leading-relaxed text-muted text-pretty">{t('stories.emptyDesc', { q: query.trim() })}</p>
            <button
              type="button"
              onClick={() => setQuery('')}
              className="mt-2 min-h-12 px-6 py-2.5 rounded-full border-[1.5px] border-border-strong bg-transparent font-semibold text-[15px] cursor-pointer hover:border-accent"
            >
              {t('stories.clear')}
            </button>
          </div>
        )}
      </section>
    </>
  );
}
