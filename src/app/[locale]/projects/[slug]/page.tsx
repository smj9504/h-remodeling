import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Clock } from 'lucide-react';
import { routing } from '@/i18n/routing';
import { getProjectBySlug, getAllProjectSlugs, type Project } from '@/data/projects';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Generate static params for all locale + slug combinations
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'projectDetails' });
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  // Safely get title with fallback
  let title: string;
  try {
    title = t(`${slug}.title`);
  } catch {
    title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  return {
    title: `${title} | H Remodeling`,
    description: t.has(`${slug}.description`) ? t(`${slug}.description`) : undefined,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Get project data
  const project = getProjectBySlug(slug);

  // If project not found, show 404
  if (!project) {
    notFound();
  }

  // Get translations
  const t = await getTranslations({ locale, namespace: 'projects' });
  const tDetails = await getTranslations({ locale, namespace: 'projectDetails' });

  // Get project title and description from translations
  let projectTitle: string;
  let projectDescription: string;

  try {
    projectTitle = tDetails(`${slug}.title`);
  } catch {
    // Fallback: Convert slug to title case
    projectTitle = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  try {
    projectDescription = tDetails(`${slug}.description`);
  } catch {
    projectDescription = '';
  }

  return (
    <div className="pt-20">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href={`/${locale}/projects`}
          className="inline-flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('backToProjects')}
        </Link>
      </div>

      {/* Main Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="aspect-[21/9] relative overflow-hidden">
          <Image
            src={project.images[0]}
            alt={projectTitle}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Project Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-medium uppercase tracking-wider mb-4">
              {t(`categories.${project.category}`)}
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 mb-6">
              {projectTitle}
            </h1>
            {projectDescription && (
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                {projectDescription}
              </p>
            )}

            {/* Additional Images */}
            {project.images.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {project.images.slice(1).map((img, index) => (
                  <div key={index} className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={img}
                      alt={`${projectTitle} ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-50 p-8">
              <h3 className="text-lg font-semibold text-neutral-900 mb-6">
                {t('details.title')}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-neutral-500">{t('details.location')}</p>
                    <p className="font-medium text-neutral-900">{project.location}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-neutral-500">{t('details.year')}</p>
                    <p className="font-medium text-neutral-900">{project.year}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-neutral-500">{t('details.duration')}</p>
                    <p className="font-medium text-neutral-900">{project.duration}</p>
                  </div>
                </div>
              </div>

              <hr className="my-6 border-neutral-200" />

              <Link
                href={`/${locale}/contact`}
                className="block w-full text-center px-6 py-3 bg-neutral-900 text-white font-medium hover:bg-primary-700 transition-colors"
              >
                {t('startYourProject')}
                <ArrowRight className="inline-block ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
