'use client';

import React, { useEffect, useRef } from 'react';
import { ADS_CONFIG } from '@/config/ads';

interface AdPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdPopup({ isOpen, onClose }: AdPopupProps) {
  const adRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !adRef.current) {
      try {
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
        adRef.current = true;
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background p-6 rounded-3xl shadow-xl max-w-md w-full relative border border-golden-amber/10">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-deep-blue/40 hover:text-golden-amber font-bold p-2 z-10 cursor-pointer"
        >
          ✕
        </button>
        <div className="text-center py-4">
          <p className="text-[10px] font-black text-deep-blue/40 uppercase tracking-widest mb-4">Sponsorship</p>

          <div className="w-full min-h-[250px] min-w-[250px] bg-background/50 flex items-center justify-center mb-6 overflow-hidden rounded-2xl border border-dashed border-golden-amber/20">
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: '250px', height: '250px' }}
              data-ad-client={ADS_CONFIG.publisherId}
              data-ad-slot={ADS_CONFIG.slots.popup}
            />
          </div>

          <button
            onClick={onClose}
            className="bg-deep-blue text-white px-8 py-3 rounded-full font-black hover:bg-deep-blue/90 transition shadow-md cursor-pointer active:scale-95"
          >
            Continue to Site
          </button>

          {ADS_CONFIG.isTest && (
            <div className="mt-4 text-[8px] text-gray-300">
              Test ID: {ADS_CONFIG.slots.popup}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
