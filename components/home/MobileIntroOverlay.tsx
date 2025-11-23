"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "../Menu";
import { HeroImageCarousel } from "./HeroImageCarousel";
import { useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

const ENGLISH_TEXT = "Never Stuck Always Reroute";
const KOREAN_TEXT = "브랜드와 비즈니스의 막힌 길에서 새로운 경로를 설계하는 전략 파트너";

const FADE_OUT_DURATION = 600; // 오버레이 페이드아웃 시간 (ms)
const PAUSE_DURATION = 300; // 정렬 완료 후 페이드아웃 전 대기 시간

interface MobileIntroOverlayProps {
  onDismiss?: () => void;
}

export function MobileIntroOverlay({ onDismiss }: MobileIntroOverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(1);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const koreanY = useMotionValue(0);
  const imageOpacity = useMotionValue(0);
  const imageScale = useMotionValue(0.8);

  const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

  // 스크롤 잠금 및 애니메이션
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    let accumulatedScroll = 0;
    let isHandlingDismiss = false;

    const handleWheel = (e: WheelEvent) => {
      if (isHandlingDismiss) return;
      if (e.deltaY <= 0) return;

      e.preventDefault();
      accumulatedScroll += e.deltaY;

      // 스크롤 거리 기준: 화면 높이의 1.5배
      const threshold = window.innerHeight * 1.5;
      const progress = Math.min(accumulatedScroll / threshold, 1);
      setScrollProgress(progress);

      // progress === 1일 때 모든 요소가 정렬됨 → 잠시 대기 후 페이드아웃
      if (progress >= 1 && !isHandlingDismiss) {
        isHandlingDismiss = true;

        window.removeEventListener("wheel", handleWheel as any, {
          passive: false,
        } as any);

        // 잠시 대기 후 페이드아웃
        setTimeout(() => {
          setOverlayOpacity(0);

          // 페이드아웃 완료 후 dismiss
          setTimeout(() => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";

            window.scrollTo(0, 0);
            if (onDismiss) onDismiss();
          }, FADE_OUT_DURATION);
        }, PAUSE_DURATION);
      }
    };

    window.addEventListener("wheel", handleWheel as any, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel as any);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [onDismiss]);

  // 부드러운 애니메이션을 위한 lerp 적용
  useEffect(() => {
    let frame: number;

    const update = () => {
      // 한글 텍스트: 위에서 아래로 이동 (약 200~300px)
      const targetKoreanY = scrollProgress * 250;
      const currentKoreanY = koreanY.get();
      const smoothKoreanY = lerp(currentKoreanY, targetKoreanY, 0.1);
      koreanY.set(smoothKoreanY);

      // 이미지 opacity (0 → 1)
      const targetOpacity = scrollProgress;
      const currentOpacity = imageOpacity.get();
      const smoothOpacity = lerp(currentOpacity, targetOpacity, 0.1);
      imageOpacity.set(smoothOpacity);

      // 이미지 scale (0.8 → 1)
      const targetScale = 0.8 + scrollProgress * 0.2;
      const currentScale = imageScale.get();
      const smoothScale = lerp(currentScale, targetScale, 0.1);
      imageScale.set(smoothScale);

      frame = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(frame);
  }, [scrollProgress, koreanY, imageOpacity, imageScale]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-white"
      animate={{ opacity: overlayOpacity }}
      transition={{ duration: FADE_OUT_DURATION / 1000 }}
    >
      {/* 헤더 */}
      <header className="flex justify-center bg-transparent">
        <div className="flex w-full max-w-screen-max items-center justify-between px-7 py-8">
          <Link
            href="/"
            onClick={closeMenu}
            className="relative z-50"
            id="header-logo"
          >
            <Image
              src={isOpen ? "/images/logo_white.png" : "/images/logo_black.png"}
              alt="Reroute Logo"
              width={214}
              height={59}
              className="h-8 w-auto object-contain transition-opacity duration-300"
              priority
            />
          </Link>

          <button
            onClick={toggleMenu}
            className="relative z-50 flex items-center gap-5"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="flex h-6 w-6 flex-col items-center justify-center">
              <span
                className={`block h-0.5 w-5 transform transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "translate-y-[6px] rotate-45 bg-white"
                    : "translate-y-0 rotate-0 bg-black"
                }`}
              />
              <span
                className={`my-1 block h-0.5 w-5 transition-all duration-300 ease-in-out ${
                  isOpen ? "bg-white opacity-0" : "bg-black opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-5 transform transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "-translate-y-[6px] -rotate-45 bg-white"
                    : "translate-y-0 rotate-0 bg-black"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* 메인 컨텐츠 - 히어로 섹션과 동일한 레이아웃 */}
      <div className="flex flex-1 flex-col gap-6 px-7 py-10">
        {/* 영문 텍스트 - 히어로와 동일 위치 (상단 고정) */}
        <h1 className="text-[60px] font-bold leading-[60px] sm:text-[65px] sm:leading-[65px]">
          {ENGLISH_TEXT}
        </h1>

        {/* 히어로 이미지 - 스크롤에 따라 페이드 인 */}
        <motion.div
          className="w-full"
          style={{
            opacity: imageOpacity,
            scale: imageScale,
            willChange: "transform, opacity",
          }}
        >
          <HeroImageCarousel />
        </motion.div>

        {/* 한글 텍스트 - 스크롤에 따라 아래로 이동 */}
        <motion.p
          className="text-[28px] font-normal leading-[32px] sm:text-[40px] sm:leading-[50px]"
          style={{
            y: koreanY,
            willChange: "transform",
          }}
        >
          {KOREAN_TEXT}
        </motion.p>
      </div>

      <Menu isOpen={isOpen} onClose={closeMenu} />
    </motion.div>
  );
}

