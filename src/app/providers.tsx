'use client';

import { ReactLenis } from 'lenis/react';
import { ScrollToTop } from '@/components/ScrollToTop';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{
      lerp: 0.05,
      wheelMultiplier: 1.5,
      smoothWheel: true,
      syncTouch: true, /* Enable native touch momentum scrolling */
      touchMultiplier: 0 /* Disable Lenis virtual scroll on touch devices */
    }}>
      <ScrollToTop />
      {children}
    </ReactLenis>
  );
}
