import Link from 'next/link';

interface CTASectionProps {
    heading: string;
    buttonText: string;
    href?: string;
}

export function CTASection({ heading, buttonText, href = '/contact' }: CTASectionProps) {
    return (
        <div className="mt-24 mb-24 relative z-20 text-center flex flex-col items-center">
            <h2 className="headline-lg text-[clamp(28px,4vw,56px)] text-brand-dark mb-8">{heading}</h2>
            <Link
                href={href}
                className="group flex items-center gap-4 px-10 py-5 bg-white/20 backdrop-blur-lg border border-brand-dark text-brand-dark font-display font-medium text-base lg:text-lg rounded-full hover:bg-brand-dark hover:text-brand-light transition-all duration-300 shadow-[0_8px_32px_rgba(11,12,14,0.08)]"
            >
                {buttonText}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>
        </div>
    );
}
