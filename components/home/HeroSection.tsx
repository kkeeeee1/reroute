"use client";

import { useEffect, useState } from "react";

import { HeroImageCarousel } from "./HeroImageCarousel";

export function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [heroHeight, setHeroHeight] = useState("100vh");

  // 모바일 체크
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 히어로 섹션 높이 계산 (화면 높이 - 헤더 높이)
  useEffect(() => {
    const calculateHeight = () => {
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 0;
      const viewportHeight = window.innerHeight;
      setHeroHeight(`${viewportHeight - headerHeight}px`);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  return (
    <section
      className="flex items-center justify-center px-7 py-10 md:px-10 md:py-0 lg:px-20"
      style={{ minHeight: heroHeight }}
    >
      <div className="flex w-full flex-col items-start justify-center gap-4 md:max-w-screen-max md:flex-row md:items-center md:justify-between md:gap-6">
        {/* 모바일 UI */}
        <div className="flex w-full flex-col gap-3 md:hidden">
          {/* 모바일: 영문 텍스트 */}
          <div className="w-full text-left">
            <h1 className="text-[60px] font-bold leading-[60px] sm:text-[65px] sm:leading-[65px]">
              <span>Never Stuck Always Reroute</span>
            </h1>
          </div>

          {/* 모바일: 이미지 */}
          <div className="w-full">
            <HeroImageCarousel />
          </div>

          {/* 모바일: 한글 텍스트 */}
          <div className="w-full">
            <p className="text-[28px] font-normal leading-[32px] sm:text-[40px] sm:leading-[50px]">
              브랜드와 비즈니스의 막힌 길에서 새로운 경로를 설계하는 전략 파트너
            </p>
          </div>
        </div>

        {/* 데스크탑 UI */}
        <div className="hidden w-full md:flex md:items-center md:justify-between md:gap-6">
          {/* 데스크톱: 좌측 텍스트 */}
          <div className="w-full text-left md:w-1/3">
            <h1 className="text-[60px] font-bold leading-[60px] sm:text-[65px] sm:leading-[65px] md:text-[70px] md:leading-[70px] lg:text-[90px] lg:leading-[90px] xl:text-[100px] xl:leading-[100px] 2xl:text-[130px] 2xl:leading-[130px]">
              <span className="md:hidden">Never Stuck Always Reroute</span>
              <div className="hidden md:flex md:flex-col">
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

          {/* 데스크톱: 중앙 이미지 */}
          <div className="w-full md:w-[28%]">
            <HeroImageCarousel />
          </div>

          {/* 데스크톱: 우측 텍스트 */}
          <div className="w-full md:w-1/3 md:text-right">
            <p className="text-[28px] font-normal leading-[32px] sm:text-[40px] sm:leading-[50px] md:text-[40px] md:leading-[50px] lg:text-[55px] lg:leading-[65px] xl:text-[65px] xl:leading-[75px] 2xl:text-[85px] 2xl:leading-[95px]">
              <span className="md:hidden">
                브랜드와 비즈니스의 막힌 길에서 새로운 경로를 설계하는 전략
                파트너
              </span>
              <span className="hidden md:flex md:flex-col md:items-end">
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
      </div>
    </section>
  );
}
