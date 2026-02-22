import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sun, Moon } from 'lucide-react';
import { useInView, motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { useAppQuery } from '../hooks/useAppQuery';
import type { ServiceItem } from '../types';

// Section 1: Hero
export function HeroSection() {
    return (
        <div data-theme="dark" className="hero-wrapper relative z-10 w-full h-screen bg-[#0B0C0E] masthead overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <img
                    src="/frame_modern_interior.jpg"
                    alt="Modern glass interior"
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Overlay Text */}
            <div className="hero-text absolute top-1/2 left-1/2 z-20 flex flex-col items-center justify-center text-center pointer-events-none w-full px-4 text-white drop-shadow-lg">
                <h2 className="headline-xl text-[clamp(40px,8vw,120px)] mb-4">
                    <span className="block">ΚΡΥΣΤΑΛΛΙΝΕΣ</span>
                    <span className="block">ΛΥΣΕΙΣ</span>
                </h2>
                <p className="text-xl lg:text-3xl font-medium opacity-90 font-display tracking-widest drop-shadow-md">
                    Από την ιδέα έως την τοποθέτηση.
                </p>
            </div>
            {/* Stationary Hero CTA - embedded in sticky section */}
            <Link to="/contact" className="hero-cta absolute bottom-12 md:bottom-24 left-1/2 -translate-x-1/2 pointer-events-auto flex items-center gap-4 px-10 py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white font-display font-medium text-sm lg:text-base rounded-full hover:bg-white hover:text-[#0B0C0E] transition-all duration-300 shadow-[0_8px_32px_rgba(255,255,255,0.05)] z-30">
                Ξεκινήστε το έργο σας
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>
        </div>
    );
}

