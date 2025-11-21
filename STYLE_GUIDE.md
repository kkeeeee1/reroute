# Reroute 스타일 가이드

프로젝트 전체의 디자인 일관성을 유지하기 위한 스타일 가이드입니다.

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

## 2. OUR SERVICE 섹션 타이포그래피

### 제목 (OUR SERVICE)

| 항목     | 값                    |
| -------- | --------------------- |
| 폰트     | Pretendard Variable   |
| 크기     | 32px (sm: 36px, md: 40px, lg: 56px) |
| 스타일   | ExtraBold (800)       |
| 행간     | 40px (sm: 45px, md: 50px, lg: 70px) |

---

## 3. 마케 텍스트 애니메이션 (Marquee)

### 텍스트 "We don't just solve problems We Reroute them"

| 항목       | 값                    |
| ---------- | --------------------- |
| 폰트       | Inter                 |
| 크기       | 80px (md: 120px, lg: 150px) |
| 스타일     | Bold (600)            |
| 행간       | 100px (md: 140px, lg: 170px) |
| 애니메이션 | 우 → 좌 (20초, linear) |

### "We Reroute them" (Italic 부분)

| 항목   | 값          |
| ------ | ----------- |
| 폰트   | Inria Serif |
| 크기   | 150px (lg)  |
| 스타일 | Italic (700) |
| 행간   | 100% |
| 자간   | -2% |

---
