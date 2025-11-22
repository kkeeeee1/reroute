"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "./Menu";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MAIN_TEXT = "Never Stuck Always Reroute";
const SUB_TEXT =
  "브랜드와 비즈니스의 막힌 길에서 새로운 경로를 설계하는 전략 파트너";

const BASE_SPAN_CLASSES =
  "whitespace-pre-wrap text-[24px] leading-[32px] text-black sm:text-[32px] sm:leading-[45px] md:text-[55px] md:leading-[70px] lg:text-[85px] lg:leading-[105px] xl:text-[100px] xl:leading-[110px] 2xl:text-[150px] 2xl:leading-[160px]";

interface TextSpanProps {
  text: string;
  className?: string;
}

function TextSpan({ text, className = "" }: TextSpanProps) {
  return <span className={`${BASE_SPAN_CLASSES} ${className}`}>{text}</span>;
}

interface IntroOverlayProps {
  onDismiss?: (callback: () => void) => void;
}

export function IntroOverlay({ onDismiss }: IntroOverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    // IntroOverlay 표시 중 스크롤 비활성화
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    let accumulatedScroll = 0;
    let isHandlingDismiss = false;

    const handleWheel = (e: WheelEvent) => {
      if (isHandlingDismiss) return;

      // 아래로 스크롤할 때만 처리 (deltaY > 0)
      if (e.deltaY <= 0) return;

      e.preventDefault();
      accumulatedScroll += e.deltaY;
      const windowWidth = window.innerWidth;
      const progress = accumulatedScroll / windowWidth;
      setScrollProgress(progress);

      // progress가 1.5 이상이면 overlay 완전히 숨김
      if (progress >= 1.5) {
        isHandlingDismiss = true;
        setIsVisible(false);

        // 스크롤 이벤트 리스너 즉시 제거
        window.removeEventListener("wheel", handleWheel, {
          passive: false,
        } as any);

        // 스크롤 다시 활성화
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";

        // 스크롤 위치를 맨 위로 리셋
        setTimeout(() => {
          window.scrollTo(0, 0);
          // onDismiss 콜백 실행
          if (onDismiss) {
            onDismiss(() => {});
          }
        }, 0);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      // cleanup 시에도 스크롤 활성화
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [onDismiss]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-white">
      {/* 헤더 */}
      <header className="flex justify-center bg-transparent">
        <div className="flex w-full max-w-screen-max items-center justify-between px-7 py-8 md:px-10 md:py-8 lg:px-20 lg:py-12">
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
              className="h-8 w-auto object-contain transition-opacity duration-300 md:h-10 lg:h-12"
              priority
            />
          </Link>

          <button
            onClick={toggleMenu}
            className="relative z-50 flex items-center gap-5 md:gap-[30px]"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`hidden text-lg font-medium transition-opacity duration-300 md:inline md:text-xl lg:text-2xl ${
                isOpen ? "text-white opacity-0" : "text-black opacity-100"
              }`}
            >
              Menu
            </span>
            <div className="flex h-6 w-6 flex-col items-center justify-center md:h-7 md:w-7 lg:h-8 lg:w-8">
              <span
                className={`block h-0.5 w-5 transform transition-all duration-300 ease-in-out md:w-6 ${
                  isOpen
                    ? "translate-y-[6px] rotate-45 bg-white"
                    : "translate-y-0 rotate-0 bg-black"
                }`}
              />
              <span
                className={`my-1 block h-0.5 w-5 transition-all duration-300 ease-in-out md:w-6 ${
                  isOpen ? "bg-white opacity-0" : "bg-black opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-5 transform transition-all duration-300 ease-in-out md:w-6 ${
                  isOpen
                    ? "-translate-y-[6px] -rotate-45 bg-white"
                    : "translate-y-0 rotate-0 bg-black"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* 컨텐츠 */}
      <div className="flex flex-1 items-center justify-center">
        {/* 밑에 있는 레이어 - "Never Stuck Always Reroute"만 보임, 좌측으로 이동 */}
        <motion.div
          className="absolute px-7 md:px-10 lg:px-20"
          animate={{ x: -scrollProgress * window.innerWidth }}
          transition={{
            type: "tween",
            duration: 0,
          }}
        >
          <TextSpan text={MAIN_TEXT} className="font-bold" />
          <TextSpan text={SUB_TEXT} className="ml-4 font-normal opacity-0" />
        </motion.div>

        {/* 위에 있는 레이어 - "브랜드와 비즈니스의 막힌 길에서 새로운 경로를 설계하는 전략 파트너"만 보임, 우측으로 이동 */}
        <motion.div
          className="absolute px-7 md:px-10 lg:px-20"
          animate={{ x: scrollProgress * window.innerWidth }}
          transition={{
            type: "tween",
            duration: 0,
          }}
        >
          <TextSpan text={MAIN_TEXT} className="font-bold opacity-0" />
          <TextSpan text={SUB_TEXT} className="ml-4 font-normal" />
        </motion.div>
      </div>

      <Menu isOpen={isOpen} onClose={closeMenu} />
    </div>
  );
}
