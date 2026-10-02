import homeEn from '../translations/home/en.json';
import homePt from '../translations/home/pt.json';
import homeFr from '../translations/home/fr.json';
import commonEn from '../translations/common/en.json';
import commonPt from '../translations/common/pt.json';
import commonFr from '../translations/common/fr.json';
import aboutEn from '../translations/about/en.json';
import aboutPt from '../translations/about/pt.json';
import aboutFr from '../translations/about/fr.json';
import storiesEn from '../translations/stories/en.json';
import storiesPt from '../translations/stories/pt.json';
import storiesFr from '../translations/stories/fr.json';
import termsEn from '../translations/terms/en.json';
import termsPt from '../translations/terms/pt.json';
import termsFr from '../translations/terms/fr.json';
import privacyEn from '../translations/privacy/en.json';
import privacyPt from '../translations/privacy/pt.json';
import privacyFr from '../translations/privacy/fr.json';
import homeEs from '../translations/home/es.json';
import commonEs from '../translations/common/es.json';
import aboutEs from '../translations/about/es.json';
import storiesEs from '../translations/stories/es.json';
import termsEs from '../translations/terms/es.json';
import privacyEs from '../translations/privacy/es.json';

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

export const translations: Translations = {
  pt: {
    ...commonPt,
    ...homePt,
    ...aboutPt,
    ...storiesPt,
    ...termsPt,
    ...privacyPt,
  },
  en: {
    ...commonEn,
    ...homeEn,
    ...aboutEn,
    ...storiesEn,
    ...termsEn,
    ...privacyEn,
  },
  fr: {
    ...commonFr,
    ...homeFr,
    ...aboutFr,
    ...storiesFr,
    ...termsFr,
    ...privacyFr,
  },
  es: {
    ...commonEs,
    ...homeEs,
    ...aboutEs,
    ...storiesEs,
    ...termsEs,
    ...privacyEs,
  },
};

export function getTranslation(lang: string, key: string, params?: Record<string, string>): string {
  const langTranslations = translations[lang] || translations['en'];
  let text = langTranslations[key] || key;

  if (params) {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      text = text.replace(`{${paramKey}}`, paramValue);
    });
  }

  return text;
}

// Language names as used inside a sentence, written in the UI language ("Lendo em inglês…").
export const languageNames: Record<string, Record<string, string>> = {
  pt: { pt: 'português', en: 'inglês', fr: 'francês', es: 'espanhol' },
  en: { pt: 'Portuguese', en: 'English', fr: 'French', es: 'Spanish' },
  fr: { pt: 'portugais', en: 'anglais', fr: 'français', es: 'espagnol' },
  es: { pt: 'portugués', en: 'inglés', fr: 'francés', es: 'español' },
};

// Endonyms for the language selects (never translated) and short codes.
export const languageOptions = [
  { code: 'pt', name: 'Português', short: 'PT' },
  { code: 'en', name: 'English', short: 'EN' },
  { code: 'fr', name: 'Français', short: 'FR' },
  { code: 'es', name: 'Español', short: 'ES' },
];
