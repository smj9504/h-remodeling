'use client';

/**
 * Sanity Studio 페이지
 *
 * 접근 경로: /studio
 *
 * 인증:
 * - Sanity 계정으로 로그인 필요
 * - Sanity 프로젝트에 초대된 사용자만 접근 가능
 * - 관리자는 manage.sanity.io에서 팀원을 초대할 수 있음
 */

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
