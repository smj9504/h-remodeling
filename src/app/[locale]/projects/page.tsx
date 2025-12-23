import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ProjectsClient from './ProjectsClient';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  return {
    title: `${t('title')} | H Remodeling`,
    description: t('description'),
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

  return <ProjectsClient locale={locale} translations={translations} />;
}
