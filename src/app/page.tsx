'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';

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
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-white text-gray-900">
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-blue-600">
          LinguaStories
        </h1>
        <p className="text-lg text-gray-600">
          Learn a new language through immersive stories with interactive translations.
        </p>

        <div className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="space-y-2 text-left">
            <label className="block text-sm font-medium text-gray-700">I speak:</label>
            <select
              value={nativeLanguage}
              onChange={(e) => setNativeLanguage(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 text-left">
            <label className="block text-sm font-medium text-gray-700">I want to learn:</label>
            <select
              value={learningLanguage}
              onChange={(e) => setLearningLanguage(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
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
            className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-blue-700 active:scale-95 transition transform"
          >
            Start Reading
          </button>
        </div>

        <p className="text-sm text-gray-400">
          No sign up required. Just pick your languages and go!
        </p>
      </div>
    </main>
  );
}