// Split Section Component (reusable for sections 3-8)
export function SplitSection({
    id,
    imageSrc,
    imagePosition,
    headline,
    body,
    caption,
    zIndex,
    hasFeatureList = false,
    features = [],
    iconBoxes = [],
    isLast = false,
}: {
    id: string;
    imageSrc: string;
    imagePosition: 'left' | 'right';
    headline: string[];
    body: string;
    caption: string;
    zIndex: number;
    hasFeatureList?: boolean;
    features?: string[];
    iconBoxes?: { icon: React.ElementType, text: string, link?: string, detail?: string }[];
    isLast?: boolean;
}) {
    const isLeftImage = imagePosition === 'left';
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

    // Interactive state logic for icon boxes with details
    const isInteractive = iconBoxes?.some(box => !!box.detail);
    const [activeIndex, setActiveIndex] = useState(0);

    // Interactive slider logic for "Light" section (id === 'light')
    const isLightSection = id === 'light';
    const [isNightMode, setIsNightMode] = useState(false);
    const lightLevel = useMotionValue(1); // 1 = Day, 0 = Night

    useEffect(() => {
        if (!isLightSection) return;
        animate(lightLevel, isNightMode ? 0 : 1, { duration: 0.8, ease: [0.16, 1, 0.3, 1] });
    }, [isNightMode, isLightSection, lightLevel]);

    // Theming transforms based on lightLevel
    const bgOpacity = useTransform(lightLevel, [0, 1], [1, 0]); // Dark bg fades in as light goes to 0
    const textOpacityDay = useTransform(lightLevel, [0, 1], [0, 1]); // Day text fades out
    const textOpacityNight = useTransform(lightLevel, [0, 1], [1, 0]); // Night text fades in

    // Night image overlay opacity
    const nightImageOpacity = useTransform(lightLevel, [0.8, 0], [0, 1]);

    // Helper theme classes for smooth CSS color transitions triggered by isNightMode
    const isDark = isLightSection && isNightMode;
    const themeAccentText = isDark ? 'text-[#C05621]' : 'text-[#3F4CCB]';
    const themeHoverText = isDark ? 'group-hover:text-[#C05621]' : 'group-hover:text-[#3F4CCB]';
    const themeInactiveBase = isDark ? 'text-[#E9EAEC]/20' : 'text-[#0B0C0E]/30';
    const themeInnerInactiveBase = isDark ? 'text-[#E9EAEC]/10' : 'text-[#0B0C0E]/10';
    const themeInnerHover = isDark ? 'group-hover:text-[#C05621]/50' : 'group-hover:text-[#3F4CCB]/50';
    const themeInnerActive = isDark ? 'text-[#C05621]/50' : 'text-[#3F4CCB]/50';
    const themeIconInactive = isDark ? 'text-[#E9EAEC]/70' : 'text-[#0B0C0E]';

    // Auto rotate every 3 seconds if interactive (and not the light section)
    useEffect(() => {
        if (!isInteractive || !iconBoxes || iconBoxes.length === 0 || isLightSection) return;

        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % iconBoxes.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isInteractive, iconBoxes, isLightSection]);

    // Reset light level when scrolled out of view
    useEffect(() => {
        if (!isInView && isLightSection) {
            setIsNightMode(false);
            lightLevel.set(1);
        }
    }, [isInView, isLightSection, lightLevel]);

    return (
        <>
            <motion.section
                id={id}
                data-theme={isLightSection ? (isNightMode ? 'dark' : 'light') : 'light'}
                className="split-container sticky top-[1px] h-screen w-full overflow-hidden bg-[#E9EAEC] flex shadow-[0_-8px_32px_rgba(11,12,14,0.15)] rounded-t-3xl"
                style={{ zIndex }}
            >
                {/* Image Panel */}
                <div
                    className="absolute top-0 h-full w-1/2"
                    style={{ left: isLeftImage ? 0 : '50%' }}
                >
                    <img
                        src={imageSrc}
                        alt="Glass installation"
                        className="w-full h-full object-cover reveal-fade-in"
                    />
                    {isLightSection && (
                        <motion.img
                            src="/split_light_01_night.png"
                            alt="Glass installation at night"
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ opacity: nightImageOpacity }}
                        />
                    )}
                </div>

                {/* Text Panel Base (Day) */}
                <div
                    className="absolute top-0 h-full w-1/2 bg-[#E9EAEC]"
                    style={{ left: isLeftImage ? '50%' : 0 }}
                />

                {/* Text Panel Overlay (Night Theme) */}
                {isLightSection && (
                    <motion.div
                        className="absolute top-0 h-full w-1/2 bg-[#0C0C0E]"
                        style={{ left: isLeftImage ? '50%' : 0, opacity: bgOpacity }}
                    >
                        {/* Subtle fiery lightsource gradient */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(192,86,33,0.12),transparent_65%)] pointer-events-none" />
                    </motion.div>
                )}

                {/* Content */}
                <div
                    className="absolute z-10"
                    style={{
                        left: isLeftImage ? '56%' : '8%',
                        top: '46%',
                        transform: 'translateY(-50%)',
                        width: '40%',
                    }}
                >
                    <div className="relative">
                        {/* Day Headline */}
                        <motion.h2
                            className="headline-lg text-[#0B0C0E] text-[clamp(28px,4vw,56px)]"
                            style={isLightSection ? { opacity: textOpacityDay } : {}}
                        >
                            {headline.map((line, i) => (
                                <span key={i} className="headline-line block">{line}</span>
                            ))}
                        </motion.h2>

                        {/* Night Headline */}
                        {isLightSection && (
                            <motion.h2
                                className="headline-lg text-white text-[clamp(28px,4vw,56px)] absolute top-0 left-0"
                                style={{ opacity: textOpacityNight }}
                            >
                                {headline.map((line, i) => (
                                    <span key={i} className="headline-line block">{line}</span>
                                ))}
                            </motion.h2>
                        )}
                    </div>

                    <div className="relative mt-8">
                        {/* Day Body */}
                        <motion.p
                            className="text-[#0B0C0E] text-sm lg:text-base leading-relaxed opacity-80"
                            style={isLightSection ? { opacity: textOpacityDay } : {}}
                        >
                            {body}
                        </motion.p>

                        {/* Night Body */}
                        {isLightSection && (
                            <motion.p
                                className="text-[#E9EAEC]/70 text-sm lg:text-base leading-relaxed absolute top-0 left-0"
                                style={{ opacity: textOpacityNight }}
                            >
                                {body}
                            </motion.p>
                        )}
                    </div>

                    {hasFeatureList && features.length > 0 && (
                        <div className="mt-8 space-y-2">
                            {features.map((feature, i) => (
                                <p key={i} className="feature-item text-[#0B0C0E] text-sm font-medium opacity-70">
                                    {feature}
                                </p>
                            ))}
                        </div>
                    )}

                    {iconBoxes && iconBoxes.length > 0 && (
                        <div ref={ref} className={`hidden lg:flex flex-col w-full mt-12 icon-box-container ${isInView ? 'animate-draw-icon' : ''}`}>
                            {/* Scroll-Expanding Separator Line */}
                            <div className={`h-[2px] w-full separator-line transition-colors duration-500 ${isDark ? 'bg-[#C05621]/30' : 'bg-[rgba(11,12,14,0.15)]'} ${isInView ? 'scroll-expand-line' : ''}`} />

                            {/* Icon Boxes Array */}
                            <div className={`grid ${iconBoxes.length === 3 ? 'grid-cols-3' : 'grid-cols-2 lg:grid-cols-3'} items-start justify-start gap-x-6 gap-y-10 xl:gap-x-12 pt-8`}>
                                {iconBoxes.map((box, i) => {
                                    const Icon = box.icon;
                                    const Wrapper = isInteractive ? 'button' : (box.link ? Link : 'div');
                                    const isActive = isInteractive && activeIndex === i;

                                    const wrapperProps = isInteractive
                                        ? { onClick: () => setActiveIndex(i), className: "group relative flex flex-col items-center gap-6 w-[120px] cursor-pointer" }
                                        : box.link
                                            ? { to: box.link, className: "group relative flex flex-col items-center gap-6 w-[120px] cursor-pointer" }
                                            : { className: "group relative flex flex-col items-center gap-6 w-[120px]" };

                                    return (
                                        <Wrapper key={i} {...(wrapperProps as any)}>
                                            <div className={`relative w-20 h-20 flex items-center justify-center -rotate-45 transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                                {/* Outer Rhombus Box SVG */}
                                                <svg className={`absolute inset-0 w-full h-full transition-colors duration-500 ${isActive ? themeAccentText : `${themeInactiveBase} ${themeHoverText}`}`} viewBox="0 0 24 24" fill="none">
                                                    <rect x="0.25" y="0.25" width="23.5" height="23.5" stroke="currentColor" strokeWidth="0.5" />
                                                </svg>
                                                {/* Inner Rhombus Box SVG */}
                                                <svg className={`absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] transition-colors duration-500 ${isActive ? themeInnerActive : `${themeInnerInactiveBase} ${themeInnerHover}`}`} viewBox="0 0 24 24" fill="none">
                                                    <rect x="0.25" y="0.25" width="23.5" height="23.5" stroke="currentColor" strokeWidth="0.5" />
                                                </svg>

                                                <div className={`rotate-45 transition-colors duration-500 z-10 ${isActive ? themeAccentText : `${themeIconInactive} ${themeHoverText}`}`}>
                                                    <Icon className="w-8 h-8" strokeWidth={1} />
                                                </div>
                                            </div>
                                            <div className="relative h-10 w-full overflow-hidden flex items-center justify-center mt-2 px-1">
                                                {/* Day Icon Text */}
                                                <motion.span
                                                    className={`absolute flex items-center justify-center w-full h-full text-[11px] lg:text-xs font-bold tracking-wider uppercase text-center transition-all duration-300 leading-tight ${box.link && !isInteractive ? 'group-hover:-translate-y-full group-hover:opacity-0' : ''} ${isActive ? 'text-[#3F4CCB] opacity-100' : 'text-[#0B0C0E] opacity-80'}`}
                                                    style={isLightSection ? { opacity: textOpacityDay } : {}}
                                                >
                                                    {box.text}
                                                </motion.span>

                                                {/* Night Icon Text */}
                                                {isLightSection && (
                                                    <motion.span
                                                        className={`absolute flex items-center justify-center w-full h-full text-[11px] lg:text-xs font-bold tracking-wider uppercase text-center transition-all duration-300 leading-tight ${isActive ? themeAccentText : 'text-[#E9EAEC]/90'}`}
                                                        style={{ opacity: textOpacityNight }}
                                                    >
                                                        {box.text}
                                                    </motion.span>
                                                )}

                                                {box.link && !isInteractive && (
                                                    <span className="absolute flex items-center justify-center w-full h-full text-[11px] lg:text-xs font-bold tracking-wider uppercase text-[#3F4CCB] opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 leading-tight gap-1">
                                                        Έργα <ChevronRight size={14} className="mb-[1px]" />
                                                    </span>
                                                )}
                                            </div>
                                        </Wrapper>
                                    );
                                })}
                            </div>

                            {/* Detail Text rendering */}
                            {isInteractive && iconBoxes && !isLightSection && (
                                <div className="mt-8 relative min-h-[160px]">
                                    <AnimatePresence mode="wait">
                                        {iconBoxes[activeIndex]?.detail && (
                                            <motion.div
                                                key={activeIndex}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                                className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-[rgba(11,12,14,0.05)] relative overflow-hidden"
                                            >
                                                <div className="flex flex-col">
                                                    <h4 className="font-display font-bold text-[#3F4CCB] text-base lg:text-lg mb-3 pl-1">
                                                        {iconBoxes[activeIndex].text}
                                                    </h4>
                                                    <div className="flex items-center w-full mb-3">
                                                        <div className="w-8 h-8 rounded-full border border-[#3F4CCB]/50 flex items-center justify-center text-[#3F4CCB] font-display font-bold text-sm shrink-0 bg-transparent relative z-10">
                                                            {activeIndex + 1}
                                                        </div>
                                                        <motion.div
                                                            initial={{ scaleX: 0 }}
                                                            animate={{ scaleX: 1 }}
                                                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                                            className="h-[1px] bg-gradient-to-r from-[#3F4CCB]/40 to-transparent flex-1 origin-left -ml-[1px]"
                                                        />
                                                    </div>
                                                    <p className="text-sm text-[#0B0C0E]/80 leading-relaxed pl-1">
                                                        {iconBoxes[activeIndex].detail}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}

                            {/* Light Switch for Light Section */}
                            {isLightSection && (
                                <div className="mt-12 relative w-full pointer-events-auto flex flex-col items-start">
                                    <motion.p
                                        className="text-xs font-display font-medium tracking-widest uppercase mb-4 transition-colors duration-500"
                                        style={{ color: isDark ? 'rgba(233,234,236,0.3)' : 'rgba(11,12,14,0.5)' }}
                                    >
                                        Ελεγχος Φωτισμου
                                    </motion.p>

                                    <div className={`inline-flex items-center p-1.5 rounded-full relative z-10 transition-colors duration-500 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-[#0B0C0E]/5'}`}>
                                        <button
                                            onClick={() => setIsNightMode(false)}
                                            className={`relative z-20 flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-300 ${!isDark ? 'text-[#3F4CCB] bg-white shadow-md' : 'text-[#E9EAEC]/40 hover:text-[#E9EAEC]/70'}`}
                                        >
                                            <Sun className="w-4 h-4" />
                                            <span className="text-xs font-bold tracking-widest uppercase">Ημερα</span>
                                        </button>

                                        <button
                                            onClick={() => setIsNightMode(true)}
                                            className={`relative z-20 flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-300 ${isDark ? 'text-[#C05621] bg-[#1A1A1D] shadow-[0_2px_8px_rgba(0,0,0,0.5)]' : 'text-[#0B0C0E]/40 hover:text-[#0B0C0E]/70'}`}
                                        >
                                            <Moon className="w-4 h-4" />
                                            <span className="text-xs font-bold tracking-widest uppercase">Νυχτα</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {caption && (
                        <div className={`mt-6 pt-6 border-t border-[rgba(11,12,14,0.1)]/40 ${iconBoxes && iconBoxes.length > 0 ? 'lg:hidden' : ''}`}>
                            <span className="label-micro opacity-60 text-[#0B0C0E]">{caption}</span>
                        </div>
                    )}
                </div>

                {/* Horizontal CTA Overlay for Last Section on the Image Side */}
                {isLast && (
                    <div
                        className="absolute top-0 h-full w-1/2 flex items-center justify-center pointer-events-none p-6 lg:p-12"
                        style={{ left: isLeftImage ? 0 : '50%', zIndex: 40 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-[#0B0C0E]/40 backdrop-blur-xl border border-white/10 p-8 lg:p-12 rounded-3xl flex flex-col items-center text-center shadow-2xl pointer-events-auto w-full max-w-[440px]"
                        >
                            <h3 className="text-2xl lg:text-[28px] leading-tight font-display font-bold text-white mb-4 drop-shadow-md">
                                Ας σχεδιάσουμε το έργο σας.
                            </h3>
                            <p className="text-white/80 mb-8 drop-shadow font-medium leading-relaxed">
                                Μιλήστε μας για τις ανάγκες σας. Το εξειδικευμένο τμήμα μας θα επικοινωνήσει μαζί σας για μια πλήρη κοστολόγηση.
                            </p>
                            <Link to="/contact" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#3F4CCB] hover:bg-white text-white hover:text-[#0B0C0E] font-display font-bold text-base rounded-xl transition-all duration-300 shadow-[0_8px_24px_rgba(63,76,203,0.3)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.4)] group w-full cursor-pointer">
                                Επικοινωνία
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                )}

                {/* Vertical Divider */}
                <div
                    className="absolute top-[10%] h-[80%] w-px bg-[#E9EAEC]/30"
                    style={{ left: '50%' }}
                />
            </motion.section>

            {/* Subtle Scroll Buffer */}
            {!isLast && <div className="w-full h-[10vh] pointer-events-none" />}
        </>
    );
}


// Section 9: Services
export function ServicesSection() {
    const { data: services, isLoading } = useAppQuery<ServiceItem[]>('services');

    if (isLoading) {
        return (
            <section id="services" data-theme="light" className="relative bg-[#E9EAEC] py-24 lg:py-32 snap-point flex flex-col items-center justify-center min-h-[60vh]" style={{ zIndex: 90 }}>
                <div className="w-12 h-12 border-4 border-[#3F4CCB]/30 border-t-[#3F4CCB] rounded-full animate-spin mb-6"></div>
            </section>
        );
    }

    if (!services) return null;

    return (
        <section id="services" data-theme="light" className="relative bg-[#E9EAEC] py-24 lg:py-32 snap-point" style={{ zIndex: 90 }}>
            <div className="px-6 lg:px-16 max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="headline-lg text-[#0B0C0E] text-[clamp(32px,5vw,64px)]">Τι κατασκευάζουμε</h2>
                    <p className="mt-4 text-[#6D7278] text-base max-w-xl">
                        Από μικρές επισκευές έως μεγάλα έργα, προσφέρουμε ολοκληρωμένες λύσεις γυαλιού για κάθε ανάγκη.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service) => (
                        <Link to={`/services#${service.id}`} key={service.id} className="service-card group cursor-pointer block">
                            <div className="overflow-hidden mb-4 rounded-xl relative">
                                <div className="absolute inset-0 bg-[#E9EAEC] opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10" />
                                <img
                                    src={service.image}
                                    alt={service.shortName}
                                    className="service-card-image w-full h-48 lg:h-56 object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1 reveal-fade-in"
                                />
                            </div>
                            <h3 className="font-display font-bold text-lg text-[#0B0C0E] mb-2 group-hover:text-[#3F4CCB] transition-colors duration-300 flex items-center gap-2">
                                {service.shortName}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </h3>
                            <p className="text-sm text-[#6D7278] leading-relaxed line-clamp-2">{service.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

