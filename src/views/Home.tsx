'use client';

import dynamic from 'next/dynamic';
import { HeroSection } from '../components/HomeComponents';
import { useAppQuery } from '../hooks/useAppQuery';
import { LoadingScreen, ErrorScreen } from '../components/LoadingScreen';
import type { HomeSplit } from '../types';

const SplitSection = dynamic(
    () => import('../components/HomeComponents').then(mod => mod.SplitSection),
    { ssr: false }
);

export default function Home() {
    const { data: splits, isLoading, error } = useAppQuery<HomeSplit[]>('home_splits');

    return (
        <main className="relative z-0">
            {/* Grain Overlay */}
            <div className="grain-overlay" />

            {/* Pinned Sections */}
            <HeroSection />

            {isLoading && (
                <div className="relative z-20 bg-brand-light">
                    <LoadingScreen message="ΦΟΡΤΩΣΗ ΕΜΠΕΙΡΙΑΣ..." />
                </div>
            )}

            {error && (
                <div className="relative z-20 bg-brand-light">
                    <ErrorScreen message="Σφάλμα φόρτωσης αρχικής σελίδας." />
                </div>
            )}

            {splits?.map((split, index) => (
                <SplitSection
                    key={split.id}
                    id={split.id}
                    imageSrc={split.imageSrc}
                    imagePosition={split.imagePosition}
                    headline={split.headline}
                    body={split.body}
                    caption={split.caption}
                    iconBoxes={split.iconBoxes}
                    zIndex={15 + index}
                    isLast={index === (splits.length - 1)}
                />
            ))}
        </main>
    );
}
