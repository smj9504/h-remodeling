import { IMAGES } from './images';

export type ProjectCategory = 'kitchen' | 'bathroom' | 'flooring' | 'decking';

export interface Project {
  id: number;
  slug: string;
  category: ProjectCategory;
  location: string;
  year: string;
  duration: string;
  image: string;
  images: readonly string[];
}

// Helper to get specific images for a project
const getKitchenImages = (index: number, additionalIndices?: number[]): readonly string[] => {
  const images = [IMAGES.projects.kitchen[index]];
  if (additionalIndices) {
    additionalIndices.forEach(i => images.push(IMAGES.projects.kitchen[i]));
  }
  return images;
};

const getBathroomImages = (index: number, additionalIndices?: number[]): readonly string[] => {
  const images = [IMAGES.projects.bathroom[index]];
  if (additionalIndices) {
    additionalIndices.forEach(i => images.push(IMAGES.projects.bathroom[i]));
  }
  return images;
};

const getFlooringImages = (index: number): readonly string[] => {
  return [IMAGES.projects.flooring[index]];
};

const getDeckingImages = (index: number, additionalIndices?: number[]): readonly string[] => {
  const images = [IMAGES.projects.decking[index]];
  if (additionalIndices) {
    additionalIndices.forEach(i => images.push(IMAGES.projects.decking[i]));
  }
  return images;
};

