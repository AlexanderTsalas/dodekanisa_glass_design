interface LoadingScreenProps {
    message?: string;
    className?: string;
}

export function LoadingScreen({ message = 'ΦΟΡΤΩΣΗ...', className = '' }: LoadingScreenProps) {
    return (
        <div className={`min-h-screen flex flex-col items-center justify-center ${className}`}>
            <div className="w-12 h-12 border-4 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin mb-6"></div>
            <p className="text-brand-muted font-display uppercase tracking-widest text-sm animate-pulse">{message}</p>
        </div>
    );
}

export function ErrorScreen({ message = 'Σφάλμα φόρτωσης δεδομένων.' }: { message?: string }) {
    return (
        <div className="min-h-screen pt-48 pb-32 flex items-center justify-center">
            <p className="text-red-500 font-display">{message}</p>
        </div>
    );
}
