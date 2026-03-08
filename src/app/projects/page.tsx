import { Suspense } from 'react';
import Projects from '@/views/Projects';

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Projects />
    </Suspense>
  );
}
