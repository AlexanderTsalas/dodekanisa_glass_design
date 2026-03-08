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
    // Force reflow so the browser registers opacity:0 before transitioning
    el.getBoundingClientRect();
    el.style.transition = 'opacity 0.35s ease';
    el.style.opacity = '1';

    const handleEnd = () => {
      el.style.transition = '';
    };
    el.addEventListener('transitionend', handleEnd, { once: true });
    return () => el.removeEventListener('transitionend', handleEnd);
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}
