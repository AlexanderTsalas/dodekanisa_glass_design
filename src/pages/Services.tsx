import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
const servicesData = [
    {
        id: 'partitions',
        title: 'ΕΣΩΤΕΡΙΚΑ ΧΩΡΙΣΜΑΤΑ',
        shortName: 'Χωρίσματα',
        image: '/service_partitions.jpg',
        desc: 'Σχεδιάζουμε εσωτερικά χωρίσματα που διατηρούν την οπτική επαφή και το φυσικό φως, προσφέροντας ταυτόχρονα την απαραίτητη ηχομόνωση και εργονομία. Ιδανικά για γραφεία, σύγχρονες κατοικίες και επαγγελματικούς χώρους.',
        features: ['Κρύσταλλα Securit/Triplex', 'Απόλυτη ηχομόνωση', 'Κρυφά προφίλ αλουμινίου', 'Προσαρμοσμένες αμμοβολές'],
        specs: { thickness: '10mm - 12mm', type: 'Tempered / Laminated', acoustic: 'Έως 42dB' }
    },
    {
        id: 'doors',
        title: 'ΠΟΡΤΕΣ & ΕΙΣΟΔΟΙ',
        shortName: 'Πόρτες',
        image: '/service_doors.jpg',
        desc: 'Από εντυπωσιακές κύριες εισόδους μέχρι συρόμενες πόρτες εξοικονόμησης χώρου. Όλες οι πόρτες μας κατασκευάζονται με γνώμονα την ασφάλεια, την ομαλή λειτουργία και τον ελάχιστο σχεδιασμό.',
        features: ['Περιστροφικές (Pivot)', 'Αυτόματες συρόμενες πόρτες', 'Σιωπηλοί μηχανισμοί απόσβεσης', 'Συστήματα Access Control'],
        specs: { thickness: '10mm', type: 'Securit', hardware: 'Ανοξείδωτο Ατσάλι 316' }
    },
    {
        id: 'mirrors',
        title: 'ΚΑΘΡΕΦΤΕΣ & ΔΙΑΚΟΣΜΗΣΗ',
        shortName: 'Καθρέφτες',
        image: '/service_mirrors.jpg',
        desc: 'Ο καθρέφτης είναι το εργαλείο μας για να πολλαπλασιάζουμε τον χώρο και το φως. Κομμένοι με ψηφιακή ακρίβεια σε κάθε σχήμα, με φινιρίσματα που περιλαμβάνουν ρεζουλί, μπιζουτέ και ειδικές αποχρώσεις.',
        features: ['Μεγάλης κλίμακας επενδύσεις', 'Ενσωματωμένοι φωτισμοί LED', 'Αντιοξειδωτική προστασία (Copper-free)', 'Φιμέ & Μπρονζέ αποχρώσεις'],
        specs: { thickness: '4mm - 6mm', type: 'Αντιδιαβρωτικοί', edge: 'Ρεζουλί / Μπιζουτέ' }
    },
    {
        id: 'exterior',
        title: 'ΕΞΩΤΕΡΙΚΑ ΑΝΟΙΓΜΑΤΑ',
        shortName: 'Εξωτερικά',
        image: '/service_exterior.jpg',
        desc: 'Οι προσόψεις ορίζουν τον χαρακτήρα του κτιρίου. Τοποθετούμε ενεργειακά κρύσταλλα μεγάλων διαστάσεων που προσφέρουν κορυφαία θερμομόνωση χωρίς να στερούν την ανεμπόδιστη θέα.',
        features: ['Ενεργειακά κρύσταλλα Low-E (4 εποχών)', 'Υαλοπετάσματα αλουμινίου', 'Αντοχή σε έντονη ανεμοπίεση', 'Διπλά & Τριπλά κρύσταλλα'],
        specs: { thickness: 'Ανάλογα τη μελέτη', type: 'Low-E Argon', thermal: 'Ug έως 1.0 W/m²K' }
    },
    {
        id: 'railings',
        title: 'ΚΑΓΚΕΛΑ & ΣΚΑΛΕΣ',
        shortName: 'Κάγκελα',
        image: '/service_railings.jpg',
        desc: 'Συστήματα κάγκελων χωρίς εμφανή στηρίγματα που παρέχουν απόλυτη ασφάλεια. Χρησιμοποιούμε ειδικά κρύσταλλα με ενισχυμένες μεμβράνες EVA/SentryGlas ιδανικά για μπαλκόνια δίπλα στη θάλασσα.',
        features: ['Frameless καθαρός σχεδιασμός', 'Απόλυτη αντοχή σε κρούση', 'Προφίλ βαρέως τύπου ανοδιωμένου αλουμινίου', 'Αόρατη στερέωση'],
        specs: { thickness: '8+8mm / 10+10mm', type: 'Triplex Securit', film: 'PVB / EVA / SGP' }
    },
    {
        id: 'special',
        title: 'ΕΙΔΙΚΕΣ ΚΑΤΑΣΚΕΥΕΣ',
        shortName: 'Ειδικές',
        image: '/service_special.jpg',
        desc: 'Οι προκλήσεις είναι η ειδικότητά μας. Πατάρια από δομικό γυαλί, καμπύλα κρύσταλλα για απαιτητικές αρχιτεκτονικές λεπτομέρειες και custom έγχρωμα σχέδια (ψηφιακή εκτύπωση).',
        features: ['Γυάλινα δάπεδα & πατάρια', 'Καμπύλα (κουρμπαριστά) γυαλιά μεγάλων διαστάσεων', 'Ψηφιακές εκτυπώσεις & αμμοβολές σε γυαλί', 'Βιτρίνες κοσμηματοπωλείων'],
        specs: { thickness: 'Έως 12+12+12mm', type: 'Structural Glass', load: 'Έως 500kg/m²' }
    },
];

