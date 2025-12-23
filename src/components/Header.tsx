'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' },
  { code: 'ko', label: '한국어' },
];

export default function Header() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <Image
              src="/favicon.ico"
              alt="H Remodeling Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="hidden sm:block text-sm font-medium text-neutral-600">
              H Remodeling
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  pathname === item.href
                    ? 'text-primary-600'
                    : 'text-neutral-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2 text-sm">
              {languages.map((lang, index) => (
                <span key={lang.code} className="flex items-center">
                  <Link
                    href={switchLocale(lang.code)}
                    className={`transition-colors hover:text-primary-600 ${
                      locale === lang.code
                        ? 'text-primary-600 font-medium'
                        : 'text-neutral-500'
                    }`}
                  >
                    {lang.label}
                  </Link>
                  {index < languages.length - 1 && (
                    <span className="ml-2 text-neutral-300">|</span>
                  )}
                </span>
              ))}
            </div>

            {/* Phone */}
            <a
              href="tel:+17035859517"
              className="flex items-center space-x-2 text-neutral-600 hover:text-primary-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">(703) 585-9517</span>
            </a>

            {/* CTA Button */}
            <Link
              href={`/${locale}/contact`}
              className="px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-none hover:bg-primary-700 transition-colors"
            >
              {t('getQuote')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-neutral-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-neutral-100"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-base font-medium ${
                    pathname === item.href
                      ? 'text-primary-600'
                      : 'text-neutral-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-neutral-100">
                <div className="flex items-center space-x-4 mb-4">
                  {languages.map((lang) => (
                    <Link
                      key={lang.code}
                      href={switchLocale(lang.code)}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-sm ${
                        locale === lang.code
                          ? 'text-primary-600 font-medium'
                          : 'text-neutral-500'
                      }`}
                    >
                      {lang.label}
                    </Link>
                  ))}
                </div>
                
                <a
                  href="tel:+17035859517"
                  className="flex items-center space-x-2 text-neutral-600 mb-4"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">(703) 585-9517</span>
                </a>

                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-5 py-3 bg-neutral-900 text-white text-sm font-medium"
                >
                  {t('getQuote')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
