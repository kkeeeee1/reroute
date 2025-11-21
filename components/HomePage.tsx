"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { HeroImageCarousel } from "./HeroImageCarousel";
import { AboutSection } from "./AboutSection";

const HOLD_DURATION = 1500; // ms
const SPLIT_DURATION = 700; // ms
const PRIMARY_INTRO_DURATION = 5000; // ms

export function HomePage() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [startSplit, setStartSplit] = useState(false);
  const [heroMinHeight, setHeroMinHeight] = useState("100vh");
  const hasShownRef = useRef(false);

  useEffect(() => {
    // Calculate hero section min height (viewport height - navbar height)
    const calculateHeroHeight = () => {
      const navbar = document.getElementById("navbar");
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const heroHeight = window.innerHeight - navbarHeight;
      setHeroMinHeight(`${heroHeight}px`);
    };

    // Calculate on mount
    calculateHeroHeight();

    // Recalculate on window resize
    window.addEventListener("resize", calculateHeroHeight);

    return () => {
      window.removeEventListener("resize", calculateHeroHeight);
    };
  }, []);

  useEffect(() => {
    if (hasShownRef.current) return;

    hasShownRef.current = true;

    // Wait for primary intro, then start split animation
    setTimeout(() => {
      // Hold, then split
      setTimeout(() => {
        setStartSplit(true);

        // Hide overlay after split and unlock scroll
        setTimeout(() => {
          setShowOverlay(false);

          // Unlock scroll completely
          const html = document.documentElement;
          const body = document.body;
          html.style.overflow = "";
          body.style.overflow = "";
          body.style.position = "";
          body.style.width = "";
          body.style.top = "";
        }, SPLIT_DURATION);
      }, HOLD_DURATION);
    }, PRIMARY_INTRO_DURATION);

    // Cleanup: ensure scroll is unlocked if component unmounts
    return () => {
      const html = document.documentElement;
      const body = document.body;
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.width = "";
      body.style.top = "";
    };
  }, []);

  return (
    <>
      <section className="flex w-full justify-center" style={{ minHeight: heroMinHeight }}>
        {/* Hero Section - always rendered */}
        <div className="relative flex w-full max-w-screen-max items-center justify-center px-5 md:px-10 lg:px-20" style={{ minHeight: heroMinHeight }}>
          {/* 메인 히어로 */}
          <div className="w-full">
            <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row md:gap-0">
              {/* 좌측 텍스트 */}
              <div className="w-full text-left md:w-1/3">
                <h1 className="text-[60px] font-bold leading-[60px] sm:text-[65px] sm:leading-[65px] md:text-[70px] md:leading-[70px] lg:text-[90px] lg:leading-[90px] xl:text-[100px] xl:leading-[100px] 2xl:text-[120px] 2xl:leading-[120px]">
                  Never
                  <br />
                  Stuck
                  <br />
                  Always
                  <br />
                  <span
                    // 금빛 효과
                    className="animate-shimmer-text-horizontal relative inline-block bg-gradient-to-r from-black via-yellow-200 to-black bg-clip-text"
                    style={{
                      backgroundSize: "200% 100%",
                      backgroundPosition: "200% 0%",
                    }}
                  >
                    Reroute
                  </span>
                </h1>
              </div>

              {/* 이미지 */}
              <div className="w-full md:w-[28%]">
                <HeroImageCarousel />
              </div>

              {/* 우측 텍스트 */}
              <div className="w-full text-right md:w-1/3">
                <p className="text-[32px] font-normal leading-[40px] sm:text-[40px] sm:leading-[50px] md:text-[40px] md:leading-[50px] lg:text-[55px] lg:leading-[65px] xl:text-[65px] xl:leading-[75px] 2xl:text-[80px] 2xl:leading-[90px]">
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
                </p>
              </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="flex w-full items-center justify-center gap-2.5 py-20">
              <span className="text-xs font-medium tracking-widest text-black">
                SCROLL DOWN
              </span>
              <svg
                width="22"
                height="10"
                viewBox="0 0 22 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="path-1-inside-1_210_263" fill="white">
                  <path d="M0 -1L10.7873 9.38825L21.5745 -1" />
                </mask>
                <path
                  d="M10.7873 9.38825L9.39993 10.8289L10.7873 12.1649L12.1746 10.8289L10.7873 9.38825ZM0 -1L-1.38732 0.440606L9.39993 10.8289L10.7873 9.38825L12.1746 7.94764L1.38732 -2.44061L0 -1ZM10.7873 9.38825L12.1746 10.8289L22.9618 0.440606L21.5745 -1L20.1872 -2.44061L9.39993 7.94764L10.7873 9.38825Z"
                  fill="#231F20"
                  mask="url(#path-1-inside-1_210_263)"
                />
              </svg>
            </div>
          </div>

          {/* 히어로 섹션 오버레이 텍스트 */}
          <AnimatePresence mode="wait">
            {showOverlay && (
              <div className="absolute inset-0 z-10 flex">
                {/* Left half */}
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: startSplit ? "-100%" : 0 }}
                  transition={{
                    duration: SPLIT_DURATION / 1000,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute left-0 top-0 h-full w-1/2 bg-white"
                />

                {/* Right half */}
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: startSplit ? "100%" : 0 }}
                  transition={{
                    duration: SPLIT_DURATION / 1000,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute right-0 top-0 h-full w-1/2 bg-white"
                />

                {/* Tagline Text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: startSplit ? 0 : 1 }}
                  transition={{ opacity: { duration: 0.3 } }}
                  className="absolute inset-0 z-10 flex items-center justify-center px-5 md:px-10 lg:px-20"
                >
                  <div className="max-w-screen-max text-left">
                    <h2 className="text-[24px] font-bold leading-[32px] text-black sm:text-[32px] sm:leading-[45px] md:text-[55px] md:leading-[70px] lg:text-[85px] lg:leading-[105px] xl:text-[100px] xl:leading-[110px] 2xl:text-[130px] 2xl:leading-[140px]">
                      Never Stuck Always Reroute{" "}
                      <span className="font-normal">
                        브랜드와 비즈니스의 막힌 길에서 새로운 경로를 설계하는
                        전략 파트너
                      </span>
                    </h2>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AboutSection />
    </>
  );
}
