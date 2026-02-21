import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Calendar, Building2 } from 'lucide-react';
import { projectsData } from '../data/projectsData';

export default function ProjectDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [activeImage, setActiveImage] = useState<string>('');

    const project = projectsData.find((p) => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (project) {
            setActiveImage(project.coverImage);
        }
    }, [project]);

    if (!project) {
        return <Navigate to="/projects" replace />;
    }

    return (
        <main data-theme="light" className="bg-[#E9EAEC] min-h-screen pt-32 pb-32 text-[#0B0C0E]">

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-8">
                <button
                    onClick={() => navigate('/projects')}
                    className="inline-flex items-center gap-2 text-[#6D7278] hover:text-[#0B0C0E] transition-colors font-medium text-sm group"
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

                <div className="flex flex-wrap items-center gap-8 text-[#6D7278] text-sm">
                    <span className="flex items-center gap-2"><Building2 size={16} /> {project.client}</span>
                    <span className="flex items-center gap-2"><MapPin size={16} /> {project.location}</span>
                    <span className="flex items-center gap-2"><Calendar size={16} /> {project.year}</span>
                </div>
            </div>

            {/* Main Gallery Area */}
            <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[60vh] lg:h-[75vh]">
                    {/* Primary Large Image */}
                    <div className="lg:col-span-9 rounded-2xl overflow-hidden bg-[#edede9] relative border border-[rgba(11,12,14,0.1)]/40 shadow-2xl reveal-fade-in group">
                        <img
                            src={activeImage}
                            alt={project.title}
                            className="w-full h-full object-cover transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay pointer-events-none"></div>
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="lg:col-span-3 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto pb-4 lg:pb-0 scrollbar-hide">
                        {/* Cover Image Thumb */}
                        <button
                            onClick={() => setActiveImage(project.coverImage)}
                            className={`shrink-0 w-32 lg:w-full aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === project.coverImage ? 'border-[#3F4CCB] opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                                }`}
                        >
                            <img src={project.coverImage} className="w-full h-full object-cover" />
                        </button>

                        {/* Gallery Thumbs */}
                        {project.galleryImages.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImage(img)}
                                className={`shrink-0 w-32 lg:w-full aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === img ? 'border-[#3F4CCB] opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                                    }`}
                            >
                                <img src={img} className="w-full h-full object-cover" />
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
                        <h3 className="text-xs uppercase tracking-[0.2em] text-[#6D7278] mb-8 border-b border-[rgba(11,12,14,0.1)]/40 pb-4">Το Έργο</h3>
                        <p className="text-[#0B0C0E] text-lg lg:text-xl leading-relaxed opacity-90 font-medium whitespace-pre-line">
                            {project.description}
                        </p>
                    </div>

                    {/* Right: Technical Specs */}
                    <div className="lg:col-span-5 reveal-fade-in" style={{ animationDelay: '150ms' }}>
                        <div className="bg-[#141518] border border-[rgba(11,12,14,0.1)]/40 rounded-2xl p-8 shadow-xl">
                            <h4 className="text-xs uppercase tracking-[0.15em] text-[#6D7278] mb-6 border-b border-[rgba(11,12,14,0.1)]/40 pb-4">
                                Τεχνικά Χαρακτηριστικά
                            </h4>

                            <ul className="space-y-6">
                                {project.technicalSpecs.map((spec, i) => (
                                    <li key={i} className="flex flex-col gap-1.5">
                                        <span className="text-xs font-bold tracking-wider text-[#3F4CCB] uppercase">{spec.label}</span>
                                        <span className="font-medium text-[#0B0C0E] leading-snug text-sm">{spec.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Request similar project CTA */}
                        <div className="mt-8">
                            <Link
                                to="/contact"
                                className="w-full flex items-center justify-center gap-2 py-4 shadow-sm hover:shadow-md transition-all duration-300 border border-[#0B0C0E] rounded-full font-display font-medium text-sm tracking-wide bg-white/20 backdrop-blur-md text-[#0B0C0E] hover:bg-[#0B0C0E] hover:text-[#E9EAEC]"
                            >
                                Συζητήστε το δικό σας έργο
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Final CTA Strip */}
            <div className="mt-24 mb-24 relative z-20 text-center flex flex-col items-center reveal-fade-in">
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
