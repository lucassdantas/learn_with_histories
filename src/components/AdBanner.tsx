'use client';

import React, { useEffect, useRef } from 'react';
import { ADS_CONFIG } from '@/config/ads';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/config/translations';
import { pushAd } from '@/lib/ads';

// Responsive banner in its own band. Height is reserved up front (100px → 120px) to avoid
// layout shift (CLS); styled unlike a story card (no border/shadow, 4px radius) per AdSense rules.
export default function AdBanner({ className = '' }: Readonly<{ className?: string }>) {
  const { nativeLanguage } = useLanguage();
  const adRef = useRef<boolean>(false);
  const label = getTranslation(nativeLanguage, 'common.ad');

  const enabled = Boolean(ADS_CONFIG.slots.banner);

  useEffect(() => {
    if (enabled && !adRef.current) adRef.current = pushAd();
  }, [enabled]);

  // No ad unit configured yet: render nothing instead of an empty "Advertisement" band.
  if (!enabled) return null;

  return (
    <div className={`page ${className}`}>
      <aside aria-label={label} className="flex flex-col items-center gap-2">
        <span className="text-ad-label font-bold tracking-[0.14em] uppercase text-ad-ink">{label}</span>
        <div className="w-full max-w-[970px] min-h-[100px] nav:min-h-[120px] rounded-ad bg-ad overflow-hidden">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client={ADS_CONFIG.publisherId}
            data-ad-slot={ADS_CONFIG.slots.banner}
            data-ad-format="horizontal"
            data-full-width-responsive="false"
          />
        </div>
      </aside>
    </div>
  );
}
