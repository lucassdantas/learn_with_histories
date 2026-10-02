import { getAllStories, toSummary } from '@/lib/stories';
import HomePage from './HomePage';

// Metadata for "/" lives in app/layout.tsx.
export default async function Page() {
  const stories = await getAllStories();

  // Segment used in the hero's interactive example.
  const demoStory = stories.find((s) => s.slug === 'grandmas-recipe') ?? stories[0];
  const demo = demoStory.content[1] ?? demoStory.content[0];

  return <HomePage latestStories={stories.slice(0, 6).map((s) => toSummary(s))} demo={demo.text} />;
}
