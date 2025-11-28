'use client';

import { AboutHeroSection } from "@/components/about/AboutHeroSection";
import { CBOIntroSection } from "@/components/about/CBOIntroSection";

export function AboutPageContainer() {
  return (
    <div>
      <AboutHeroSection />
      <CBOIntroSection />
    </div>
  );
}
