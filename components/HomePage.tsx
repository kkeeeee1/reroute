"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "./home/HeroSection";
import { IntroOverlay } from "./home/IntroOverlay";
import { AboutSection } from "./home/AboutSection";
import { ScrollDownIndicator } from "./home/ScrollDownIndicator";
import { ServiceSection } from "./home/ServiceSection";
import { MarqueeText } from "./MarqueeText";
import { ScrollToTopButton } from "./ScrollToTopButton";

export function HomePage() {
  const [introCompleted, setIntroCompleted] = useState(false);

  const handleIntroDismiss = () => {
    setIntroCompleted(true);

    // 메인페이지 렌더링 후 0.8초 동안 스크롤 방지
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }, 800);

    return () => clearTimeout(timer);
  };

  return (
    <>
      <IntroOverlay onDismiss={handleIntroDismiss} />
      {introCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ScrollDownIndicator hideOnOverlay={false} />
          <HeroSection />
          <AboutSection />
          <ServiceSection />
          <MarqueeText />
          <ScrollToTopButton />
        </motion.div>
      )}
    </>
  );
}
