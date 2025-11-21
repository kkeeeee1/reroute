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

| 화면 크기     | Tailwind | 픽셀값 |
| ------------- | -------- | ------ |
| 모바일 (기본) | px-5     | 20px   |
| 태블릿 (md)   | md:px-10 | 40px   |
| 데스크탑 (lg) | lg:px-20 | 80px   |

### 사용 예시

- **Navbar.tsx**: `p-5 md:p-10 lg:p-20`
- **HomePage.tsx**: `px-5 md:px-10 lg:px-20`
- **AboutSection.tsx**: `px-5 md:px-10 lg:px-20`

---

## 2. About 섹션 (WE REROUTE)

### 섹션 배경 및 패딩

```
w-full bg-navy px-5 py-16 md:px-10 md:py-20 lg:px-20 lg:py-28
```

### 레이아웃 구조

**WE REROUTE 헤더**: Horizontal flex 레이아웃
```
<div className="flex items-center gap-3 md:gap-4 lg:gap-6">
  WE — [Line/Image] — REROUTE
</div>
```

**섹션 전체**: Vertical flex 레이아웃으로 justify-between 구현
```
<div className="flex flex-col">
  [WE REROUTE 헤더]
  [설명 텍스트]
  [VIEW MORE 버튼 - mt-auto로 하단 고정]
</div>
```

### 타이포그래피

#### WE & REROUTE 헤딩

**폰트**: Pretendard Variable
**가중치**: 800 (ExtraBold)
**배치**: 좌우 정렬 (한 줄)

| 화면 크기      | Tailwind                              | 픽셀값 |
| -------------- | ------------------------------------- | ------ |
| 모바일 (base)  | text-[40px] leading-[40px]            | 40px   |
| 태블릿 (md)    | md:text-[60px] md:leading-[60px]      | 60px   |
| 데스크탑 (lg)  | lg:text-[140px] lg:leading-[140px]    | 140px  |

**사용**: `className="text-[40px] font-extrabold leading-[40px] text-white md:text-[60px] md:leading-[60px] lg:text-[140px] lg:leading-[140px]"`

#### 선 (Line)

**크기**:
- 모바일: 40px 너비
- 태블릿: 40px 너비
- 데스크탑: 40px 너비

**애니메이션**: 1.2초 지연 후 사라짐 (0.6초 duration)

#### 이미지 (main_we_reroute.png)

**크기**:
| 화면 크기     | 너비     | 높이     |
| ------------- | -------- | -------- |
| 모바일 (base) | 80px     | 40px     |
| 태블릿 (md)   | 120px    | 60px     |
| 데스크탑 (lg) | 280px    | 140px    |

**애니메이션**: 선 사라짐과 동시에 등장 (0.6초 duration)

#### 설명 텍스트 (Description)

**폰트**: Pretendard Variable
**가중치**: 400 (Regular)
**구조**: 줄바꿈 포함 (`<br />`)

| 화면 크기     | Tailwind                         | 픽셀값 |
| ------------- | -------------------------------- | ------ |
| 모바일 (base) | text-[16px] leading-[24px]       | 16px   |
| 태블릿 (md)   | md:text-[20px] md:leading-[30px] | 20px   |
| 데스크탑 (lg) | lg:text-[24px] lg:leading-[36px] | 24px   |

**사용**: `className="text-[16px] font-normal leading-[24px] text-white md:text-[20px] md:leading-[30px] lg:text-[24px] lg:leading-[36px]"`

**텍스트 구조**:
```
리루트는 기업의 복잡한 문제와 기존 방식에 갇힌 조직을 진단하고,
전략부터 실행까지 한 흐름으로 연결합니다. 통합 운영관리, 브랜딩 &
고객 경험 설계, 통합 마케팅, 맞춤형 플랫폼 개발까지 브랜드와
비즈니스가 본질에 집중하며 나아갈 수 있는 구조를 완성합니다.
```

#### VIEW MORE 버튼

**폰트**: Pretendard Variable
**가중치**: 700 (Bold)
**상태**: hover 시 opacity-70

| 화면 크기     | Tailwind  | 픽셀값 |
| ------------- | --------- | ------ |
| 모바일 (base) | text-[18px] | 18px   |
| 태블릿 (md)   | md:text-[20px] | 20px   |
| 데스크탑 (lg) | lg:text-[24px] | 24px   |

**사용**: `className="text-[18px] font-bold leading-[100%] text-white md:text-[20px] lg:text-[24px]"`

### 간격 (Spacing)

#### WE와 REROUTE 사이의 선/이미지 간격

| 화면 크기     | Tailwind | 픽셀값 |
| ------------- | -------- | ------ |
| 모바일 (base) | gap-3    | 12px   |
| 태블릿 (md)   | md:gap-4 | 16px   |
| 데스크탑 (lg) | lg:gap-6 | 24px   |

