'use client';

import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import { ADS_CONFIG } from '@/config/ads';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/config/translations';
import { pushAd } from '@/lib/ads';

// 300×600 ad for the reader sidebar. Only rendered from the `nav` breakpoint (1000px) up, because
// pushing an ad slot that is hidden with display:none makes AdSense throw "availableWidth=0".
const DESKTOP_QUERY = '(min-width: 1000px)';

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

export default function AdSidebar() {
  const { nativeLanguage } = useLanguage();
  const isDesktop = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false
  );
  const adRef = useRef<boolean>(false);
  const label = getTranslation(nativeLanguage, 'common.ad');

  useEffect(() => {
    if (isDesktop && !adRef.current) adRef.current = pushAd();
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <aside aria-label={label} className="flex flex-col items-center gap-2">
      <span className="text-ad-label font-bold tracking-[0.14em] uppercase text-ad-ink">{label}</span>
      <div className="w-[300px] h-[600px] rounded-ad bg-ad overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: 'inline-block', width: '300px', height: '600px' }}
          data-ad-client={ADS_CONFIG.publisherId}
          data-ad-slot={ADS_CONFIG.slots.sidebar}
        />
      </div>
    </aside>
  );
}
