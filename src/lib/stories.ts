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
  return allStoriesData;
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const stories = await getAllStories();
  return stories.find((story) => story.slug === slug) || null;
}
