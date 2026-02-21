import { HeroSection, SplitSection, ServicesSection, ProcessContactSection } from '../components/HomeComponents';

export default function Home() {
    return (
        <main className="relative z-0">
            {/* Grain Overlay */}
            <div className="grain-overlay" />

            {/* Pinned Sections */}
            <HeroSection />

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
                id="strength"
                imageSrc="/split_open_05.jpg"
                imagePosition="left"
                headline={['ΑΝΤΟΧΗ', 'ΣΤΟΝ ΧΡΟΝΟ']}
                body="Επιλέγουμε κρύσταλλα ασφαλείας και ενεργειακούς υαλοπίνακες που αντέχουν στις σκληρές συνθήκες."
                caption="Securit — Triplex — Ενεργειακά"
                zIndex={70}
            />

            <SplitSection
                id="craft"
                imageSrc="/split_durable_06.jpg"
                imagePosition="right"
                headline={['Η ΤΕΧΝΗ', 'ΤΟΥ ΓΥΑΛΙΟΥ']}
                body="Δεν είμαστε απλώς τοποθετητές. Είμαστε τεχνίτες ενός υλικού που απαιτεί σεβασμό και απόλυτη γνώση."
                caption="Εξειδίκευση 30 ετών — Παραδοσιακές & Σύγχρονες τεχνικές"
                zIndex={80}
            />

            <ServicesSection />
            <ProcessContactSection />
        </main>
    );
}
