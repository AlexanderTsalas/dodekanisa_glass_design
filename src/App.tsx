import { useState, useEffect, useLayoutEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ReactLenis, useLenis } from 'lenis/react';
import { useAppQuery } from './hooks/useAppQuery';
import type { NavigationItem, SiteSettings } from './types';
import './App.css';

import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';

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
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const navEl = document.getElementById('main-nav');
          let prevPointerEvents = '';
          if (navEl) {
            prevPointerEvents = navEl.style.pointerEvents;
            navEl.style.pointerEvents = 'none'; // Temporarily disable pointer events to "look" through the nav
          }

          // Probe the absolute center of the navigation bar area (40px down)
          const elements = document.elementsFromPoint(window.innerWidth / 2, 40);

          if (navEl) {
            navEl.style.pointerEvents = prevPointerEvents;
          }

          let foundTheme = null;
          for (const el of elements) {
            const theme = el.getAttribute('data-theme');
            if (theme) {
              foundTheme = theme;
              break;
            }
          }

          if (foundTheme) {
            setIsNavWhite(foundTheme === 'dark');
          } else {
            // Fallbacks for initial DOM paint before scroll/hydrate
            if (location.pathname === '/' || location.pathname === '/contact' || location.pathname === '/services' || (location.pathname.startsWith('/projects/') && location.pathname !== '/projects')) {
              setIsNavWhite(true);
            } else {
              setIsNavWhite(false);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll(); // Trigger immediately to set initial state
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
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
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button
            className="absolute top-6 right-6 text-[#0B0C0E]"
            onClick={() => setMenuOpen(false)}
          >
            <X size={28} />
          </button>
          <div className="flex flex-col items-center gap-8 text-[#0B0C0E]">
            {navItems?.map(item => (
              <Link key={item.path} to={item.path} onClick={() => setMenuOpen(false)} className="text-2xl font-display font-bold">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
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
    <footer className={`w-full ${bgColor} border-t ${borderColor} py-6 px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium mt-auto`}>
      <div className="flex items-center gap-4 text-white">
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

  return (
    <ReactLenis root options={{ lerp: 0.05, wheelMultiplier: 1.5, smoothWheel: true }}>
      <div className="relative min-h-screen flex flex-col">
        <ScrollToTop />
        {/* Global Navigation and UI that sits ON TOP of everything */}
        <Navigation />

        <div key={location.pathname} className="flex-1 w-full flex flex-col animate-in fade-in duration-700 ease-out fill-mode-both">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/index.html" element={<Navigate to="/" replace />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
