import { ChevronRight, Clock, Mail, MapPin, Phone } from 'lucide-react';

// Section 1: Hero
export function HeroSection() {
    return (
        <div data-theme="dark" className="hero-wrapper relative z-10 w-full bg-[#E9EAEC]">
            <section className="masthead w-full">
                <div className="hero-media relative flex items-center justify-center overflow-hidden w-[clamp(300px,60vw,1000px)] aspect-[21/9] rounded-2xl shadow-[0_20px_40px_rgba(11,12,14,0.15)] bg-[#E9EAEC]">
                    <img
                        src="/frame_modern_interior.jpg"
                        alt="Modern glass interior"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Overlay Text */}
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center bg-black/20 pointer-events-none p-4">
                        <h2 className="headline-xl text-white text-[clamp(24px,5vw,72px)] drop-shadow-lg mb-2">
                            <span className="headline-line block">ΚΡΥΣΤΑΛΛΙΝΕΣ</span>
                            <span className="headline-line block">ΛΥΣΕΙΣ</span>
                        </h2>
                        <p className="text-white drop-shadow-md text-sm lg:text-base font-medium opacity-90">
                            Από την ιδέα έως την τοποθέτηση.
                        </p>
                    </div>
                </div>
            </section>
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
}) {
    const isLeftImage = imagePosition === 'left';

    return (
        <section id={id} data-theme="light" className="sticky top-[1px] h-screen w-full overflow-hidden bg-[#E9EAEC] flex shadow-[0_-8px_32px_rgba(11,12,14,0.15)] rounded-t-3xl" style={{ zIndex }}>
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
            </div>

            {/* Text Panel */}
            <div
                className="absolute top-0 h-full w-1/2 bg-[#E9EAEC]"
                style={{ left: isLeftImage ? '50%' : 0 }}
            />

            {/* Content */}
            <div
                className="absolute z-10"
                style={{
                    left: isLeftImage ? '56%' : '8%',
                    top: '46%',
                    transform: 'translateY(-50%)',
                    width: '36%',
                }}
            >
                <div>
                    <h2 className="headline-lg text-[#0B0C0E] text-[clamp(28px,4vw,56px)]">
                        {headline.map((line, i) => (
                            <span key={i} className="headline-line block">{line}</span>
                        ))}
                    </h2>
                </div>

                <p
                    className="mt-8 text-[#0B0C0E] text-sm lg:text-base leading-relaxed opacity-80"
                >
                    {body}
                </p>

                {hasFeatureList && features.length > 0 && (
                    <div className="mt-8 space-y-2">
                        {features.map((feature, i) => (
                            <p key={i} className="feature-item text-[#0B0C0E] text-sm font-medium opacity-70">
                                {feature}
                            </p>
                        ))}
                    </div>
                )}

                {caption && (
                    <div className="mt-6 pt-6 border-t border-[rgba(11,12,14,0.1)]">
                        <span className="label-micro opacity-60 text-[#0B0C0E]">{caption}</span>
                    </div>
                )}
            </div>

            {/* Vertical Divider */}
            <div
                className="absolute top-[10%] h-[80%] w-px bg-[rgba(11,12,14,0.12)]"
                style={{ left: '50%' }}
            />
        </section>
    );
}

