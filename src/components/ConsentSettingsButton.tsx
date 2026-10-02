'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/config/translations';

declare global {
  interface Window {
    // Google's consent tool (CMP). Loaded by adsbygoogle.js once the GDPR message is
    // published in AdSense → Privacy & messaging, and only for visitors where it applies.
    googlefc?: {
      callbackQueue?: unknown[];
      showRevocationMessage?: () => void;
    };
  }
}

// Lets visitors reopen Google's consent message to change their choice (GDPR requires this).
// When the CMP isn't loaded (e.g. visitor outside Europe), it falls back to the privacy page.
export default function ConsentSettingsButton({ className }: Readonly<{ className?: string }>) {
  const { nativeLanguage } = useLanguage();
  const router = useRouter();

  const openSettings = () => {
    const fc = window.googlefc;
    if (fc?.showRevocationMessage) {
      fc.callbackQueue = fc.callbackQueue || [];
      fc.callbackQueue.push(fc.showRevocationMessage);
    } else {
      router.push('/privacy#consent');
    }
  };

  return (
    <button type="button" onClick={openSettings} className={className}>
      {getTranslation(nativeLanguage, 'common.cookieSettings')}
    </button>
  );
}
