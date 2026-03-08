'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, MapPin, Calendar, Building2, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppQuery } from '../hooks/useAppQuery';
import { CTASection } from '../components/CTASection';
import { notFound } from 'next/navigation';
import type { Project } from '../data/projectsData';

export default function ProjectDetails({ id }: { id: string }) {
    const router = useRouter();
    const [activeImage, setActiveImage] = useState<string>('');
    const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

    const { data: projectsData } = useAppQuery<Project[]>('projects');
    const project = projectsData?.find((p) => p.id === id);

    useEffect(() => {
        if (project) {
            setActiveImage(project.coverImage);
        }
    }, [project]);

    if (!project) {
        notFound();
        return null;
    }

    return (
        <main data-theme="light" className="bg-[#E9EAEC] min-h-screen pt-32 pb-32 text-[#0B0C0E]">

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-8">
                <button
                    onClick={() => router.push('/projects')}
                    className="inline-flex items-center gap-2 text-brand-muted hover:text-[#0B0C0E] transition-colors font-medium text-sm group"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Επιστροφή στα Έργα
                </button>
            </div>

            {/* Hero Meta */}
            <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-12">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="px-3 py-1 bg-[#3F4CCB]/10 text-[#3F4CCB] rounded-full text-xs font-bold uppercase tracking-wider border border-[#3F4CCB]/20">
                        {project.category}
                    </span>
                    <h1 className="headline-lg text-[clamp(28px,5vw,56px)] leading-none m-0">{project.title}</h1>
                </div>

                <div className="flex flex-wrap items-center gap-8 text-brand-muted text-sm">
                    <span className="flex items-center gap-2"><Building2 size={16} /> {project.client}</span>
                    <span className="flex items-center gap-2"><MapPin size={16} /> {project.location}</span>
                    <span className="flex items-center gap-2"><Calendar size={16} /> {project.year}</span>
                </div>
            </div>

            {/* Main Gallery Area */}
            <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[60vh] lg:h-[75vh]">
                    {/* Primary Large Image */}
                    <button
                        onClick={() => setIsLightboxOpen(true)}
                        className="lg:col-span-9 rounded-2xl overflow-hidden bg-[#edede9] relative border border-[rgba(11,12,14,0.1)]/40 shadow-2xl reveal-fade-in group cursor-zoom-in text-left focus:outline-none"
                    >
                        <Image
                            src={activeImage}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 75vw"
                            priority
                            className="object-cover transition-opacity duration-500"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                            <div className="bg-white/90 backdrop-blur-sm text-[#0B0C0E] px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl font-medium text-sm">
                                <ZoomIn size={18} />
                                Μεγέθυνση
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay pointer-events-none"></div>
                    </button>

                    {/* Thumbnail Strip */}
                    <div className="lg:col-span-3 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto pb-4 lg:pb-0 scrollbar-hide">
                        {/* Cover Image Thumb */}
                        <button
                            onClick={() => setActiveImage(project.coverImage)}
                            className={`shrink-0 w-32 lg:w-full aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === project.coverImage ? 'border-[#3F4CCB] opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                                }`}
                        >
                            <Image src={project.coverImage} alt={project.title} fill sizes="(max-width: 1024px) 128px, 100%" className="object-cover" />
                        </button>

                        {/* Gallery Thumbs */}
                        {project.galleryImages.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImage(img)}
                                className={`shrink-0 w-32 lg:w-full aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === img ? 'border-[#3F4CCB] opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                                    }`}
                            >
                                <Image src={img} alt={`${project.title} gallery ${i + 1}`} fill sizes="(max-width: 1024px) 128px, 100%" className="object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Description & Specs Split */}
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left: Narrative Description */}
                    <div className="lg:col-span-7 reveal-fade-in">
                        <h2 className="text-xs uppercase tracking-[0.2em] text-brand-muted mb-8 border-b border-[rgba(11,12,14,0.1)]/40 pb-4">Το Έργο</h2>
                        <p className="text-[#0B0C0E] text-lg lg:text-xl leading-relaxed opacity-90 font-medium whitespace-pre-line">
                            {project.description}
                        </p>
                    </div>

                    {/* Right: Technical Specs */}
                    <div className="lg:col-span-5 reveal-fade-in" style={{ animationDelay: '150ms' }}>
                        <div className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-2xl p-8 shadow-[0_8px_32px_rgba(11,12,14,0.05)]">
                            <h3 className="text-xs uppercase tracking-[0.15em] text-[#0B0C0E] font-bold mb-6 border-b border-[#0B0C0E]/20 pb-4">
                                Τεχνικά Χαρακτηριστικά
                            </h3>

                            <ul className="space-y-6">
                                {project.technicalSpecs.map((spec, i) => (
                                    <li key={i} className="flex flex-col gap-1.5">
                                        <span className="text-xs font-bold tracking-wider text-[#3F4CCB] uppercase">{spec.label}</span>
                                        <span className="font-medium text-[#0B0C0E] leading-snug text-sm">{spec.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            <CTASection heading="ΘΕΛΕΤΕ ΚΑΤΙ ΑΝΤΙΣΤΟΙΧΟ ΓΙΑ ΤΟΝ ΧΩΡΟ ΣΑΣ;" buttonText="Ζητήστε προσφορά" />

            {/* Lightbox Modal via Portal */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {isLightboxOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0B0C0E]/95 backdrop-blur-xl p-4 lg:p-12 cursor-zoom-out overscroll-none"
                            onClick={() => setIsLightboxOpen(false)}
                        >
                            <button
                                onClick={() => setIsLightboxOpen(false)}
                                className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/50 hover:text-white transition-colors z-[210] p-2 bg-black/20 hover:bg-black/50 rounded-full"
                            >
                                <X size={28} />
                            </button>

                            <motion.img
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.1 }}
                                src={activeImage}
                                alt={project.title}
                                className="w-full h-full object-contain max-h-[90dvh] max-w-[95vw] shadow-2xl rounded-lg cursor-default"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

        </main>
    );
}
