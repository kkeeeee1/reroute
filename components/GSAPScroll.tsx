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
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    // ScrollSmoother 초기화
    smootherRef.current = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.7, // 스크롤 부드러움 정도 (낮을수록 모멘텀 감소)
      effects: true, // data-speed 속성 활성화
      smoothTouch: 0, // 터치 디바이스에서의 부드러움
      normalizeScroll: true, // 크로스 브라우저 스크롤 정규화
    });

    // 컴포넌트 언마운트 시 정리
    return () => {
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, []);

  // pathname 변경 시 스크롤을 최상단으로 리셋
  useEffect(() => {
    if (smootherRef.current) {
      smootherRef.current.scrollTop(0);
    }
  }, [pathname]);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
