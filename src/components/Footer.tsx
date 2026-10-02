'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/config/translations';
import { LogoMark, Wordmark } from '@/components/Logo';
import ConsentSettingsButton from '@/components/ConsentSettingsButton';

const LINKS = [
  { href: '/', label: 'nav.home' },
  { href: '/stories', label: 'nav.stories' },
  { href: '/about', label: 'nav.about' },
  { href: '/terms', label: 'nav.terms' },
  { href: '/privacy', label: 'nav.privacy' },
];

const linkClass =
  'inline-flex items-center min-h-touch text-sm text-foreground hover:underline decoration-accent underline-offset-4 cursor-pointer';

export default function Footer() {
  const { nativeLanguage } = useLanguage();
  const t = (key: string) => getTranslation(nativeLanguage, key);

  return (
    <footer className="mt-auto border-t border-border bg-surface-2">
      <div className="page pt-12 pb-7 flex flex-col gap-8">
        <div className="flex flex-wrap gap-x-12 gap-y-6 justify-between items-start">
          <div className="flex flex-col gap-2.5 flex-[1_1_240px]">
            <div className="flex items-center gap-2.5">
              <LogoMark size={36} />
              <Wordmark className="text-lg" />
            </div>
            <p className="text-sm text-muted max-w-[22em]">{t('footer.tagline')}</p>
          </div>
          <nav aria-label="Footer" className="flex-[2_1_420px] flex flex-wrap gap-x-6 justify-end">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {t(link.label)}
              </Link>
            ))}
            <ConsentSettingsButton className={`${linkClass} text-left`} />
          </nav>
        </div>
        <div className="pt-5 border-t border-border text-eyebrow text-muted">
          © {new Date().getFullYear()} LearnWithHistories. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
