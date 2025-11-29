# 리루트(Reroute)

Next.js, React, Sanity CMS로 만든 현대적인 포트폴리오 및 서비스 쇼케이스 웹사이트입니다.

## ✨ 주요 기능

- **반응형 디자인** - 모바일, 태블릿, 데스크탑 최적화 (Tailwind CSS)
- **부드러운 애니메이션** - GSAP + ScrollTrigger로 프로페셔널한 스크롤 인터렉션
- **CMS 통합** - Sanity CMS로 콘텐츠 관리
- **기능 제어** - 환경 변수로 Works 페이지 활성화/비활성화
- **SEO 최적화** - 메타 태그, Open Graph, 구조화된 데이터

## 🛠️ 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **UI 라이브러리**: React 19
- **스타일링**: Tailwind CSS 3.4
- **CMS**: Sanity 4
- **애니메이션**: GSAP 3 with ScrollTrigger
- **언어**: TypeScript 5
- **패키지 관리자**: pnpm

## 📁 프로젝트 구조

```
/reroute
├── /app                    # Next.js App Router 페이지
│   ├── /(personal)        # 메인 라우트 (홈, About, Works 등)
│   ├── /api               # API 엔드포인트 (works, apps)
│   └── /studio            # Sanity Studio
├── /components            # React 컴포넌트
│   ├── /home              # 홈페이지 컴포넌트
│   ├── /about             # About 페이지 컴포넌트
│   ├── /b2b               # B2B 서비스 컴포넌트
│   ├── /b2c               # B2C 랩스 컴포넌트
│   ├── /works             # Works 포트폴리오 컴포넌트
│   └── (shared)           # 공유 컴포넌트
├── /sanity                # CMS 설정
│   ├── /lib               # Sanity 유틸리티
│   ├── /schemas           # 문서 스키마
│   └── /plugins           # Sanity 플러그인
├── /styles                # 전역 스타일
├── /hooks                 # 커스텀 React Hooks
├── /types                 # TypeScript 타입 정의
├── /public/images         # 이미지 자산
└── 설정 파일들
```

## 🚀 시작하기

### 필수 사항

- Node.js 18 이상
- pnpm (권장) 또는 npm

### 설치

```bash
# 의존성 설치
pnpm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local을 편집하여 Sanity CMS 자격증명 입력
```

### 개발

```bash
# 개발 서버 시작
pnpm dev

# Sanity Studio 열기
pnpm sanity

# TypeScript 타입 검사
pnpm type-check

# 코드 포맷팅
pnpm format
```

### 프로덕션 빌드

```bash
# 프로덕션용 빌드
pnpm build

# 프로덕션 서버 시작
pnpm start
```

## 📝 환경 변수 설정

루트 디렉토리에 `.env.local` 파일을 생성하세요:

```env
# Sanity CMS (https://manage.sanity.io에서 확인)
NEXT_PUBLIC_SANITY_PROJECT_ID=프로젝트_아이디
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=읽기_토큰
SANITY_API_WRITE_TOKEN=쓰기_토큰
NEXT_PUBLIC_SANITY_PROJECT_TITLE=프로젝트_제목

# 기능 플래그
NEXT_PUBLIC_ENABLE_WORKS_PAGE=true
```

## 🎯 주요 페이지

| 페이지           | 경로     | 상태        |
| ---------------- | -------- | ----------- |
| 홈               | `/`      | 활성화      |
| About            | `/about` | 활성화      |
| B2B 서비스       | `/b2b`   | 활성화      |
| B2C 랩스         | `/b2c`   | 활성화      |
| Works 포트폴리오 | `/works` | 기능 제어됨 |

## 🎨 디자인 시스템

### 색상 팔레트

- **주요색**: #56C5D0
- **네이비**: #003BB1
- **진 네이비**: #0E1C62
- **텍스트**: #231F20 (어두운 회색)
- **보조 텍스트**: #999999 (밝은 회색)

### 타이포그래피

- **주요 폰트**: Pretendard Variable
- **추가 폰트**: Inter, Inria Serif, Serif

### 여백 규칙

모든 섹션의 기본 패딩:

- 모바일: `px-7` (28px)
- 태블릿: `md:px-10` (40px)
- 데스크탑: `lg:px-20` (80px)

## 🔧 자주 사용하는 명령어

```bash
pnpm dev          # 개발 서버 시작
pnpm build        # 프로덕션용 빌드
pnpm start        # 프로덕션 서버 시작
pnpm type-check   # TypeScript 타입 검사 실행
pnpm format       # Prettier로 코드 포맷팅
pnpm lint         # ESLint로 코드 검사
pnpm sanity       # Sanity Studio 열기
```
