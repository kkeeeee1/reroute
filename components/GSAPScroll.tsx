"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP 플러그인 등록
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

interface GSAPScrollProps {
  children: ReactNode;
}

export function GSAPScroll({ children }: GSAPScrollProps) {
  const pathname = usePathname();
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // /studio 경로에서는 스무스 스크롤 비활성화
  const isStudioPath = pathname.startsWith("/studio");

  useEffect(() => {
    if (isStudioPath || !wrapperRef.current || !contentRef.current) return;

    // ScrollSmoother 초기화
    smootherRef.current = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 2, // 스크롤 부드러움 정도
      effects: true, // data-speed 속성 활성화
      smoothTouch: 0, // 터치 디바이스에서의 부드러움
      normalizeScroll: true, // 크로스 브라우저 스크롤 정규화
    });

    // 컴포넌트 언마운트 시 정리
    return () => {
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, [isStudioPath]);

  // pathname이 변경될 때 ScrollTrigger 새로고침
  useEffect(() => {
    if (!isStudioPath) {
      ScrollTrigger.refresh();
    }
  }, [pathname, isStudioPath]);

  // /studio 경로에서는 래퍼 없이 children만 렌더링
  if (isStudioPath) {
    return <>{children}</>;
  }

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