**사용**: `className="flex items-center gap-3 md:gap-4 lg:gap-6"`

#### WE REROUTE → 설명 텍스트 마진

| 화면 크기     | Tailwind   | 픽셀값 |
| ------------- | ---------- | ------ |
| 모바일 (base) | mt-16      | 64px   |
| 태블릿 (md)   | md:mt-20   | 80px   |
| 데스크탑 (lg) | lg:mt-24   | 96px   |

**사용**: `className="mt-16 md:mt-20 lg:mt-24"`

#### 설명 텍스트 → VIEW MORE 마진 (justify-between 효과)

**구현**: `mt-auto` + padding으로 구현

| 화면 크기     | Tailwind  | 픽셀값 |
| ------------- | --------- | ------ |
| 모바일 (base) | pt-8      | 32px   |
| 태블릿 (md)   | md:pt-12  | 48px   |
| 데스크탑 (lg) | lg:pt-16  | 64px   |

**사용**: `className="mt-auto pt-8 md:pt-12 lg:pt-16"`

### 색상

- **배경색**: navy (`#0E1C62`)
- **텍스트색**: white (`#FFFFFF`)
- **선 색상**: white (`#FFFFFF`)
- **호버 상태**: opacity-70 (70% 불투명도)

---

## 3. 색상 팔레트

| 색상명 | HEX값    | 용도                    |
| ------ | -------- | ----------------------- |
| Navy   | #0E1C62  | About 섹션 배경         |
| White  | #FFFFFF  | 텍스트, 선, 기본 배경   |
| Black  | #000000  | 일반 텍스트             |
| Gold   | via-yellow-200 | "Reroute" shimmer 효과 |

---

## 4. 애니메이션

### Shimmer Text (금빛 흐르는 효과)

**특성**:
- 5초 사이클
- 좌 → 우 방향
- 0-10%: 대기, 15-35%: 애니메이션, 40-100%: 대기

**적용 대상**: Hero 섹션의 "Reroute" 텍스트

### 스크롤 트리거 애니메이션 (Scroll-triggered)

**About 섹션**:
- IntersectionObserver 감지 (threshold: 0.3)
- WE 헤딩: fade-in + slide-up (0.2s 지연)
- REROUTE 헤딩: fade-in + slide-up (0.4s 지연)
- 선: 1.2s 지연 후 축소 및 사라짐 (0.6s duration)
- 이미지: 선 사라짐과 동시에 나타남 (0.6s duration)
- 설명 텍스트: fade-in + slide-up (0.6s 지연)
- VIEW MORE 버튼: fade-in + slide-up (0.8s 지연)

---

## 5. 반응형 브레이크포인트

| 이름          | Tailwind | 너비   |
| ------------- | -------- | ------ |
| 모바일        | (기본)   | 0px    |
| 소형 모바일   | sm       | 640px  |
| 태블릿        | md       | 768px  |
| 작은 데스크탑 | lg       | 1024px |
| 중간 데스크탑 | xl       | 1280px |
| 큰 데스크탑   | 2xl      | 1536px |
| 최대 너비     | screen-max | 1920px |

---

## 6. 컴포넌트별 적용 가이드

### Navbar
- 패딩: `p-5 md:p-10 lg:p-20`
- 배경: transparent (white로 변경 가능)
- Z-index: z-50

### Hero Section (HomePage)
- 패딩: `px-5 md:px-10 lg:px-20`
- 레이아웃: Flexbox, 3-column (text, image, text)
- 최대 너비: max-w-screen-max (1920px)
- 특수 효과: 시작 시 흰색 화면에서 분할 애니메이션

### About Section
- 배경: navy
- 패딩: `px-5 py-16 md:px-10 md:py-20 lg:px-20 lg:py-28`
- 레이아웃: Flexbox column으로 좌측 정렬
- 최대 너비: max-w-screen-max (1920px)
- 애니메이션: 스크롤 트리거

---

## 7. 주의사항

1. **패딩 일관성**: 모든 주요 섹션은 `px-5 md:px-10 lg:px-20`을 사용합니다.
2. **색상 접근성**: Navy 배경 위의 흰색 텍스트는 충분한 명도 대비를 제공합니다.
3. **폰트**: Pretendard Variable 폰트 가중치를 정확히 지정합니다 (400, 700, 800).
4. **레이아웃**: About 섹션은 flex column으로 vertical distribution을 구현합니다.
5. **Z-index 관리**: Navbar (z-50) > Hero Overlay (z-10) 순서를 유지합니다.
6. **이미지 세로 정렬**: 선과 이미지가 WE REROUTE 텍스트와 수직 중앙 정렬됩니다.
