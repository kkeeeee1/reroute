"use client";

import { useEffect, useState } from "react";
import { HeroImageCarousel } from "./HeroImageCarousel";

export function HeroSection() {
  const [heroMinHeight, setHeroMinHeight] = useState("100vh");

  // Hero 섹션의 높이 계산
  useEffect(() => {
    const calculateHeroHeight = () => {
      const navbar = document.getElementById("navbar");
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const heroHeight = window.innerHeight - navbarHeight;
      setHeroMinHeight(`${heroHeight}px`);
    };

    calculateHeroHeight();
    window.addEventListener("resize", calculateHeroHeight);
    return () => window.removeEventListener("resize", calculateHeroHeight);
  }, []);

  return (
    <section
      className="flex w-full justify-center"
      style={{ minHeight: heroMinHeight }}
    >
      <div
        className="relative flex w-full max-w-screen-max items-center justify-center px-7 md:px-10 lg:px-20"
        style={{ minHeight: heroMinHeight }}
      >
        {/* 메인 히어로 */}
        <div className="w-full">
          <div className="flex w-full flex-col items-center justify-between gap-6 py-10 md:flex-row md:gap-0">
            {/* 좌측 텍스트 */}
            <div className="w-full text-left md:w-1/3">
              <h1 className="text-[60px] font-bold leading-[60px] sm:text-[65px] sm:leading-[65px] md:text-[70px] md:leading-[70px] lg:text-[90px] lg:leading-[90px] xl:text-[100px] xl:leading-[100px] 2xl:text-[130px] 2xl:leading-[130px]">
                <span className="md:hidden">Never Stuck Always Reroute</span>
                <span className="hidden md:block">
                  Never
                  <br />
                  Stuck
                  <br />
                  Always
                  <br />
                  Reroute
                </span>
              </h1>
            </div>

            {/* 이미지 */}
            <div className="w-full md:w-[28%]">
              <HeroImageCarousel />
            </div>

            {/* 우측 텍스트 */}
            <div className="w-full md:w-1/3 md:text-right">
              <p className="text-[28px] font-normal leading-[32px] sm:text-[40px] sm:leading-[50px] md:text-[40px] md:leading-[50px] lg:text-[55px] lg:leading-[65px] xl:text-[65px] xl:leading-[75px] 2xl:text-[85px] 2xl:leading-[95px]">
                <span className="md:hidden">
                  브랜드와 비즈니스의 막힌 길에서 새로운 경로를 설계하는 전략
                  파트너
                </span>
                <span className="hidden md:block">
                  브랜드와
                  <br />
                  비즈니스의
                  <br />
                  막힌 길에서
                  <br />
                  새로운 경로를
                  <br />
                  설계하는
                  <br />
                  전략 파트너
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
