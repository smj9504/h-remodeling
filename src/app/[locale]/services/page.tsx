import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { routing } from '@/i18n/routing';
import { IMAGES } from '@/data/images';
import { generateBreadcrumbSchemaWithLabels } from '@/lib/schema/breadcrumb';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  const BASE_URL = 'https://h-remodeling.com';

  return {
    title: `${t('title')} - Kitchen, Bathroom, Flooring, Deck | H Remodeling DMV`,
    description: `${t('description')} Expert services in Maryland, Virginia, and Washington D.C. - Kitchen remodeling, bathroom renovation, flooring installation, and deck building.`,
    keywords: 'kitchen remodel DMV, bathroom renovation Maryland, flooring Virginia, deck building DC, kitchen cabinets Bethesda, bathroom remodel Arlington, hardwood floors McLean, composite deck Alexandria',
    alternates: {
      canonical: `${BASE_URL}/${locale}/services`,
      languages: {
        'en': `${BASE_URL}/en/services`,
        'zh': `${BASE_URL}/zh/services`,
        'ko': `${BASE_URL}/ko/services`,
      },
    },
    openGraph: {
      title: `${t('title')} | H Remodeling DMV`,
      description: `${t('description')} Serving Maryland, Virginia, and Washington D.C.`,
      type: 'website',
      url: `${BASE_URL}/${locale}/services`,
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'H Remodeling Services - Kitchen, Bathroom, Flooring, Deck',
        },
      ],
    },
  };
}

const servicesData = [
  {
    id: 'kitchen' as const,
    image: IMAGES.services.kitchen,
    features: ['Custom Cabinets', 'Quartz & Granite Countertops', 'Kitchen Islands', 'Modern Appliances', 'Backsplash Tile', 'Lighting Design'],
  },
  {
    id: 'bathroom' as const,
    image: IMAGES.services.bathroom,
    features: ['Walk-in Showers', 'Freestanding Tubs', 'Custom Vanities', 'Heated Floors', 'Tile Work', 'Modern Fixtures'],
  },
  {
    id: 'flooring' as const,
    image: IMAGES.services.flooring,
    features: ['Hardwood', 'Luxury Vinyl Plank (LVP)', 'Tile & Stone', 'Carpet', 'Epoxy Flooring', 'Laminate', 'Subfloor Repair'],
  },
  {
    id: 'decking' as const,
    image: IMAGES.services.decking,
    features: ['Composite Decking', 'Wood Decking', 'Deck Railings', 'Pergolas', 'Outdoor Lighting', 'Deck Repair'],
  },
];

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('services');
  const tCta = await getTranslations('cta');

  // BreadcrumbList Schema for SEO
  const breadcrumbSchema = generateBreadcrumbSchemaWithLabels(
    locale,
    [{ path: '/services', label: t('title') }]
  );

  // Service Schema for SEO
  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: servicesData.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: t(`${service.id}.title`),
        provider: {
          '@type': 'LocalBusiness',
          name: 'H Remodeling',
          '@id': 'https://h-remodeling.com',
        },
        description: t(`${service.id}.description`),
        areaServed: [
          { '@type': 'State', name: 'Maryland' },
          { '@type': 'State', name: 'Virginia' },
          { '@type': 'Place', name: 'Washington D.C.' },
        ],
        serviceType: `${service.id.charAt(0).toUpperCase() + service.id.slice(1)} Remodeling`,
        image: service.image,
        url: `https://h-remodeling.com/${locale}/services#${service.id}`,
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };

  return (
    <div className="pt-20">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      {/* Hero Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary-600 font-medium tracking-wider uppercase mb-3">
              {t('subtitle')}
            </p>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 mb-6">
              {t('title')}
            </h1>
            <p className="text-lg text-neutral-600">
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      {servicesData.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-24 ${index % 2 === 1 ? 'bg-neutral-50' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              {/* Image */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${t(`${service.id}.title`)} - Professional ${service.id} remodeling services in Maryland, Virginia, and Washington D.C. by H Remodeling`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 mb-4">
                  {t(`${service.id}.title`)}
                </h2>
                <p className="text-lg text-neutral-600 mb-8">
                  {t(`${service.id}.description`)}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                      <span className="text-sm text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center px-6 py-3 bg-neutral-900 text-white font-medium hover:bg-primary-700 transition-colors"
                >
                  Get a Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            {tCta('title')}
          </h2>
          <p className="text-lg text-neutral-400 mb-8">
            {tCta('description')}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
          >
            {tCta('button')}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
