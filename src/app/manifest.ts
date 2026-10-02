import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LearnWithHistories',
    short_name: 'LearnWithHistories',
    description: 'Learn languages by reading short stories with paragraph-by-paragraph translations.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F4EBDD',
    theme_color: '#1D3D5A',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
