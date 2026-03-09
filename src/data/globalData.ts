import type { SiteSettings, NavigationItem } from '../types';

export const siteSettings: SiteSettings = {
    companyName: 'Diamond Glass',
    copyrightYear: new Date().getFullYear(),
    designerName: 'Distarter',
    designerUrl: 'https://distarter.com',
};

export const navigationData: NavigationItem[] = [
    { label: 'Αρχική', path: '/' },
    { label: 'Υπηρεσίες', path: '/services' },
    { label: 'Έργα', path: '/projects' },
    { label: 'Επικοινωνία', path: '/contact' },
];
