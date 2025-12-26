import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ProjectsClient from './ProjectsClient';
import { generateBreadcrumbSchemaWithLabels } from '@/lib/schema/breadcrumb';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });

  const BASE_URL = 'https://h-remodeling.com';

  return {
    title: `${t('title')} | H Remodeling`,
    description: t('description'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/projects`,
      languages: {
        'en': `${BASE_URL}/en/projects`,
        'zh': `${BASE_URL}/zh/projects`,
        'ko': `${BASE_URL}/ko/projects`,
        'x-default': `${BASE_URL}/en/projects`,
      },
    },
    openGraph: {
      url: `${BASE_URL}/${locale}/projects`,
    },
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('projects');
  
  const translations = {
    title: t('title'),
    subtitle: t('subtitle'),
    description: t('description'),
    viewProject: t('viewProject'),
    viewAll: t('viewAll'),
    categories: {
      all: t('categories.all'),
      kitchen: t('categories.kitchen'),
      bathroom: t('categories.bathroom'),
      flooring: t('categories.flooring'),
      decking: t('categories.decking'),
    },
  };

  // BreadcrumbList Schema for SEO
  const breadcrumbSchema = generateBreadcrumbSchemaWithLabels(
    locale,
    [{ path: '/projects', label: t('title') }]
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProjectsClient locale={locale} translations={translations} />
    </>
  );
}
