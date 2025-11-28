# CLAUDE.md - Claude Code 프로젝트 가이드

Claude Code가 Reroute 프로젝트를 효율적으로 작업하기 위한 가이드입니다.

## 프로젝트 개요

- **프로젝트명**: Reroute
- **타입**: Next.js + React 웹 애플리케이션
- **주요 기술**: React 19, Next.js 16, TypeScript, Tailwind CSS, GSAP + ScrollTrigger
- **패키지 매니저**: pnpm

## 중요 규칙

### 1. 명령한 작업만 수행

- **요청된 기능만 구현**합니다 (오버엔지니어링 금지)
- 추가 리팩토링, 주석 추가, 개선사항 제안 X
- 변경 범위 최소화

### 2. 파일 크기 증가 금지

- 불필요한 코드 추가 제거
- 파일을 더 크게 만들지 않기
- 최소한의 변경으로 요청 완료

## 코딩 규칙

### 파일 및 폴더 명명

- **컴포넌트**: PascalCase (예: `AppDetailContent.tsx`)
- **유틸리티**: camelCase (예: `formatDate.ts`)
- **폴더**: kebab-case (예: `components/b2c/`)

### 임포트 순서

```typescript
import { ComponentName } from "@/components/...";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
```

## 스타일 가이드

### 전역 패딩 (모든 주요 섹션)

```
px-7 md:px-10 lg:px-20
```

| 화면 크기     | Tailwind | 픽셀값 |
| ------------- | -------- | ------ |
| 모바일        | px-7     | 28px   |
| 태블릿 (md)   | md:px-10 | 40px   |
| 데스크탑 (lg) | lg:px-20 | 80px   |

### GSAP 애니메이션 패턴

모든 애니메이션은 **직접 GSAP + ScrollTrigger** 패턴 사용 (AnimatedWrapper 사용 금지):

**GSAP 규칙:**

- 모든 애니메이션 컴포넌트에 `'use client'` 필수
- ScrollTrigger 등록: `gsap.registerPlugin(ScrollTrigger)`
- `gsap.context()`로 감싸기 (메모리 누수 방지)
- 요소에 `opacity-0` + `willChange` 적용
- `ctx.revert()` cleanup 함수에서 호출

**권장 애니메이션 값:**

- 상단 요소 (제목, 이미지): `{ y: 40, opacity: 0 }` → `{ y: 0, opacity: 1, duration: 0.8 }`
- 본문/콘텐츠: `{ y: 50, opacity: 0 }` → `{ y: 0, opacity: 1, duration: 1 }`
- 카드/그리드: `{ y: 50, opacity: 0 }` → `{ y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }`

**ScrollTrigger 시작점:**

- `'top 75%'`: 요소 상단이 뷰포트 중간 (일반적)
- `'top 80%'`: 리스트/그리드
- `'top 85%'`: 하단 버튼 등

### 특수 속성

**Navbar 어두운 섹션:**
어두운 배경 섹션에는 `id` 추가:

```tsx
<section id="about-section" className="bg-black">
  ...
</section>
```

현재 등록된 섹션:

- `about-section` - About 페이지
- `b2b-hero-section` - B2B Hero
- `b2b-solutions-section` - B2B Solutions
- `b2b-why-reroute-section` - B2B Why Reroute
- `b2b-cta-section` - B2B CTA

**커스텀 커서 제외:**
호버 커서를 표시하지 않으려면 `data-no-cursor` 추가:

```tsx
<button data-no-cursor onClick={handleClick}>
  클릭
</button>
```

### 자동 커밋 금지
