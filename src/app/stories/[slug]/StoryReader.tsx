'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import type { Story, StorySummary } from '@/lib/stories';
import { getTranslation } from '@/config/translations';
import AdBanner from '@/components/AdBanner';
import AdSidebar from '@/components/AdSidebar';
import Segment from '@/components/Segment';
import StoryCard from '@/components/StoryCard';

type Props = Readonly<{
  story: Story;
  moreStories: StorySummary[];
}>;

export default function StoryReader({ story, moreStories }: Props) {
  const { learningLanguage, nativeLanguage } = useLanguage();
  const [finished, setFinished] = useState(false);
  const t = (key: string) => getTranslation(nativeLanguage, key);

  const title = story.title[learningLanguage] || story.title.en;

  return (
    <>
      {/* Secondary bar, sticks right under the 68px header */}
      <div className="sticky top-17 z-30 bg-background border-b border-border">
        <div className="page h-14 flex items-center justify-between gap-3">
          <Link
            href="/stories"
            className="-ml-1 flex items-center gap-2 min-h-touch pl-2 pr-3 rounded-control font-semibold text-[15px] hover:bg-surface"
          >
            <span aria-hidden="true" className="text-lg">←</span>
            {t('reader.back')}
          </Link>
          <span className="inline-flex items-center gap-2 min-h-8 px-3.5 py-1 rounded-full border border-accent text-eyebrow whitespace-nowrap">
            {t('reader.readingIn')} <strong className="font-bold tracking-[0.04em]">{learningLanguage.toUpperCase()}</strong>
          </span>
        </div>
      </div>

      <div className="page pt-[clamp(36px,5vw,64px)] pb-[clamp(48px,6vw,80px)] flex gap-18 items-start justify-center">
        <article lang={learningLanguage} className="flex-[1_1_0] min-w-0 max-w-reading">
          <h1 className="mb-[clamp(28px,4vw,44px)] font-story font-semibold text-h1 tracking-[-0.01em] text-balance">{title}</h1>

          {/* Remount on language change so open translations close (design rule). */}
          <div key={`${learningLanguage}-${nativeLanguage}`} className="flex flex-col gap-[clamp(22px,2.6vw,30px)]">
            {story.content.map((segment) => (
              <Segment key={segment.id} text={segment.text} />
            ))}
          </div>

          <div lang={nativeLanguage} className="mt-[clamp(44px,6vw,64px)] pt-8 border-t border-border flex flex-col items-center gap-3 text-center">
            {finished ? (
              <>
                <span aria-hidden="true" className="size-touch rounded-full border-2 border-accent flex items-center justify-center">
                  <span className="size-3.5 rounded-full bg-accent" />
                </span>
                <h2 role="status" className="font-story font-semibold text-[26px]">{t('reader.doneTitle')}</h2>
                <p className="text-muted">{t('reader.doneDesc')}</p>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setFinished(true)}
                className="min-h-[54px] min-w-[200px] px-8 py-3.5 rounded-full bg-primary text-on-primary font-semibold cursor-pointer hover:bg-primary-hover"
              >
                {t('reader.finish')}
              </button>
            )}
          </div>
        </article>

        <aside className="hidden nav:flex flex-[0_0_300px] flex-col gap-10">
          <div className="bg-surface border border-border rounded-card p-6 flex flex-col gap-4">
            <h2 className="font-story font-semibold text-[19px]">{t('reader.howTitle')}</h2>
            <ol className="flex flex-col gap-3.5">
              {[1, 2, 3].map((n) => (
                <li key={n} className="grid grid-cols-[26px_minmax(0,1fr)] gap-2.5 text-sm leading-[1.55] text-muted">
                  <span className="size-[26px] rounded-full bg-accent-soft text-accent-ink font-bold text-[13px] flex items-center justify-center">
                    {n}
                  </span>
                  {t(`reader.how${n}`)}
                </li>
              ))}
            </ol>
          </div>
          <AdSidebar />
        </aside>
      </div>

      {moreStories.length > 0 && (
        <section className="border-t border-border bg-surface-2">
          <div className="page py-[clamp(44px,6vw,72px)] flex flex-col gap-6">
            <h2 className="font-story font-semibold text-[clamp(24px,2.8vw,32px)]">{t('reader.more')}</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
              {moreStories.map((s) => (
                <StoryCard key={s.id} story={s} lang={learningLanguage} />
              ))}
            </div>
          </div>
        </section>
      )}

      <AdBanner className="py-10" />
    </>
  );
}
