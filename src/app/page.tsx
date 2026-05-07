'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import AdBanner from '@/components/AdBanner';
import Link from 'next/link';
import { getTranslation, languageNames } from '@/config/translations';

export default function Home() {
  const { nativeLanguage, setNativeLanguage, learningLanguage, setLearningLanguage } = useLanguage();
  const router = useRouter();

  const languages = [
    { code: 'pt', name: 'Português' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
  ];

  const handleStart = () => {
    router.push('/stories');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-8 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-950">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl font-black tracking-tight sm:text-7xl text-blue-600 dark:text-blue-500 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {getTranslation(nativeLanguage, 'home.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              {getTranslation(nativeLanguage, 'home.subtitle')}
            </p>
            <div className="pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <a
                href="#get-started"
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-xl shadow-blue-200 dark:shadow-none inline-block cursor-pointer"
              >
                {getTranslation(nativeLanguage, 'home.cta')}
              </a>
            </div>
          </div>
        </section>

        <AdBanner />

        {/* Features Section */}
        <section className="py-20 px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 text-center p-6 rounded-3xl bg-gray-50 dark:bg-gray-900 transition-colors">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mx-auto font-bold text-xl">1</div>
              <h3 className="text-xl font-bold">{getTranslation(nativeLanguage, 'home.feature1Title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{getTranslation(nativeLanguage, 'home.feature1Desc')}</p>
            </div>
            <div className="space-y-4 text-center p-6 rounded-3xl bg-gray-50 dark:bg-gray-900 transition-colors">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mx-auto font-bold text-xl">2</div>
              <h3 className="text-xl font-bold">{getTranslation(nativeLanguage, 'home.feature2Title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{getTranslation(nativeLanguage, 'home.feature2Desc')}</p>
            </div>
            <div className="space-y-4 text-center p-6 rounded-3xl bg-gray-50 dark:bg-gray-900 transition-colors">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mx-auto font-bold text-xl">3</div>
              <h3 className="text-xl font-bold">{getTranslation(nativeLanguage, 'home.feature3Title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{getTranslation(nativeLanguage, 'home.feature3Desc')}</p>
            </div>
          </div>
        </section>

        {/* Language Selection Section */}
        <section id="get-started" className="py-24 px-8 border-t border-gray-100 dark:border-gray-800 transition-colors">
          <div className="max-w-md mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold">{getTranslation(nativeLanguage, 'home.readyToDive')}</h2>
            <div className="space-y-6 bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-2xl dark:shadow-none border border-gray-50 dark:border-gray-800 transition-colors">
              <div className="space-y-3 text-left">
                <label className="block text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  {getTranslation(nativeLanguage, 'home.iSpeak')}
                </label>
                <select
                  value={nativeLanguage}
                  onChange={(e) => setNativeLanguage(e.target.value)}
                  className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold transition cursor-pointer text-gray-900 dark:text-gray-100"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 text-left">
                <label className="block text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  {getTranslation(nativeLanguage, 'home.iWantToLearn')}
                </label>
                <select
                  value={learningLanguage}
                  onChange={(e) => setLearningLanguage(e.target.value)}
                  className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold transition cursor-pointer text-gray-900 dark:text-gray-100"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleStart}
                className="w-full bg-blue-600 text-white font-bold py-5 px-6 rounded-2xl hover:bg-blue-700 active:scale-95 transition transform shadow-lg shadow-blue-100 dark:shadow-none cursor-pointer"
              >
                {getTranslation(nativeLanguage, 'home.startReading')}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-16 px-8 mt-20 transition-colors">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 text-center">
          <div className="text-2xl font-black tracking-tighter">LinguaStories</div>
          <nav className="flex gap-8 text-sm font-medium text-gray-400">
            <Link href="/stories" className="hover:text-white transition cursor-pointer">
              {getTranslation(nativeLanguage, 'nav.stories')}
            </Link>
            <Link href="/about" className="hover:text-white transition cursor-pointer">
              {getTranslation(nativeLanguage, 'nav.about')}
            </Link>
            <Link href="/terms" className="hover:text-white transition cursor-pointer">
              {getTranslation(nativeLanguage, 'nav.terms')}
            </Link>
          </nav>
          <div className="text-gray-600 text-xs italic">
            © {new Date().getFullYear()} LinguaStories. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
