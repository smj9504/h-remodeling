import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllProjectSlugs } from '@/data/projects';

const BASE_URL = 'https://www.h-remodeling.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const projectSlugs = getAllProjectSlugs();

  // Static pages
  const staticPages = ['', '/services', '/projects', '/about', '/contact'];

  // Helper function to generate alternates for a given page path
  const generateAlternates = (page: string) => {
    const languages: Record<string, string> = {};
    locales.forEach((loc) => {
      languages[loc] = `${BASE_URL}/${loc}${page}`;
    });
    // Add x-default pointing to English version for SEO
    languages['x-default'] = `${BASE_URL}/en${page}`;
    return { languages };
  };

  // Generate sitemap entries for static pages in all locales with hreflang
  const staticEntries = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: (page === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: page === '' ? 1.0 : page === '/services' ? 0.9 : 0.8,
      alternates: generateAlternates(page),
    }))
  );

  // Generate sitemap entries for all project detail pages with hreflang
  const projectEntries = projectSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: generateAlternates(`/projects/${slug}`),
    }))
  );

  return [...staticEntries, ...projectEntries];
}

