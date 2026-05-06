'use client';

import React, { useEffect } from 'react';
import { ADS_CONFIG } from '@/config/ads';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className="w-full bg-gray-50 flex flex-col items-center justify-center my-4 p-2 overflow-hidden min-h-[100px]">
      <span className="text-[10px] text-gray-400 uppercase mb-1">Advertisement</span>
      <div className="w-full flex justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADS_CONFIG.publisherId}
          data-ad-slot={ADS_CONFIG.slots.banner}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
      {ADS_CONFIG.isTest && (
        <div className="mt-1 text-[8px] text-gray-300">
          Test ID: {ADS_CONFIG.slots.banner}
        </div>
      )}
    </div>
  );
}
