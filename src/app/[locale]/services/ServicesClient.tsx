'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations';

interface ServicesClientProps {
  locale: string;
  translations: {
    subtitle: string;
    title: string;
    description: string;
    cta: { title: string; description: string; button: string };
    getQuote: string;
  };
  servicesData: Array<{
    id: string;
    image: string;
    features: string[];
    title: string;
    description: string;
    altText: string;
  }>;
}

export default function ServicesClient({ locale, translations: t, servicesData }: ServicesClientProps) {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-12 sm:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="max-w-3xl">
            <p className="text-primary-600 font-medium tracking-wider uppercase mb-3">
              {t.subtitle}
            </p>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 mb-6">
              {t.title}
            </h1>
            <p className="text-lg text-neutral-600">
              {t.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services List */}
      {servicesData.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-12 sm:py-24 ${index % 2 === 1 ? 'bg-neutral-50' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              {/* Image */}
              <FadeIn
                direction={index % 2 === 0 ? 'left' : 'right'}
                className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div className="aspect-[4/3] relative overflow-hidden group">
                  <Image
                    src={service.image}
                    alt={service.altText}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </FadeIn>

              {/* Content */}
              <FadeIn
                direction={index % 2 === 0 ? 'right' : 'left'}
                delay={0.2}
                className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-neutral-600 mb-8">
                  {service.description}
                </p>

                <StaggerChildren staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <StaggerItem key={feature}>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        <span className="text-sm text-neutral-700">{feature}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>

                <Link
                  href={`/${locale}/contact`}
                  className="group inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors duration-300"
                >
                  {t.getQuote}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-12 sm:py-24 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              {t.cta.title}
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="text-lg text-neutral-400 mb-8">
              {t.cta.description}
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.4}>
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors duration-300"
            >
              {t.cta.button}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
