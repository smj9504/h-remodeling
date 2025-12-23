/**
 * Central image path management
 *
 * All images are optimized WebP format
 * Project images are organized by category with numbered IDs
 */

export const IMAGES = {
  // Hero Images (large background images) - Optimized WebP
  hero: {
    home: '/images/hero/home.webp',
    about: '/images/about/about.webp',
  },

  // Services (service section images) - Optimized WebP
  services: {
    kitchen: '/images/services/kitchen.webp',
    bathroom: '/images/services/bathroom.webp',
    flooring: '/images/services/flooring.webp',
    decking: '/images/services/decking.webp',
  },

  // Projects (portfolio images) - Organized by category
  projects: {
    kitchen: [
      '/images/projects/kitchen/1.webp',
      '/images/projects/kitchen/2.webp',
      '/images/projects/kitchen/3.webp',
      '/images/projects/kitchen/4.webp',
      '/images/projects/kitchen/4-1.webp',
      '/images/projects/kitchen/5.webp',
      '/images/projects/kitchen/5-1.webp',
      '/images/projects/kitchen/5-2.webp',
      '/images/projects/kitchen/6.webp',
      '/images/projects/kitchen/7.webp',
      '/images/projects/kitchen/7-1.webp',
      '/images/projects/kitchen/7-2.webp',
      '/images/projects/kitchen/7-3.webp',
      '/images/projects/kitchen/8.webp',
    ],
    bathroom: [
      '/images/projects/bathroom/1.webp',
      '/images/projects/bathroom/1-1.webp',
      '/images/projects/bathroom/2.webp',
      '/images/projects/bathroom/3.webp',
      '/images/projects/bathroom/4.webp',
      '/images/projects/bathroom/5.webp',
      '/images/projects/bathroom/6.webp',
      '/images/projects/bathroom/7.webp',
      '/images/projects/bathroom/7-1.webp',
    ],
    flooring: [
      '/images/projects/flooring/1.webp',
      '/images/projects/flooring/2.webp',
      '/images/projects/flooring/3.webp',
      '/images/projects/flooring/4.webp',
      '/images/projects/flooring/5.webp',
      '/images/projects/flooring/6.webp',
      '/images/projects/flooring/7.webp',
    ],
    decking: [
      '/images/projects/decking/1.webp',
      '/images/projects/decking/2.webp',
      '/images/projects/decking/3.webp',
      '/images/projects/decking/4.webp',
      '/images/projects/decking/5.webp',
      '/images/projects/decking/5-1.webp',
      '/images/projects/decking/5-2.webp',
      '/images/projects/decking/5-3.webp',
      '/images/projects/decking/6.webp',
      '/images/projects/decking/7.webp',
    ],
  },

  // About Page - Optimized WebP
  about: {
    hero: '/images/about/about.webp',
    team: [
      '/images/about/about.webp',
      '/images/about/kitchen-project.webp',
    ],
    kitchenProject: '/images/about/kitchen-project.webp',
    bathroomProject: '/images/about/bathroom-project.webp',
  },

  // Logo Images
  logo: {
    header: '/favicon.ico',
    footer: '/images/logo-footer.png',
  },
} as const;
