import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ContactClient from './ContactClient';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: `${t('title')} | H Remodeling`,
    description: t('description'),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('contact');
  const tServices = await getTranslations('services');
  
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

  return <ContactClient locale={locale} translations={translations} />;
}
