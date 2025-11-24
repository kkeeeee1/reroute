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

## 4. B2C 페이지 컴포넌트 스타일

### B2C 목록 페이지 (`/b2c`)

#### 페이지 헤더

| 항목       | 값                           |
| ---------- | ---------------------------- |
| 제목       | text-5xl lg:text-6xl font-bold |
| 설명 텍스트 | text-lg text-gray-600        |
| 간격       | space-y-4                   |

#### 앱 카드 컴포넌트

**외부 스타일**
```css
/* 컨테이너 */
flex flex-col h-full overflow-hidden rounded-xl
border border-gray-100 bg-white
transition-all duration-300 hover:border-gray-300 hover:shadow-lg

/* 그리드 레이아웃 */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
```

**이미지 영역**
```css
relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50
aspect-video
transition-transform duration-300 group-hover:scale-105
```

**콘텐츠 영역**
```css
flex flex-col flex-grow p-6 space-y-3

/* 제목 */
text-xl font-bold text-gray-900
transition-colors duration-300 group-hover:text-primary

/* 설명 */
text-sm text-gray-600 leading-relaxed flex-grow

/* 링크 표시 */
flex items-center justify-between pt-3 border-t border-gray-100
opacity-0 group-hover:opacity-100 transition-opacity duration-300
```

### B2C 상세 페이지 (`/b2c/[appId]`)

#### 페이지 레이아웃
- **패딩**: px-7 md:px-10 lg:px-20 (전역 패딩 컨벤션 준수)
- **섹션 간격**: space-y-16 (여유있는 간격)
- **전체 구조**: 헤더 (타이틀 먼저) → 이미지 → 콘텐츠

#### 헤더 섹션

**대표 이미지** (고급스러운 스타일)
```css
/* 이미지 컨테이너 */
relative w-full overflow-hidden rounded-2xl
bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100
border border-gray-200
aspect-video max-w-4xl
shadow-lg

/* 호버 오버레이 - 사진 위에 그라데이션 */
absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent
opacity-0 hover:opacity-100 transition-opacity duration-300
```

**배지 라벨** (앱 카테고리 표시)
```css
inline-flex items-center gap-2
px-3 py-1 bg-primary/10 rounded-full
text-sm font-semibold text-primary uppercase tracking-widest
```

**타이틀 및 설명**
```css
/* 타이틀 */
text-5xl lg:text-6xl font-bold text-navy
leading-tight tracking-tight

/* 설명 텍스트 */
text-lg lg:text-xl text-gray-600
leading-relaxed max-w-3xl font-light

/* 메타 정보 (출시일) */
flex items-center gap-2 text-sm text-gray-600
border-t border-gray-200/60 pt-4
```

#### 콘텐츠 섹션

```css
space-y-8
border-t border-gray-200 pt-12

/* 콘텐츠 컨테이너 */
max-w-3xl (가독성 최적화)
text-base lg:text-lg leading-relaxed text-gray-700
```

---

## 5. CustomPortableText 이미지 스타일

### 이미지 컨테이너

```css
figure className="my-8 space-y-3 max-w-2xl"

/* 이미지 박스 */
relative w-full overflow-hidden rounded-xl
bg-gradient-to-br from-gray-100 to-gray-50
border border-gray-200 shadow-sm
aspect-ratio: 유지 (원본 이미지 비율)

/* 이미지 */
object-contain p-3
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 700px"
```

### 캡션

```css
figcaption className="text-center font-sans text-sm text-gray-600 italic"
```

### 설계 원칙

1. **크기 최적화**:
   - `max-w-2xl`: 이미지 최대 너비 제한 (과도한 확대 방지)
   - `object-contain`으로 이미지 비율 유지
   - `p-3` 패딩으로 충분한 여백 확보
   - Responsive `sizes` attribute로 성능 최적화 (모바일: 100vw, 태블릿: 85vw, 데스크톱: 700px)

2. **시각 계층**:
   - Gradient 배경으로 세련된 느낌
   - 명확한 보더로 콘텐츠 구분
   - 캡션은 이탤릭으로 구분
   - Navy 톤의 메인 페이지와 조화로운 색상

