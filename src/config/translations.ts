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

export const languageNames: Record<string, Record<string, string>> = {
  pt: { pt: 'Português', en: 'English', fr: 'Français' },
  en: { pt: 'Portuguese', en: 'English', fr: 'French' },
  fr: { pt: 'Portugais', en: 'Anglais', fr: 'Français' },
};
