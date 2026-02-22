import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './App.css';

import Home from './pages/Home';
import Services from './pages/Services';
import Process from './pages/Process';
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
          <Link to="/" className={`link-underline text-sm font-medium ${location.pathname === '/' ? 'opacity-100' : 'opacity-70'}`}>Αρχική</Link>
          <Link to="/services" className={`link-underline text-sm font-medium ${location.pathname === '/services' ? 'opacity-100' : 'opacity-70'}`}>Υπηρεσίες</Link>
          <Link to="/projects" className={`link-underline text-sm font-medium ${location.pathname.startsWith('/projects') ? 'opacity-100' : 'opacity-70'}`}>Έργα</Link>
          <Link to="/process" className={`link-underline text-sm font-medium ${location.pathname === '/process' ? 'opacity-100' : 'opacity-70'}`}>Διαδικασία</Link>
          <Link to="/contact" className={`link-underline text-sm font-medium ${location.pathname === '/contact' ? 'opacity-100' : 'opacity-70'}`}>Επικοινωνία</Link>
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
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-2xl font-display font-bold">Αρχική</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)} className="text-2xl font-display font-bold">Υπηρεσίες</Link>
            <Link to="/projects" onClick={() => setMenuOpen(false)} className="text-2xl font-display font-bold">Έργα</Link>
            <Link to="/process" onClick={() => setMenuOpen(false)} className="text-2xl font-display font-bold">Διαδικασία</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-2xl font-display font-bold">Επικοινωνία</Link>
          </div>
        </div>
      )}
    </>
  );
}

// Standard Footer
function Footer() {
  const bgColor = 'bg-[#000000]';
  const textColor = 'text-white/70';
  const linkColor = 'text-white hover:text-[#3F4CCB]';
  const borderColor = 'border-white/10';

  return (
    <footer className={`w-full ${bgColor} border-t ${borderColor} py-6 px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium mt-auto`}>
      <div className="flex items-center gap-4 text-white">
        <Logo className="h-6 w-auto" />
        <span className={`${textColor}`}>
          &copy; {new Date().getFullYear()} Dodekanisa Glass. All rights reserved.
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

function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Global Navigation and UI that sits ON TOP of everything */}
      <Navigation />

      <div key={location.pathname} className="flex-1 w-full flex flex-col animate-in fade-in duration-700 ease-out fill-mode-both">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/process" element={<Process />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
