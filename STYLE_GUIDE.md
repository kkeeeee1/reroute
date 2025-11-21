# Reroute 스타일 가이드

프로젝트 전체의 디자인 일관성을 유지하기 위한 스타일 가이드입니다.

---

## 1. 패딩 (Padding) 컨벤션

### 전역 패딩 규칙

**IMPORTANT**: 모든 주요 섹션(Header, Navigation, Hero Section, About Section 등)에서 사용되는 표준 좌우 패딩입니다.

```
px-5 md:px-10 lg:px-20
```

### 반응형 스케일

| 화면 크기 | Tailwind | 픽셀값 |
|----------|---------|--------|
| 모바일 (기본) | px-5 | 20px |
| 태블릿 (md) | md:px-10 | 40px |
| 데스크탑 (lg) | lg:px-20 | 80px |

### 사용 예시

- **Navbar.tsx**: `p-5 md:p-10 lg:p-20`
- **HomePage.tsx**: `px-5 md:px-10 lg:px-20`
- **AboutSection.tsx**: `px-5 md:px-10 lg:px-20`

---

## 2. About 섹션 (WE REROUTE)

### 섹션 배경 및 패딩

```
w-full bg-navy px-5 py-16 md:px-10 md:py-24 lg:px-20 lg:py-32
```

### 타이포그래피

#### WE & REROUTE 헤딩

**폰트**: Pretendard Variable
**가중치**: 800 (ExtraBold)

| 화면 크기 | Tailwind | 픽셀값 |
|----------|---------|--------|
| 모바일 (base) | text-[60px] leading-[60px] | 60px |
| 태블릿 (md) | md:text-[80px] md:leading-[80px] | 80px |
| 데스크탑 (lg) | lg:text-[200px] lg:leading-[200px] | 200px |

**사용**: `className="text-[60px] font-extrabold leading-[60px] text-white md:text-[80px] md:leading-[80px] lg:text-[200px] lg:leading-[200px]"`

#### 설명 텍스트 (Description)

**폰트**: Pretendard Variable
**가중치**: 400 (Regular)

| 화면 크기 | Tailwind | 픽셀값 |
|----------|---------|--------|
| 모바일 (base) | text-[32px] leading-[40px] | 32px |
| 태블릿 (md) | md:text-[40px] md:leading-[58px] | 40px |
| 데스크탑 (lg) | lg:text-[40px] lg:leading-[58px] | 40px |

**사용**: `className="text-[32px] font-normal leading-[40px] text-white md:text-[40px] md:leading-[58px] lg:text-[40px] lg:leading-[58px]"`

#### VIEW MORE 버튼

**폰트**: Pretendard Variable
**가중치**: 700 (Bold)

| 화면 크기 | Tailwind | 픽셀값 |
|----------|---------|--------|
| 모바일 (base) | text-[28px] leading-[100%] | 28px |
| 태블릿 (md) | md:text-[28px] md:leading-[100%] | 28px |
| 데스크탑 (lg) | lg:text-[28px] lg:leading-[100%] | 28px |

**사용**: `className="text-[28px] font-bold leading-[100%] text-white"`

### 간격 (Spacing)

#### WE와 REROUTE 사이의 선 간격

| 화면 크기 | Tailwind | 픽셀값 |
|----------|---------|--------|
| 모바일 (base) | gap-4 | 16px |
| 태블릿 (md) | md:gap-6 | 24px |
| 데스크탑 (lg) | lg:gap-9 | 36px |

**사용**: `className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-9"`

#### 설명 텍스트 마진 (WE REROUTE → 설명 텍스트)

**동적 마진** (반응형):
```
style={{ marginTop: "clamp(40px, 8vw, 84px)" }}
```

- 최소값: 40px (모바일)
- 최대값: 84px (데스크탑)
- 뷰포트 기반 유동적 변화

#### 버튼 마진 (설명 텍스트 → VIEW MORE)

| 화면 크기 | Tailwind | 픽셀값 |
|----------|---------|--------|
| 모바일 (base) | mt-16 | 64px |
| 태블릿 (md) | md:mt-20 | 80px |
| 데스크탑 (lg) | lg:mt-28 | 112px |

