'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/config/translations';
import ConsentSettingsButton from '@/components/ConsentSettingsButton';

export const CONTACT_EMAIL = 'contato@devdantas.com.br';

type Props = Readonly<{
  /** Translation prefix: keys are `${prefix}.title`, `${prefix}.updated`, `${prefix}.s{n}Title/Desc`, `${prefix}.contact`. */
  prefix: 'terms' | 'privacy';
  sectionCount: number;
  /** Extra content under a section, by 1-based section number. */
  extras?: Record<number, React.ReactNode>;
  /** id attributes for sections that are linked to (e.g. /privacy#consent). */
  anchors?: Record<number, string>;
}>;

// Terms of Use and Privacy Policy share this layout: numbered sections + contact card.
export default function LegalPage({ prefix, sectionCount, extras = {}, anchors = {} }: Props) {
  const { nativeLanguage } = useLanguage();
  const t = (key: string) => getTranslation(nativeLanguage, key);

  return (
    <article className="max-w-[800px] mx-auto w-full px-[clamp(20px,5vw,48px)] pt-[clamp(48px,7vw,96px)] pb-[clamp(56px,7vw,96px)]">
      <h1 className="font-story font-semibold text-[clamp(34px,4.2vw,50px)] leading-[1.12] tracking-[-0.01em]">{t(`${prefix}.title`)}</h1>
      <p className="mt-3 mb-10 text-sm text-muted">{t(`${prefix}.updated`)}</p>

      {Array.from({ length: sectionCount }, (_, i) => i + 1).map((n) => (
        <section
          key={n}
          id={anchors[n]}
          className="scroll-mt-24 grid grid-cols-[clamp(32px,4vw,48px)_minmax(0,1fr)] gap-x-3 gap-y-1 py-7 border-t border-border"
        >
          <span className="font-story font-semibold text-xl leading-[1.35] text-accent-ink">{n}.</span>
          <div className="flex flex-col gap-2.5 items-start">
            <h2 className="font-story font-semibold text-xl leading-[1.35]">{t(`${prefix}.s${n}Title`)}</h2>
            <p className="leading-[1.7] text-pretty">{t(`${prefix}.s${n}Desc`)}</p>
            {extras[n]}
          </div>
        </section>
      ))}

      <div className="mt-4 bg-surface border border-border rounded-card p-7 flex flex-col gap-2">
        <h2 className="font-story font-semibold text-xl">{t('common.contact')}</h2>
        <p className="leading-relaxed text-muted">{t(`${prefix}.contact`)}</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="self-start inline-flex items-center min-h-touch font-semibold text-link underline decoration-accent decoration-2 underline-offset-[5px] break-all"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </article>
  );
}

export function PrivacyPage() {
  const { nativeLanguage } = useLanguage();

  return (
    <LegalPage
      prefix="privacy"
      sectionCount={7}
      anchors={{ 7: 'consent' }}
      extras={{
        6: (
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-touch font-semibold text-link underline decoration-accent decoration-2 underline-offset-[5px]"
          >
            {getTranslation(nativeLanguage, 'privacy.adsSettings')}
          </a>
        ),
        7: (
          <ConsentSettingsButton className="mt-1.5 min-h-12 px-5.5 py-2.5 rounded-full border-[1.5px] border-border-strong bg-surface font-semibold text-[15px] text-left cursor-pointer hover:border-accent" />
        ),
      }}
    />
  );
}
