import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Phone, Mail, MapPin, Clock, ChevronRight } from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Navigation Component
function Navigation({ isDark = false }: { isDark?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 px-6 lg:px-10 py-6 flex justify-between items-center ${isDark ? 'text-[#E9EAEC]' : 'text-[#0B0C0E]'}`}>
        <div className="font-display font-bold text-lg tracking-tight">
          δωδεκανησα glass
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('services')} className="link-underline text-sm font-medium">Υπηρεσίες</button>
          <button onClick={() => scrollToSection('process')} className="link-underline text-sm font-medium">Διαδικασία</button>
          <button onClick={() => scrollToSection('contact')} className="link-underline text-sm font-medium">Επικοινωνία</button>
        </div>
        <button 
          className="md:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button 
            className="absolute top-6 right-6 text-[#E9EAEC]"
            onClick={() => setMenuOpen(false)}
          >
            <X size={28} />
          </button>
          <div className="flex flex-col items-center gap-8 text-[#E9EAEC]">
            <button onClick={() => scrollToSection('services')} className="text-2xl font-display font-bold">Υπηρεσίες</button>
            <button onClick={() => scrollToSection('process')} className="text-2xl font-display font-bold">Διαδικασία</button>
            <button onClick={() => scrollToSection('contact')} className="text-2xl font-display font-bold">Επικοινωνία</button>
          </div>
        </div>
      )}
    </>
  );
}

// Persistent UI Frame
function PersistentUI({ caption, isDark = false }: { caption: string; isDark?: boolean }) {
  const textColor = isDark ? 'text-[#E9EAEC]' : 'text-[#0B0C0E]';
  const borderColor = isDark ? 'border-[rgba(233,234,236,0.22)]' : 'border-[rgba(11,12,14,0.22)]';

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Bottom Left - CTA */}
      <div className={`fixed bottom-6 left-6 lg:left-10 z-30 ${textColor}`}>
        <button onClick={scrollToContact} className="link-underline text-sm font-medium flex items-center gap-2">
          Κλείστε ραντεβού
        </button>
      </div>

      {/* Bottom Center - Caption */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-30 ${textColor} hidden lg:block`}>
        <span className="label-micro opacity-60">{caption}</span>
      </div>

      {/* Bottom Right - Language */}
      <div className={`fixed bottom-6 right-6 lg:right-10 z-30 ${textColor}`}>
        <span className="text-sm font-medium">EL</span>
      </div>

      {/* Corner Lines */}
      <div className={`fixed top-6 left-6 lg:top-10 lg:left-10 w-8 h-8 border-l ${borderColor} border-t z-30 pointer-events-none`} />
      <div className={`fixed top-6 right-6 lg:top-10 lg:right-10 w-8 h-8 border-r ${borderColor} border-t z-30 pointer-events-none`} />
      <div className={`fixed bottom-6 left-6 lg:bottom-10 lg:left-10 w-8 h-8 border-l ${borderColor} border-b z-30 pointer-events-none`} />
      <div className={`fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-8 h-8 border-r ${borderColor} border-b z-30 pointer-events-none`} />
    </>
  );
}

