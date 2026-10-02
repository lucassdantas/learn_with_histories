'use client';

import { useLanguage } from '@/context/LanguageContext';
import { languageOptions } from '@/config/translations';

type Props = Readonly<{
  kind: 'native' | 'learning';
  label: string;
  /** compact: header (PT/EN/FR, label beside). full: menu/home (full names, label above). */
  variant: 'compact' | 'full';
  className?: string;
  selectClassName?: string;
}>;

// Native <select>: accessible and keyboard-friendly for free.
export default function LanguageSelect({ kind, label, variant, className = '', selectClassName = '' }: Props) {
  const { nativeLanguage, learningLanguage, setNativeLanguage, setLearningLanguage } = useLanguage();
  const value = kind === 'native' ? nativeLanguage : learningLanguage;
  const onChange = kind === 'native' ? setNativeLanguage : setLearningLanguage;
  const compact = variant === 'compact';

  return (
    <label
      className={
        compact
          ? `flex items-center gap-2 text-[13px] text-muted whitespace-nowrap ${className}`
          : `flex flex-col gap-1.5 text-sm text-muted ${className}`
      }
    >
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`select-arrow border border-border-strong rounded-control text-foreground font-semibold ${
          compact ? 'min-h-touch pl-3 pr-8 text-sm bg-surface' : 'min-h-12 pl-3.5 pr-9 text-base'
        } ${selectClassName}`}
      >
        {languageOptions.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {compact ? lang.short : lang.name}
          </option>
        ))}
      </select>
    </label>
  );
}
