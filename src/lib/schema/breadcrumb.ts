/**
 * Generate BreadcrumbList Schema for SEO
 * @param locale - Current locale (en, zh, ko)
 * @param path - Array of path segments (e.g., ['projects', 'modern-kitchen-bethesda'])
 * @param baseUrl - Base URL of the website (default: https://h-remodeling.com)
 * @returns Schema.org BreadcrumbList JSON-LD object
 */
export function generateBreadcrumbSchema(
  locale: string,
  path: string[],
  baseUrl: string = 'https://h-remodeling.com'
) {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${baseUrl}/${locale}`,
    },
  ];

  let currentPath = `/${locale}`;
  path.forEach((segment, index) => {
    currentPath += `/${segment}`;
    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      item: `${baseUrl}${currentPath}`,
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

/**
 * Generate BreadcrumbList Schema with custom labels
 * @param locale - Current locale
 * @param items - Array of breadcrumb items with custom labels
 * @param baseUrl - Base URL of the website
 * @returns Schema.org BreadcrumbList JSON-LD object
 */
export function generateBreadcrumbSchemaWithLabels(
  locale: string,
  items: Array<{ path: string; label: string }>,
  baseUrl: string = 'https://h-remodeling.com'
) {
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${baseUrl}/${locale}`,
    },
  ];

  items.forEach((item, index) => {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: index + 2,
      name: item.label,
      item: `${baseUrl}/${locale}${item.path}`,
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };
}
