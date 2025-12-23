import { IMAGES } from './images';

export type ServiceId = 'kitchen' | 'bathroom' | 'flooring' | 'decking';

export interface Service {
  id: ServiceId;
  icon: string;
  image: string;
}

export const SERVICES: Service[] = [
  {
    id: 'kitchen',
    icon: '🍳',
    image: IMAGES.services.kitchen,
  },
  {
    id: 'bathroom',
    icon: '🛁',
    image: IMAGES.services.bathroom,
  },
  {
    id: 'flooring',
    icon: '🪵',
    image: IMAGES.services.flooring,
  },
  {
    id: 'decking',
    icon: '🏡',
    image: IMAGES.services.decking,
  },
];
