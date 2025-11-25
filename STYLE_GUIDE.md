# Reroute 스타일 가이드

프로젝트 전체의 디자인 일관성을 유지하기 위한 스타일 가이드입니다.

**목차**
- [패딩 컨벤션](#1-패딩-padding-컨벤션)
- [OUR SERVICE 섹션](#2-our-service-섹션-타이포그래피)
- [마케 텍스트 애니메이션](#3-마케-텍스트-애니메이션-marquee)
- [B2C 페이지 컴포넌트](#4-b2c-페이지-컴포넌트-스타일)
- [CustomPortableText 이미지](#5-customportabletext-이미지-스타일)
- [상세 페이지 공통 컴포넌트](#6-상세-페이지-공통-컴포넌트)

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

