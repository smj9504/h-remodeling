import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { IMAGES } from '@/data/images';
import HomeClient from './HomeClient';

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

const servicesDataRaw = [
  { id: 'kitchen' as const, image: IMAGES.services.kitchen },
  { id: 'bathroom' as const, image: IMAGES.services.bathroom },
  { id: 'flooring' as const, image: IMAGES.services.flooring },
  { id: 'decking' as const, image: IMAGES.services.decking },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations('hero');
  const t = await getTranslations('services');
  const tNav = await getTranslations('navigation');
  const tCta = await getTranslations('cta');
  const tTest = await getTranslations('testimonials');

  const servicesData = servicesDataRaw.map((service) => ({
    ...service,
    title: t(`${service.id}.title`),
    description: t(`${service.id}.description`),
    imageAlt: t(`${service.id}.imageAlt`),
    features: t.raw(`${service.id}.features`) as string[],
  }));

  return (
    <HomeClient
      locale={locale}
      heroImage={IMAGES.hero.home}
      translations={{
        hero: {
          title: tHero('title'),
          subtitle: tHero('subtitle'),
          languageBadge: tHero('languageBadge'),
          stats: {
            yearsEnd: tHero('stats.yearsEnd'),
            yearsSuffix: tHero('stats.yearsSuffix'),
            yearsLabel: tHero('stats.yearsLabel'),
            projectsEnd: tHero('stats.projectsEnd'),
            projectsSuffix: tHero('stats.projectsSuffix'),
            projectsLabel: tHero('stats.projectsLabel'),
            ratingEnd: tHero('stats.ratingEnd'),
            ratingSuffix: tHero('stats.ratingSuffix'),
            ratingLabel: tHero('stats.ratingLabel'),
            source: tHero('stats.source'),
          },
          cta: {
            quote: tHero('cta.quote'),
            projects: tHero('cta.projects'),
          },
        },
        services: {
          subtitle: t('subtitle'),
          title: t('title'),
          description: t('description'),
          seeWork: t('seeWork'),
        },
        testimonials: {
          title: tTest('title'),
          subtitle: tTest('subtitle'),
          googleCta: tTest('googleCta'),
          reviews: {
            '1': {
              name: tTest('reviews.1.name'),
              location: tTest('reviews.1.location'),
              text: tTest('reviews.1.text'),
            },
            '2': {
              name: tTest('reviews.2.name'),
              location: tTest('reviews.2.location'),
              text: tTest('reviews.2.text'),
            },
            '3': {
              name: tTest('reviews.3.name'),
              location: tTest('reviews.3.location'),
              text: tTest('reviews.3.text'),
            },
          },
        },
        cta: {
          title: tCta('title'),
          description: tCta('description'),
          button: tCta('button'),
        },
        getQuote: tNav('getQuote'),
      }}
      servicesData={servicesData}
    />
  );
}
