# Reroute 스타일 가이드

프로젝트 전체의 디자인 일관성을 유지하기 위한 스타일 가이드입니다.

**목차**
- [패딩 컨벤션](#1-패딩-padding-컨벤션)
- [OUR SERVICE 섹션](#2-our-service-섹션-타이포그래피)
- [마케 텍스트 애니메이션](#3-마케-텍스트-애니메이션-marquee)
- [B2C 페이지 컴포넌트](#4-b2c-페이지-컴포넌트-스타일)
- [CustomPortableText 이미지](#5-customportabletext-이미지-스타일)
- [상세 페이지 공통 컴포넌트](#6-상세-페이지-공통-컴포넌트)
- [Navbar 섹션 ID](#7-navbar-섹션-id)
- [커스텀 커서 제외](#8-커스텀-커서-제외)

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

## 2. Navbar 섹션 ID

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

## 3. 커스텀 커서 제외

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