// Section 1: Hero
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;

    if (!section || !image || !headline || !subheadline) return;

    const ctx = gsap.context(() => {
      // Load animation
      const loadTl = gsap.timeline();
      
      loadTl.fromTo(image, 
        { opacity: 0, scale: 1.08, y: '8vh' },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out' }
      );

      const headlineLines = headline.querySelectorAll('.headline-line');
      loadTl.fromTo(headlineLines,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.06, ease: 'power2.out' },
        '-=0.6'
      );

      loadTl.fromTo(subheadline,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      // Scroll animation (exit only)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Exit phase (70% - 100%)
      scrollTl.fromTo(image,
        { y: 0, scale: 1, opacity: 1 },
        { y: '-22vh', scale: 0.92, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(headlineLines,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(subheadline,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-[#E9EAEC] z-10 flex items-center justify-center">
      <Navigation />
      <PersistentUI caption="δωδεκανησα glass — Αρχιτεκτονικά κρύσταλλα" />
      
      {/* Hero Image */}
      <div 
        ref={imageRef}
        className="absolute image-frame"
        style={{
          left: '50%',
          top: '52%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(280px, 34vw, 500px)',
          height: 'clamp(420px, 78vh, 750px)',
        }}
      >
        <img 
          src="/hero_glass_float.jpg" 
          alt="Glass installation" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Headline */}
      <div 
        ref={headlineRef}
        className="absolute z-20 text-center"
        style={{
          left: '50%',
          top: '52%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h1 className="headline-xl text-[#0B0C0E] text-[clamp(40px,8vw,96px)]">
          <span className="headline-line block">ΓΥΑΛΙ</span>
          <span className="headline-line block">ΠΟΥ ΑΙΩΡΕΙΤΑΙ</span>
        </h1>
      </div>

      {/* Subheadline */}
      <p 
        ref={subheadlineRef}
        className="absolute z-20 text-[#0B0C0E] text-center text-sm lg:text-base font-medium opacity-80"
        style={{
          left: '50%',
          top: '68%',
          transform: 'translateX(-50%)',
        }}
      >
        Κατασκευές & τοποθετήσεις για κάθε χώρο.
      </p>
    </section>
  );
}

// Section 2: Frame Statement
function FrameStatementSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;

    if (!section || !image || !headline || !subheadline) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Entrance (0% - 30%)
      scrollTl.fromTo(image,
        { scale: 0.86, opacity: 0, y: '10vh' },
        { scale: 1, opacity: 1, y: 0, ease: 'none' },
        0
      );

      const headlineLines = headline.querySelectorAll('.headline-line');
      scrollTl.fromTo(headlineLines,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(subheadline,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Exit (70% - 100%)
      scrollTl.fromTo(image,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(headlineLines,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(subheadline,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-[#E9EAEC] z-20 flex items-center justify-center">
      <Navigation />
      <PersistentUI caption="Μελέτη — Κατασκευή — Τοποθέτηση" />
      
      {/* Center Frame Image */}
      <div 
        ref={imageRef}
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(320px, 72vw, 1200px)',
          height: 'clamp(240px, 56vh, 500px)',
        }}
      >
        <img 
          src="/frame_modern_interior.jpg" 
          alt="Modern glass interior" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Headline */}
      <div 
        ref={headlineRef}
        className="absolute z-20 text-center"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h2 className="headline-xl text-[#0B0C0E] text-[clamp(36px,7vw,84px)] drop-shadow-lg">
          <span className="headline-line block">ΚΡΥΣΤΑΛΛΙΝΕΣ</span>
          <span className="headline-line block">ΛΥΣΕΙΣ</span>
        </h2>
      </div>

      {/* Subheadline */}
      <p 
        ref={subheadlineRef}
        className="absolute z-20 text-[#0B0C0E] text-center text-sm lg:text-base font-medium opacity-80"
        style={{
          left: '50%',
          top: '62%',
          transform: 'translateX(-50%)',
        }}
      >
        Από την ιδέα έως την τοποθέτηση.
      </p>
    </section>
  );
}

// Split Section Component (reusable for sections 3-8)
function SplitSection({ 
  id,
  imageSrc, 
  imagePosition, 
  headline, 
  body, 
  caption, 
  zIndex,
  hasFeatureList = false,
  features = []
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const textPanel = textPanelRef.current;
    const headlineEl = headlineRef.current;
    const bodyEl = bodyRef.current;
    const featuresEl = featuresRef.current;

    if (!section || !image || !textPanel || !headlineEl || !bodyEl) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      const imageStartX = imagePosition === 'left' ? '-60vw' : '60vw';
      const textStartX = imagePosition === 'left' ? '60vw' : '-60vw';
      const imageExitX = imagePosition === 'left' ? '-20vw' : '20vw';
      const textExitX = imagePosition === 'left' ? '20vw' : '-20vw';

      // Entrance (0% - 30%)
      scrollTl.fromTo(image,
        { x: imageStartX, scale: 1.08, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(textPanel,
        { x: textStartX },
        { x: 0, ease: 'none' },
        0
      );

      const headlineLines = headlineEl.querySelectorAll('.headline-line');
      scrollTl.fromTo(headlineLines,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(bodyEl,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      if (featuresEl) {
        const featureItems = featuresEl.querySelectorAll('.feature-item');
        scrollTl.fromTo(featureItems,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.15
        );
      }

      // Exit (70% - 100%)
      scrollTl.fromTo(image,
        { x: 0, opacity: 1 },
        { x: imageExitX, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(textPanel,
        { x: 0, opacity: 1 },
        { x: textExitX, opacity: 0.8, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(headlineLines,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(bodyEl,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );

    }, section);

    return () => ctx.revert();
  }, [imagePosition]);

  const isLeftImage = imagePosition === 'left';

  return (
    <section ref={sectionRef} id={id} className="section-pinned bg-[#E9EAEC] flex" style={{ zIndex }}>
      <Navigation />
      <PersistentUI caption={caption} />
      
      {/* Image Panel */}
      <div 
        ref={imageRef}
        className="absolute top-0 h-full w-1/2"
        style={{ left: isLeftImage ? 0 : '50%' }}
      >
        <img 
          src={imageSrc} 
          alt="Glass installation" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Panel */}
      <div 
        ref={textPanelRef}
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
        <div ref={headlineRef}>
          <h2 className="headline-lg text-[#0B0C0E] text-[clamp(28px,4vw,56px)]">
            {headline.map((line, i) => (
              <span key={i} className="headline-line block">{line}</span>
            ))}
          </h2>
        </div>
        
        <p 
          ref={bodyRef}
          className="mt-8 text-[#0B0C0E] text-sm lg:text-base leading-relaxed opacity-80"
        >
          {body}
        </p>

        {hasFeatureList && features.length > 0 && (
          <div ref={featuresRef} className="mt-8 space-y-2">
            {features.map((feature, i) => (
              <p key={i} className="feature-item text-[#0B0C0E] text-sm font-medium opacity-70">
                {feature}
              </p>
            ))}
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
function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards reveal
      const cardItems = cards.querySelectorAll('.service-card');
      gsap.fromTo(cardItems,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const services = [
    { image: '/service_partitions.jpg', title: 'Εσωτερικά χωρίσματα', desc: 'Διαφάνεια χωρίς απώλεια θερμότητας.' },
    { image: '/service_doors.jpg', title: 'Πόρτες & εισόδους', desc: 'Σιωπηλά συρόμενα, περιστροφικά, αυτόματα.' },
    { image: '/service_mirrors.jpg', title: 'Καθρέφτες & διακόσμηση', desc: 'Κομμένα στο μέτρο, με φινίρισμα που διαρκεί.' },
    { image: '/service_exterior.jpg', title: 'Εξωτερικά ανοίγματα', desc: 'Θερμομονωτικά, ηχομονωτικά, ασφαλείας.' },
    { image: '/service_railings.jpg', title: 'Κάγκελα & σκάλες', desc: 'Γυαλί με αντοχή σε κρούση και καιρό.' },
    { image: '/service_special.jpg', title: 'Ειδικές κατασκευές', desc: 'Καμπύλα, έγχρωμα, τυπωμένα σχέδια.' },
  ];

  return (
    <section ref={sectionRef} id="services" className="relative bg-[#E9EAEC] py-24 lg:py-32" style={{ zIndex: 90 }}>
      <div className="px-6 lg:px-16 max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-16">
          <h2 className="headline-lg text-[#0B0C0E] text-[clamp(32px,5vw,64px)]">Τι κατασκευάζουμε</h2>
          <p className="mt-4 text-[#6D7278] text-base max-w-xl">
            Από μικρές επισκευές έως μεγάλα έργα, προσφέρουμε ολοκληρωμένες λύσεις γυαλιού για κάθε ανάγκη.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <div key={i} className="service-card group cursor-pointer">
              <div className="overflow-hidden mb-4">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="service-card-image w-full h-48 lg:h-56 object-cover transition-transform duration-500"
                />
              </div>
              <h3 className="font-display font-bold text-[#0B0C0E] text-lg mb-2">{service.title}</h3>
              <p className="text-[#6D7278] text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section 10: Process + Contact
function ProcessContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const process = processRef.current;
    const contact = contactRef.current;

    if (!section || !process || !contact) return;

    const ctx = gsap.context(() => {
      // Process reveal
      const steps = process.querySelectorAll('.process-step');
      gsap.fromTo(steps,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: process,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Contact reveal
      gsap.fromTo(contact,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contact,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const steps = [
    { num: '01', title: 'Ραντεβού & μέτρηση', desc: 'Επισκεπτόμαστε τον χώρο σας για ακριβή μέτρηση και αξιολόγηση.' },
    { num: '02', title: 'Πρόταση & κοστολόγηση', desc: 'Σας παρουσιάζουμε λύσεις και λεπτομερή προσφορά.' },
    { num: '03', title: 'Κατασκευή', desc: 'Κατασκευάζουμε με ψηφιακή ακρίβεια και ποιοτικά υλικά.' },
    { num: '04', title: 'Τοποθέτηση & παράδοση', desc: 'Τοποθετούμε με ασφάλεια και σας παραδίδουμε το έργο.' },
  ];

  return (
    <section ref={sectionRef} className="relative bg-[#E9EAEC]" style={{ zIndex: 100 }}>
      {/* Process Section */}
      <div id="process" className="py-24 lg:py-32 px-6 lg:px-16 max-w-7xl mx-auto">
        <h2 className="headline-lg text-[#0B0C0E] text-[clamp(32px,5vw,64px)] mb-12">Η διαδικασία</h2>
        
        <div ref={processRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Contact Section */}
      <div id="contact" className="bg-[#0B0C0E] py-24 lg:py-32 px-6 lg:px-16">
        <div ref={contactRef} className="max-w-7xl mx-auto">
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

      {/* Footer */}
      <footer className="bg-[#0B0C0E] border-t border-[rgba(233,234,236,0.1)] py-8 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#6D7278] text-sm">
            © 2026 δωδεκανησα glass. Με επιφύλαξη παντός δικαιώματος.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#6D7278] text-sm hover:text-[#E9EAEC] transition-colors">Instagram</a>
            <a href="#" className="text-[#6D7278] text-sm hover:text-[#E9EAEC] transition-colors">Facebook</a>
            <a href="#" className="text-[#6D7278] text-sm hover:text-[#E9EAEC] transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </section>
  );
}

// Main App
function App() {
  useEffect(() => {
    // Global snap for pinned sections
    const setupSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupSnap, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <main className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Pinned Sections */}
      <HeroSection />
      <FrameStatementSection />
      
      {/* Split Manifesto Sections */}
      <SplitSection 
        id="light"
        imageSrc="/split_light_01.jpg"
        imagePosition="left"
        headline={['ΤΟ ΦΩΣ', 'ΕΙΝΑΙ ΥΛΙΚΟ']}
        body="Σχεδιάζουμε γυαλί που δεν χωρίζει, ενώνει. Εσωτερικούς χώρους που αναπνέουν και εξωτερικές όψεις που αντέχουν."
        caption="Φυσικός φωτισμός — Θερμομόνωση — Ηχομόνωση"
        zIndex={30}
      />
      
      <SplitSection 
        id="precision"
        imageSrc="/split_precision_02.jpg"
        imagePosition="right"
        headline={['ΜΕΤΡΗΣΗ', 'ΚΑΙ ΑΚΡΙΒΕΙΑ']}
        body="Κάθε κοπή γίνεται με ψηφιακή ακρίβεια. Κάθε τοποθέτηση ελέγχεται στο χιλιοστό."
        caption="Ψηφιακή κοπή — Ποιοτικά υλικά — Εγγύηση"
        zIndex={40}
      />
      
      <SplitSection 
        id="quiet"
        imageSrc="/split_quiet_03.jpg"
        imagePosition="left"
        headline={['ΗΣΥΧΟ', 'ΣΧΕΔΙΟ']}
        body="Χωρίσματα που αφήνουν το φως να κινείται. Πόρτες που κλείνουν σιωπηλά. Καθρέφτες που μεγαλώνουν το δωμάτιο."
        caption="Εσωτερικά χωρίσματα — Πόρτες — Καθρέφτες"
        zIndex={50}
      />
      
      <SplitSection 
        id="clarity"
        imageSrc="/split_clarity_04.jpg"
        imagePosition="right"
        headline={['ΔΙΑΦΑΝΕΙΑ', 'ΣΤΗΝ ΛΕΠΤΟΜΕΡΕΙΑ']}
        body="Από το σαλόνι ως το ξενοδοχείο, το γυαλί γίνεται το σκελετό της εμπειρίας—χωρίς να το αντιλαμβάνεσαι."
        caption="Ξενοδοχεία — Κατοικίες — Επαγγελματικοί χώροι"
        zIndex={60}
      />
      
      <SplitSection 
        id="openness"
        imageSrc="/split_open_05.jpg"
        imagePosition="left"
        headline={['ΑΝΟΙΓΜΑ', 'ΣΤΟΝ ΟΡΙΖΟΝΤΑ']}
        body="Μεγάλα ανοίγματα με αντοχή στον καιρό, θόρυβο και χρόνο. Σχεδιασμένα για κτίρια που αντέχουν."
        caption="Εξωτερικά ανοίγματα — Θερμομόνωση — Ασφάλεια"
        zIndex={70}
      />
      
      <SplitSection 
        id="durable"
        imageSrc="/split_durable_06.jpg"
        imagePosition="right"
        headline={['ΚΑΤΑΣΚΕΥΑΣΜΕΝΟ', 'ΝΑ ΑΝΤΕΧΕΙ']}
        body="Επιλέγουμε υλικά με πιστοποίηση, τοποθετούμε με πρωτόκολλα ασφαλείας και μένουμε δίπλα σου για όσο χρειαστεί."
        caption="Ασφάλεια — Εγγύηση — Υποστήριξη"
        zIndex={80}
        hasFeatureList={true}
        features={['• Εγγύηση τοποθέτησης', '• Συντήρηση & υποστήριξη']}
      />

      {/* Flowing Sections */}
      <ServicesSection />
      <ProcessContactSection />
    </main>
  );
}

export default App;
