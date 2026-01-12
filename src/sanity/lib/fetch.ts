import { client, SanityProject } from './client';
import {
  projectsQuery,
  projectsByCategoryQuery,
  projectBySlugQuery,
  projectSlugsQuery,
} from './queries';

// 모든 프로젝트 가져오기
export async function getAllProjects(): Promise<SanityProject[]> {
  try {
    const projects = await client.fetch<SanityProject[]>(
      projectsQuery,
      {},
      {
        next: { revalidate: 60 }, // 60초마다 재검증
      }
    );
    return projects || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// 카테고리별 프로젝트 가져오기
export async function getProjectsByCategory(
  category: string
): Promise<SanityProject[]> {
  try {
    const projects = await client.fetch<SanityProject[]>(
      projectsByCategoryQuery,
      { category },
      {
        next: { revalidate: 60 },
      }
    );
    return projects || [];
  } catch (error) {
    console.error('Error fetching projects by category:', error);
    return [];
  }
}

// slug로 프로젝트 가져오기
export async function getProjectBySlug(
  slug: string
): Promise<SanityProject | null> {
  try {
    const project = await client.fetch<SanityProject>(
      projectBySlugQuery,
      { slug },
      {
        next: { revalidate: 60 },
      }
    );
    return project || null;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
}

// 모든 slug 가져오기 (Static Generation용)
export async function getAllProjectSlugs(): Promise<string[]> {
  try {
    const slugs = await client.fetch<string[]>(projectSlugsQuery);
    return slugs || [];
  } catch (error) {
    console.error('Error fetching project slugs:', error);
    return [];
  }
}

// 다국어 텍스트 헬퍼 함수
export function getLocalizedText(
  field: { en?: string; ko?: string; zh?: string } | undefined,
  locale: string,
  fallback: string = ''
): string {
  if (!field) return fallback;
  const localeKey = locale as keyof typeof field;
  return field[localeKey] || field.en || fallback;
}
