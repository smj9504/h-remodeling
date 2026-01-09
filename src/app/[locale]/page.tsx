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

  const BASE_URL = 'https://www.h-remodeling.com';

  const titles: Record<string, string> = {
    en: 'Kitchen & Bathroom Remodeling Maryland & Virginia | ⭐ 4.9 Rating | Free Quote',
    zh: '马里兰和弗吉尼亚州厨房浴室改造 | ⭐ 4.9评分 | 免费报价',
    ko: '메릴랜드 & 버지니아 주방 욕실 리모델링 | ⭐ 4.9 평점 | 무료 견적',
  };

  const descriptions: Record<string, string> = {
    en: '⭐ 4.9/5 Rating, 500+ Projects! Licensed kitchen remodeling, bathroom renovation, flooring & deck experts in Bethesda, Arlington, McLean. 10+ years experience. Call (703) 585-9517 for FREE estimate!',
    zh: '⭐ 4.9/5评分，500多个项目！Bethesda、Arlington、McLean地区持证厨房改造、浴室翻新、地板和甲板专家。10年以上经验。致电 (703) 585-9517 获取免费报价！',
    ko: '⭐ 4.9/5 평점, 500개 이상의 프로젝트! Bethesda, Arlington, McLean 지역 면허 보유 주방 리모델링, 욕실 리노베이션, 바닥재 및 데크 전문가. 10년 이상의 경험. (703) 585-9517로 무료 견적 문의!',
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

  const tHero = await getTranslations('hero');
  const t = await getTranslations('services');
  const tCta = await getTranslations('cta');

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* H1 Headline with Location Keywords */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              {tHero('title')}
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-neutral-300 mb-8 leading-relaxed">
              {tHero('subtitle')}
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-10 max-w-2xl">
              <div className="text-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                <div className="text-2xl sm:text-3xl font-bold text-primary-400 mb-1">
                  {tHero('stats.years')}
                </div>
                <div className="text-xs sm:text-sm text-neutral-400">
                  {tHero('stats.yearsLabel')}
                </div>
              </div>
              <div className="text-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                <div className="text-2xl sm:text-3xl font-bold text-primary-400 mb-1">
                  {tHero('stats.projects')}
                </div>
                <div className="text-xs sm:text-sm text-neutral-400">
                  {tHero('stats.projectsLabel')}
                </div>
              </div>
              <div className="text-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                <div className="text-2xl sm:text-3xl font-bold text-primary-400 mb-1">
                  {tHero('stats.consultation')}
                </div>
                <div className="text-xs sm:text-sm text-neutral-400">
                  {tHero('stats.consultationLabel')}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold text-lg hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {tHero('cta.quote')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href={`/${locale}/projects`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold text-lg hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200"
              >
                {tHero('cta.projects')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-center mx-auto mb-16">
            <p className="text-primary-600 font-medium tracking-wider uppercase mb-3">
              {t('subtitle')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 mb-6">
              {t('title')}
            </h2>
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
