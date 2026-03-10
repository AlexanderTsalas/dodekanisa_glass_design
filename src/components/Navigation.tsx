'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useAppQuery } from '../hooks/useAppQuery';
import type { NavigationItem } from '../types';
import { Logo } from './Logo';

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const rawPathname = usePathname();
  const pathname = rawPathname ?? '/';
  const [logoWhite, setLogoWhite] = useState(false);
  const [linksWhite, setLinksWhite] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: navItems } = useAppQuery<NavigationItem[]>('global_navigation');
  const isHomepage = pathname === '/';

  const applyColors = useCallback((el: Element) => {
    const theme = el.getAttribute('data-theme');
    const imagePos = el.getAttribute('data-image-position');
    const isDark = theme === 'dark';

    if (imagePos && window.innerWidth >= 1024 && !isDark) {
      if (imagePos === 'left') {
        setLogoWhite(true);
        setLinksWhite(false);
      } else {
        setLogoWhite(false);
        setLinksWhite(true);
      }
    } else {
      setLogoWhite(isDark);
      setLinksWhite(isDark);
    }
  }, []);

  useEffect(() => {
    let activeSection: Element | null = null;
    const observedElements = new Set<Element>();

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection = entry.target;
            applyColors(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -95% 0px', threshold: 0 }
    );

    // Watch for data-theme attribute changes (e.g. night mode toggle)
    const attrObserver = new MutationObserver(() => {
      if (activeSection) applyColors(activeSection);
    });

    const observeSection = (el: Element) => {
      if (observedElements.has(el)) return;
      observedElements.add(el);
      intersectionObserver.observe(el);
      attrObserver.observe(el, { attributes: true, attributeFilter: ['data-theme'] });
    };

    // Observe all currently existing [data-theme] sections
    document.querySelectorAll('[data-theme]').forEach(observeSection);

    // Watch for dynamically added [data-theme] elements (e.g. ssr:false SplitSections)
    const domObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof Element) {
            if (node.hasAttribute('data-theme')) {
              observeSection(node);
            }
            node.querySelectorAll('[data-theme]').forEach(observeSection);
          }
        }
      }
    });
    domObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      attrObserver.disconnect();
      domObserver.disconnect();
    };
  }, [pathname, applyColors]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Show glassmorphism backdrop on scroll (non-homepage only)
  useEffect(() => {
    if (isHomepage) {
      setScrolled(false);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage]);

  const logoColor = logoWhite ? 'text-white' : 'text-[#0B0C0E]';
  const linksColor = linksWhite ? 'text-white' : 'text-[#0B0C0E]';
  const navBackdrop = !isHomepage && scrolled
    ? 'bg-[#E9EAEC]/70 backdrop-blur-md shadow-sm'
    : '';

  return (
    <>
      {/* Desktop Navigation */}
      <nav id="main-nav" className={`fixed top-0 left-0 right-0 z-40 px-6 lg:px-10 flex justify-between items-center transition-all duration-300 ${scrolled && !isHomepage ? 'py-3' : 'py-6'} ${navBackdrop}`}>
        <Link href="/" aria-label="Αρχική σελίδα" className={`flex items-center transition-colors duration-500 hover:opacity-80 ${logoColor}`}>
          <Logo className="h-16 md:h-[72px] w-auto drop-shadow-md" />
        </Link>
        <div className={`hidden md:flex items-center gap-8 transition-colors duration-500 ${linksColor}`}>
          {navItems ? navItems.map(item => {
            const isActive = item.path === '/'
              ? pathname === '/'
              : pathname.startsWith(item.path);
            return (
              <Link key={item.path} href={item.path} className={`link-underline text-sm font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {item.label}
              </Link>
            );
          }) : (
            <div className="flex gap-8 opacity-50">
              <span className="w-16 h-4 bg-gray-200/20 rounded animate-pulse"></span>
              <span className="w-16 h-4 bg-gray-200/20 rounded animate-pulse"></span>
              <span className="w-16 h-4 bg-gray-200/20 rounded animate-pulse"></span>
            </div>
          )}
        </div>
        <button
          className={`md:hidden transition-colors duration-500 ${logoWhite ? 'text-white' : 'text-[#0B0C0E]'}`}
          onClick={() => setMenuOpen(true)}
          aria-label="Άνοιγμα μενού"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="mobile-menu fixed inset-0 bg-[#E9EAEC] z-50 flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-5 duration-300"
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
              <div
                key={item.path}
                className="animate-in fade-in slide-in-from-bottom-5 duration-300 fill-mode-both"
                style={{ animationDelay: `${100 + index * 100}ms` }}
              >
                <Link href={item.path} onClick={() => setMenuOpen(false)} className="text-2xl font-display font-bold">
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
