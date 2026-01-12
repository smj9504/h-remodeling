import { groq } from 'next-sanity';

// 모든 프로젝트 조회 (게시된 것만)
export const projectsQuery = groq`
  *[_type == "project" && isPublished == true] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    category,
    location,
    year,
    duration,
    mainImage,
    gallery,
    features,
    seo,
    order,
    isPublished
  }
`;

// 카테고리별 프로젝트 조회
export const projectsByCategoryQuery = groq`
  *[_type == "project" && isPublished == true && category == $category] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    category,
    location,
    year,
    duration,
    mainImage,
    gallery,
    features,
    seo,
    order,
    isPublished
  }
`;

// 단일 프로젝트 조회 (slug로)
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    category,
    location,
    year,
    duration,
    mainImage,
    gallery,
    features,
    seo,
    order,
    isPublished
  }
`;

// 모든 프로젝트 slug 조회 (Static Generation용)
export const projectSlugsQuery = groq`
  *[_type == "project" && isPublished == true].slug.current
`;

// 프로젝트 카테고리 목록 조회
export const categoriesQuery = groq`
  *[_type == "projectCategory"] | order(key asc) {
    _id,
    key,
    title,
    description
  }
`;
