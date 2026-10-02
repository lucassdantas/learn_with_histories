'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/config/translations';

type Props = Readonly<{
  /** The same passage in each language (language code → text). */
  text: Record<string, string>;
  defaultOpen?: boolean;
  /** Slightly smaller type, for the home page example. */
  compact?: boolean;
}>;

// One reading segment: text in the learning language + a 44px "+" button that reveals the
// translation in the native language right below. Opening only pushes content below it.
export default function Segment({ text, defaultOpen = false, compact = false }: Props) {
  const { nativeLanguage, learningLanguage } = useLanguage();
  const [open, setOpen] = useState(defaultOpen);
  const t = (key: string) => getTranslation(nativeLanguage, key);

  const original = text[learningLanguage];
  const translation = text[nativeLanguage];
  const label = open ? t('reader.hide') : t('reader.show');

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_44px] gap-x-[clamp(14px,2.4vw,28px)] gap-y-3 items-start">
      <p
        lang={learningLanguage}
        className={`font-story text-pretty whitespace-pre-line ${
          compact ? 'text-[clamp(19px,1.8vw,21px)] leading-[1.65]' : 'text-story'
        }`}
      >
        {original || <span className="italic text-muted">{t('reader.textNotAvailable')}</span>}
      </p>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={label}
        title={label}
        className={`mt-0.5 relative size-touch rounded-full border-[1.5px] border-accent text-foreground flex items-center justify-center cursor-pointer transition-colors duration-150 hover:bg-accent-soft ${
          open ? 'bg-accent-soft' : 'bg-transparent'
        }`}
      >
        <span aria-hidden="true" className="absolute w-3.5 h-0.5 rounded bg-current" />
        {!open && <span aria-hidden="true" className="absolute w-0.5 h-3.5 rounded bg-current" />}
      </button>

      {open && (
        <div
          lang={nativeLanguage}
          className={`col-start-1 bg-translation-soft text-translation rounded-translation flex flex-col gap-1 text-pretty whitespace-pre-line ${
            compact ? 'px-4 py-3 text-[15px] leading-relaxed' : 'px-4.5 py-3.5 text-tr'
          }`}
        >
          <span className="text-[11px] font-bold tracking-widest">{nativeLanguage.toUpperCase()}</span>
          {translation || <span className="italic">{t('reader.translationNotAvailable')}</span>}
        </div>
      )}
    </div>
  );
}
