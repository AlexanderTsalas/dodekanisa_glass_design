import { useEffect } from 'react';

export default function Process() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const steps = [
        {
            num: '01',
            title: 'ΚΑΤΑΝΟΗΣΗ & ΜΕΤΡΗΣΗ',
            desc: 'Κάθε έργο ξεκινά με την επιτόπια επίσκεψη. Μετράμε τον χώρο με τεχνολογία λέιζερ απόλυτης ακρίβειας. Κατανοούμε τις τεχνικές απαιτήσεις σας, την αισθητική κατεύθυνση και τον προϋπολογισμό της κατασκευής.',
            detail: 'Η σωστή αρχιτεκτονική αποτύπωση εγγυάται ότι δεν θα υπάρξουν εκπλήξεις.'
        },
        {
            num: '02',
            title: 'ΣΧΕΔΙΑΣΜΟΣ & ΠΡΟΤΑΣΗ',
            desc: 'Βασισμένοι στα δεδομένα, επιλέγουμε τα κατάλληλα κρύσταλλα (πάχος, ιδιότητες ασφαλείας, φινίρισμα) και τα εξαρτήματα στήριξης, προσφέροντας μια λεπτομερή και ξεκάθαρη τεχνική-οικονομική πρόταση.',
            detail: 'Συνεργαζόμαστε με μηχανικούς για την απόλυτη ταύτιση με τα σχέδια.'
        },
        {
            num: '03',
            title: 'ΠΑΡΑΓΩΓΗ & ΚΟΠΗ',
            desc: 'Η παραγγελία των κρυστάλλων και η κοπή τους πραγματοποιείται σε ψηφιακά ελεγχόμενα μηχανήματα (CNC) για τέλεια εφαρμογή. Όλα τα κρύσταλλα περνούν από αυστηρό και άκαμπτο ποιοτικό έλεγχο.',
            detail: 'Χρησιμοποιούμε πρωτογενή ευρωπαϊκά κρύσταλλα με πιστοποιήσεις CE.'
        },
        {
            num: '04',
            title: 'ΑΣΦΑΛΗΣ ΤΟΠΟΘΕΤΗΣΗ',
            desc: 'Το εξειδικευμένο, πιστοποιημένο συνεργείο μας αναλαμβάνει την τοποθέτηση τηρώντας αυστηρά όλα τα εγκεκριμένα πρωτόκολλα ασφαλείας, προστατεύοντας τον χώρο σας από φθορές.',
            detail: 'Παραδίδουμε το έργο καθαρό, στιλβωμένο και έτοιμο προς χρήση.'
        },
    ];

    return (
        <main data-theme="light" className="bg-[#E9EAEC] min-h-screen text-[#0B0C0E] selection:bg-[#3F4CCB] selection:text-white relative overflow-x-hidden">
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] lg:w-[1000px] lg:h-[1000px] bg-[#3F4CCB] rounded-full blur-[120px] lg:blur-[200px] opacity-[0.08] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-32 lg:pt-48 pb-12 relative z-10">

                {/* Header Section */}
                <div className="mb-24 lg:mb-40 text-center lg:text-left reveal-fade-in">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[rgba(11,12,14,0.1)] bg-[rgba(11,12,14,0.03)] backdrop-blur-md mb-8 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#3F4CCB] animate-ping"></span>
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0B0C0E]">Βημα προς βημα</span>
                    </div>
                    <h1 className="headline-xl text-[clamp(48px,8vw,130px)] leading-[0.9] tracking-tight mb-8 drop-shadow-sm text-[#0B0C0E]">
                        Η <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B0C0E] via-[#0B0C0E]/90 to-[#6D7278]">ΔΙΑΔΙΚΑΣΙΑ</span>
                    </h1>
                    <p className="text-[#6D7278] text-lg lg:text-2xl max-w-3xl font-medium leading-relaxed">
                        Διαφάνεια σε κάθε βήμα. Από την πρώτη αρχιτεκτονική μελέτη του χώρου σας μέχρι το τελικό γυάλισμα και την παράδοση στο χέρι.
                    </p>
                </div>

                {/* STACKED STICKY CARDS TIMELINE */}
                <div className="relative pb-[30vh]">
                    {steps.map((step, index) => (
                        <div
                            key={step.num}
                            className="sticky w-full mb-8 lg:mb-12 transition-all duration-700 ease-out"
                            style={{
                                top: `calc(15vh + ${index * 30}px)`,
                                zIndex: index + 10,
                            }}
                        >
                            <div className="group relative overflow-hidden rounded-[2rem] lg:rounded-[3rem] bg-[rgba(255,255,255,0.7)] border border-[rgba(11,12,14,0.06)] backdrop-blur-2xl shadow-[0_-10px_40px_rgba(11,12,14,0.05)] p-8 lg:p-16 flex flex-col md:flex-row items-start md:items-center gap-12 lg:gap-24 hover:border-[rgba(63,76,203,0.3)] transition-colors duration-500">

                                {/* Dynamic Hover Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#3F4CCB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                {/* Giant Background Number */}
                                <div className="absolute -right-4 -bottom-16 lg:-right-10 lg:-bottom-24 text-[180px] lg:text-[320px] font-display font-black text-[#0B0C0E]/[0.03] select-none pointer-events-none leading-none tracking-tighter group-hover:text-[#3F4CCB]/5 transition-colors duration-700">
                                    {step.num}
                                </div>

                                {/* Left: Step Info */}
                                <div className="flex-1 relative z-10 w-full">
                                    <div className="flex items-center gap-4 mb-6 lg:mb-8">
                                        <div className="w-12 h-12 rounded-full border border-[#3F4CCB] flex items-center justify-center bg-[#3F4CCB]/10 text-[#3F4CCB] font-mono font-bold text-xl shadow-[0_0_20px_rgba(63,76,203,0.3)]">
                                            {step.num}
                                        </div>
                                        <div className="h-px bg-[#3F4CCB]/30 flex-1 max-w-[100px]" />
                                    </div>

                                    <h2 className="headline-lg text-3xl lg:text-5xl text-[#0B0C0E] mb-6 leading-[1.1]">
                                        {step.title}
                                    </h2>

                                    <p className="text-[#6D7278] text-base lg:text-xl leading-relaxed mb-8 max-w-2xl group-hover:text-[#0B0C0E]/80 transition-colors duration-500">
                                        {step.desc}
                                    </p>

                                    <div className="inline-flex items-start lg:items-center gap-4 py-4 px-6 rounded-2xl bg-[rgba(11,12,14,0.03)] border border-[rgba(11,12,14,0.05)] w-full max-w-2xl group-hover:bg-white/50 transition-colors duration-500">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3F4CCB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1 lg:mt-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                        <span className="text-[#0B0C0E] font-medium tracking-wide text-sm lg:text-base">
                                            {step.detail}
                                        </span>
                                    </div>
                                </div>

                                {/* Right: Aesthetic Geometric Element */}
                                <div className="hidden lg:flex w-1/4 aspect-square rounded-full border border-[#0B0C0E]/5 relative items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="absolute inset-4 rounded-full border border-[#0B0C0E]/10 border-dashed animate-[spin_60s_linear_infinite]" />
                                    <div className="absolute inset-10 rounded-full border border-[#3F4CCB]/20 animate-[spin_40s_linear_infinite_reverse]" />
                                    <div className="w-1/3 h-1/3 bg-[#3F4CCB]/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Final CTA Strip */}
                <div className="mt-12 mb-24 relative z-20 text-center flex flex-col items-center reveal-fade-in">
                    <h2 className="headline-lg text-[clamp(32px,5vw,64px)] text-[#0B0C0E] mb-8">ΕΤΟΙΜΟΙ ΝΑ ΞΕΚΙΝΗΣΟΥΜΕ;</h2>
                    <a href="/contact" className="group flex items-center gap-4 px-10 py-5 bg-[#0B0C0E] text-white font-display font-bold text-base lg:text-lg rounded-full hover:bg-[#3F4CCB] hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(11,12,14,0.15)]">
                        Επικοινωνήστε μαζί μας
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>

            </div>
        </main>
    );
}
