'use client';

import { useLayoutEffect, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollToTop() {
  const pathname = usePathname();

  // 최우선: pathname 변경 전에 즉시 스크롤 리셋
  useLayoutEffect(() => {
    // 1. 브라우저 스크롤 복원 완전 비활성화
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. 모든 가능한 스크롤 위치를 0으로 강제 설정
    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // GSAP/OverlayScrollbars용 추가 처리
      const scrollContainer = document.querySelector('[data-overlayscrollbars-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
      }
    };

    // 즉시 실행
    resetScroll();

    // 약간의 지연 후 다시 실행 (GSAP 등이 개입할 경우 대비)
    const timeoutId = setTimeout(resetScroll, 0);
    const timeoutId2 = setTimeout(resetScroll, 10);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, [pathname]);

  // 컴포넌트 마운트 시에도 실행
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return null;
}
