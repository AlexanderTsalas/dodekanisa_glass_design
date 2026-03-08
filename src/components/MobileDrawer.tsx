'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MobileDrawerProps {
    icon: LucideIcon;
    title: string;
    children: React.ReactNode;
}

export function MobileDrawer({ icon: Icon, title, children }: MobileDrawerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div className="lg:hidden fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
            {isOpen && (
                <div
                    ref={drawerRef}
                    className="mb-4 bg-white/95 backdrop-blur-xl border border-brand-dark/10 rounded-2xl shadow-[0_8px_32px_rgba(11,12,14,0.15)] p-5 w-64 max-h-[60vh] overflow-y-auto pointer-events-auto origin-bottom-right animate-in fade-in zoom-in-95 duration-200"
                >
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-brand-muted border-b border-brand-dark/10 pb-3 mb-4 font-bold">{title}</h3>
                    {children}
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Κλείσιμο' : title}
                className="w-14 h-14 bg-brand-dark text-white rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(11,12,14,0.3)] hover:bg-brand-accent transition-colors pointer-events-auto"
            >
                {isOpen ? <X size={24} /> : <Icon size={24} />}
            </button>
        </div>,
        document.body
    );
}
