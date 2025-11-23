"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "./HeroSection";
import { AnimatedIntroOverlay } from "./AnimatedIntroOverlay";
import { AboutSection } from "./AboutSection";
import { ScrollDownIndicator } from "./ScrollDownIndicator";
import { ServiceSection } from "./ServiceSection";
import { MarqueeText } from "./MarqueeText";
import { ScrollToTopButton } from "../ScrollToTopButton";

export function HomePage() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 반응형 체크 (md 브레이크포인트 = 768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleIntroDismiss = () => {
    setIntroCompleted(true);
  };

  // 모바일에서는 인트로 없이 바로 시작
  useEffect(() => {
    if (isMobile) {
      setIntroCompleted(true);
    }
  }, [isMobile]);

  return (
    <>
      {/* 인트로 오버레이 - 데스크톱만 */}
      {!introCompleted && !isMobile && (
        <AnimatedIntroOverlay onDismiss={handleIntroDismiss} />
      )}

      {/* 메인 컨텐츠 - 항상 렌더링하되 opacity로 제어 */}
      <div
        className="relative"
        style={{ zIndex: 30 }}
      >
        <ScrollDownIndicator hideOnOverlay={false} />
        <HeroSection />
        <AboutSection />
        <ServiceSection />
        <MarqueeText />
        <ScrollToTopButton />
      </div>
    </>
  );
}


