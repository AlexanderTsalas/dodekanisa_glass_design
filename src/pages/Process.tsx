import { useEffect } from 'react';

export default function Process() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const steps = [
        {
            num: '01',
            title: 'ΚΑΤΑΝΟΗΣΗ & ΜΕΤΡΗΣΗ',
            desc: 'Κάθε έργο ξεκινά με την επιτόπια επίσκεψη. Μετράμε τον χώρο με λέιζερ ακριβείας και κατανοούμε τις τεχνικές απαιτήσεις, την αισθητική και τον προϋπολογισμό σας.',
            detail: 'Η σωστή αποτύπωση εγγυάται ότι δεν θα υπάρξουν εκπλήξεις στο τέλος.'
        },
        {
            num: '02',
            title: 'ΣΧΕΔΙΑΣΜΟΣ & ΠΡΟΤΑΣΗ',
            desc: 'Βασισμένοι στα δεδομένα, επιλέγουμε τα κατάλληλα κρύσταλλα (πάχος, ιδιότητες, φινίρισμα) και τα εξαρτήματα στήριξης, προσφέροντας μια λεπτομερή και ξεκάθαρη οικονομική προσφορά.',
            detail: 'Συνεργαζόμαστε με αρχιτέκτονες και μηχανικούς για την απόλυτη ταύτιση με τα σχέδια.'
        },
        {
            num: '03',
            title: 'ΠΑΡΑΓΩΓΗ & ΚΟΠΗ',
            desc: 'Η παραγγελία των κρυστάλλων και η κοπή τους γίνεται σε ψηφιακά ελεγχόμενα μηχανήματα (CNC) για τέλεια εφαρμογή. Όλα τα κρύσταλλα περνούν από αυστηρό ποιοτικό έλεγχο.',
            detail: 'Χρησιμοποιούμε μόνο ευρωπαϊκά κρύσταλλα με πιστοποιήσεις CE.'
        },
        {
            num: '04',
            title: 'ΑΣΦΑΛΗΣ ΤΟΠΟΘΕΤΗΣΗ',
            desc: 'Το πιστοποιημένο συνεργείο μας αναλαμβάνει την τοποθέτηση τηρώντας όλα τα πρωτόκολλα ασφαλείας, προστατεύοντας τον χώρο σας από φθορές.',
            detail: 'Παραδίδουμε το έργο καθαρό και έτοιμο προς χρήση.'
        },
    ];

    return (
        <main data-theme="light" className="bg-[#E9EAEC] min-h-screen pt-32 pb-24 text-[#0B0C0E]">
            <div className="max-w-5xl mx-auto px-6 lg:px-16">

                <div className="mb-24 text-center">
                    <h1 className="headline-xl text-[clamp(40px,8vw,96px)] mb-6">Η ΔΙΑΔΙΚΑΣΙΑ</h1>
                    <p className="text-[#6D7278] text-lg lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Διαφάνεια σε κάθε βήμα. Από την πρώτη ματιά του χώρου σας μέχρι το τελικό γυάλισμα.
                    </p>
                </div>

                <div className="relative pl-8 md:pl-0">
                    {/* Timeline Line */}
                    <div className="absolute left-[39px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-[rgba(11,12,14,0.1)]"></div>

                    <div className="space-y-24">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={step.num} className={`relative flex flex-col md:flex-row ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} justify-between items-center w-full reveal-fade-in`}>

                                    {/* Timeline Dot */}
                                    <div className="absolute left-[-17px] md:left-1/2 md:-translate-x-1/2 w-14 h-14 bg-[#3F4CCB] rounded-full flex items-center justify-center shadow-xl z-10 border-4 border-[#E9EAEC]">
                                        <span className="text-white font-display font-bold text-lg">{step.num}</span>
                                    </div>

                                    <div className="w-full md:w-5/12 ml-12 md:ml-0">
                                        <div className={`p-8 bg-white rounded-2xl shadow-sm border border-[rgba(11,12,14,0.05)] ${isEven ? 'md:text-right' : 'md:text-left'} transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl`}>
                                            <h2 className="headline-lg text-2xl mb-4 text-[#0B0C0E]">{step.title}</h2>
                                            <p className="text-[#6D7278] leading-relaxed mb-6">
                                                {step.desc}
                                            </p>
                                            <div className={`pt-4 border-t border-[rgba(11,12,14,0.05)] text-sm font-medium text-[#3F4CCB]`}>
                                                {step.detail}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden md:block w-5/12"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </main>
    );
}
