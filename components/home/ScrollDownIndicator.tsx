"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

export function ScrollDownIndicator({
  hideOnOverlay = false,
}: {
  hideOnOverlay?: boolean;
}) {
  const [showIndicator, setShowIndicator] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show indicator only when at the very top
      if (window.scrollY < 10) {
        setShowIndicator(true);
      } else {
        setShowIndicator(false);
      }
    };

    // Observer to detect if menu is open by checking for the menu ID
    const checkMenuVisibility = () => {
      const menuElement = document.getElementById("menu");
      setIsMenuOpen(!!menuElement);
    };

    // Initial check
    checkMenuVisibility();

    // Set up MutationObserver to watch for menu changes
    const observer = new MutationObserver(checkMenuVisibility);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // GSAP 애니메이션
  useEffect(() => {
    if (!indicatorRef.current) return;

    const shouldShow = showIndicator && !hideOnOverlay && !isMenuOpen;

    gsap.to(indicatorRef.current, {
      opacity: shouldShow ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [showIndicator, hideOnOverlay, isMenuOpen]);

  // SSR 방지
  if (!mounted) return null;

  // Portal을 사용하여 body에 직접 렌더링 (GSAP transform 영향 회피)
  return createPortal(
    <div
      ref={indicatorRef}
      className="pointer-events-none fixed bottom-12 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2.5"
      style={{ opacity: 1 }}
    >
      <span className="text-xs font-medium tracking-widest text-black md:text-base">
        SCROLL DOWN
      </span>
      <svg
        className="h-2 w-4 md:h-[10px] md:w-[22px]"
        viewBox="0 0 22 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="path-1-inside-1_210_263" fill="white">
          <path d="M0 -1L10.7873 9.38825L21.5745 -1" />
        </mask>
        <path
          d="M10.7873 9.38825L9.39993 10.8289L10.7873 12.1649L12.1746 10.8289L10.7873 9.38825ZM0 -1L-1.38732 0.440606L9.39993 10.8289L10.7873 9.38825L12.1746 7.94764L1.38732 -2.44061L0 -1ZM10.7873 9.38825L12.1746 10.8289L22.9618 0.440606L21.5745 -1L20.1872 -2.44061L9.39993 7.94764L10.7873 9.38825Z"
          fill="#231F20"
          mask="url(#path-1-inside-1_210_263)"
        />
      </svg>
    </div>,
    document.body
  );
}
