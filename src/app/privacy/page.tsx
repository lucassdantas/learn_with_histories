'use client';

import React from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/config/translations';
import AdBanner from '@/components/AdBanner';

export default function PrivacyPolicy() {
  const { nativeLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-8 py-16 w-full">
        <h1 className="text-5xl font-black mb-4 text-blue-600 dark:text-blue-500">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          Your privacy is important to us. Learn how we handle your data.
        </p>

        <AdBanner />

        <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mt-10 mb-4">
              1. Information We Collect
            </h2>
            <p className="leading-relaxed text-justify">
              We do not require user authentication. However, we may store your language preferences (native and learning languages) 
              locally on your device using browser technology like LocalStorage to improve your experience. This information is stored 
              only on your device and is never sent to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mt-10 mb-4">
              2. Cookies and Advertisements
            </h2>
            <p className="leading-relaxed text-justify">
              We use Google AdSense to display advertisements on our site. Google uses cookies to serve ads based on your previous 
              visits to our website or other websites.
            </p>
            <p className="leading-relaxed text-justify">
              Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites 
              and/or other sites on the Internet.
            </p>
            <p className="leading-relaxed text-justify">
              You may opt out of personalized advertising by visiting{' '}
              <a 
                href="https://www.google.com/settings/ads" 
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mt-10 mb-4">
              3. Data Treatment
            </h2>
            <p className="leading-relaxed text-justify">
              We do not sell or share any personal data with third parties beyond what is necessary for providing our service. 
              Any data processed by our advertising partners is subject to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mt-10 mb-4">
              4. Third-Party Links
            </h2>
            <p className="leading-relaxed text-justify">
              Our site may contain links to other websites. We are not responsible for the privacy practices or content of 
              these third-party sites. We encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mt-10 mb-4">
              5. Changes to This Policy
            </h2>
            <p className="leading-relaxed text-justify">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page. Your continued use of the service constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mt-10 mb-4">
              6. Your Rights
            </h2>
            <p className="leading-relaxed text-justify">
              You have the right to access, update, or delete your local preferences. Since we don't store user data on our servers, 
              you can clear your preferences by clearing your browser's LocalStorage for this website.
            </p>
          </section>

          <section className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl mt-12">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-4">
              7. Contact Us
            </h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us through our official channels.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
          <Link href="/" className="text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-2">
            ← {getTranslation(nativeLanguage, 'common.back')} to Home
          </Link>
        </div>
      </main>

      <footer className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 py-12 text-center text-gray-400 dark:text-gray-500 text-xs transition-colors">
        © {new Date().getFullYear()} LinguaStories. All rights reserved.
      </footer>
    </div>
  );
}