export const PROJECTS: Project[] = [
  // Kitchen Projects (8 total)
  {
    id: 1,
    slug: 'modern-kitchen-bethesda',
    category: 'kitchen',
    location: 'Bethesda, MD',
    year: '2025',
    duration: '4 weeks',
    image: IMAGES.projects.kitchen[0],
    images: getKitchenImages(0),
  },
  {
    id: 2,
    slug: 'contemporary-kitchen-arlington',
    category: 'kitchen',
    location: 'Arlington, VA',
    year: '2025',
    duration: '4 weeks',
    image: IMAGES.projects.kitchen[1],
    images: getKitchenImages(1),
  },
  {
    id: 3,
    slug: 'elegant-kitchen-mclean',
    category: 'kitchen',
    location: 'McLean, VA',
    year: '2024',
    duration: '5 weeks',
    image: IMAGES.projects.kitchen[2],
    images: getKitchenImages(2),
  },
  {
    id: 4,
    slug: 'compact-kitchen-dc',
    category: 'kitchen',
    location: 'Washington, D.C.',
    year: '2024',
    duration: '3 weeks',
    image: IMAGES.projects.kitchen[3],
    images: getKitchenImages(3, [4]),
  },
  {
    id: 5,
    slug: 'coastal-kitchen-alexandria',
    category: 'kitchen',
    location: 'Alexandria, VA',
    year: '2024',
    duration: '4 weeks',
    image: IMAGES.projects.kitchen[5],
    images: getKitchenImages(5, [6, 7]),
  },
  {
    id: 6,
    slug: 'classic-white-kitchen-vienna',
    category: 'kitchen',
    location: 'Vienna, VA',
    year: '2023',
    duration: '5 weeks',
    image: IMAGES.projects.kitchen[8],
    images: getKitchenImages(8),
  },
  {
    id: 7,
    slug: 'modern-black-white-kitchen-fairfax',
    category: 'kitchen',
    location: 'Fairfax, VA',
    year: '2023',
    duration: '4 weeks',
    image: IMAGES.projects.kitchen[9],
    images: getKitchenImages(9, [10, 11, 12]),
  },
  {
    id: 8,
    slug: 'luxury-winter-kitchen-potomac',
    category: 'kitchen',
    location: 'Potomac, MD',
    year: '2025',
    duration: '6 weeks',
    image: IMAGES.projects.kitchen[13],
    images: getKitchenImages(13),
  },

  // Bathroom Projects (7 total)
  {
    id: 9,
    slug: 'modern-walnut-bathroom-arlington',
    category: 'bathroom',
    location: 'Arlington, VA',
    year: '2025',
    duration: '3 weeks',
    image: IMAGES.projects.bathroom[0],
    images: getBathroomImages(0, [1]),
  },
  {
    id: 10,
    slug: 'classic-subway-tile-bathroom-vienna',
    category: 'bathroom',
    location: 'Vienna, VA',
    year: '2024',
    duration: '2 weeks',
    image: IMAGES.projects.bathroom[2],
    images: getBathroomImages(2),
  },
  {
    id: 11,
    slug: 'farmhouse-bathroom-silver-spring',
    category: 'bathroom',
    location: 'Silver Spring, MD',
    year: '2024',
    duration: '3 weeks',
    image: IMAGES.projects.bathroom[3],
    images: getBathroomImages(3),
  },
  {
    id: 12,
    slug: 'luxury-marble-bathroom-potomac',
    category: 'bathroom',
    location: 'Potomac, MD',
    year: '2024',
    duration: '5 weeks',
    image: IMAGES.projects.bathroom[4],
    images: getBathroomImages(4),
  },
  {
    id: 13,
    slug: 'navy-marble-bathroom-bethesda',
    category: 'bathroom',
    location: 'Bethesda, MD',
    year: '2023',
    duration: '4 weeks',
    image: IMAGES.projects.bathroom[5],
    images: getBathroomImages(5),
  },
  {
    id: 14,
    slug: 'teal-gold-bathroom-mclean',
    category: 'bathroom',
    location: 'McLean, VA',
    year: '2025',
    duration: '3 weeks',
    image: IMAGES.projects.bathroom[6],
    images: getBathroomImages(6),
  },
  {
    id: 15,
    slug: 'compact-bathroom-rockville',
    category: 'bathroom',
    location: 'Rockville, MD',
    year: '2024',
    duration: '2 weeks',
    image: IMAGES.projects.bathroom[7],
    images: getBathroomImages(7, [8]),
  },

  // Flooring Projects (7 total)
  {
    id: 16,
    slug: 'epoxy-garage-arlington',
    category: 'flooring',
    location: 'Arlington, VA',
    year: '2024',
    duration: '1 week',
    image: IMAGES.projects.flooring[0],
    images: getFlooringImages(0),
  },
  {
    id: 17,
    slug: 'commercial-epoxy-fairfax',
    category: 'flooring',
    location: 'Fairfax, VA',
    year: '2024',
    duration: '1 week',
    image: IMAGES.projects.flooring[1],
    images: getFlooringImages(1),
  },
  {
    id: 18,
    slug: 'gray-flake-garage-bethesda',
    category: 'flooring',
    location: 'Bethesda, MD',
    year: '2024',
    duration: '1 week',
    image: IMAGES.projects.flooring[2],
    images: getFlooringImages(2),
  },
  {
    id: 19,
    slug: 'luxury-vinyl-entrance-mclean',
    category: 'flooring',
    location: 'McLean, VA',
    year: '2023',
    duration: '2 weeks',
    image: IMAGES.projects.flooring[3],
    images: getFlooringImages(3),
  },
  {
    id: 20,
    slug: 'tan-garage-coating-potomac',
    category: 'flooring',
    location: 'Potomac, MD',
    year: '2023',
    duration: '1 week',
    image: IMAGES.projects.flooring[4],
    images: getFlooringImages(4),
  },
  {
    id: 21,
    slug: 'herringbone-lvp-silver-spring',
    category: 'flooring',
    location: 'Silver Spring, MD',
    year: '2024',
    duration: '2 weeks',
    image: IMAGES.projects.flooring[5],
    images: getFlooringImages(5),
  },
  {
    id: 22,
    slug: 'basement-flooring-alexandria',
    category: 'flooring',
    location: 'Alexandria, VA',
    year: '2023',
    duration: '2 weeks',
    image: IMAGES.projects.flooring[6],
    images: getFlooringImages(6),
  },

  // Decking Projects (7 total)
  {
    id: 23,
    slug: 'modern-deck-lighting-alexandria',
    category: 'decking',
    location: 'Alexandria, VA',
    year: '2025',
    duration: '3 weeks',
    image: IMAGES.projects.decking[0],
    images: getDeckingImages(0),
  },
  {
    id: 24,
    slug: 'cedar-deck-bethesda',
    category: 'decking',
    location: 'Bethesda, MD',
    year: '2024',
    duration: '2 weeks',
    image: IMAGES.projects.decking[1],
    images: getDeckingImages(1),
  },
  {
    id: 25,
    slug: 'gray-composite-deck-arlington',
    category: 'decking',
    location: 'Arlington, VA',
    year: '2024',
    duration: '3 weeks',
    image: IMAGES.projects.decking[2],
    images: getDeckingImages(2),
  },
  {
    id: 26,
    slug: 'front-porch-deck-vienna',
    category: 'decking',
    location: 'Vienna, VA',
    year: '2024',
    duration: '2 weeks',
    image: IMAGES.projects.decking[3],
    images: getDeckingImages(3),
  },
  {
    id: 27,
    slug: 'composite-deck-potomac',
    category: 'decking',
    location: 'Potomac, MD',
    year: '2024',
    duration: '3 weeks',
    image: IMAGES.projects.decking[4],
    images: getDeckingImages(4, [5, 6, 7]),
  },
  {
    id: 28,
    slug: 'multi-level-deck-mclean',
    category: 'decking',
    location: 'McLean, VA',
    year: '2025',
    duration: '4 weeks',
    image: IMAGES.projects.decking[8],
    images: getDeckingImages(8),
  },
  {
    id: 29,
    slug: 'rooftop-deck-dc',
    category: 'decking',
    location: 'Washington, D.C.',
    year: '2023',
    duration: '3 weeks',
    image: IMAGES.projects.decking[9],
    images: getDeckingImages(9),
  },
];

// Helper function to get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

// Helper function to get projects by category
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return PROJECTS.filter((project) => project.category === category);
}

// Helper function to get all project slugs (for static generation)
export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((project) => project.slug);
}
