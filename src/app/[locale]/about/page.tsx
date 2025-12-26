import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award, Users, Clock, Shield } from 'lucide-react';
import { routing } from '@/i18n/routing';
import { IMAGES } from '@/data/images';
import { generateBreadcrumbSchemaWithLabels } from '@/lib/schema/breadcrumb';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const BASE_URL = 'https://h-remodeling.com';

  return {
    title: `${t('title')} | H Remodeling`,
    description: t('description'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: {
        'en': `${BASE_URL}/en/about`,
        'zh': `${BASE_URL}/zh/about`,
        'ko': `${BASE_URL}/ko/about`,
        'x-default': `${BASE_URL}/en/about`,
      },
    },
    openGraph: {
      url: `${BASE_URL}/${locale}/about`,
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');
  const tCta = await getTranslations('cta');

  // BreadcrumbList Schema for SEO
  const breadcrumbSchema = generateBreadcrumbSchemaWithLabels(
    locale,
    [{ path: '/about', label: t('title') }]
  );

  const values = [
    {
      icon: Award,
      title: t('values.quality'),
      description: t('values.qualityDesc'),
    },
    {
      icon: Users,
      title: t('values.communication'),
      description: t('values.communicationDesc'),
    },
    {
      icon: Clock,
      title: t('values.timeline'),
      description: t('values.timelineDesc'),
    },
  ];

  return (
    <div className="pt-20">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary-600 font-medium tracking-wider uppercase mb-3">
                {t('subtitle')}
              </p>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 mb-6">
                {t('title')}
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {t('description')}
              </p>
            </div>
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={IMAGES.about.hero}
                alt="H Remodeling team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-display font-bold text-primary-400 mb-2">
                10+
              </div>
              <div className="text-sm text-neutral-400 uppercase tracking-wider">
                {t('experience')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-display font-bold text-primary-400 mb-2">
                500+
              </div>
              <div className="text-sm text-neutral-400 uppercase tracking-wider">
                {t('projectsCompleted')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-display font-bold text-primary-400 mb-2">
                100%
              </div>
              <div className="text-sm text-neutral-400 uppercase tracking-wider">
                {t('satisfaction')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-display font-bold text-primary-400 mb-2">
                3
              </div>
              <div className="text-sm text-neutral-400 uppercase tracking-wider">
                {t('statesServed')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 mb-4">
              {t('values.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-neutral-50 p-8 text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={IMAGES.about.kitchenProject}
                  alt="Kitchen project"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-[3/4] relative overflow-hidden mt-8">
                <Image
                  src={IMAGES.about.bathroomProject}
                  alt="Bathroom project"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 mb-6">
                {t('whyChoose.title')}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-600 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">{t('whyChoose.licensed')}</h3>
                    <p className="text-neutral-600 text-sm">{t('whyChoose.licensedDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-600 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">{t('whyChoose.team')}</h3>
                    <p className="text-neutral-600 text-sm">{t('whyChoose.teamDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-600 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">{t('whyChoose.materials')}</h3>
                    <p className="text-neutral-600 text-sm">{t('whyChoose.materialsDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 mb-4">
            {tCta('title')}
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            {tCta('description')}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-8 py-4 bg-neutral-900 text-white font-medium hover:bg-primary-700 transition-colors"
          >
            {tCta('button')}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
