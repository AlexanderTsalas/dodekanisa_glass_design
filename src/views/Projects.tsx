'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter } from 'lucide-react';
import { useAppQuery } from '../hooks/useAppQuery';
import { CTASection } from '../components/CTASection';
import { MobileDrawer } from '../components/MobileDrawer';
import type { Project } from '../data/projectsData';

export default function Projects() {
    const { data: projectsData } = useAppQuery<Project[]>('projects');
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState<string>(searchParams?.get('category') || 'Όλα');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 16;

    // Scroll to top when pagination changes (not on first mount)
    useEffect(() => {
        if (currentPage > 1) window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    if (!projectsData) return null;

    // Extract unique categories from both project type and client space
    const categories = ['Όλα', ...Array.from(new Set([
        ...projectsData.map(p => p.category),
        ...projectsData.map(p => p.clientCategory)
    ]))];

    // Filter projects
    const filteredProjects = activeCategory === 'Όλα'
        ? projectsData
        : projectsData.filter(p => p.category === activeCategory || p.clientCategory === activeCategory);

    // Handle pagination
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setCurrentPage(1);
        const params = new URLSearchParams();
        if (cat !== 'Όλα') params.set('category', cat);
        router.push(`/projects${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
    };

    return (
        <main data-theme="light" className="bg-brand-light min-h-screen pt-32 pb-32 text-brand-dark">

            {/* Header */}
            <div className="max-w-[1600px] mx-auto px-6 lg:px-16 mb-16">
                <h1 className="headline-xl text-[clamp(40px,8vw,96px)] mb-6 text-center lg:text-left">ΤΑ ΕΡΓΑ ΜΑΣ</h1>
            </div>

            {/* Desktop Filter Bar (Hidden on Mobile) */}
            <div className="max-w-[1600px] mx-auto px-6 lg:px-16 mb-16 hidden lg:block">
                <div className="flex flex-wrap gap-4 justify-start">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors border ${activeCategory === cat
                                ? 'bg-brand-accent text-brand-dark border-brand-accent'
                                : 'bg-transparent text-brand-muted border-[rgba(11,12,14,0.1)]/40 hover:border-[rgba(11,12,14,0.1)] hover:text-brand-dark'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Project Grid */}
            <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
                <div key={activeCategory + currentPage} className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 auto-rows-[400px] lg:auto-rows-[350px] gap-6 grid-flow-dense">
                    {paginatedProjects.map((project, idx) => {
                        const p = idx % 8;
                        let spanClass = 'col-span-1 row-span-1';

                        if (p === 0) spanClass = 'md:col-span-2 md:row-span-2';
                        else if (p === 1) spanClass = 'md:col-span-2 md:row-span-1';
                        else if (p === 2) spanClass = 'md:col-span-1 md:row-span-2';
                        else if (p === 3) spanClass = 'md:col-span-1 md:row-span-2';
                        else if (p === 4) spanClass = 'md:col-span-1 md:row-span-2';
                        else if (p === 5) spanClass = 'col-span-1 row-span-1';
                        else if (p === 6) spanClass = 'col-span-1 row-span-1';
                        else if (p === 7) spanClass = 'md:col-span-2 md:row-span-1';

                        return (
                            <Link
                                href={`/projects/${project.id}`}
                                key={project.id}
                                className={`group relative block overflow-hidden rounded-2xl animate-in fade-in zoom-in-95 duration-700 ease-out fill-mode-both cursor-pointer bg-black ${spanClass}`}
                                style={{ animationDelay: `${(idx % 8) * 100}ms` }}
                            >
                                <Image
                                    src={project.coverImage}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                                    priority={idx < 4}
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                    <p className="text-xs uppercase tracking-widest text-brand-accent mb-2 font-bold translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        {project.category}
                                    </p>
                                    <h2 className="headline-lg text-2xl mb-1 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                        {project.title}
                                    </h2>
                                    <p className="text-sm font-medium text-brand-light/70 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                                        {project.location}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {paginatedProjects.length === 0 && (
                    <div className="py-32 text-center">
                        <p className="text-brand-muted text-lg">Δεν βρέθηκαν έργα σε αυτή την κατηγορία.</p>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="mt-24 flex items-center justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="w-10 h-10 rounded-full flex items-center justify-center border border-[rgba(11,12,14,0.1)]/40 text-brand-dark disabled:opacity-30 hover:bg-brand-light transition-colors"
                        >
                            &larr;
                        </button>
                        <div className="flex gap-2 mx-4">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${currentPage === i + 1
                                        ? 'bg-brand-accent text-brand-dark'
                                        : 'text-brand-muted hover:text-brand-dark bg-transparent'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 rounded-full flex items-center justify-center border border-[rgba(11,12,14,0.1)]/40 text-brand-dark disabled:opacity-30 hover:bg-brand-light transition-colors"
                        >
                            &rarr;
                        </button>
                    </div>
                )}
            </div>

            <CTASection heading="ΘΕΛΕΤΕ ΚΑΤΙ ΑΝΤΙΣΤΟΙΧΟ ΓΙΑ ΤΟΝ ΧΩΡΟ ΣΑΣ;" buttonText="Ζητήστε προσφορά" />

            <MobileDrawer icon={Filter} title="Φιλτραρισμα Εργων">
                <div className="flex flex-col gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left border ${activeCategory === cat
                                ? 'bg-brand-accent text-brand-light border-brand-accent'
                                : 'bg-transparent text-brand-muted border-[rgba(11,12,14,0.1)] hover:bg-brand-light hover:text-brand-dark'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </MobileDrawer>

        </main>
    );
}
