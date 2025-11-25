"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "./HeroSection";
import { AnimatedIntroOverlay } from "./AnimatedIntroOverlay";
import { AboutSection } from "./AboutSection";
import { ScrollDownIndicator } from "./ScrollDownIndicator";
import { ServiceSection } from "./ServiceSection";
import { MarqueeText } from "./MarqueeText";
import { useIsDesktop } from "@/hooks/useIsDesktop";

export function HomePage() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isDesktop = useIsDesktop();
  const isMobile = !isDesktop;

  // Mark as mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleIntroDismiss = () => {
    setIntroCompleted(true);
  };

  // 모바일에서는 인트로 없이 바로 시작 (hydration 후에만)
  useEffect(() => {
    if (mounted && isMobile) {
      setIntroCompleted(true);
    }
  }, [isMobile, mounted]);

  return (
    <>
      {/* 오버레이 텍스트 애니메이션 - 데스크톱만 */}
      {!introCompleted && !isMobile && (
        <AnimatedIntroOverlay onDismiss={handleIntroDismiss} />
      )}

      {/* 메인 컨텐츠 - 항상 렌더링하되 opacity로 제어 */}
      <ScrollDownIndicator hideOnOverlay={false} />
      <div className="relative" style={{ zIndex: 30 }}>
        <HeroSection />
        <AboutSection />
        <ServiceSection />
        <MarqueeText />
      </div>
    </>
  );
}