3. **간격**:
   - `my-8`: 위아래 여백 (섹션 구분)
   - `space-y-3`: 이미지와 캡션 간 적절한 간격

### CMS에서 이미지 조정하기 (Hotspot & Crop & 크기 조정)

**Sanity CMS 대시보드에서 이미지 관리자가 직접 조정 가능:**

#### 1. 이미지 크기 선택 (size field)

콘텐츠 편집 화면에서 이미지 추가 시 **"이미지 (크기 조정 가능)"** 타입 선택:

| 크기 옵션 | 표시 너비 | 용도 |
|----------|---------|------|
| 소형 (400px) | 384px (max-w-sm) | 아이콘, 작은 일러스트 |
| 중형 (600px) | 672px (max-w-2xl) | 기본값, 대부분의 이미지 |
| 대형 (900px) | 896px (max-w-4xl) | 하이라이트 이미지 |
| 전체폭 (100%) | 100% (w-full) | 풀스크린 임팩트 필요할 때 |

#### 2. 이미지 편집 시 조정 가능한 항목

각 이미지마다 다음을 설정할 수 있습니다:

- **이미지** (필수):
  - Hotspot 탭에서 중요 부분 지정
  - Crop 기능으로 원하는 영역만 선택

- **크기** (선택):
  - 드롭다운에서 크기 선택 (기본값: 중형)
  - 변경 즉시 미리보기로 확인 가능

- **이미지 설명 (SEO)**:
  - 접근성과 검색 최적화를 위한 alt text

- **캡션**:
  - 이미지 아래에 표시될 설명 텍스트

#### 3. 자동 반영

- 관리자가 설정한 모든 옵션은 자동으로 웹사이트에 반영됨
- 별도 코드 수정 없이 CMS에서만 관리 가능
- Hotspot은 이미지 URL에 자동으로 포함되어 정확한 크롭 반영

#### 렌더링 예시

```
소형 이미지    → 400px 너비로 표시
중형 이미지    → 672px 너비로 표시 (기본)
대형 이미지    → 896px 너비로 표시
전체폭 이미지  → 화면 전체 너비로 표시
```

**IMPORTANT**: 기존의 단순 `image` 타입도 여전히 사용 가능하며, 중형(672px)으로 자동 표시됩니다.

---

## 6. 상세 페이지 공통 컴포넌트

B2C 앱 상세 페이지와 Works 상세 페이지에서 공통으로 사용하는 컴포넌트입니다.

### 뒤로가기 버튼

**위치**: 페이지 최상단, 모든 섹션 위

```html
<Link href="/리스트페이지" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-navy transition-colors duration-300 group">
  <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" ...>
    <!-- 왼쪽 화살표 아이콘 -->
  </svg>
  목록으로 돌아가기
</Link>
```

**스타일:**
```css
/* 링크 */
inline-flex items-center gap-2
text-sm font-semibold text-gray-600
hover:text-navy transition-colors duration-300

/* 아이콘 호버 효과 */
group-hover:-translate-x-1 (왼쪽으로 슬라이드)
```

**사용 경로:**
- B2C 상세: `/b2c/[appId]` → `/b2c` (목록)
- Works 상세: `/works/[workId]` → `/works` (목록)

### 페이지 레이아웃 구조 (B2C & Works)

모든 상세 페이지는 동일한 구조를 따릅니다:

```
1. 뒤로가기 버튼
   ↓
2. 대표 이미지 (고급스러운 스타일)
   - rounded-2xl, shadow-lg
   - 호버 시 그라데이션 오버레이
   ↓
3. 타이틀 및 설명
   - 배지 라벨 (App Feature / Work)
   - Navy 색상 제목 (text-5xl lg:text-6xl)
   - 경량 설명 (font-light)
   ↓
4. 메타 정보
   - 아이콘 + 텍스트
   - (B2C: 출시일) / (Works: 기간, 역할)
   ↓
5. 콘텐츠 섹션
   - CustomPortableText
   - max-w-3xl
```

### 배지 라벨

```css
inline-flex items-center gap-2
px-3 py-1 bg-primary/10 rounded-full
text-sm font-semibold text-primary uppercase tracking-widest
```

**표시 텍스트:**
- B2C 앱: "App Feature"
- Works: "Work"

---
