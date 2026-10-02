export interface StoryParagraph {
  id: string;
  text: Record<string, string>; // language code -> text
}

export interface Story {
  id: string;
  slug: string;
  title: Record<string, string>;
  description: Record<string, string>;
  content: StoryParagraph[];
}

// What lists and links need — keeps the full text out of the client payload.
export type StorySummary = Pick<Story, 'id' | 'slug' | 'title' | 'description'>;

export function toSummary({ id, slug, title, description }: Story): StorySummary {
  return { id, slug, title, description };
}

import fs from 'fs';
import path from 'path';

const storiesDirectory = path.join(process.cwd(), 'src/data/stories');

export async function getAllStories(): Promise<Story[]> {
  if (!fs.existsSync(storiesDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(storiesDirectory);
  const allStoriesData = fileNames
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => {
      const filePath = path.join(storiesDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents) as Story;
    });
  // Newest first (highest id).
  return allStoriesData.sort((a, b) => Number(b.id) - Number(a.id));
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const stories = await getAllStories();
  return stories.find((story) => story.slug === slug) || null;
}
