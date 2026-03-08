'use client';

import { usePathname } from 'next/navigation';
import { useRef, useEffect } from 'react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const el = ref.current;
    if (!el) return;

    el.style.opacity = '0';
    // Use double-rAF instead of forced reflow (getBoundingClientRect)
    // to let the browser register opacity:0 before transitioning
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.35s ease';
        el.style.opacity = '1';
      });
      cleanupRef = () => cancelAnimationFrame(raf2);
    });

    const handleEnd = () => {
      el.style.transition = '';
    };
    el.addEventListener('transitionend', handleEnd, { once: true });
    let cleanupRef: (() => void) | null = null;
    return () => {
      cancelAnimationFrame(raf1);
      cleanupRef?.();
      el.removeEventListener('transitionend', handleEnd);
    };
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}
