'use client';

import { useState, useEffect } from 'react';
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
  const [isNavWhite, setIsNavWhite] = useState(false);
  const { data: navItems } = useAppQuery<NavigationItem[]>('global_navigation');

  useEffect(() => {
    const sections = document.querySelectorAll('[data-theme]');

    if (!sections.length) {
      if (pathname === '/' || pathname === '/contact' || pathname === '/services' || (pathname?.startsWith('/projects/') && pathname !== '/projects')) {
        setIsNavWhite(true);
      } else {
        setIsNavWhite(false);
      }
      return;
    }

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
  }, [pathname]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navTextColor = isNavWhite ? 'text-white' : 'text-[#0B0C0E]';

  return (
    <>
      {/* Desktop Navigation */}
      <nav id="main-nav" className={`fixed top-0 left-0 right-0 z-40 px-6 lg:px-10 py-6 flex justify-between items-center transition-colors duration-500 ${navTextColor}`}>
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <Logo className="h-9 w-auto" />
          <span className="font-display font-bold text-xl tracking-wide mt-1">Diamond Glass</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
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
          className="md:hidden"
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
