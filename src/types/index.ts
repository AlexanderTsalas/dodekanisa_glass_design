import type { LucideIcon } from 'lucide-react';

export interface SiteSettings {
    companyName: string;
    copyrightYear: number;
    designerName: string;
    designerUrl: string;
}

export interface ContactHero {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    desc: string;
    formPlaceholders: {
        name: string;
        phone: string;
        email: string;
        subject: string;
        message: string;
        button: string;
    };
}

export interface ContactMethod {
    id: number;
    icon: LucideIcon;
    title: string;
    value: string;
    link: string | null;
}

export interface NavigationItem {
    label: string;
    path: string;
}

export interface ServiceItem {
    id: string;
    title: string;
    shortName: string;
    image: string;
    desc: string;
    features: string[];
    specs: {
        [key: string]: string;
    };
}

export interface IconBox {
    icon: LucideIcon;
    text: string;
    link?: string;
    detail?: string;
}

export interface HomeSplit {
    id: string;
    imageSrc: string;
    imagePosition: 'left' | 'right';
    headline: string[];
    body: string;
    caption: string;
    iconBoxes: IconBox[];
}
