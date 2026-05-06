import React from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>

        <div className="prose prose-blue max-w-none space-y-6 text-gray-600">
          <p>
            Welcome to LinguaStories. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">1. Information We Collect</h2>
          <p>
            We do not require user authentication. However, we may store your language preferences (native and learning languages) locally on your device using browser technology like LocalStorage to improve your experience.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">2. Cookies and Advertisements</h2>
          <p>
            We use Google AdSense to display advertisements on our site. Google uses cookies to serve ads based on your previous visits to our website or other websites.
          </p>
          <p>
            Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet.
          </p>
          <p>
            You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Ads Settings</a>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">3. Data Treatment</h2>
          <p>
            We do not sell or share any personal data with third parties. Any data processed by our advertising partners is subject to their own privacy policies.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">4. Third-Party Links</h2>
          <p>
            Our site may contain links to other websites. We are not responsible for the privacy practices or content of these third-party sites.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">5. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our official channels.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link href="/" className="text-blue-600 font-bold hover:underline">
            ← Back to Home
          </Link>
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-100 py-12 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} LinguaStories. All rights reserved.
      </footer>
    </div>
  );
}
