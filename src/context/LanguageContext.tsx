'use client';

import React, { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';

export const LANGUAGES = ['pt', 'en', 'fr'] as const;

const NATIVE_KEY = 'nativeLanguage';
const LEARNING_KEY = 'learningLanguage';
// Server render (and first client render) always uses these; the saved choice applies right after.
const DEFAULT_NATIVE = 'pt';
const DEFAULT_LEARNING = 'en';

type LanguageContextType = {
  nativeLanguage: string;
  learningLanguage: string;
  setNativeLanguage: (lang: string) => void;
  setLearningLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener('storage', onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onChange);
  };
}

function read(key: string, fallback: string) {
  try {
    const value = localStorage.getItem(key);
    return value && (LANGUAGES as readonly string[]).includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function write(native: string, learning: string) {
  try {
    localStorage.setItem(NATIVE_KEY, native);
    localStorage.setItem(LEARNING_KEY, learning);
  } catch {
    // Storage blocked: the choice just won't persist.
  }
  listeners.forEach((notify) => notify());
}

export function LanguageProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const nativeLanguage = useSyncExternalStore(subscribe, () => read(NATIVE_KEY, DEFAULT_NATIVE), () => DEFAULT_NATIVE);
  const learningLanguage = useSyncExternalStore(subscribe, () => read(LEARNING_KEY, DEFAULT_LEARNING), () => DEFAULT_LEARNING);

  // The UI is written in the native language.
  useEffect(() => {
    document.documentElement.lang = nativeLanguage;
  }, [nativeLanguage]);

  // The two languages are never equal: picking the other one's value swaps them.
  const value = useMemo(
    () => ({
      nativeLanguage,
      learningLanguage,
      setNativeLanguage: (lang: string) =>
        write(lang, lang === learningLanguage ? nativeLanguage : learningLanguage),
      setLearningLanguage: (lang: string) =>
        write(lang === nativeLanguage ? learningLanguage : nativeLanguage, lang),
    }),
    [nativeLanguage, learningLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
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
