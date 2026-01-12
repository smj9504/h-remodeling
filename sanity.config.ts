import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';

// Sanity Studio 설정 - 인증된 사용자만 접근 가능
export default defineConfig({
  name: 'h-remodeling-studio',
  title: 'H Remodeling Portfolio',

  // Sanity 프로젝트 ID와 Dataset (환경변수에서 가져옴)
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  // API 버전
  apiVersion: '2024-01-01',

  // Base path for Sanity Studio
  basePath: '/studio',

  plugins: [
    structureTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  // 인증 설정 - Sanity 계정으로만 로그인 가능
  // 기본적으로 Sanity는 프로젝트 멤버만 Studio에 접근 가능
  // 추가 보안을 위해 CORS 설정도 Sanity 대시보드에서 관리
});
