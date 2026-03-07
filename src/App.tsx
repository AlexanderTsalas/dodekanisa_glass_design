import { useState, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ReactLenis, useLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppQuery } from './hooks/useAppQuery';
import type { NavigationItem, SiteSettings } from './types';
import './App.css';

// Home is eagerly loaded (landing page, always the first paint)
import Home from './pages/Home';

// Other pages are lazy-loaded — only fetched when navigated to
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));

function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M20 2L38 20L20 38L2 20L20 2Z" stroke="currentColor" strokeWidth="3" fill="transparent" />
      <path d="M20 10L30 20L20 30L10 20L20 10Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
    </svg>
  );
}

// Navigation Component
function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [isNavWhite, setIsNavWhite] = useState(false);
  const { data: navItems } = useAppQuery<NavigationItem[]>('global_navigation');

  useEffect(() => {
    const sections = document.querySelectorAll('[data-theme]');

    if (!sections.length) {
      // Fallback for pages without data-theme sections
      if (location.pathname === '/' || location.pathname === '/contact' || location.pathname === '/services' || (location.pathname.startsWith('/projects/') && location.pathname !== '/projects')) {
        setIsNavWhite(true);
      } else {
        setIsNavWhite(false);
      }
      return;
    }

    // Use IntersectionObserver to detect which themed section occupies the nav bar area.
    // rootMargin '-95%' bottom means only the top ~5% strip of the viewport triggers intersection,
    // which corresponds to where the navigation bar sits.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute('data-theme');
            setIsNavWhite(theme === 'dark');
          }
        }
      },
      {
        rootMargin: '0px 0px -95% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  const navTextColor = isNavWhite ? 'text-white' : 'text-[#0B0C0E]';

  return (
    <>
      {/* Desktop Navigation */}
      <nav id="main-nav" className={`fixed top-0 left-0 right-0 z-40 px-6 lg:px-10 py-6 flex justify-between items-center transition-colors duration-500 ${navTextColor}`}>
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <Logo className="h-9 w-auto" />
          <span className="font-display font-bold text-xl tracking-wide mt-1">DG</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navItems ? navItems.map(item => {
            const isActive = item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);
            return (
              <Link key={item.path} to={item.path} className={`link-underline text-sm font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {item.label}
              </Link>
            );
          }) : (
            // Loading fallback
            <div className="flex gap-8 opacity-50">
              <span className="w-16 h-4 bg-gray-200/20 rounded animate-pulse"></span>
              <span className="w-16 h-4 bg-gray-200/20 rounded animate-pulse"></span>
              <span className="w-16 h-4 bg-gray-200/20 rounded animate-pulse"></span>
            </div>
          )}
        </div>
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Άνοιγμα μενού"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mobile-menu fixed inset-0 bg-[#E9EAEC] z-50 flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 text-[#0B0C0E]"
              onClick={() => setMenuOpen(false)}
              aria-label="Κλείσιμο μενού"
            >
              <X size={28} />
            </button>
            <div className="flex flex-col items-center gap-8 text-[#0B0C0E]">
              {navItems?.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                >
                  <Link to={item.path} onClick={() => setMenuOpen(false)} className="text-2xl font-display font-bold">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Standard Footer
function Footer() {
  const { data: settings } = useAppQuery<SiteSettings>('global_settings');

  const bgColor = 'bg-[#000000]';
  const textColor = 'text-white/70';
  const linkColor = 'text-white hover:text-[#3F4CCB]';
  const borderColor = 'border-white/10';

  return (
    <footer className={`w-full ${bgColor} border-t ${borderColor} py-8 px-6 lg:px-10 flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left gap-4 md:gap-4 text-sm font-medium mt-auto`}>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 text-white">
        <Logo className="h-6 w-auto" />
        <span className={`${textColor}`}>
          &copy; {new Date().getFullYear()} {settings?.companyName || 'Dodekanisa Glass'}. All rights reserved.
        </span>
      </div>
      <div className={`${textColor}`}>
        Designed and maintained by{' '}
        <a href="https://distarter.com" target="_blank" rel="noopener noreferrer" className={`transition-colors font-bold ${linkColor}`}>
          Distarter
        </a>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useLayoutEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, lenis]);

  return null;
}

function App() {
  const location = useLocation();
  const hasNavigated = useRef(false);

  // Skip the fade-in animation on initial page load to avoid LCP delay.
  // Only apply it on subsequent navigations.
  useEffect(() => {
    hasNavigated.current = true;
  }, []);

  const pageTransitionClass = hasNavigated.current
    ? 'animate-in fade-in duration-500 ease-out fill-mode-both'
    : '';

  return (
    <ReactLenis root options={{ lerp: 0.05, wheelMultiplier: 1.5, smoothWheel: true }}>
      <div className="relative min-h-screen flex flex-col">
        <ScrollToTop />
        {/* Global Navigation and UI that sits ON TOP of everything */}
        <Navigation />

        <div key={location.pathname} className={`flex-1 w-full flex flex-col ${pageTransitionClass}`}>
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/index.html" element={<Navigate to="/" replace />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>

        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
