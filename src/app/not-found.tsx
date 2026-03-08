import Link from 'next/link';

export default function NotFound() {
  return (
    <main data-theme="light" className="bg-[#E9EAEC] min-h-screen flex flex-col items-center justify-center text-[#0B0C0E]">
      <h1 className="headline-xl text-[clamp(40px,8vw,96px)] mb-6">404</h1>
      <p className="text-brand-muted text-lg mb-8">Η σελίδα δεν βρέθηκε.</p>
      <Link
        href="/"
        className="px-8 py-4 bg-[#0B0C0E] text-white font-display font-medium rounded-full hover:bg-[#3F4CCB] transition-colors"
      >
        Επιστροφή στην Αρχική
      </Link>
    </main>
  );
}
