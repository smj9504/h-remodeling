import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllProjectSlugs } from '@/data/projects';

const BASE_URL = 'https://h-remodeling.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const projectSlugs = getAllProjectSlugs();

  // Static pages
  const staticPages = ['', '/services', '/projects', '/about', '/contact'];

  // Generate sitemap entries for static pages in all locales
  const staticEntries = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly' as const,
      priority: page === '' ? 1.0 : page === '/services' ? 0.9 : 0.8,
    }))
  );

  // Generate sitemap entries for all project detail pages
  const projectEntries = projectSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...projectEntries];
}

