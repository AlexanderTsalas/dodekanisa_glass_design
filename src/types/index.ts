import type { LucideIcon } from 'lucide-react';

export interface SiteSettings {
    companyName: string;
    copyrightYear: number;
    designerName: string;
    designerUrl: string;
}

export interface SocialLink {
    platform: string;
    url: string;
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
    exact?: boolean;
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

export interface ProcessStep {
    num: string;
    title: string;
    desc: string;
    detail: string;
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
