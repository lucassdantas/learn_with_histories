import Link from 'next/link';
import type { StorySummary } from '@/lib/stories';

type Props = Readonly<{
  story: StorySummary;
  /** Language the title/description are shown in (the one being learned). */
  lang: string;
  /** Heading level: h2 on the stories page, h3 inside sections. */
  as?: 'h2' | 'h3';
  /** Optional footer, e.g. "Começar a ler →" on the stories page. */
  cta?: string;
}>;

// Whole card is the link. Circle mark echoes the logo.
export default function StoryCard({ story, lang, as: Heading = 'h3', cta }: Props) {
  const title = story.title[lang] || story.title.en;
  const description = story.description[lang] || story.description.en;

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group flex flex-col gap-2.5 p-6 bg-surface border border-border rounded-card shadow-card text-foreground transition-[transform,border-color] duration-150 hover:-translate-y-0.5 hover:border-accent"
    >
      <span aria-hidden="true" className="size-3 rounded-full border-2 border-accent" />
      <Heading lang={lang} className="font-story text-h3 font-semibold">
        {title}
      </Heading>
      <p lang={lang} className="text-[15px] leading-[1.55] text-muted text-pretty">
        {description}
      </p>
      {cta && (
        <span className="mt-auto pt-2.5 flex items-center gap-1.5 text-[15px] font-semibold text-link">
          {cta} <span aria-hidden="true">→</span>
        </span>
      )}
    </Link>
  );
}
