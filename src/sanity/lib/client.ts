import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity 이미지 소스 타입
type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0];

// Sanity 클라이언트 설정
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production', // 프로덕션에서는 CDN 사용
});

// 이미지 URL 빌더
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// 타입 정의
export interface SanityProject {
  _id: string;
  title: {
    en: string;
    ko?: string;
    zh?: string;
  };
  slug: {
    current: string;
  };
  description?: {
    en?: string;
    ko?: string;
    zh?: string;
  };
  category: 'kitchen' | 'bathroom' | 'flooring' | 'decking';
  location: string;
  year?: string;
  duration?: {
    en?: string;
    ko?: string;
    zh?: string;
  };
  mainImage: SanityImageSource;
  gallery?: Array<{
    _key: string;
    asset: SanityImageSource;
    alt?: {
      en?: string;
      ko?: string;
      zh?: string;
    };
    caption?: {
      en?: string;
      ko?: string;
      zh?: string;
    };
  }>;
  features?: Array<{
    en?: string;
    ko?: string;
    zh?: string;
  }>;
  seo?: {
    metaTitle?: {
      en?: string;
      ko?: string;
      zh?: string;
    };
    metaDescription?: {
      en?: string;
      ko?: string;
      zh?: string;
    };
  };
  order?: number;
  isPublished: boolean;
}
