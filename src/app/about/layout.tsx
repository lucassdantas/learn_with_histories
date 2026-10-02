import { generateSEO } from '@/app/lib/seo';

// The page is a client component and can't export metadata, so it lives here.
export const metadata = generateSEO({
  title: 'About | LearnWithHistories',
  description:
    'Why reading stories is a natural way to learn a language, and how LearnWithHistories works.',
  path: '/about',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
