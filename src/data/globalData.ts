import type { SiteSettings, NavigationItem, SocialLink } from '../types';

export const siteSettings: SiteSettings = {
    companyName: 'Dodekanisa Glass',
    copyrightYear: new Date().getFullYear(),
    designerName: 'Distarter',
    designerUrl: 'https://distarter.com',
};

export const navigationData: NavigationItem[] = [
    { label: 'Αρχική', path: '/', exact: true },
    { label: 'Υπηρεσίες', path: '/services' },
    { label: 'Έργα', path: '/projects' },
    { label: 'Επικοινωνία', path: '/contact' },
];

export const socialLinks: SocialLink[] = [
    // Example: { platform: 'Facebook', url: 'https://facebook.com' }
];
