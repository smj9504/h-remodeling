'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Phone, Mail, Instagram, Facebook, MapPin } from 'lucide-react';
import { IMAGES } from '@/data/images';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('navigation');
  const tServices = useTranslations('services');
  const locale = useLocale();

  const quickLinks = [
    { href: `/${locale}`, label: tNav('home') },
    { href: `/${locale}/about`, label: tNav('about') },
    { href: `/${locale}/projects`, label: tNav('projects') },
    { href: `/${locale}/contact`, label: tNav('contact') },
  ];

  const services = [
    { href: `/${locale}/services#kitchen`, label: tServices('kitchen.title') },
    { href: `/${locale}/services#bathroom`, label: tServices('bathroom.title') },
    { href: `/${locale}/services#flooring`, label: tServices('flooring.title') },
    { href: `/${locale}/services#decking`, label: tServices('decking.title') },
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="inline-flex items-center space-x-3 mb-6">
              <Image
                src={IMAGES.logo.footer}
                alt="H Remodeling Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div>
                <span className="ml-2 text-lg font-medium text-neutral-400">
                  H Remodeling
                </span>
              </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              {t('description')}
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://instagram.com/hremodeling05"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-neutral-800 hover:bg-primary-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61584490866793"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-neutral-800 hover:bg-primary-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              {t('services')}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              {t('contact')}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+17035859517"
                  className="flex items-center space-x-3 text-neutral-400 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">(703) 585-9517</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hremodeling05@gmail.com"
                  className="flex items-center space-x-3 text-neutral-400 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">hremodeling05@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start space-x-3 text-neutral-400">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Maryland & Virginia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-500 text-sm">{t('copyright')}</p>
            <p className="text-neutral-500 text-sm">{t('servingArea')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
