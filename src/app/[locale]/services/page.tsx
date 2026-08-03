import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { IMAGES } from '@/data/images';
import { generateBreadcrumbSchemaWithLabels } from '@/lib/schema/breadcrumb';
import ServicesClient from './ServicesClient';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const BASE_URL = 'https://www.h-remodeling.com';

  return {
    title: `Kitchen, Bathroom, Flooring & Deck Services MD & VA | Licensed Contractor`,
    description: `4.9/5 Rating! Professional kitchen remodeling, bathroom renovation, flooring installation & deck building in Maryland & Virginia. Serving Bethesda, Arlington, McLean, Alexandria. FREE estimates - Call (703) 585-9517`,
    keywords: 'kitchen remodeling Bethesda, bathroom renovation Arlington, flooring contractor McLean, deck builder Alexandria, kitchen cabinets Rockville, bathroom remodel Silver Spring, hardwood floors Maryland, deck installation Virginia',
    alternates: {
      canonical: `${BASE_URL}/${locale}/services`,
      languages: {
        'en': `${BASE_URL}/en/services`,
        'zh': `${BASE_URL}/zh/services`,
        'ko': `${BASE_URL}/ko/services`,
        'x-default': `${BASE_URL}/en/services`,
      },
    },
    openGraph: {
      title: `Kitchen, Bathroom, Flooring & Deck Services | Licensed MD & VA Contractor`,
      description: `4.9/5 Rating! Professional remodeling services in Maryland & Virginia. FREE estimates!`,
      type: 'website',
      url: `${BASE_URL}/${locale}/services`,
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'H Remodeling Services - Kitchen, Bathroom, Flooring, Deck Experts in Maryland & Virginia',
        },
      ],
    },
  };
}

const servicesDataRaw = [
  { id: 'kitchen' as const, image: IMAGES.services.kitchen },
  { id: 'bathroom' as const, image: IMAGES.services.bathroom },
  { id: 'flooring' as const, image: IMAGES.services.flooring },
  { id: 'decking' as const, image: IMAGES.services.decking },
];

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('services');
  const tNav = await getTranslations('navigation');
  const tCta = await getTranslations('cta');

  const breadcrumbSchema = generateBreadcrumbSchemaWithLabels(
    locale,
    [{ path: '/services', label: t('title') }]
  );

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: servicesDataRaw.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: t(`${service.id}.title`),
        provider: {
          '@type': 'LocalBusiness',
          name: 'H Remodeling',
          '@id': 'https://www.h-remodeling.com',
        },
        description: t(`${service.id}.description`),
        areaServed: [
          { '@type': 'State', name: 'Maryland' },
          { '@type': 'State', name: 'Virginia' },
          { '@type': 'Place', name: 'Washington D.C.' },
        ],
        serviceType: `${service.id.charAt(0).toUpperCase() + service.id.slice(1)} Remodeling`,
        image: service.image,
        url: `https://www.h-remodeling.com/${locale}/services#${service.id}`,
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };

  const servicesData = servicesDataRaw.map((service) => ({
    ...service,
    title: t(`${service.id}.title`),
    description: t(`${service.id}.description`),
    features: t.raw(`${service.id}.features`) as string[],
    altText: `${t(`${service.id}.title`)} - Professional ${service.id} remodeling services in Maryland, Virginia, and Washington D.C. by H Remodeling`,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <ServicesClient
        locale={locale}
        translations={{
          subtitle: t('subtitle'),
          title: t('title'),
          description: t('description'),
          cta: {
            title: tCta('title'),
            description: tCta('description'),
            button: tCta('button'),
          },
          getQuote: tNav('getQuote'),
        }}
        servicesData={servicesData}
      />
    </>
  );
}
