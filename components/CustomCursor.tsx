"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // 모바일 감지
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    // 모바일에서는 커스텀 커서 실행 안 함
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
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

    document.addEventListener("mousemove", handleMouseMove);
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

  // hydration 이전에는 렌더링 안 함 (undefined)
  // 모바일에서는 렌더링하지 않음
  if (isMobile !== false) return null;

  return (
    <>
      {/* 기본 포인터 (24px, primary 색상) */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999]"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          opacity: isVisible && !isHovering ? 1 : 0,
        }}
        transition={{
          type: "tween",
          duration: 0,
        }}
      >
        <div
          className="bg-primary h-6 w-6 rounded-full"
          style={{
            boxShadow:
              "inset 0 0 0 1px #56C5D0, 0 0 8px rgba(86, 197, 208, 0.3)",
          }}
        />
      </motion.div>

      {/* 호버 포인터 (142px, 검정 배경 + SVG) - 호버할 때만 표시 */}
      <motion.div
        className="pointer-events-none fixed z-[9999] flex items-center justify-center"
        animate={{
          x: position.x - 71,
          y: position.y - 71,
          opacity: isHovering && isVisible ? 1 : 0,
          scale: isHovering ? 1 : 0,
        }}
        transition={{
          type: "tween",
          duration: 0.2,
        }}
      >
        <div className="relative flex h-[100px] w-[100px] items-center justify-center rounded-full bg-black">
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
      </motion.div>
    </>
  );
}
