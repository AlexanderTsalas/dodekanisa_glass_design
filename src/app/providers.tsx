'use client';

import { ReactLenis } from 'lenis/react';
import { ScrollToTop } from '@/components/ScrollToTop';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.05, wheelMultiplier: 1.5, smoothWheel: true }}>
      <ScrollToTop />
      {children}
    </ReactLenis>
  );
}
