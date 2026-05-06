'use client';

import React from 'react';

interface AdPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdPopup({ isOpen, onClose }: AdPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black font-bold p-2"
        >
          ✕
        </button>
        <div className="text-center py-8">
          <p className="text-xs text-gray-500 uppercase mb-2">Sponsorship</p>
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center border border-gray-300 mb-4">
            <div className="text-center">
              <div className="font-bold text-gray-700">Test Ad Popup</div>
              <p className="text-[10px] text-gray-400">ID: ca-pub-3940256099942544/1033173712</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Continue to Site
          </button>
        </div>
      </div>
    </div>
  );
}
