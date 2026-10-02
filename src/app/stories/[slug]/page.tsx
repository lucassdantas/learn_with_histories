import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllStories, getStoryBySlug, toSummary } from '@/lib/stories';
import { generateSEO, SITE_NAME, SITE_URL } from '@/app/lib/seo';
import JsonLd from '@/components/JsonLd';
import StoryReader from './StoryReader';

type Props = Readonly<{
  params: Promise<{ slug: string }>;
}>;

// Only the slugs that exist in src/data/stories are valid; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const stories = await getAllStories();
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return {};

  return generateSEO({
    title: `${story.title.en} – Read in English, Spanish, Portuguese & French`,
    description: `${story.description.en} Read it in English, Spanish, Portuguese or French and reveal the translation paragraph by paragraph.`,
    path: `/stories/${story.slug}`,
    type: 'article',
  });
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const allStories = await getAllStories();
  const story = allStories.find((s) => s.slug === slug);
  if (!story) notFound();

  // The next stories in the list (wrapping around), for internal links at the end of the page.
  const index = allStories.indexOf(story);
  const moreStories = [1, 2, 3]
    .map((offset) => allStories[(index + offset) % allStories.length])
    .filter((s) => s.slug !== story.slug)
    .map((s) => toSummary(s));

  const url = `${SITE_URL}/stories/${story.slug}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: story.title.en,
      alternativeHeadline: Object.values(story.title).filter((t) => t !== story.title.en),
      description: story.description.en,
      url,
      mainEntityOfPage: url,
      inLanguage: Object.keys(story.title),
      isAccessibleForFree: true,
      learningResourceType: 'Short story',
      author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Stories', item: `${SITE_URL}/stories` },
        { '@type': 'ListItem', position: 3, name: story.title.en, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <StoryReader story={story} moreStories={moreStories} />
    </>
  );
}
