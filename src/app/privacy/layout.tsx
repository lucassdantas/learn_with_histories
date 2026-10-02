import { generateSEO } from '@/app/lib/seo';

// The page is a client component and can't export metadata, so it lives here.
export const metadata = generateSEO({
  title: 'Privacy Policy | LearnWithHistories',
  description:
    'How LearnWithHistories handles your data, cookies and advertising (Google AdSense).',
  path: '/privacy',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
