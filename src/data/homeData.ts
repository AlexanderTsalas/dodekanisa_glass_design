import { Sun, Thermometer, VolumeX, Scissors, Diamond, CheckCircle2, SplitSquareHorizontal, DoorOpen, Frame, Building2, Home as HomeIcon, Briefcase, ShieldCheck, Layers, Leaf, Clock, Hammer, Cpu, LayoutGrid, Component, PanelRightOpen } from 'lucide-react';
import type { HomeSplit } from '../types';

export const homeSplits: HomeSplit[] = [
    {
        id: "quiet",
        imageSrc: "/split_quiet_03.jpg",
        imagePosition: "left",
        headline: ['ΑΡΜΟΝΙΚΟ ΣΧΕΔΙΟ'],
        body: "Χωρίσματα που αφήνουν το φως να κινείται. Πόρτες που κλείνουν σιωπηλά. Καθρέφτες που μεγαλώνουν το δωμάτιο.",
        caption: "Όλες οι υπηρεσίες μας για κάθε αρχιτεκτονική ανάγκη",
        iconBoxes: [
            { icon: SplitSquareHorizontal, text: 'Εσωτερικά χωρίσματα', link: '/projects?category=Χωρίσματα' },
            { icon: DoorOpen, text: 'Πόρτες', link: '/projects?category=Πόρτες' },
            { icon: Frame, text: 'Καθρέφτες', link: '/projects?category=Καθρέφτες' },
            { icon: PanelRightOpen, text: 'Εξωτερικά ανοίγματα', link: '/projects?category=Εξωτερικά' },
            { icon: LayoutGrid, text: 'Κάγκελα & σκάλες', link: '/projects?category=Κάγκελα' },
            { icon: Component, text: 'Ειδικές κατασκευές', link: '/projects?category=Ειδικές' }
        ]
    },
    {
        id: "light",
        imageSrc: "/split_light_01.jpg",
        imagePosition: "right",
        headline: ['ΤΟ ΦΩΣ', 'ΕΙΝΑΙ ΥΛΙΚΟ'],
        body: "Σχεδιάζουμε γυαλί που δεν χωρίζει, ενώνει. Εσωτερικούς χώρους που αναπνέουν και εξωτερικές όψεις που αντέχουν.",
        caption: "Φυσικός φωτισμός — Θερμομόνωση — Ηχομόνωση",
        iconBoxes: [
            { icon: Sun, text: 'Φυσικός φωτισμός' },
            { icon: Thermometer, text: 'Θερμομόνωση' },
            { icon: VolumeX, text: 'Ηχομόνωση' }
        ]
    },
    {
        id: "clarity",
        imageSrc: "/split_clarity_04.jpg",
        imagePosition: "left",
        headline: ['ΔΙΑΦΑΝΕΙΑ', 'ΣΤΗΝ ΛΕΠΤΟΜΕΡΕΙΑ'],
        body: "Από το σαλόνι ως το ξενοδοχείο, το γυαλί γίνεται το σκελετό της εμπειρίας—χωρίς να το αντιλαμβάνεσαι.",
        caption: "Ξενοδοχεία — Κατοικίες — Επαγγελματικοί χώροι",
        iconBoxes: [
            { icon: Building2, text: 'Ξενοδοχεία', link: '/projects?category=Ξενοδοχεία' },
            { icon: HomeIcon, text: 'Κατοικίες', link: '/projects?category=Κατοικίες' },
            { icon: Briefcase, text: 'Επαγγελματικοί χώροι', link: '/projects?category=Επαγγελματικοί χώροι' }
        ]
    },
    {
        id: "precision",
        imageSrc: "/split_precision_02.jpg",
        imagePosition: "right",
        headline: ['ΜΕΤΡΗΣΗ', 'ΚΑΙ ΑΚΡΙΒΕΙΑ'],
        body: "Κάθε κοπή γίνεται με ψηφιακή ακρίβεια. Κάθε τοποθέτηση ελέγχεται στο χιλιοστό.",
        caption: "Ψηφιακή κοπή — Ποιοτικά υλικά — Εγγύηση",
        iconBoxes: [
            { icon: Scissors, text: 'Κατανόηση & Μέτρηση', detail: 'Κάθε έργο ξεκινά με επιτόπια επίσκεψη. Μετράμε τον χώρο με τεχνολογία λέιζερ απόλυτης ακρίβειας, κατανοώντας τις τεχνικές απαιτήσεις και την αισθητική.' },
            { icon: Diamond, text: 'Παραγωγή & Κοπή', detail: 'Η παραγγελία των κρυστάλλων και η κοπή τους πραγματοποιείται σε ψηφιακά ελεγχόμενα μηχανήματα για τέλεια εφαρμογή και αυστηρό ποιοτικό έλεγχο.' },
            { icon: CheckCircle2, text: 'Ασφαλής Τοποθέτηση', detail: 'Το εξειδικευμένο συνεργείο μας αναλαμβάνει την τοποθέτηση τηρώντας αυστηρά όλα τα εγκεκριμένα πρωτόκολλα ασφαλείας, παραδίδοντας το έργο καθαρό.' }
        ]
    },
    {
        id: "strength",
        imageSrc: "/split_open_05.jpg",
        imagePosition: "left",
        headline: ['ΑΝΤΟΧΗ', 'ΣΤΟΝ ΧΡΟΝΟ'],
        body: "Επιλέγουμε κρύσταλλα ασφαλείας και ενεργειακούς υαλοπίνακες που αντέχουν στις σκληρές συνθήκες.",
        caption: "Securit — Triplex — Ενεργειακά",
        iconBoxes: [
            { icon: ShieldCheck, text: 'Securit' },
            { icon: Layers, text: 'Triplex' },
            { icon: Leaf, text: 'Ενεργειακά' }
        ]
    },
    {
        id: "craft",
        imageSrc: "/split_durable_06.jpg",
        imagePosition: "right",
        headline: ['Η ΤΕΧΝΗ', 'ΤΟΥ ΓΥΑΛΙΟΥ'],
        body: "Δεν είμαστε απλώς τοποθετητές. Είμαστε τεχνίτες ενός υλικού που απαιτεί σεβασμό και απόλυτη γνώση.",
        caption: "Εξειδίκευση 30 ετών — Παραδοσιακές — Σύγχρονες τεχνικές",
        iconBoxes: [
            { icon: Clock, text: 'Εξειδίκευση 30 ετών' },
            { icon: Hammer, text: 'Παραδοσιακές τεχνικές' },
            { icon: Cpu, text: 'Σύγχρονες τεχνικές' }
        ]
    }
];
