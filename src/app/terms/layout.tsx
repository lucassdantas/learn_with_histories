import { generateSEO } from '@/app/lib/seo';

// The page is a client component and can't export metadata, so it lives here.
export const metadata = generateSEO({
  title: 'Terms of Use | LearnWithHistories',
  description:
    'Terms of use for LearnWithHistories, including information about advertising and third-party services.',
  path: '/terms',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
