'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Star, Phone } from 'lucide-react';
import { FadeIn, StaggerChildren, StaggerItem, CountUp, HeroReveal, HeroContent } from '@/components/animations';

interface Review {
  name: string;
  location: string;
  text: string;
}

interface HomeClientProps {
  locale: string;
  translations: {
    hero: {
      title: string;
      subtitle: string;
      languageBadge: string;
      stats: {
        yearsEnd: string;
        yearsSuffix: string;
        yearsLabel: string;
        projectsEnd: string;
        projectsSuffix: string;
        projectsLabel: string;
        ratingEnd: string;
        ratingSuffix: string;
        ratingLabel: string;
        source: string;
      };
      cta: {
        quote: string;
        projects: string;
      };
    };
    services: {
      subtitle: string;
      title: string;
      description: string;
      seeWork: string;
    };
    testimonials: {
      title: string;
      subtitle: string;
      googleCta: string;
      reviews: Record<string, Review>;
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
    getQuote: string;
  };
  servicesData: Array<{
    id: string;
    image: string;
    features: string[];
    title: string;
    description: string;
    imageAlt: string;
  }>;
  heroImage: string;
}

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function HomeClient({ locale, translations: t, servicesData, heroImage }: HomeClientProps) {
  const reviews = Object.values(t.testimonials.reviews);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <HeroReveal className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Completed kitchen remodel with custom cabinetry and quartz countertops in a Maryland home"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </HeroReveal>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <HeroContent delay={0.7}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                {t.hero.title}
              </h1>
            </HeroContent>

            <HeroContent delay={0.85}>
              <p className="text-lg sm:text-xl text-neutral-200 mb-4 leading-relaxed max-w-2xl">
                {t.hero.subtitle}
              </p>
            </HeroContent>

            <HeroContent delay={0.95}>
              <p className="text-sm text-primary-400 font-medium mb-8 tracking-wide">
                {t.hero.languageBadge}
              </p>
            </HeroContent>

            <HeroContent delay={1.0}>
              <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-8 max-w-2xl">
                <div className="text-center p-3 sm:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-400 mb-1">
                    <CountUp end={parseFloat(t.hero.stats.yearsEnd)} suffix={t.hero.stats.yearsSuffix} />
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-400 leading-tight">
                    {t.hero.stats.yearsLabel}
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-400 mb-1">
                    <CountUp end={parseFloat(t.hero.stats.projectsEnd)} suffix={t.hero.stats.projectsSuffix} />
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-400 leading-tight">
                    {t.hero.stats.projectsLabel}
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-400 mb-1">
                    <CountUp end={parseFloat(t.hero.stats.ratingEnd)} suffix={t.hero.stats.ratingSuffix} duration={1.5} />
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-400 leading-tight">
                    {t.hero.stats.ratingLabel}
                  </div>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-2">{t.hero.stats.source}</p>
            </HeroContent>

            <HeroContent delay={1.15}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold text-lg hover:bg-primary-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  {t.hero.cta.quote}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href={`/${locale}/projects`}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold text-lg hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors duration-300"
                >
                  {t.hero.cta.projects}
                </Link>
              </div>

              {/* Mobile phone number — visible below hero CTAs on small screens */}
              <a
                href="tel:+17035859517"
                className="inline-flex items-center gap-2 mt-4 text-neutral-300 hover:text-white transition-colors lg:hidden"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-medium">(703) 585-9517</span>
              </a>
            </HeroContent>
          </div>
        </div>
      </section>

      {/* Services Header */}
      <section className="pt-12 sm:pt-20 pb-0 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="max-w-3xl text-center mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 mb-4">
              {t.services.title}
            </h2>
            <p className="text-lg text-neutral-600 mb-6">
              {t.services.description}
            </p>
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              {t.services.seeWork}
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Link>
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
                    alt={service.imageAlt}
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

      {/* Testimonials Section */}
      <section className="py-12 sm:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-16">
            <p className="text-primary-600 font-medium tracking-wider uppercase mb-3">
              {t.testimonials.subtitle}
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900">
              {t.testimonials.title}
            </h2>
          </FadeIn>

          <StaggerChildren staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <StaggerItem key={review.name}>
                <div className="bg-white p-8 border border-neutral-200 h-full flex flex-col">
                  <StarRating />
                  <p className="mt-4 text-neutral-600 leading-relaxed flex-1">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="mt-6 pt-4 border-t border-neutral-100">
                    <p className="font-semibold text-neutral-900">{review.name}</p>
                    <p className="text-sm text-neutral-500">{review.location}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <FadeIn direction="up" delay={0.3} className="text-center mt-10">
            <a
              href="https://www.google.com/maps/place/H+Remodeling"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read H Remodeling reviews on Google"
              className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              {t.testimonials.googleCta}
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-24 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              {t.cta.title}
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
              {t.cta.description}
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.4}>
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors duration-300"
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
