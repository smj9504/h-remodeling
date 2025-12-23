# 이미지 업로드 가이드

이 폴더에 실제 프로젝트 사진을 업로드하세요.

## 📁 폴더 구조

```
public/images/
├── hero/              # 대형 히어로 배경 이미지
│   ├── home.jpg      # 홈페이지 메인 배경 (권장: 1920x1080px 이상)
│   └── about.jpg     # About 페이지 배경 (권장: 1920x1080px 이상)
│
├── services/          # 서비스 섹션 이미지
│   ├── kitchen.jpg   # Kitchen 서비스 (권장: 800x600px)
│   ├── bathroom.jpg  # Bathroom 서비스 (권장: 800x600px)
│   ├── flooring.jpg  # Flooring 서비스 (권장: 800x600px)
│   └── decking.jpg   # Decking 서비스 (권장: 800x600px)
│
├── projects/          # 프로젝트 포트폴리오 이미지
│   ├── kitchen/
│   │   ├── 1.jpg     # Kitchen 프로젝트 #1 (권장: 1200x900px)
│   │   ├── 2.jpg     # Kitchen 프로젝트 #2
│   │   └── 3.jpg     # Kitchen 프로젝트 #3
│   ├── bathroom/
│   │   ├── 1.jpg     # Bathroom 프로젝트 #1
│   │   └── 2.jpg     # Bathroom 프로젝트 #2
│   ├── flooring/
│   │   ├── 1.jpg     # Flooring 프로젝트 #1
│   │   └── 2.jpg     # Flooring 프로젝트 #2
│   └── decking/
│       ├── 1.jpg     # Decking 프로젝트 #1
│       └── 2.jpg     # Decking 프로젝트 #2
│
└── about/             # About 페이지 이미지
    ├── team-1.jpg    # 팀/작업 사진 #1 (권장: 800x600px)
    └── team-2.jpg    # 팀/작업 사진 #2 (권장: 800x600px)
```

## 📸 이미지 권장 사항

### 크기 가이드
- **Hero 이미지**: 1920x1080px 이상 (Full HD)
- **Services**: 800x600px (4:3 비율)
- **Projects**: 1200x900px (4:3 비율)
- **About**: 800x600px (4:3 비율)

### 파일 형식
- **JPG** 또는 **WebP** 권장 (Next.js가 자동으로 최적화)
- PNG도 가능하지만 파일 크기가 더 큼

### 파일명 규칙
- 소문자 사용
- 공백 대신 하이픈(-) 사용
- 예: `modern-kitchen.jpg`, `luxury-bathroom.jpg`

## 🔄 이미지 추가/변경 방법

### 1. 기본 이미지 교체
해당 폴더에 이미지를 업로드하고 위의 파일명으로 저장하세요.

### 2. 프로젝트 이미지 추가
더 많은 프로젝트 이미지를 추가하려면:

1. 이미지를 해당 카테고리 폴더에 업로드 (예: `projects/kitchen/4.jpg`)
2. `src/data/images.ts` 파일에서 배열에 경로 추가:
   ```typescript
   kitchen: [
     '/images/projects/kitchen/1.jpg',
     '/images/projects/kitchen/2.jpg',
     '/images/projects/kitchen/3.jpg',
     '/images/projects/kitchen/4.jpg',  // 새로 추가
   ],
   ```

### 3. 새 프로젝트 추가
`src/data/projects.ts` 파일에서 프로젝트 정보 추가:
```typescript
{
  id: 9,
  slug: 'new-project-name',
  category: 'kitchen',
  location: 'City, State',
  image: IMAGES.projects.kitchen[3], // 위에서 추가한 이미지 사용
  images: IMAGES.projects.kitchen,
},
```

## ⚠️ 주의사항

- 이미지 파일 크기는 최대한 작게 유지 (각각 500KB 이하 권장)
- 고해상도 이미지는 사이트 로딩 속도에 영향을 줄 수 있습니다
- Next.js가 자동으로 이미지를 최적화하므로 원본을 업로드해도 됩니다
- 이미지를 추가/변경한 후 개발 서버를 재시작해야 할 수 있습니다

## 🎯 빠른 시작

1. 각 폴더에 해당하는 이미지 업로드
2. 이미지 파일명을 위의 구조대로 맞추기
3. 브라우저에서 확인 (http://localhost:3001)
4. 자동으로 반영됨!