**사용**: `className="mt-16 md:mt-20 lg:mt-28"`

### 색상

- **배경색**: navy (`#0E1C62`)
- **텍스트색**: white (`#FFFFFF`)
- **호버 상태**: opacity-70 (75% 불투명도)

---

## 3. 색상 팔레트

| 색상명 | HEX값 | 용도 |
|--------|--------|------|
| Navy | #0E1C62 | About 섹션 배경 |
| White | #FFFFFF | 텍스트, 선, 기본 배경 |
| Black | #000000 | 일반 텍스트 |
| Gold | via-yellow-200 | "Reroute" 텍스트 shimmer 효과 |

---

## 4. 애니메이션

### Shimmer Text (금빛 흐르는 효과)

**특성**:
- 5초 사이클
- 좌 → 우 방향
- 0-10%: 대기, 15-35%: 애니메이션, 40-100%: 대기

**적용 대상**: Hero 섹션의 "Reroute" 텍스트

**CSS**:
```css
@keyframes shimmer-text-horizontal {
  0% { background-position: -100% 0%; -webkit-text-fill-color: transparent; }
  10% { background-position: -100% 0%; -webkit-text-fill-color: transparent; }
  15% { background-position: 0% 0%; -webkit-text-fill-color: transparent; }
  35% { background-position: 100% 0%; -webkit-text-fill-color: transparent; }
  40% { background-position: 100% 0%; -webkit-text-fill-color: transparent; }
  100% { background-position: 100% 0%; -webkit-text-fill-color: transparent; }
}
```

### 스크롤 트리거 애니메이션 (Scroll-triggered)

**About 섹션**:
- IntersectionObserver 감지 (threshold: 0.3)
- WE 헤딩: fade-in + slide-up (0.2s 지연)
- REROUTE 헤딩: fade-in + slide-up (0.4s 지연)
- 선: 1.2s 지연 후 축소 및 사라짐
- 이미지: 선 사라짐과 동시에 나타남
- 설명 텍스트: fade-in + slide-up (0.6s 지연)
- VIEW MORE 버튼: fade-in + slide-up (0.8s 지연)

---

## 5. 반응형 브레이크포인트

| 이름 | Tailwind | 너비 |
|------|---------|------|
| 모바일 | (기본) | 0px |
| 소형 모바일 | sm | 640px |
| 태블릿 | md | 768px |
| 작은 데스크탑 | lg | 1024px |
| 중간 데스크탑 | xl | 1280px |
| 큰 데스크탑 | 2xl | 1536px |
| 최대 너비 | screen-max | 1920px |

---

## 6. 컴포넌트별 적용 가이드

### Navbar
- 패딩: `p-5 md:p-10 lg:p-20`
- 배경: white with backdrop blur
- Z-index: z-50

### Hero Section (HomePage)
- 패딩: `px-5 md:px-10 lg:px-20`
- 레이아웃: Flexbox, 3-column (text, image, text)
- 최대 너비: max-w-screen-max (1920px)
- 특수 효과: 시작 시 흰색 화면에서 분할 애니메이션

### About Section
- 배경: navy
- 패딩: `px-5 py-16 md:px-10 md:py-24 lg:px-20 lg:py-32`
- 레이아웃: Flexbox column, 중앙 정렬
- 최대 너비: max-w-screen-max (1920px)
- 애니메이션: 스크롤 트리거

---

## 7. 주의사항

1. **패딩 일관성**: 모든 주요 섹션은 `px-5 md:px-10 lg:px-20`을 사용합니다.
2. **색상 접근성**: Navy 배경 위의 흰색 텍스트는 충분한 명도 대비를 제공합니다.
3. **폰트**: Pretendard Variable 폰트 가중치를 정확히 지정합니다 (400, 700, 800).
4. **동적 값**: `clamp()`를 사용하여 반응형 간격을 구현합니다.
5. **Z-index 관리**: Navbar (z-50) > Hero Overlay (z-10) 순서를 유지합니다.

