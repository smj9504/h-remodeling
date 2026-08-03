'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'ko', label: '한국어' },
  { code: 'zh', label: '中文' },
];

export default function Header() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on Escape, trap focus inside mobile menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/projects`, label: t('projects') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-sm border-b border-neutral-100 shadow-sm'
        : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
    }`}>
      <nav aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center space-x-2">
              <Image
                src="/favicon.ico"
                alt=""
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-sm font-medium text-neutral-600">
                H Remodeling
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                    pathname === item.href
                      ? 'text-primary-600'
                      : 'text-neutral-600'
                  }`}
                  {...(pathname === item.href ? { 'aria-current': 'page' as const } : {})}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Language Switcher */}
              <div className="flex items-center space-x-2 text-sm" role="group" aria-label="Language">
                {languages.map((lang, index) => (
                  <span key={lang.code} className="flex items-center">
                    <Link
                      href={switchLocale(lang.code)}
                      className={`transition-colors hover:text-primary-600 ${
                        locale === lang.code
                          ? 'text-primary-600 font-medium'
                          : 'text-neutral-500'
                      }`}
                      lang={lang.code}
                      {...(locale === lang.code ? { 'aria-current': 'true' as const } : {})}
                    >
                      {lang.label}
                    </Link>
                    {index < languages.length - 1 && (
                      <span className="ml-2 text-neutral-300" aria-hidden="true">|</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Phone */}
              <a
                href="tel:+17035859517"
                className="flex items-center space-x-2 text-neutral-600 hover:text-primary-600 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-medium">(703) 585-9517</span>
              </a>

              {/* CTA Button */}
              <Link
                href={`/${locale}/contact`}
                className="px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-none hover:bg-primary-700 transition-colors"
              >
                {t('getQuote')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 -mr-2 text-neutral-600"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-neutral-100"
            >
              <div className="px-4 py-6 space-y-4">
                <button
                  onClick={closeMenu}
                  className="ml-auto block p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`block py-2 text-base font-medium ${
                      pathname === item.href
                        ? 'text-primary-600'
                        : 'text-neutral-600'
                    }`}
                    {...(pathname === item.href ? { 'aria-current': 'page' as const } : {})}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="pt-4 border-t border-neutral-100">
                  <div className="flex items-center space-x-4 mb-4" role="group" aria-label="Language">
                    {languages.map((lang) => (
                      <Link
                        key={lang.code}
                        href={switchLocale(lang.code)}
                        onClick={closeMenu}
                        className={`text-sm ${
                          locale === lang.code
                            ? 'text-primary-600 font-medium'
                            : 'text-neutral-500'
                        }`}
                        lang={lang.code}
                        {...(locale === lang.code ? { 'aria-current': 'true' as const } : {})}
                      >
                        {lang.label}
                      </Link>
                    ))}
                  </div>

                  <a
                    href="tel:+17035859517"
                    className="flex items-center space-x-2 text-neutral-600 mb-4"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span className="text-sm font-medium">(703) 585-9517</span>
                  </a>

                  <Link
                    href={`/${locale}/contact`}
                    onClick={closeMenu}
                    className="block w-full text-center px-5 py-3 bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
                  >
                    {t('getQuote')}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
