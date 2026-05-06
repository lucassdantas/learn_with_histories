import { Story } from './stories';

export async function getStoriesApi(): Promise<Story[]> {
  const response = await fetch('/api/stories');
  if (!response.ok) {
    throw new Error('Failed to fetch stories');
  }
  return response.json();
}

export async function getStoryBySlugApi(slug: string): Promise<Story | null> {
  const response = await fetch(`/api/stories/${slug}`);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error('Failed to fetch story');
  }
  return response.json();
}
