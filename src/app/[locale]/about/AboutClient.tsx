'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award, Users, Clock, Shield, LucideIcon } from 'lucide-react';
import { FadeIn, StaggerChildren, StaggerItem, CountUp, ScaleIn } from '@/components/animations';

interface AboutClientProps {
  locale: string;
  translations: {
    subtitle: string;
    title: string;
    description: string;
    experience: string;
    projectsCompleted: string;
    satisfaction: string;
    statesServed: string;
    values: {
      title: string;
      items: Array<{ iconName: string; title: string; description: string }>;
    };
    whyChoose: {
      title: string;
      items: Array<{ iconName: string; title: string; description: string }>;
    };
    cta: { title: string; description: string; button: string };
  };
  images: {
    hero: string;
    kitchenProject: string;
    bathroomProject: string;
  };
}

const iconMap: Record<string, LucideIcon> = { Award, Users, Clock, Shield };

export default function AboutClient({ locale, translations: t, images }: AboutClientProps) {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-12 sm:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <p className="text-primary-600 font-medium tracking-wider uppercase mb-3">
                {t.subtitle}
              </p>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 mb-6">
                {t.title}
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {t.description}
              </p>
            </FadeIn>
            <FadeIn direction="left" delay={0.2}>
              <div className="aspect-[4/3] relative overflow-hidden group">
                <Image
                  src={images.hero}
                  alt="H Remodeling team"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <FadeIn direction="up" delay={0} className="text-center">
              <div className="text-4xl sm:text-5xl font-display font-bold text-primary-400 mb-2">
                <CountUp end={10} suffix="+" />
              </div>
              <div className="text-sm text-neutral-400 uppercase tracking-wider">
                {t.experience}
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.15} className="text-center">
              <div className="text-4xl sm:text-5xl font-display font-bold text-primary-400 mb-2">
                <CountUp end={500} suffix="+" />
              </div>
              <div className="text-sm text-neutral-400 uppercase tracking-wider">
                {t.projectsCompleted}
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.3} className="text-center">
              <div className="text-4xl sm:text-5xl font-display font-bold text-primary-400 mb-2">
                <CountUp end={100} suffix="%" />
              </div>
              <div className="text-sm text-neutral-400 uppercase tracking-wider">
                {t.satisfaction}
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.45} className="text-center">
              <div className="text-4xl sm:text-5xl font-display font-bold text-primary-400 mb-2">
                <CountUp end={3} />
              </div>
              <div className="text-sm text-neutral-400 uppercase tracking-wider">
                {t.statesServed}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 mb-4">
              {t.values.title}
            </h2>
          </FadeIn>

          <StaggerChildren staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.values.items.map((value, index) => {
              const Icon = iconMap[value.iconName] || Award;
              return (
                <StaggerItem key={index}>
                  <div className="bg-neutral-50 p-8 text-center hover:shadow-lg transition-shadow duration-300">
                    <ScaleIn delay={0.1 * index}>
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-primary-600" />
                      </div>
                    </ScaleIn>
                    <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-neutral-600">
                      {value.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <FadeIn direction="up">
                <div className="aspect-[3/4] relative overflow-hidden group">
                  <Image
                    src={images.kitchenProject}
                    alt="Kitchen project"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <div className="aspect-[3/4] relative overflow-hidden mt-8 group">
                  <Image
                    src={images.bathroomProject}
                    alt="Bathroom project"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="left" delay={0.3}>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 mb-6">
                {t.whyChoose.title}
              </h2>
              <div className="space-y-6">
                {t.whyChoose.items.map((item, index) => {
                  const Icon = iconMap[item.iconName] || Shield;
                  return (
                    <FadeIn key={index} direction="right" delay={0.1 * index}>
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary-600 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                          <p className="text-neutral-600 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-24 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 mb-4">
              {t.cta.title}
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="text-lg text-neutral-600 mb-8">
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
