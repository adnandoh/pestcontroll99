'use client';

import { useEffect } from 'react';
import { trackView } from '@/lib/api';

export default function TrackView({ slug }: { slug: string }) {
  useEffect(() => {
    trackView(slug).catch(console.error);
  }, [slug]);

  return null;
}
