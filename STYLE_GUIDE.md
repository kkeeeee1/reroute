# Reroute 스타일 가이드

프로젝트 전체의 디자인 일관성을 유지하기 위한 스타일 가이드입니다.

**목차**
- [패딩 컨벤션](#1-패딩-padding-컨벤션)
- [OUR SERVICE 섹션](#2-our-service-섹션-타이포그래피)
- [마케 텍스트 애니메이션](#3-마케-텍스트-애니메이션-marquee)
- [B2C 페이지 컴포넌트](#4-b2c-페이지-컴포넌트-스타일)
- [CustomPortableText 이미지](#5-customportabletext-이미지-스타일)
- [상세 페이지 공통 컴포넌트](#6-상세-페이지-공통-컴포넌트)
- [인트로 애니메이션과 콘텐츠 동기화](#7-인트로-애니메이션과-콘텐츠-동기화)
- [Navbar 섹션 ID](#8-navbar-섹션-id)
- [커스텀 커서 제외](#9-커스텀-커서-제외)

---

## 1. 패딩 (Padding) 컨벤션

### 전역 패딩 규칙

**IMPORTANT**: 모든 주요 섹션(Header, Navigation, Hero Section, About Section 등)에서 사용되는 표준 좌우 패딩입니다.

```
px-7 md:px-10 lg:px-20
```

### 반응형 스케일

| 화면 크기     | Tailwind | 픽셀값 |
| ------------- | -------- | ------ |
| 모바일 (기본) | px-7     | 28px   |
| 태블릿 (md)   | md:px-10 | 40px   |
| 데스크탑 (lg) | lg:px-20 | 80px   |

### 사용 예시

- **Navbar.tsx**: `px-7 md:px-10 lg:px-20`
- **HomePage.tsx**: `px-7 md:px-10 lg:px-20`
- **AboutSection.tsx**: `px-7 md:px-10 lg:px-20`
- **ServiceSection.tsx**: `px-7 md:px-10 lg:px-20`
- **MarqueeText.tsx**: `px-7 md:px-10 lg:px-20`

---

## 7. GSAP 애니메이션 패턴

### 개요

모든 페이지 애니메이션은 **직접 GSAP** + **ScrollTrigger** 패턴으로 통일됩니다. AnimatedWrapper 래퍼 컴포넌트는 제거되었으며, 각 컴포넌트에서 애니메이션을 직접 관리합니다.

### 구현 패턴

#### 기본 구조

```tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function MyComponent() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (elementRef.current) {
        gsap.fromTo(
          elementRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elementRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={elementRef} className="opacity-0" style={{ willChange: 'transform, opacity' }}>
      {/* 콘텐츠 */}
    </div>
  );
}
```

### 주요 규칙

1. **'use client' 필수**: 모든 애니메이션 컴포넌트는 클라이언트 컴포넌트여야 함
2. **ScrollTrigger 등록**: 파일 상단에 `gsap.registerPlugin(ScrollTrigger)` 필수
3. **gsap.context() 사용**: 메모리 누수 방지를 위해 반드시 context로 감싸기
4. **초기 상태**: 요소에 `opacity-0` 클래스와 `willChange` 스타일 적용
5. **useRef**: 애니메이션할 각 요소에 ref 할당

### 애니메이션 속성 표

| 속성 | 용도 | 예시 |
| --- | --- | --- |
| `y` / `x` | 위치 이동 | `{ y: 50, opacity: 0 }` → `{ y: 0, opacity: 1 }` |
| `scale` | 크기 변화 | `{ scale: 0.9 }` → `{ scale: 1 }` |
| `opacity` | 투명도 | `{ opacity: 0 }` → `{ opacity: 1 }` |
| `duration` | 애니메이션 시간 | `duration: 0.8` (초) |
| `delay` | 지연 시간 | `delay: 0.2` (초) |
| `ease` | 이징 함수 | `'power3.out'`, `'power2.out'` |
| `stagger` | 요소 간 간격 | `stagger: 0.1` (0.1초 간격) |

### ScrollTrigger 옵션

```tsx
scrollTrigger: {
  trigger: element,           // 트리거할 요소
  start: 'top 75%',          // 시작점 (요소 상단이 뷰포트 75% 위치)
  end: 'top 25%',            // 끝점 (선택사항)
  scrub: true,               // 스크롤 속도에 연결 (선택사항)
}
```

**시작점 가이드:**
- `'top 75%'`: 요소 상단이 뷰포트 중간 정도 내려왔을 때 (일반적)
- `'top 80%'`: 요소가 조금 더 아래 보여졌을 때 (리스트/그리드)
- `'top 85%'`: 요소가 더 늦게 시작 (하단 버튼 등)

### 권장 설정값

**상단 요소들 (제목, 이미지):**
```tsx
{ y: 40, opacity: 0 } → { y: 0, opacity: 1, duration: 0.8 }
```

**본문/콘텐츠:**
```tsx
{ y: 50, opacity: 0 } → { y: 0, opacity: 1, duration: 1 }
```

**카드/그리드:**
```tsx
{ y: 50, opacity: 0 } → { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
```

### 實제 사용 예 (AppDetailContent)

```tsx
// Thumbnail
gsap.fromTo(
  thumbnailRef.current,
  { scale: 0.9, opacity: 0 },
  { scale: 1, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: {...} }
);

// Title (delay로 시차)
gsap.fromTo(
  titleRef.current,
  { y: 40, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power2.out', scrollTrigger: {...} }
);
```

### 체크리스트 (새 섹션 추가 시)

- [ ] `'use client'` 선언 추가
- [ ] `gsap`, `ScrollTrigger` import
- [ ] `gsap.registerPlugin(ScrollTrigger)` 실행
- [ ] 애니메이션할 요소에 `useRef` 생성
- [ ] `useEffect`에서 `gsap.context()` 사용
- [ ] 모든 요소에 `opacity-0` + `willChange` 적용
- [ ] `cleanup` 함수에서 `ctx.revert()` 호출

---

## 8. Navbar 섹션 ID

### Navbar 색상 자동 전환

Navbar는 스크롤 위치에 따라 자동으로 색상이 변경됩니다.

- **기본**: 검정색 로고 + 검정색 메뉴
- **어두운 섹션 위**: 흰색 로고 + 흰색 메뉴

### 어두운 섹션 등록 방법

어두운 배경 섹션(검정, Navy 등)에는 `id`를 추가하고 `constants/sections.ts`에 등록:

```tsx
// 1. 섹션에 id 추가
<section id="my-dark-section" className="bg-black">
  ...
</section>

// 2. constants/sections.ts에 등록
export const DARK_SECTION_IDS = {
  MY_SECTION: 'my-dark-section',
} as const;
```

### 현재 등록된 섹션

- `about-section` - About 페이지
- `b2b-hero-section` - B2B Hero
- `b2b-solutions-section` - B2B Solutions
- `b2b-why-reroute-section` - B2B Why Reroute
- `b2b-cta-section` - B2B CTA

---

## 9. 커스텀 커서 제외

### 개요

기본적으로 모든 클릭 가능한 요소(링크, 버튼)에서 커스텀 커서가 호버 상태로 변경됩니다. 특정 요소에서 이 동작을 비활성화하려면 `data-no-cursor` 속성을 사용합니다.

### 사용 방법

호버 커서를 표시하지 않으려는 요소에 `data-no-cursor` 속성 추가:

```tsx
// 버튼 예시
<button data-no-cursor onClick={handleClick}>
  클릭
</button>

// 링크 예시
<a href="/page" data-no-cursor>
  링크
</a>
```

### 현재 적용된 곳

- **Footer 연락처 링크** - MAIL, KAKAOTALK 링크
- **ScrollToTopButton** - 스크롤 투 탑 버튼
- **AccordionItem 버튼** - 핵심 제공 가치 버튼

### 주의사항

- 부모 요소에 `data-no-cursor`를 추가하면 모든 자식 요소에도 적용됩니다
- 특별한 이유가 없으면 **일관성을 위해 이 방식만 사용**합니다