// Section 9: Services
export function ServicesSection() {
    const services = [
        { image: '/service_partitions.jpg', title: 'Εσωτερικά χωρίσματα', desc: 'Διαφάνεια χωρίς απώλεια θερμότητας.' },
        { image: '/service_doors.jpg', title: 'Πόρτες & εισόδους', desc: 'Σιωπηλά συρόμενα, περιστροφικά, αυτόματα.' },
        { image: '/service_mirrors.jpg', title: 'Καθρέφτες & διακόσμηση', desc: 'Κομμένα στο μέτρο, με φινίρισμα που διαρκεί.' },
        { image: '/service_exterior.jpg', title: 'Εξωτερικά ανοίγματα', desc: 'Θερμομονωτικά, ηχομονωτικά, ασφαλείας.' },
        { image: '/service_railings.jpg', title: 'Κάγκελα & σκάλες', desc: 'Γυαλί με αντοχή σε κρούση και καιρό.' },
        { image: '/service_special.jpg', title: 'Ειδικές κατασκευές', desc: 'Καμπύλα, έγχρωμα, τυπωμένα σχέδια.' },
    ];

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
                    {services.map((service, i) => (
                        <div key={i} className="service-card group cursor-pointer">
                            <div className="overflow-hidden mb-4 rounded-xl">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="service-card-image w-full h-48 lg:h-56 object-cover transition-transform duration-500 reveal-fade-in"
                                />
                            </div>
                            <h3 className="font-display font-bold text-lg text-[#0B0C0E] mb-2">{service.title}</h3>
                            <p className="text-sm text-[#6D7278] leading-relaxed">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function ProcessContactSection() {
    const steps = [
        { num: '01', title: 'Ραντεβού & μέτρηση', desc: 'Επισκεπτόμαστε τον χώρο σας για ακριβή μέτρηση και αξιολόγηση.' },
        { num: '02', title: 'Πρόταση & κοστολόγηση', desc: 'Σας παρουσιάζουμε λύσεις και λεπτομερή προσφορά.' },
        { num: '03', title: 'Κατασκευή', desc: 'Κατασκευάζουμε με ψηφιακή ακρίβεια και ποιοτικά υλικά.' },
        { num: '04', title: 'Τοποθέτηση & παράδοση', desc: 'Τοποθετούμε με ασφάλεια και σας παραδίδουμε το έργο.' },
    ];

    return (
        <section className="relative snap-point" style={{ zIndex: 100 }}>
            {/* Process Section */}
            <div id="process" data-theme="light" className="bg-[#E9EAEC] py-24 lg:py-32 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <h2 className="headline-lg text-[#0B0C0E] text-[clamp(32px,5vw,64px)] mb-12">Η διαδικασία</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="process-step relative pl-10">
                                <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#3F4CCB] flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">{step.num}</span>
                                </div>
                                <h3 className="font-display font-bold text-[#0B0C0E] text-lg mb-2">{step.title}</h3>
                                <p className="text-[#6D7278] text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div id="contact" data-theme="dark" className="bg-[#0B0C0E] py-24 lg:py-32 px-6 lg:px-16 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Left - Form */}
                        <div>
                            <h2 className="headline-lg text-[#E9EAEC] text-[clamp(32px,5vw,64px)] mb-4">Ας μιλήσουμε.</h2>
                            <p className="text-[#6D7278] text-base mb-8">
                                Περιγράψτε μας το έργο σας. Θα επικοινωνήσουμε εντός 24 ωρών.
                            </p>

                            <form className="space-y-6">
                                <div>
                                    <label className="label-micro text-[#6D7278] block mb-2">Όνομα</label>
                                    <input type="text" className="w-full text-[#E9EAEC] border-[rgba(233,234,236,0.22)]" placeholder="Το όνομά σας" />
                                </div>
                                <div>
                                    <label className="label-micro text-[#6D7278] block mb-2">Email</label>
                                    <input type="email" className="w-full text-[#E9EAEC] border-[rgba(233,234,236,0.22)]" placeholder="your@email.com" />
                                </div>
                                <div>
                                    <label className="label-micro text-[#6D7278] block mb-2">Τηλέφωνο</label>
                                    <input type="tel" className="w-full text-[#E9EAEC] border-[rgba(233,234,236,0.22)]" placeholder="+30 690 000 0000" />
                                </div>
                                <div>
                                    <label className="label-micro text-[#6D7278] block mb-2">Μήνυμα</label>
                                    <textarea className="w-full text-[#E9EAEC] border-[rgba(233,234,236,0.22)] resize-none" rows={4} placeholder="Περιγράψτε το έργο σας..." />
                                </div>
                                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                                    Αποστολή
                                    <ChevronRight size={18} />
                                </button>
                            </form>
                        </div>

                        {/* Right - Contact Info */}
                        <div className="lg:pl-16">
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <Mail className="text-[#3F4CCB] mt-1" size={20} />
                                    <div>
                                        <p className="label-micro text-[#6D7278] mb-1">Email</p>
                                        <p className="text-[#E9EAEC] font-medium">hello@dodekanisaglass.gr</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Phone className="text-[#3F4CCB] mt-1" size={20} />
                                    <div>
                                        <p className="label-micro text-[#6D7278] mb-1">Τηλέφωνο</p>
                                        <p className="text-[#E9EAEC] font-medium">+30 22410 00000</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <MapPin className="text-[#3F4CCB] mt-1" size={20} />
                                    <div>
                                        <p className="label-micro text-[#6D7278] mb-1">Διεύθυνση</p>
                                        <p className="text-[#E9EAEC] font-medium">Ρόδος, Δωδεκάνησα</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Clock className="text-[#3F4CCB] mt-1" size={20} />
                                    <div>
                                        <p className="label-micro text-[#6D7278] mb-1">Ωράριο</p>
                                        <p className="text-[#E9EAEC] font-medium">Δευ–Παρ: 09:00–18:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
