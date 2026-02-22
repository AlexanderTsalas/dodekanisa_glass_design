import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import type { ContactMethod } from '../types';

export const contactMethods: ContactMethod[] = [
    { id: 1, icon: Mail, title: 'Email', value: 'hello@dodekanisaglass.gr', link: 'mailto:hello@dodekanisaglass.gr' },
    { id: 2, icon: Phone, title: 'Τηλέφωνο', value: '+30 22410 00000', link: 'tel:+302241000000' },
    { id: 3, icon: MapPin, title: 'Έδρα', value: '85100, Ρόδος', link: null },
    { id: 4, icon: Clock, title: 'Ωράριο', value: '09:00 - 18:00', link: null },
];

export const contactHero = {
    badge: 'Διαθεσιμοι για νεα εργα',
    titleLine1: 'Ας δημιουργήσουμε',
    titleLine2: 'κάτι κορυφαίο.',
    desc: 'Έχετε ένα όραμα; Είμαστε εδώ για να του δώσουμε μορφή με κρύσταλλο. Επικοινωνήστε απευθείας με την ομάδα μας.',
    formPlaceholders: {
        name: 'Ονοματεπώνυμο',
        phone: 'Τηλέφωνο',
        email: 'Email',
        subject: 'Θέμα (Προαιρετικό)',
        message: 'Μήνυμα',
        button: 'ΑΠΟΣΤΟΛΗ ΜΗΝΥΜΑΤΟΣ'
    }
};
