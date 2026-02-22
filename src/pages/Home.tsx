import { HeroSection, SplitSection, HomeContactSection } from '../components/HomeComponents';
import { Sun, Thermometer, VolumeX, Scissors, Diamond, CheckCircle2, SplitSquareHorizontal, DoorOpen, Frame, Building2, Home as HomeIcon, Briefcase, ShieldCheck, Layers, Leaf, Clock, Hammer, Cpu } from 'lucide-react';

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
                iconBoxes={[{ icon: Sun, text: 'Φυσικός φωτισμός' }, { icon: Thermometer, text: 'Θερμομόνωση' }, { icon: VolumeX, text: 'Ηχομόνωση' }]}
                zIndex={30}
            />

            <SplitSection
                id="precision"
                imageSrc="/split_precision_02.jpg"
                imagePosition="right"
                headline={['ΜΕΤΡΗΣΗ', 'ΚΑΙ ΑΚΡΙΒΕΙΑ']}
                body="Κάθε κοπή γίνεται με ψηφιακή ακρίβεια. Κάθε τοποθέτηση ελέγχεται στο χιλιοστό."
                caption="Ψηφιακή κοπή — Ποιοτικά υλικά — Εγγύηση"
                iconBoxes={[{ icon: Scissors, text: 'Ψηφιακή κοπή' }, { icon: Diamond, text: 'Ποιοτικά υλικά' }, { icon: CheckCircle2, text: 'Εγγύηση' }]}
                zIndex={40}
            />

            <SplitSection
                id="quiet"
                imageSrc="/split_quiet_03.jpg"
                imagePosition="left"
                headline={['ΑΡΜΟΝΙΚΟ ΣΧΕΔΙΟ']}
                body="Χωρίσματα που αφήνουν το φως να κινείται. Πόρτες που κλείνουν σιωπηλά. Καθρέφτες που μεγαλώνουν το δωμάτιο."
                caption="Εσωτερικά χωρίσματα — Πόρτες — Καθρέφτες"
                iconBoxes={[{ icon: SplitSquareHorizontal, text: 'Εσωτερικά χωρίσματα' }, { icon: DoorOpen, text: 'Πόρτες' }, { icon: Frame, text: 'Καθρέφτες' }]}
                zIndex={50}
            />

            <SplitSection
                id="clarity"
                imageSrc="/split_clarity_04.jpg"
                imagePosition="right"
                headline={['ΔΙΑΦΑΝΕΙΑ', 'ΣΤΗΝ ΛΕΠΤΟΜΕΡΕΙΑ']}
                body="Από το σαλόνι ως το ξενοδοχείο, το γυαλί γίνεται το σκελετό της εμπειρίας—χωρίς να το αντιλαμβάνεσαι."
                caption="Ξενοδοχεία — Κατοικίες — Επαγγελματικοί χώροι"
                iconBoxes={[{ icon: Building2, text: 'Ξενοδοχεία' }, { icon: HomeIcon, text: 'Κατοικίες' }, { icon: Briefcase, text: 'Επαγγελματικοί χώροι' }]}
                zIndex={60}
            />

            <SplitSection
                id="strength"
                imageSrc="/split_open_05.jpg"
                imagePosition="left"
                headline={['ΑΝΤΟΧΗ', 'ΣΤΟΝ ΧΡΟΝΟ']}
                body="Επιλέγουμε κρύσταλλα ασφαλείας και ενεργειακούς υαλοπίνακες που αντέχουν στις σκληρές συνθήκες."
                caption="Securit — Triplex — Ενεργειακά"
                iconBoxes={[{ icon: ShieldCheck, text: 'Securit' }, { icon: Layers, text: 'Triplex' }, { icon: Leaf, text: 'Ενεργειακά' }]}
                zIndex={70}
            />

            <SplitSection
                id="craft"
                imageSrc="/split_durable_06.jpg"
                imagePosition="right"
                headline={['Η ΤΕΧΝΗ', 'ΤΟΥ ΓΥΑΛΙΟΥ']}
                body="Δεν είμαστε απλώς τοποθετητές. Είμαστε τεχνίτες ενός υλικού που απαιτεί σεβασμό και απόλυτη γνώση."
                caption="Εξειδίκευση 30 ετών — Παραδοσιακές — Σύγχρονες τεχνικές"
                iconBoxes={[{ icon: Clock, text: 'Εξειδίκευση 30 ετών' }, { icon: Hammer, text: 'Παραδοσιακές τεχνικές' }, { icon: Cpu, text: 'Σύγχρονες τεχνικές' }]}
                zIndex={80}
            />

            <HomeContactSection />
        </main>
    );
}
