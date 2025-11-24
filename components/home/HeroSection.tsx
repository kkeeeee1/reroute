"use client";

import { HeroSectionMobile } from "./HeroSectionMobile";
import { HeroSectionDesktop } from "./HeroSectionDesktop";

export function HeroSection() {
  return (
    <>
      {/* 모바일 히어로 섹션 */}
      <div className="block md:hidden">
        <HeroSectionMobile />
      </div>

      {/* 데스크탑 히어로 섹션 */}
      <div className="hidden md:block">
        <HeroSectionDesktop />
      </div>
    </>
  );
}
