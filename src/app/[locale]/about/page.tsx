import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { IMAGES } from '@/data/images';
import { generateBreadcrumbSchemaWithLabels } from '@/lib/schema/breadcrumb';
import AboutClient from './AboutClient';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const BASE_URL = 'https://www.h-remodeling.com';

  return {
    title: `About H Remodeling | 10+ Years, 500+ Projects in Maryland & Virginia`,
    description: `Meet H Remodeling - Licensed & insured remodeling experts serving MD & VA since 2014. 500+ successful kitchen, bathroom, flooring & deck projects. See why homeowners trust us!`,
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

  const breadcrumbSchema = generateBreadcrumbSchemaWithLabels(
    locale,
    [{ path: '/about', label: t('title') }]
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutClient
        locale={locale}
        images={{
          hero: IMAGES.about.hero,
          kitchenProject: IMAGES.about.kitchenProject,
          bathroomProject: IMAGES.about.bathroomProject,
        }}
        translations={{
          subtitle: t('subtitle'),
          title: t('title'),
          description: t('description'),
          experience: t('experience'),
          projectsCompleted: t('projectsCompleted'),
          satisfaction: t('satisfaction'),
          statesServed: t('statesServed'),
          values: {
            title: t('values.title'),
            items: [
              { iconName: 'Award', title: t('values.quality'), description: t('values.qualityDesc') },
              { iconName: 'Users', title: t('values.communication'), description: t('values.communicationDesc') },
              { iconName: 'Clock', title: t('values.timeline'), description: t('values.timelineDesc') },
            ],
          },
          whyChoose: {
            title: t('whyChoose.title'),
            items: [
              { iconName: 'Shield', title: t('whyChoose.licensed'), description: t('whyChoose.licensedDesc') },
              { iconName: 'Users', title: t('whyChoose.team'), description: t('whyChoose.teamDesc') },
              { iconName: 'Award', title: t('whyChoose.materials'), description: t('whyChoose.materialsDesc') },
            ],
          },
          cta: {
            title: tCta('title'),
            description: tCta('description'),
            button: tCta('button'),
          },
        }}
      />
    </>
  );
}
