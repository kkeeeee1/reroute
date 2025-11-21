/**
 * Global padding convention for consistent spacing across the project
 *
 * IMPORTANT: This is the standard padding used across all major sections
 * (Header, Navigation, Hero Section, and all major components)
 *
 * USED IN:
 * - Navbar.tsx: line 21 - "p-5 md:p-10 lg:p-20"
 * - Menu.tsx: line 32 - "px-5 md:px-10 lg:px-20 pt-5 md:pt-10 lg:pt-20"
 * - HomePage.tsx: line 59 - "px-5 md:px-10 lg:px-20"
 *
 * RESPONSIVE SCALE:
 * - Mobile (base): 20px (5 * 4px Tailwind unit)
 * - Tablet (md breakpoint): 40px (10 * 4px Tailwind unit)
 * - Desktop (lg breakpoint): 80px (20 * 4px Tailwind unit)
 */

export const PADDING = {
  mobile: 'p-5', // 20px
  tablet: 'md:p-10', // 40px
  desktop: 'lg:p-20', // 80px
} as const

/**
 * Horizontal padding only (left and right)
 * Use this when you only need to control horizontal padding
 * Example: section className="px-5 md:px-10 lg:px-20"
 */
export const PADDING_X = {
  mobile: 'px-5', // 20px
  tablet: 'md:px-10', // 40px
  desktop: 'lg:px-20', // 80px
} as const

/**
 * Vertical padding only (top and bottom)
 * Example: section className="py-5 md:py-10 lg:py-20"
 */
export const PADDING_Y = {
  mobile: 'py-5', // 20px
  tablet: 'md:py-10', // 40px
  desktop: 'lg:py-20', // 80px
} as const

/**
 * About Section - WE REROUTE styling guide
 *
 * TYPOGRAPHY:
 * - WE & REROUTE: Pretendard Variable, 800 (ExtraBold), 200px (desktop)
 * - Description: Pretendard Variable, 400 (Regular), 40px (desktop)
 * - VIEW MORE: Pretendard Variable, 700 (Bold), 28px (desktop)
 *
 * SPACING (Desktop baseline):
 * - Line gap between WE and REROUTE: 36px
 * - Text gap from WE REROUTE to description: 84px
 * - Section padding: p-5 md:p-10 lg:p-20 (matches Navbar & Hero)
 */
export const ABOUT_SECTION = {
  // WE & REROUTE heading
  heading: {
    desktop: 'text-[200px] font-extrabold leading-[200px]',
    lg: 'text-[200px] font-extrabold leading-[200px]',
    md: 'text-[80px] font-extrabold leading-[80px]',
    sm: 'text-[60px] font-extrabold leading-[60px]',
  },
  // Description text
  description: {
    desktop: 'text-[40px] font-normal leading-[58px]',
    lg: 'text-[40px] font-normal leading-[58px]',
    md: 'text-[40px] font-normal leading-[58px]',
    sm: 'text-[32px] font-normal leading-[40px]',
  },
  // VIEW MORE button
  viewMore: {
    desktop: 'text-[28px] font-bold leading-[100%]',
    lg: 'text-[28px] font-bold leading-[100%]',
    md: 'text-[28px] font-bold leading-[100%]',
    sm: 'text-[24px] font-bold leading-[100%]',
  },
  // Gaps
  lineGap: {
    lg: 'lg:gap-9',
    md: 'md:gap-6',
    sm: 'gap-4',
  },
  textGap: {
    lg: 'lg:mt-[84px]',
    md: 'md:mt-14',
    sm: 'mt-10',
  },
  sectionPadding: 'px-5 py-16 md:px-10 md:py-24 lg:px-20 lg:py-32',
} as const
