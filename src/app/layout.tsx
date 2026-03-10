import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'greek'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Diamond Glass',
  description: 'Diamond Glass — Κατασκευή και τοποθέτηση γυάλινων συστημάτων, κουφωμάτων αλουμινίου και ενεργειακών υαλοπινάκων στα Δωδεκάνησα.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el" className={`${inter.variable} ${montserrat.variable}`}>
      <body style={{ background: '#0B0C0E' }}>
        <Providers>
          <Navigation />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
