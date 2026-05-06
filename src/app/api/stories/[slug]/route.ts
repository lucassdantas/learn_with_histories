import { NextRequest, NextResponse } from 'next/server';
import { getStoryBySlug } from '@/lib/stories';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const story = await getStoryBySlug(slug);

    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    return NextResponse.json(story);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch story' }, { status: 500 });
  }
}
