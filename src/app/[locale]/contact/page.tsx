import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ContactClient from './ContactClient';
import { generateBreadcrumbSchemaWithLabels } from '@/lib/schema/breadcrumb';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  const BASE_URL = 'https://h-remodeling.com';

  return {
    title: `${t('title')} | H Remodeling`,
    description: t('description'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        'en': `${BASE_URL}/en/contact`,
        'zh': `${BASE_URL}/zh/contact`,
        'ko': `${BASE_URL}/ko/contact`,
        'x-default': `${BASE_URL}/en/contact`,
      },
    },
    openGraph: {
      url: `${BASE_URL}/${locale}/contact`,
    },
  };
}

// FAQ Schema - Multilingual support
const faqData: Record<string, Array<{ question: string; answer: string }>> = {
  en: [
    {
      question: 'What areas do you serve?',
      answer: 'H Remodeling serves Maryland and Northern Virginia areas, including Bethesda, Rockville, Silver Spring, Arlington, McLean, Alexandria, and surrounding communities.',
    },
    {
      question: 'How long does a kitchen remodel take?',
      answer: 'A typical kitchen remodel takes 4-8 weeks depending on the scope of work. We provide a detailed timeline during your free consultation.',
    },
    {
      question: 'Do you offer free estimates?',
      answer: 'Yes, we offer free in-home consultations and estimates for all our remodeling services including kitchen, bathroom, flooring, and deck projects.',
    },
    {
      question: 'Are you licensed and insured?',
      answer: 'Yes, H Remodeling is fully licensed and insured to perform remodeling work in Maryland and Virginia.',
    },
    {
      question: 'What is your experience?',
      answer: 'H Remodeling has over 10 years of experience with more than 500 completed projects in the DMV area.',
    },
  ],
  zh: [
    {
      question: '你们服务哪些地区？',
      answer: 'H Remodeling 服务马里兰州和北弗吉尼亚地区，包括 Bethesda、Rockville、Silver Spring、Arlington、McLean、Alexandria 及周边社区。',
    },
    {
      question: '厨房改造需要多长时间？',
      answer: '典型的厨房改造需要4-8周，具体取决于工作范围。我们会在免费咨询期间提供详细的时间表。',
    },
    {
      question: '你们提供免费估价吗？',
      answer: '是的，我们为所有改造服务提供免费上门咨询和估价，包括厨房、浴室、地板和甲板项目。',
    },
    {
      question: '你们有执照和保险吗？',
      answer: '是的，H Remodeling 拥有在马里兰州和弗吉尼亚州进行改造工作的完整执照和保险。',
    },
    {
      question: '你们有多少年经验？',
      answer: 'H Remodeling 在 DMV 地区拥有超过10年的经验，完成了500多个项目。',
    },
  ],
  ko: [
    {
      question: '어떤 지역에 서비스를 제공하나요?',
      answer: 'H Remodeling은 메릴랜드와 북부 버지니아 지역을 서비스합니다. Bethesda, Rockville, Silver Spring, Arlington, McLean, Alexandria 및 주변 지역을 포함합니다.',
    },
    {
      question: '주방 리모델링은 얼마나 걸리나요?',
      answer: '일반적인 주방 리모델링은 작업 범위에 따라 4-8주가 소요됩니다. 무료 상담 시 상세한 일정을 제공해 드립니다.',
    },
    {
      question: '무료 견적을 제공하나요?',
      answer: '네, 주방, 욕실, 바닥재, 데크 프로젝트를 포함한 모든 리모델링 서비스에 대해 무료 방문 상담 및 견적을 제공합니다.',
    },
    {
      question: '면허와 보험이 있나요?',
      answer: '네, H Remodeling은 메릴랜드와 버지니아에서 리모델링 작업을 수행할 수 있는 완전한 면허와 보험을 보유하고 있습니다.',
    },
    {
      question: '경력이 얼마나 되나요?',
      answer: 'H Remodeling은 DMV 지역에서 10년 이상의 경력과 500개 이상의 완료된 프로젝트를 보유하고 있습니다.',
    },
  ],
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact');
  const tServices = await getTranslations('services');

  // FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (faqData[locale] || faqData.en).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const translations = {
    title: t('title'),
    subtitle: t('subtitle'),
    description: t('description'),
    form: {
      name: t('form.name'),
      email: t('form.email'),
      phone: t('form.phone'),
      service: t('form.service'),
      selectService: t('form.selectService'),
      message: t('form.message'),
      submit: t('form.submit'),
      sending: t('form.sending'),
      success: t('form.success'),
      error: t('form.error'),
    },
    info: {
      phone: t('info.phone'),
      email: t('info.email'),
      hours: t('info.hours'),
      hoursValue: t('info.hoursValue'),
      area: t('info.area'),
      areaValue: t('info.areaValue'),
    },
    social: {
      title: t('social.title'),
    },
    services: [
      { value: 'kitchen', label: tServices('kitchen.title') },
      { value: 'bathroom', label: tServices('bathroom.title') },
      { value: 'flooring', label: tServices('flooring.title') },
      { value: 'decking', label: tServices('decking.title') },
    ],
  };

  // BreadcrumbList Schema for SEO
  const breadcrumbSchema = generateBreadcrumbSchemaWithLabels(
    locale,
    [{ path: '/contact', label: t('title') }]
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ContactClient locale={locale} translations={translations} />
    </>
  );
}
