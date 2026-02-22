import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { projectsData } from '../data/projectsData';

export default function Projects() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeCategory, setActiveCategory] = useState<string>(searchParams.get('category') || 'Όλα');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 16;

    // Scroll to top when page mounts or pagination changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // Extract unique categories from both project type and client space
    const categories = ['Όλα', ...Array.from(new Set([
        ...projectsData.map(p => p.category),
        ...projectsData.map(p => p.clientCategory)
    ]))];

    // Filter projects
    const filteredProjects = useMemo(() => {
        if (activeCategory === 'Όλα') return projectsData;
        return projectsData.filter(p => p.category === activeCategory || p.clientCategory === activeCategory);
    }, [activeCategory]);

    // Handle pagination
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setCurrentPage(1); // Reset to first page
        setSearchParams(cat === 'Όλα' ? {} : { category: cat });
    };

    return (
        <main data-theme="light" className="bg-[#E9EAEC] min-h-screen pt-32 pb-32 text-[#0B0C0E]">

            {/* Header */}
            <div className="max-w-[1600px] mx-auto px-6 lg:px-16 mb-16">
                <h1 className="headline-xl text-[clamp(40px,8vw,96px)] mb-6 text-center lg:text-left">ΤΑ ΕΡΓΑ ΜΑΣ</h1>
            </div>

            {/* Filter Bar */}
            <div className="max-w-[1600px] mx-auto px-6 lg:px-16 mb-16">
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors border ${activeCategory === cat
                                ? 'bg-[#3F4CCB] text-[#0B0C0E] border-[#3F4CCB]'
                                : 'bg-transparent text-[#6D7278] border-[rgba(11,12,14,0.1)]/40 hover:border-[rgba(11,12,14,0.1)] hover:text-[#0B0C0E]'
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

                        // Creating the asymmetric pattern
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
                                to={`/projects/${project.id}`}
                                key={project.id}
                                className={`group relative block overflow-hidden rounded-2xl animate-in fade-in zoom-in-95 duration-700 ease-out fill-mode-both cursor-pointer bg-black ${spanClass}`}
                                style={{ animationDelay: `${(idx % 8) * 100}ms` }}
                            >
                                {/* Background Image */}
                                <img
                                    src={project.coverImage}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                />

                                {/* Dark Overlay gradient for text legibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                    <p className="text-xs uppercase tracking-widest text-[#3F4CCB] mb-2 font-bold translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        {project.category}
                                    </p>
                                    <h3 className="headline-lg text-2xl mb-1 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm font-medium text-[rgba(233,234,236,0.7)] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                                        {project.location}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Empty State */}
                {paginatedProjects.length === 0 && (
                    <div className="py-32 text-center">
                        <p className="text-[#6D7278] text-lg">Δεν βρέθηκαν έργα σε αυτή την κατηγορία.</p>
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-24 flex items-center justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="w-10 h-10 rounded-full flex items-center justify-center border border-[rgba(11,12,14,0.1)]/40 text-[#0B0C0E] disabled:opacity-30 hover:bg-[#E9EAEC] hover:text-[#0B0C0E] transition-colors"
                        >
                            &larr;
                        </button>

                        <div className="flex gap-2 mx-4">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${currentPage === i + 1
                                        ? 'bg-[#3F4CCB] text-[#0B0C0E]'
                                        : 'text-[#6D7278] hover:text-[#0B0C0E] bg-transparent'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 rounded-full flex items-center justify-center border border-[rgba(11,12,14,0.1)]/40 text-[#0B0C0E] disabled:opacity-30 hover:bg-[#E9EAEC] hover:text-[#0B0C0E] transition-colors"
                        >
                            &rarr;
                        </button>
                    </div>
                )}
            </div>

            {/* Final CTA Strip */}
            <div className="mt-24 mb-24 relative z-20 text-center flex flex-col items-center">
                <h2 className="headline-lg text-[clamp(28px,4vw,56px)] text-[#0B0C0E] mb-8">ΘΕΛΕΤΕ ΚΑΤΙ ΑΝΤΙΣΤΟΙΧΟ ΓΙΑ ΤΟΝ ΧΩΡΟ ΣΑΣ;</h2>
                <Link to="/contact" className="group flex items-center gap-4 px-10 py-5 bg-white/20 backdrop-blur-lg border border-[#0B0C0E] text-[#0B0C0E] font-display font-medium text-base lg:text-lg rounded-full hover:bg-[#0B0C0E] hover:text-[#E9EAEC] transition-all duration-300 shadow-[0_8px_32px_rgba(11,12,14,0.08)]">
                    Ζητήστε προσφορά
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>

        </main>
    );
}
