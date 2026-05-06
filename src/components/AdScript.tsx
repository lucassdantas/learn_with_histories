import Script from 'next/script';
import { ADS_CONFIG } from '@/config/ads';

export default function AdScript() {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CONFIG.publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
