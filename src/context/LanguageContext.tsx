'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageContextType = {
  nativeLanguage: string;
  learningLanguage: string;
  setNativeLanguage: (lang: string) => void;
  setLearningLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [nativeLanguage, setNativeLanguage] = useState('pt');
  const [learningLanguage, setLearningLanguage] = useState('en');

  // Load from localStorage on mount
  useEffect(() => {
    const savedNative = localStorage.getItem('nativeLanguage');
    const savedLearning = localStorage.getItem('learningLanguage');
    if (savedNative) setNativeLanguage(savedNative);
    if (savedLearning) setLearningLanguage(savedLearning);
  }, []);

  // Save to localStorage when changed
  const updateNativeLanguage = (lang: string) => {
    setNativeLanguage(lang);
    localStorage.setItem('nativeLanguage', lang);
  };

  const updateLearningLanguage = (lang: string) => {
    setLearningLanguage(lang);
    localStorage.setItem('learningLanguage', lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        nativeLanguage,
        learningLanguage,
        setNativeLanguage: updateNativeLanguage,
        setLearningLanguage: updateLearningLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
