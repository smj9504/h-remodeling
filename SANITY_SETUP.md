# Sanity CMS 설정 가이드

H Remodeling 웹사이트의 포트폴리오 콘텐츠를 외부에서 관리하기 위한 Sanity CMS 설정 가이드입니다.

## 📋 목차

1. [Sanity 프로젝트 생성](#1-sanity-프로젝트-생성)
2. [환경변수 설정](#2-환경변수-설정)
3. [팀원 초대 (인증)](#3-팀원-초대-인증)
4. [Studio 접속](#4-studio-접속)
5. [콘텐츠 추가](#5-콘텐츠-추가)
6. [CORS 설정](#6-cors-설정)

---

## 1. Sanity 프로젝트 생성

### 1.1 Sanity 계정 생성
1. [sanity.io](https://www.sanity.io/) 접속
2. **Get Started** 클릭
3. Google, GitHub, 또는 이메일로 회원가입

### 1.2 새 프로젝트 생성
1. [manage.sanity.io](https://www.sanity.io/manage) 접속
2. **Create new project** 클릭
3. 프로젝트 이름 입력: `H Remodeling Portfolio`
4. **Create project** 클릭

### 1.3 Project ID 확인
1. 생성된 프로젝트 선택
2. **Settings** > **API** 탭
3. **Project ID** 복사 (예: `abc123xyz`)

---

## 2. 환경변수 설정

`.env.local` 파일에 다음 값을 설정하세요:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id  # 복사한 Project ID
NEXT_PUBLIC_SANITY_DATASET=production          # 기본값 유지
```

---

## 3. 팀원 초대 (인증)

**중요**: Sanity Studio는 기본적으로 프로젝트에 초대된 사용자만 접근할 수 있습니다.

### 3.1 팀원 초대하기
1. [manage.sanity.io](https://www.sanity.io/manage)에서 프로젝트 선택
2. **Members** 탭 클릭
3. **Invite member** 클릭
4. 이메일 주소 입력
5. 역할 선택:
   - **Administrator**: 모든 권한 (프로젝트 설정 포함)
   - **Editor**: 콘텐츠 편집 권한
   - **Viewer**: 읽기 전용

### 3.2 인증 방식
- 초대된 사용자는 Sanity 계정으로 로그인해야 Studio에 접근 가능
- `/studio` 접속 시 자동으로 Sanity 로그인 페이지로 리다이렉트
- 로그인하지 않은 사용자는 콘텐츠를 볼 수 없음

---

## 4. Studio 접속

### 4.1 로컬 개발 환경
```bash
npm run dev
```
브라우저에서 `http://localhost:3000/studio` 접속

### 4.2 프로덕션 환경
배포 후 `https://your-domain.com/studio` 접속

### 4.3 로그인 화면
- 처음 접속 시 Sanity 로그인 화면이 표시됨
- Google, GitHub, 또는 이메일로 로그인
- 프로젝트에 초대된 계정만 접근 가능

---

## 5. 콘텐츠 추가

### 5.1 프로젝트 추가하기
1. Studio 접속 후 좌측 메뉴에서 **Project** 클릭
2. 우측 상단 **+** 버튼 클릭
3. 필드 입력:
   - **Title**: 영어, 한국어, 중국어 제목 입력
   - **Slug**: URL 슬러그 (자동 생성 가능)
   - **Category**: kitchen, bathroom, flooring, decking 중 선택
   - **Location**: 위치 (예: Bethesda, MD)
   - **Main Image**: 대표 이미지 업로드
   - **Gallery**: 추가 이미지들 업로드
   - **Published**: 체크하면 웹사이트에 표시

### 5.2 다국어 콘텐츠
각 텍스트 필드에는 3개 언어 탭이 있습니다:
- **en**: English (필수)
- **ko**: 한국어
- **zh**: 中文

### 5.3 이미지 업로드
- 드래그 앤 드롭으로 이미지 업로드
- 자동으로 Sanity CDN에 저장
- 이미지 크롭 및 핫스팟 설정 가능

---

## 6. CORS 설정

프로덕션 배포 시 CORS 설정이 필요합니다.

### 6.1 CORS 설정하기
1. [manage.sanity.io](https://www.sanity.io/manage)에서 프로젝트 선택
2. **Settings** > **API** 탭
3. **CORS origins** 섹션에서 **Add CORS origin**
4. 도메인 추가:
   - `http://localhost:3000` (개발)
   - `https://your-domain.com` (프로덕션)
   - `https://www.your-domain.com` (프로덕션 www)
5. **Allow credentials** 체크

---

## 📁 파일 구조

```
src/
├── sanity/
│   ├── schemas/           # Sanity 스키마 정의
│   │   ├── index.ts
│   │   ├── project.ts     # 프로젝트 스키마
│   │   └── projectCategory.ts
│   └── lib/
│       ├── client.ts      # Sanity 클라이언트
│       ├── queries.ts     # GROQ 쿼리
│       └── fetch.ts       # 데이터 fetch 함수
├── app/
│   └── studio/            # Sanity Studio
│       └── [[...tool]]/
│           ├── page.tsx
│           └── layout.tsx
```

---

## 🔒 보안 정보

1. **인증**: Sanity 계정 + 프로젝트 멤버십 필요
2. **CORS**: 허용된 도메인만 API 접근 가능
3. **API Token**: 읽기 전용 공개 접근 (CDN 사용)
4. **환경변수**: Project ID는 공개해도 안전 (읽기 전용)

---

## 💡 팁

### 캐싱
- 데이터는 60초마다 재검증 (ISR)
- CDN을 통해 빠른 이미지 로딩

### 이미지 최적화
```typescript
import { urlFor } from '@/sanity/lib/client';

// 최적화된 이미지 URL 생성
urlFor(image).width(800).height(600).format('webp').url()
```

### 다국어 텍스트
```typescript
import { getLocalizedText } from '@/sanity/lib/fetch';

// 현재 locale에 맞는 텍스트 가져오기
const title = getLocalizedText(project.title, locale, 'Default Title');
```

---

## ❓ 자주 묻는 질문

### Q: 누가 콘텐츠를 편집할 수 있나요?
A: Sanity 프로젝트에 초대된 팀원만 가능합니다. [팀원 초대](#3-팀원-초대-인증) 섹션 참고.

### Q: 로그인하지 않은 사용자가 Studio에 접근하면?
A: Sanity 로그인 페이지로 리다이렉트됩니다. 프로젝트 멤버가 아니면 접근 불가.

### Q: 무료로 사용할 수 있나요?
A: 네, Sanity 무료 플랜으로 충분합니다:
- 10,000 문서
- 5GB 저장소
- 500k API 요청/월
- 무제한 언어

### Q: 이미지는 어디에 저장되나요?
A: Sanity CDN에 자동 저장됩니다. 별도의 이미지 호스팅이 필요 없습니다.
