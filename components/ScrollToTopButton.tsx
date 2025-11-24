"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // IntroOverlay가 보이는지 확인
    const checkIntroOverlay = () => {
      const introOverlay = document.querySelector('[class*="fixed inset-0 z-50"]');
      setShowButton(!introOverlay);
    };

    const handleScroll = () => {
      checkIntroOverlay();
      // Show button when user scrolls past hero section (more than 100vh or 1000px)
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // 초기 체크
    checkIntroOverlay();
    // IntroOverlay 변화 감지
    const observer = new MutationObserver(checkIntroOverlay);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // GSAP 애니메이션
  useEffect(() => {
    if (!buttonRef.current) return;

    const shouldShow = isVisible && showButton;

    gsap.to(buttonRef.current, {
      opacity: shouldShow ? 1 : 0,
      scale: shouldShow ? 1 : 0.8,
      pointerEvents: shouldShow ? "auto" : "none",
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isVisible, showButton]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!mounted) return null;

  const buttonContent = (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-white shadow-2xl transition-colors duration-300 hover:bg-gray-50 md:flex"
      style={{
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        opacity: 0,
        scale: "0.8",
        pointerEvents: "none",
      }}
      aria-label="Scroll to top"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 5L5 12M12 5L19 12M12 5V19"
          stroke="#231F20"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  return createPortal(buttonContent, document.body);
}
