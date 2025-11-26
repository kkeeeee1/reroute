"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useIsDesktop } from "@/hooks/useIsDesktop";

export function CustomCursor() {
  const defaultCursorRef = useRef<HTMLDivElement>(null);
  const hoverCursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isDesktop = useIsDesktop();
  const isMobile = !isDesktop;

  useEffect(() => {
    setMounted(true);
  }, []);

  // 초기 커서 위치 설정
  useEffect(() => {
    if (
      isMobile ||
      !defaultCursorRef.current ||
      !hoverCursorRef.current
    )
      return;

    // GSAP로 초기 transform 설정
    gsap.set(defaultCursorRef.current, { x: 0, y: 0, opacity: 0 });
    gsap.set(hoverCursorRef.current, { x: 0, y: 0, opacity: 0, scale: 0 });
  }, [isMobile]);

  useEffect(() => {
    // 모바일에서는 커스텀 커서 실행 안 함
    if (isMobile) return;

    if (!defaultCursorRef.current || !hoverCursorRef.current) return;

    // GSAP quickTo for smooth mouse tracking (최적화된 성능)
    const xToDefault = gsap.quickTo(defaultCursorRef.current, "x", {
      duration: 0.15,
      ease: "power2.out",
    });
    const yToDefault = gsap.quickTo(defaultCursorRef.current, "y", {
      duration: 0.15,
      ease: "power2.out",
    });
    const xToHover = gsap.quickTo(hoverCursorRef.current, "x", {
      duration: 0.15,
      ease: "power2.out",
    });
    const yToHover = gsap.quickTo(hoverCursorRef.current, "y", {
      duration: 0.15,
      ease: "power2.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      xToDefault(e.clientX - 12);
      yToDefault(e.clientY - 12);
      xToHover(e.clientX - 50);
      yToHover(e.clientY - 50);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // 링크, 버튼, 클릭 가능한 요소 감지
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // data-no-cursor 속성이 있는 요소는 제외
      const hasNoCursor = 
        target.hasAttribute("data-no-cursor") ||
        target.closest("[data-no-cursor]");

      if (hasNoCursor) {
        setIsHovering(false);
        return;
      }

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.getAttribute("role") === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']");

      setIsHovering(!!isClickable);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // 커서 숨기기 (시스템 커서 제거)
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.style.cursor = "auto";
      document.body.style.cursor = "auto";
    };
  }, [isMobile]);

  // GSAP opacity/scale 애니메이션
  useEffect(() => {
    if (!defaultCursorRef.current || !hoverCursorRef.current) return;

    // Default cursor
    gsap.to(defaultCursorRef.current, {
      opacity: isVisible && !isHovering ? 1 : 0,
      duration: 0.2,
      ease: "power2.out",
    });

    // Hover cursor
    gsap.to(hoverCursorRef.current, {
      opacity: isHovering && isVisible ? 1 : 0,
      scale: isHovering ? 1 : 0,
      duration: 0.2,
      ease: "power2.out",
    });
  }, [isVisible, isHovering]);

  // hydration 이전이나 모바일에서는 렌더링 안 함
  if (!mounted || isMobile !== false) return null;

  const cursorContent = (
    <>
      {/* 기본 포인터 (24px, primary 색상) */}
      <div
        ref={defaultCursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          willChange: "transform, opacity",
        }}
      >
        <div
          className="h-6 w-6 rounded-full bg-primary"
          style={{
            boxShadow:
              "inset 0 0 0 1px #56C5D0, 0 0 8px rgba(86, 197, 208, 0.3)",
          }}
        />
      </div>

      {/* 호버 포인터 (100px, 검정 배경 + SVG) - 호버할 때만 표시 */}
      <div
        ref={hoverCursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center"
        style={{
          willChange: "transform, opacity",
        }}
      >
        <div className="relative flex h-[100px] w-[100px] items-center justify-center rounded-full bg-black pb-2">
          <svg
            width="45"
            height="20"
            viewBox="0 0 45 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 17.3679H40L25 1.36792"
              stroke="white"
              strokeWidth="4"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      </div>
    </>
  );

  return createPortal(cursorContent, document.body);
}
