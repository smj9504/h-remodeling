import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { routing } from '@/i18n/routing';
import { IMAGES } from '@/data/images';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  const BASE_URL = 'https://h-remodeling.com';

  const titles: Record<string, string> = {
    en: 'H Remodeling | Kitchen, Bathroom, Flooring & Deck Experts in MD & VA',
    zh: 'H Remodeling | 马里兰州和弗吉尼亚州厨房、浴室、地板和甲板专家',
    ko: 'H Remodeling | MD & VA 지역 주방, 욕실, 바닥재, 데크 전문',
  };

  const descriptions: Record<string, string> = {
    en: 'Quality kitchen remodeling, bathroom renovation, flooring installation, and deck building services in Maryland and Northern Virginia. 10+ years experience, 500+ projects completed. Get your free quote today!',
    zh: '在马里兰州和北弗吉尼亚州提供优质的厨房改造、浴室翻新、地板安装和甲板建造服务。10年以上经验，完成500多个项目。立即获取免费报价！',
    ko: '메릴랜드와 북부 버지니아에서 고품질 주방 리모델링, 욕실 리노베이션, 바닥재 설치 및 데크 시공 서비스를 제공합니다. 10년 이상의 경험, 500개 이상의 프로젝트 완료. 지금 무료 견적을 받아보세요!',
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: 'kitchen remodel Maryland, bathroom remodel Virginia, flooring installation DMV, deck building MD VA, home renovation Bethesda, kitchen cabinets Arlington, bathroom renovation McLean, hardwood floors Alexandria',
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'en': `${BASE_URL}/en`,
        'zh': `${BASE_URL}/zh`,
        'ko': `${BASE_URL}/ko`,
        'x-default': `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: 'website',
      url: `${BASE_URL}/${locale}`,
      siteName: 'H Remodeling',
      images: [{
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'H Remodeling - Kitchen, Bathroom, Flooring & Deck Experts',
      }],
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
    features: ['Hardwood', 'Luxury Vinyl Plank (LVP)', 'Tile & Stone', 'Carpet', 'Laminate', 'Subfloor Repair'],
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

  return (
    <div className="pt-20">
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
                    alt={t(`${service.id}.title`)}
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
