import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/app/lib/seo';
import { getAllStories } from '@/lib/stories';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stories = await getAllStories();

  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/stories`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const storyPages: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${SITE_URL}/stories/${story.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...pages, ...storyPages];
}
