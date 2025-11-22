"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showButton, setShowButton] = useState(true);

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible && showButton ? 1 : 0,
        scale: isVisible && showButton ? 1 : 0.8,
        pointerEvents: isVisible && showButton ? "auto" : "none",
      }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-white shadow-2xl transition-colors duration-300 hover:bg-gray-50 md:flex"
      style={{
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
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
    </motion.button>
  );
}
