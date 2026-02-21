export interface TechnicalSpec {
    label: string;
    value: string;
}

export interface Project {
    id: string;
    title: string;
    client: string;
    location: string;
    category: 'Κατοικίες' | 'Ξενοδοχεία' | 'Επαγγελματικοί Χώροι' | 'Ειδικές Κατασκευές';
    year: string;
    coverImage: string;
    galleryImages: string[];
    description: string;
    technicalSpecs: TechnicalSpec[];
}

export const projectsData: Project[] = [
    {
        id: 'villa-horizon-lindos',
        title: 'Villa Horizon',
        client: 'Ιδιωτική Κατοικία',
        location: 'Λίνδος, Ρόδος',
        category: 'Κατοικίες',
        year: '2025',
        coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: [
            'https://images.unsplash.com/photo-1600607687931-ce8e0026e570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
        ],
        description: 'Μια εντυπωσιακή βίλα στην πλαγιά της Λίνδου όπου τα όρια μεταξύ εσωτερικού και εξωτερικού χώρου καταργούνται. Εγκαταστάθηκαν frameless υαλοπετάσματα ύψους 4 μέτρων προσφέροντας ανεμπόδιστη θέα στο απέραντο γαλάζιο, καθώς και γυάλινα υπερχειλισμένα τοιχώματα πισίνας.',
        technicalSpecs: [
            { label: 'Υαλοπετάσματα', value: 'Low-E Argon 6-16-6' },
            { label: 'Κάγκελα', value: 'Triplex Securit 10+10mm SentryGlas' },
            { label: 'Πισίνα', value: 'Structural Glass 12+12+12mm' }
        ]
    },
    {
        id: 'aegean-blue-resort',
        title: 'Aegean Blue Resort',
        client: 'Όμιλος Φιλοξενίας',
        location: 'Κολύμπια, Ρόδος',
        category: 'Ξενοδοχεία',
        year: '2024',
        coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: [
            'https://images.unsplash.com/photo-1542314831-c6a4d14abace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
        ],
        description: 'Πλήρης ανακαίνιση 150 δωματίων και κοινόχρηστων χώρων. Σχεδιάσαμε και τοποθετήσαμε αόρατα διαχωριστικά μπάνιου, καθρέφτες LED custom διαστάσεων, και ενεργειακά κουφώματα στα μπαλκόνια για μέγιστη ηχομόνωση και εξοικονόμηση ενέργειας.',
        technicalSpecs: [
            { label: 'Διαχωριστικά', value: 'Securit 10mm Extra Clear' },
            { label: 'Καθρέφτες', value: 'Copper-free 5mm με LED' },
            { label: 'Ενεργειακά Κρύσταλλα', value: 'Energy N 4X εποχών' }
        ]
    },
    {
        id: 'tech-hub-offices',
        title: 'Κεντρικά Γραφεία Δωδεκανήσου',
        client: 'Ανώνυμη Εταιρεία',
        location: 'Κέντρο, Ρόδος',
        category: 'Επαγγελματικοί Χώροι',
        year: '2024',
        coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: [
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
        ],
        description: 'Διαμόρφωση ενός υπερσύγχρονου open-space γραφείου 500 τ.μ. Χρησιμοποιήθηκαν ηχομονωτικά γυάλινα χωρίσματα με ενσωματωμένες περσίδες για τα meeting rooms, πετυχαίνοντας τον τέλειο συνδυασμό διαφάνειας και ιδιωτικότητας.',
        technicalSpecs: [
            { label: 'Χωρίσματα', value: 'Triplex Acoustic 6+6mm' },
            { label: 'Πόρτες', value: 'Γυάλινες πόρτες με μηχανισμούς δαπέδου' },
            { label: 'Ακουστική', value: 'Ηχομείωση 44dB' }
        ]
    },
    {
        id: 'glass-bridge-atrium',
        title: 'Γυάλινη Γέφυρα Αιθρίου',
        client: 'Εμπορικό Κέντρο',
        location: 'Ιαλυσός, Ρόδος',
        category: 'Ειδικές Κατασκευές',
        year: '2023',
        coverImage: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: [
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1541888087856-bb6fc367f0f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
        ],
        description: 'Μια από τις πιο απαιτητικές μηχανικά κατασκευές μας. Υλοποιήσαμε μια γυάλινη γέφυρα μήκους 8 μέτρων που ενώνει δύο πτέρυγες, χρησιμοποιώντας φέροντα στοιχεία δομικού γυαλιού χωρίς χρήση μετάλλου για απόλυτη διαφάνεια.',
        technicalSpecs: [
            { label: 'Δάπεδο', value: 'Triplex Structural 12+12+12+12mm' },
            { label: 'Στήριξη', value: 'Structural Glazing' },
            { label: 'Αντοχή', value: '800kg/m² φορτίο' }
        ]
    },
    // Adding 16 more diverse mock projects to reach 20
    {
        id: 'minimal-penthouse',
        title: 'Skyline Penthouse',
        client: 'Ιδιωτική Κατοικία',
        location: 'Κως',
        category: 'Κατοικίες',
        year: '2024',
        coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3'],
        description: 'Minimal ρετιρέ με αόρατα μπαλκόνια και εσωτερικές γυάλινες βιβλιοθήκες.',
        technicalSpecs: [{ label: 'Κάγκελα', value: 'Αόρατο προφίλ ενδοδαπέδιο 10+10mm' }]
    },
    {
        id: 'boutique-winery',
        title: 'Ορεινό Οινοποιείο',
        client: 'Οινοποιία',
        location: 'Έμπωνας, Ρόδος',
        category: 'Επαγγελματικοί Χώροι',
        year: '2023',
        coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1506048123019-21669466810a?ixlib=rb-4.0.3'],
        description: 'Γυάλινες επενδύσεις στον χώρο γευσιγνωσίας που βλέπουν τα βαρέλια παλαίωσης, κρατώντας σταθερή την θερμοκρασία του κελαριού.',
        technicalSpecs: [{ label: 'Θερμομόνωση', value: 'Argon Triplex' }]
    },
    {
        id: 'yacht-club-pavilion',
        title: 'Marina Yacht Club',
        client: 'Mandraki Marina',
        location: 'Μανδράκι, Ρόδος',
        category: 'Ειδικές Κατασκευές',
        year: '2025',
        coverImage: 'https://images.unsplash.com/photo-1510312305653-8ed496efae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1494607239400-ff147da48308?ixlib=rb-4.0.3'],
        description: 'Θολωτή γυάλινη κατασκευή υψηλής αντοχής για το κεντρικό εστιατόριο της μαρίνας.',
        technicalSpecs: [{ label: 'Τύπος', value: 'Καμπύλο Structural Glass 10mm' }]
    },
    {
        id: 'eco-lodge-retreat',
        title: 'Eco Lodge Retreat',
        client: 'Boutique Hotel',
        location: 'Προφήτης Ηλίας',
        category: 'Ξενοδοχεία',
        year: '2024',
        coverImage: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1542314831-c6a4d14abace?ixlib=rb-4.0.3'],
        description: 'Εκκεντρικά γυάλινα δωμάτια μέσα στο δάσος, προσφέροντας παρατήρηση του ουρανού με προστασία από το κρύο.',
        technicalSpecs: [{ label: 'Κρύσταλλα', value: 'Low-E Thermal 8-16-8' }]
    },
    {
        id: 'urban-loft',
        title: 'Βιομηχανικό Loft',
        client: 'Ιδιωτική Κατοικία',
        location: 'Παλιά Πόλη, Ρόδος',
        category: 'Κατοικίες',
        year: '2023',
        coverImage: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1505691938895-1758d7bef511?ixlib=rb-4.0.3'],
        description: 'Εσωτερικά μεταλλικά πλαίσια με γυαλί αρμέ (wire glass) για βιομηχανική αισθητική.',
        technicalSpecs: [{ label: 'Χωρίσματα', value: 'Γυαλί Αρμέ 8mm σε σιδερένιο κάνναβο' }]
    },
    {
        id: 'seafood-restaurant',
        title: 'Θαλασσινό Εστιατόριο',
        client: 'Restaurant',
        location: 'Σύμη',
        category: 'Επαγγελματικοί Χώροι',
        year: '2024',
        coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3'],
        description: 'Γυάλινες συρόμενες οροφές (pergola) για χρήση του εξωτερικού χώρου όλο τον χρόνο.',
        technicalSpecs: [{ label: 'Οροφή', value: 'Ηλεκτροκίνητο Triplex Securit 5+5' }]
    },
    {
        id: 'mirror-maze-museum',
        title: 'Illusion Museum',
        client: 'Εικαστικός Χώρος',
        location: 'Ρόδος',
        category: 'Ειδικές Κατασκευές',
        year: '2022',
        coverImage: 'https://images.unsplash.com/photo-1501349800519-48093d60bde0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?ixlib=rb-4.0.3'],
        description: 'Πολύπλοκες κατασκευές οπτικών παραισθήσεων με πάνω από 200 τ.μ. ειδικών καθρεπτών υψηλής ανακλαστικότητας.',
        technicalSpecs: [{ label: 'Καθρέφτης', value: 'High Reflective Extra-Clear 6mm' }]
    },
    {
        id: 'grand-spa-resort',
        title: 'Thalassa Spa',
        client: 'Ξενοδοχείο 5*',
        location: 'Κάρπαθος',
        category: 'Ξενοδοχεία',
        year: '2025',
        coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3'],
        description: 'Ειδυλλιακοί χώροι spa με φιμέ γυαλιά και υπερμεγέθεις πόρτες χαμάμ από αντιθαμβωτικό κρύσταλλο.',
        technicalSpecs: [{ label: 'Anti-fog', value: 'Ειδική επίστρωση νανοτεχνολογίας' }]
    },
    {
        id: 'cliffside-villa',
        title: 'The Edge Villa',
        client: 'Ιδιωτική Κατοικία',
        location: 'Λίνδος',
        category: 'Κατοικίες',
        year: '2023',
        coverImage: 'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3'],
        description: 'Γυάλινες πισίνες υπερχείλισης που μπερδεύονται οπτικά με τη θάλασσα.',
        technicalSpecs: [{ label: 'Κρύσταλλο Πισίνας', value: 'Polymer Laminated 10+10+10' }]
    },
    {
        id: 'retail-boutique',
        title: 'Luxury Retail',
        client: 'Κατάστημα Ενδυμάτων',
        location: 'Ρόδος',
        category: 'Επαγγελματικοί Χώροι',
        year: '2025',
        coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3'],
        description: 'Επιβλητικές βιτρίνες χωρίς πλαίσιο 6 μέτρων ύψους (Jumbo Size) για μαξιμαλιστική προβολή.',
        technicalSpecs: [{ label: 'Βιτρίνα', value: 'Anti-Reflective Extra Clear 12mm' }]
    },
    {
        id: 'glass-staircase',
        title: 'Floating Stairs',
        client: 'Αρχιτεκτονικό Γραφείο',
        location: 'Αφάντου',
        category: 'Ειδικές Κατασκευές',
        year: '2024',
        coverImage: 'https://images.unsplash.com/photo-1543306649-166f363065b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1543306649-166f363065b7?ixlib=rb-4.0.3'],
        description: 'Πλήρως αυτοφερόμενη γυάλινη σκάλα χωρίς μεταλλικό σκελετό.',
        technicalSpecs: [{ label: 'Σκαλοπάτια', value: 'Αντιολισθητικό Structural Glass 15+15+15mm' }]
    },
    {
        id: 'historic-renovation',
        title: 'Italian Mansion',
        client: 'Ιδιωτική Κατοικία',
        location: 'Ιταλικό Κτίριο, Μανδράκι',
        category: 'Κατοικίες',
        year: '2022',
        coverImage: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3'],
        description: 'Τοποθέτηση νέων ενεργειακών παραθύρων που μιμούνται αυστηρά τις παλιές ξύλινες φόρμες του κτιρίου.',
        technicalSpecs: [{ label: 'Τύπος', value: 'Ηχομονωτικό 6-12-8 με καΐτια' }]
    },
    {
        id: 'panoramic-elevator',
        title: 'Panoramic Lift',
        client: 'Εμπορικό Κέντρο',
        location: 'Ρόδος',
        category: 'Επαγγελματικοί Χώροι',
        year: '2024',
        coverImage: 'https://images.unsplash.com/photo-1558227038-cb0a4d048ea4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1558227038-cb0a4d048ea4?ixlib=rb-4.0.3'],
        description: 'Γυάλινο φρεάτιο ανελκυστήρα κυκλικής διατομής 12 μέτρων ύψους.',
        technicalSpecs: [{ label: 'Φρεάτιο', value: 'Καμπύλο Structural Glass 12+12mm' }]
    },
    {
        id: 'resort-cabanas',
        title: 'Beachfront Cabanas',
        client: 'Kalythea Springs Hotel',
        location: 'Καλλιθέα',
        category: 'Ξενοδοχεία',
        year: '2023',
        coverImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3'],
        description: 'Ιδιωτικές καμπάνες με πτυσσόμενα γυάλινα φυσαρμόνικα πάνελ.',
        technicalSpecs: [{ label: 'Φυσαρμόνικες', value: 'Frameless 10mm Securit' }]
    },
    {
        id: 'skylight-atrium',
        title: 'Villa Skylight',
        client: 'Ιδιωτική Κατοικία',
        location: 'Ιαλυσός',
        category: 'Κατοικίες',
        year: '2025',
        coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3'],
        description: 'Επιβλητικός φεγγίτης 25 τ.μ. πάνω από το κεντρικό living room με αυτοκαθαριζόμενο γυαλί.',
        technicalSpecs: [{ label: 'Οροφή', value: 'Self-Cleaning Triplex 8+8mm' }]
    },
    {
        id: 'art-gallery-facade',
        title: 'Modern Art Gallery',
        client: 'Δήμος Ρόδου',
        location: 'Μεσαιωνική Πόλη',
        category: 'Ειδικές Κατασκευές',
        year: '2021',
        coverImage: 'https://images.unsplash.com/photo-1456566861595-df703c6833fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1456566861595-df703c6833fe?ixlib=rb-4.0.3'],
        description: 'Πρόσοψη με υπεριώδη (UV) προστασία για τη συντήρηση πολύτιμων εκθεμάτων από την ηλιακή ακτινοβολία.',
        technicalSpecs: [{ label: 'UV Block', value: '99% UV rejection laminated' }]
    }
];