export default function Services() {
    const [activeSection, setActiveSection] = useState(servicesData[0].id);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Intersection Observer for scrollspy
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-30% 0px -60% 0px', // Trigger slightly above center screen
                threshold: 0,
            }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToService = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -120; // offset for the fixed header
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <main data-theme="light" className="bg-[#E9EAEC] min-h-screen pt-32 pb-32 text-[#0B0C0E]">

            {/* Intro Header */}
            <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-24 lg:mb-32">
                <h1 className="headline-xl text-[clamp(40px,8vw,96px)] mb-6">ΥΠΗΡΕΣΙΕΣ</h1>
                <p className="text-[#6D7278] text-lg lg:text-3xl max-w-4xl font-medium leading-relaxed">
                    Δεν τοποθετούμε απλώς γυαλί. Διαχειριζόμαστε το φως, την ασφάλεια και την αισθητική του χώρου σας με απόλυτη τεχνική ευφυΐα.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row relative">

                {/* Left Sticky Navigation */}
                <aside className="hidden lg:block w-1/4 relative">
                    <div className="sticky top-40 space-y-4">
                        <h3 className="text-xs uppercase tracking-[0.2em] text-[#6D7278] mb-8">Εξειδικευσεις</h3>
                        <ul className="space-y-4 border-l border-[rgba(11,12,14,0.1)]/40 pl-6">
                            {servicesData.map((service, idx) => {
                                const isActive = activeSection === service.id;
                                return (
                                    <li key={service.id} className="relative">
                                        {/* Active Line Indicator */}
                                        <div
                                            className={`absolute -left-[25px] top-1/2 -translate-y-1/2 w-[2px] h-0 bg-[#3F4CCB] transition-all duration-300 ease-out ${isActive ? 'h-full' : ''}`}
                                        />
                                        <button
                                            onClick={() => scrollToService(service.id)}
                                            className={`text-left font-display font-medium text-lg transition-all duration-300 ${isActive ? 'text-[#0B0C0E] translate-x-2' : 'text-[#6D7278] hover:text-[#0B0C0E]'
                                                }`}
                                        >
                                            <span className="text-xs opacity-50 mr-3 font-mono">0{idx + 1}</span>
                                            {service.shortName}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </aside>

                {/* Right Scrolling Content Content */}
                <div className="w-full lg:w-3/4 lg:pl-16 space-y-32 lg:space-y-48">
                    {servicesData.map((service, index) => (
                        <article
                            key={service.id}
                            id={service.id}
                            ref={(el) => { sectionRefs.current[index] = el; }}
                            className="scroll-mt-32 relative"
                        >
                            {/* Header Title */}
                            <div className="mb-8">
                                <div className="flex items-baseline gap-4 mb-2">
                                    <span className="text-[#3F4CCB] font-mono text-lg">0{index + 1}</span>
                                    <h2 className="headline-lg text-[clamp(28px,4vw,56px)] leading-none">{service.title}</h2>
                                </div>
                            </div>

                            {/* Cinematic Wide Image */}
                            <div className="w-[calc(100%+48px)] -mx-6 lg:mx-0 lg:w-full aspect-[4/3] md:aspect-[16/9] lg:h-[65vh] rounded-none lg:rounded-[2rem] overflow-hidden mb-12 lg:mb-16 shadow-2xl relative bg-[#edede9]">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover reveal-fade-in"
                                />
                                {/* Noise overlay purely for texture */}
                                <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay pointer-events-none"></div>
                            </div>

                            {/* Technical Split Body */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                                {/* Description */}
                                <div className="lg:col-span-7">
                                    <p className="text-[#0B0C0E] text-lg leading-relaxed opacity-90 mb-8 font-medium">
                                        {service.desc}
                                    </p>

                                    {/* Feature Checkmarks Layout */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {service.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full border border-[#3F4CCB] flex items-center justify-center shrink-0 mt-0.5">
                                                    <div className="w-2 h-2 rounded-full bg-[#3F4CCB]"></div>
                                                </div>
                                                <span className="text-sm text-[#6D7278]">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Specs Box */}
                                <div className="lg:col-span-5 relative">
                                    <div className="bg-white/20 backdrop-blur-xl border border-[#0B0C0E] rounded-2xl p-6 lg:p-8 shadow-[0_8px_32px_rgba(11,12,14,0.05)]">
                                        <h4 className="text-xs uppercase tracking-[0.15em] text-[#0B0C0E] font-bold mb-6 border-b-2 border-[#0B0C0E]/20 pb-4">
                                            Τεχνικα Στοιχεια
                                        </h4>

                                        <ul className="space-y-5">
                                            {Object.entries(service.specs).map(([key, value], i) => {
                                                // Map internal keys to greek labels
                                                const labels: Record<string, string> = {
                                                    thickness: 'Πάχος Γυαλιού',
                                                    type: 'Τύπος Κρυστάλλου',
                                                    acoustic: 'Ηχομείωση',
                                                    hardware: 'Εξαρτήματα',
                                                    edge: 'Φινίρισμα (Λείανση)',
                                                    thermal: 'Θερμοπερατότητα',
                                                    film: 'Μεμβράνη Lamination',
                                                    load: 'Αντοχή Φορτίου'
                                                };

                                                return (
                                                    <li key={i} className="flex flex-col gap-1">
                                                        <span className="text-xs text-[#6D7278] uppercase">{labels[key]}</span>
                                                        <span className="font-medium text-[#0B0C0E]">{value as string}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>

                            </div>

                            {/* Service Journey CTA */}
                            <div className="mt-12 lg:mt-16 flex justify-start">
                                <Link
                                    to={`/projects?category=${service.shortName}`}
                                    className="group flex w-full lg:w-auto justify-center lg:justify-start items-center gap-4 px-10 py-5 bg-[#0B0C0E] text-white font-display font-medium text-base rounded-full hover:bg-[#3F4CCB] hover:scale-105 transition-all duration-300 shadow-xl"
                                >
                                    Δείτε Έργα: {service.shortName}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

            </div>

            {/* Final CTA Strip */}
            <div className="mt-12 mb-24 relative z-20 text-center flex flex-col items-center">
                <h2 className="headline-lg text-[clamp(28px,4vw,56px)] text-[#0B0C0E] mb-8">ΕΧΕΤΕ ΚΑΠΟΙΟ ΕΡΓΟ ΣΤΟ ΜΥΑΛΟ ΣΑΣ;</h2>
                <Link to="/contact" className="group flex items-center gap-4 px-10 py-5 bg-white/20 backdrop-blur-lg border border-[#0B0C0E] text-[#0B0C0E] font-display font-medium text-base lg:text-lg rounded-full hover:bg-[#0B0C0E] hover:text-[#E9EAEC] transition-all duration-300 shadow-[0_8px_32px_rgba(11,12,14,0.08)]">
                    Επικοινωνήστε μαζί μας
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>

        </main>
    );
}
