"use client";

import { useEffect, useState } from "react";

import { HeroImageCarousel } from "./HeroImageCarousel";

export function HeroSectionDesktop() {
  const [minHeroHeight, setMinHeroHeight] = useState("100vh");

  // 히어로 섹션 높이 계산 (화면 높이 - 헤더 높이)
  useEffect(() => {
    const calculateMinHeroHeight = () => {
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 0;
      const viewportHeight = window.innerHeight;
      setMinHeroHeight(`${viewportHeight - headerHeight}px`);
    };

    calculateMinHeroHeight();
    window.addEventListener("resize", calculateMinHeroHeight);
    return () => window.removeEventListener("resize", calculateMinHeroHeight);
  }, []);

  return (
    <section
      className="flex items-center justify-center px-10 md:py-0 lg:px-20"
      style={{ minHeight: minHeroHeight }}
    >
      <div className="flex w-full items-center justify-between gap-6 max-w-screen-max">
        {/* 좌측 텍스트 */}
        <div className="w-1/3 text-left">
          <h1 className="text-[70px] font-bold leading-[70px] lg:text-[90px] lg:leading-[90px] xl:text-[100px] xl:leading-[100px] 2xl:text-[130px] 2xl:leading-[130px]">
            <div className="flex flex-col">
              <span data-word="never" className="w-fit">
                Never
              </span>
              <span data-word="stuck" className="w-fit">
                Stuck
              </span>
              <span data-word="always" className="w-fit">
                Always
              </span>
              <span data-word="reroute" className="w-fit">
                Reroute
              </span>
            </div>
          </h1>
        </div>

        {/* 중앙 이미지 */}
        <div className="w-[28%]">
          <HeroImageCarousel />
        </div>

        {/* 우측 텍스트 */}
        <div className="w-1/3 text-right">
          <p className="text-[40px] font-normal leading-[50px] lg:text-[55px] lg:leading-[65px] xl:text-[65px] xl:leading-[75px] 2xl:text-[85px] 2xl:leading-[95px]">
            <span className="flex flex-col items-end">
              <span data-word="brand" className="w-fit">
                브랜드와
              </span>
              <span data-word="business" className="w-fit">
                비즈니스의
              </span>
              <span data-word="blocked" className="w-fit">
                막힌 길에서
              </span>
              <span data-word="new" className="w-fit">
                새로운 경로를
              </span>
              <span data-word="design" className="w-fit">
                설계하는
              </span>
              <span data-word="partner" className="w-fit">
                전략 파트너
              </span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
