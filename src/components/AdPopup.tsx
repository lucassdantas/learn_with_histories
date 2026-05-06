'use client';

import React, { useEffect } from 'react';
import { ADS_CONFIG } from '@/config/ads';

interface AdPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdPopup({ isOpen, onClose }: AdPopupProps) {
  useEffect(() => {
    if (isOpen) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black font-bold p-2 z-10"
        >
          ✕
        </button>
        <div className="text-center py-4">
          <p className="text-xs text-gray-400 uppercase mb-4">Sponsorship</p>

          <div className="w-full min-h-[250px] bg-gray-50 flex items-center justify-center mb-6 overflow-hidden">
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: '100%', minWidth: '250px', height: '250px' }}
              data-ad-client={ADS_CONFIG.publisherId}
              data-ad-slot={ADS_CONFIG.slots.popup}
            />
          </div>

          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-md"
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
