import { getAllStories, toSummary } from '@/lib/stories';
import { generateSEO } from '@/app/lib/seo';
import StoriesList from './StoriesList';

export const metadata = generateSEO({
  title: 'Stories | LearnWithHistories',
  description:
    'Browse short stories written in English, Spanish, Portuguese and French. Read in the language you are learning and reveal the translation paragraph by paragraph.',
  path: '/stories',
});

export default async function StoriesPage() {
  const stories = await getAllStories();
  return <StoriesList stories={stories.map((s) => toSummary(s))} />;
}
