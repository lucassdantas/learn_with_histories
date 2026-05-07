'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import AdBanner from '@/components/AdBanner';
import Link from 'next/link';
import { getTranslation } from '@/config/translations';

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
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 sm:py-20 px-6 sm:px-8 bg-gradient-to-b from-golden-amber/5 to-background">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <h1 className="text-4xl xs:text-5xl sm:text-7xl font-black tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 leading-tight">
              {getTranslation(nativeLanguage, 'home.title')}
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 font-medium">
              {getTranslation(nativeLanguage, 'home.subtitle')}
            </p>
            <div className="pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <a
                href="#get-started"
                className="bg-golden-amber text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-lg hover:bg-golden-amber/90 transition shadow-xl shadow-golden-amber/20 inline-block cursor-pointer active:scale-95"
              >
                {getTranslation(nativeLanguage, 'home.cta')}
              </a>
            </div>
          </div>
        </section>

        <AdBanner />

        {/* Features Section */}
        <section className="py-12 sm:py-20 px-6 sm:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-12">
            {[1, 2, 3].map((num) => (
              <div key={num} className="space-y-4 text-center p-6 sm:p-8 rounded-3xl bg-card border border-border-theme transition-all hover:shadow-lg hover:shadow-golden-amber/5">
                <div className="w-12 h-12 bg-golden-amber/10 text-golden-amber rounded-xl flex items-center justify-center mx-auto font-black text-xl">{num}</div>
                <h3 className="text-xl font-black text-foreground">{getTranslation(nativeLanguage, `home.feature${num}Title`)}</h3>
                <p className="text-foreground/60 text-sm font-bold leading-relaxed">{getTranslation(nativeLanguage, `home.feature${num}Desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Language Selection Section */}
        <section id="get-started" className="py-16 sm:py-24 px-6 sm:px-8 border-t border-border-theme transition-colors">
          <div className="max-w-md mx-auto text-center space-y-8">
            <h2 className="text-3xl font-black text-foreground">{getTranslation(nativeLanguage, 'home.readyToDive')}</h2>
            <div className="space-y-6 bg-card p-6 sm:p-10 rounded-3xl shadow-2xl shadow-golden-amber/5 border border-border-theme transition-colors">
              <div className="space-y-3 text-left">
                <label className="block text-[10px] font-black text-foreground/40 uppercase tracking-widest ml-1">
                  {getTranslation(nativeLanguage, 'home.iSpeak')}
                </label>
                <select
                  value={nativeLanguage}
                  onChange={(e) => setNativeLanguage(e.target.value)}
                  className="w-full p-4 bg-background border border-border-theme rounded-2xl focus:ring-2 focus:ring-golden-amber focus:outline-none font-bold transition cursor-pointer text-foreground appearance-none"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-background">
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 text-left">
                <label className="block text-[10px] font-black text-foreground/40 uppercase tracking-widest ml-1">
                  {getTranslation(nativeLanguage, 'home.iWantToLearn')}
                </label>
                <select
                  value={learningLanguage}
                  onChange={(e) => setLearningLanguage(e.target.value)}
                  className="w-full p-4 bg-background border border-border-theme rounded-2xl focus:ring-2 focus:ring-golden-amber focus:outline-none font-bold transition cursor-pointer text-foreground appearance-none"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-background">
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleStart}
                className="w-full bg-foreground text-background font-black py-4 sm:py-5 px-6 rounded-2xl hover:opacity-90 active:scale-95 transition transform shadow-lg shadow-foreground/20 cursor-pointer text-lg"
              >
                {getTranslation(nativeLanguage, 'home.startReading')}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-12 sm:py-16 px-6 sm:px-8 mt-12 sm:mt-20 transition-colors">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 text-center">
          <div className="text-2xl font-black tracking-tighter">LearnWithHistories</div>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold opacity-60">
            <Link href="/stories" className="hover:text-golden-amber transition cursor-pointer">
              {getTranslation(nativeLanguage, 'nav.stories')}
            </Link>
            <Link href="/about" className="hover:text-golden-amber transition cursor-pointer">
              {getTranslation(nativeLanguage, 'nav.about')}
            </Link>
            <Link href="/terms" className="hover:text-golden-amber transition cursor-pointer">
              {getTranslation(nativeLanguage, 'nav.terms')}
            </Link>
          </nav>
          <div className="opacity-40 text-[10px] italic font-bold tracking-widest uppercase">
            © {new Date().getFullYear()} LearnWithHistories. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
