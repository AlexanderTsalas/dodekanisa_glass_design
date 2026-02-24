import { HeroSection, SplitSection } from '../components/HomeComponents';
import { useAppQuery } from '../hooks/useAppQuery';
import type { HomeSplit } from '../types';

export default function Home() {
    const { data: splits, isLoading, error } = useAppQuery<HomeSplit[]>('home_splits');

    return (
        <main className="relative z-0">
            {/* Grain Overlay */}
            <div className="grain-overlay" />

            {/* Pinned Sections */}
            <HeroSection />

            {/* Split Manifesto Sections */}
            {isLoading && (
                <div className="h-screen w-full flex flex-col items-center justify-center bg-[#E9EAEC] relative z-20">
                    <div className="w-12 h-12 border-4 border-[#3F4CCB]/30 border-t-[#3F4CCB] rounded-full animate-spin mb-6"></div>
                    <p className="text-[#6D7278] font-display uppercase tracking-widest text-sm animate-pulse">ΦΟΡΤΩΣΗ ΕΜΠΕΙΡΙΑΣ...</p>
                </div>
            )}

            {error && (
                <div className="h-[50vh] w-full flex items-center justify-center bg-[#E9EAEC] relative z-20">
                    <p className="text-red-500 font-display">Σφάλμα φόρτωσης αρχικής σελίδας.</p>
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
