'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/config/translations';
import type { StorySummary } from '@/lib/stories';
import AdBanner from '@/components/AdBanner';
import StoryCard from '@/components/StoryCard';
import LanguageSelect from '@/components/LanguageSelect';
import Segment from '@/components/Segment';

type Props = Readonly<{
  latestStories: StorySummary[];
  /** One story segment (language → text) for the hero example. */
  demo: Record<string, string>;
}>;

const primaryButton =
  'inline-flex items-center justify-center gap-2.5 min-h-[54px] px-7.5 py-3.5 rounded-full bg-primary text-on-primary font-semibold text-center hover:bg-primary-hover';

export default function HomePage({ latestStories, demo }: Props) {
  const { nativeLanguage, learningLanguage } = useLanguage();
  const t = (key: string) => getTranslation(nativeLanguage, key);

  return (
    <>
      {/* Hero */}
      <section className="page pt-[clamp(40px,7vw,96px)] pb-[clamp(32px,5vw,64px)] flex flex-wrap gap-[clamp(36px,6vw,80px)] items-center">
        <div className="flex-[1_1_440px] min-w-0 flex flex-col items-start gap-5.5">
          <span className="eyebrow text-accent-ink">{t('home.eyebrow')}</span>
          <h1 className="font-story font-semibold text-display tracking-[-0.015em] text-balance">{t('home.title')}</h1>
          <p className="max-w-[34em] text-[clamp(17px,1.6vw,19px)] leading-relaxed text-muted text-pretty">{t('home.subtitle')}</p>
          <Link href="/stories" className={`mt-1.5 ${primaryButton}`}>
            {t('home.cta')} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="flex-[1_1_380px] min-w-0">
          <div className="bg-surface border border-border rounded-[20px] shadow-raised p-[clamp(22px,3vw,32px)] flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3 eyebrow text-xs text-muted">
              <span>{t('home.demo')}</span>
              <span>
                {learningLanguage.toUpperCase()} → {nativeLanguage.toUpperCase()}
              </span>
            </div>
            <Segment text={demo} defaultOpen compact />
          </div>
        </div>
      </section>

      <AdBanner className="py-6" />

      {/* How it works */}
      <section className="page pt-[clamp(40px,6vw,72px)] flex flex-col gap-7">
        <h2 className="font-story font-semibold text-h2">{t('home.benefitsTitle')}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-surface border border-border rounded-card p-7 flex flex-col gap-2.5">
              <span className="font-story text-[15px] font-semibold text-accent-ink">0{n}</span>
              <h3 className="font-story text-h3 font-semibold leading-[1.3]">{t(`home.benefit${n}Title`)}</h3>
              <p className="text-[15px] leading-relaxed text-muted text-pretty">{t(`home.benefit${n}Desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent stories */}
      <section className="page pt-[clamp(56px,7vw,96px)] flex flex-col gap-7">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
          <h2 className="font-story font-semibold text-h2">{t('home.recent')}</h2>
          <Link
            href="/stories"
            className="inline-flex items-center gap-1.5 min-h-touch font-semibold text-link underline decoration-accent decoration-2 underline-offset-[5px]"
          >
            {t('home.seeAll')} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-5">
          {latestStories.map((story) => (
            <StoryCard key={story.id} story={story} lang={learningLanguage} />
          ))}
        </div>
      </section>

      {/* Ready to start */}
      <section className="page py-[clamp(56px,7vw,96px)]">
        <div className="bg-surface-2 rounded-panel p-[clamp(28px,5vw,56px)] flex flex-wrap gap-x-12 gap-y-7 items-end justify-between">
          <div className="flex-[1_1_320px] min-w-0 flex flex-col gap-2.5">
            <h2 className="font-story font-semibold text-[clamp(28px,3.4vw,40px)] leading-[1.15]">{t('home.readyTitle')}</h2>
            <p className="leading-relaxed text-muted max-w-[30em]">{t('home.readySub')}</p>
          </div>
          <div className="flex-[1_1_480px] min-w-0 flex flex-wrap gap-3.5 items-end">
            <LanguageSelect
              kind="native"
              label={t('home.readySpeak')}
              variant="full"
              className="flex-[1_1_170px] font-semibold text-foreground"
              selectClassName="w-full min-h-[52px] rounded-translation bg-surface"
            />
            <LanguageSelect
              kind="learning"
              label={t('home.readyLearn')}
              variant="full"
              className="flex-[1_1_170px] font-semibold text-foreground"
              selectClassName="w-full min-h-[52px] rounded-translation bg-surface"
            />
            <Link href="/stories" className={`flex-[1_1_170px] min-h-[52px]! ${primaryButton}`}>
              {t('home.readyCta')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
