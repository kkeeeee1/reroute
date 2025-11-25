"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { INTRO_ANIMATION } from "@/constants/animations";
import { introState } from "@/utils/introState";

const TEXT_LINES = ["WE DON'T JUST", "SOLVE PROBLEMS,", "WE REROUTE THEM"];

export function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>(["", "", ""]);
  const [mounted, setMounted] = useState(false);
  const hasShownRef = useRef(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Only show on actual page load/refresh, not on client-side navigation
    if (hasShownRef.current) {
      return;
    }

    hasShownRef.current = true;
    setIsVisible(true);
    
    // Clear the flag when intro starts (새로고침 시 초기화)
    introState.clear();

    // Lock scroll completely during intro
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.width = "100%";
    body.style.top = "0";

    // 스크롤 잠금 해제할 타이머 변수
    let scrollUnlockTimer: NodeJS.Timeout;

    // Typing animation for multiple lines
    let lineIndex = 0;
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      const currentLine = TEXT_LINES[lineIndex];

      if (charIndex < currentLine.length) {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[lineIndex] = currentLine.slice(0, charIndex + 1);
          return newLines;
        });
        charIndex++;
      } else if (lineIndex < TEXT_LINES.length - 1) {
        lineIndex++;
        charIndex = 0;
      } else {
        clearInterval(typingInterval);

        // Step 1: Typing complete, pause, then start logo transition
        setTimeout(() => {
          // GSAP 애니메이션 시퀀스
          setTimeout(() => {
            if (!logoRef.current || !textRef.current || !backgroundRef.current || !containerRef.current) return;

            // 최신 헤더 로고 위치 가져오기
            const headerLogo = document.getElementById("header-logo");
            if (!headerLogo) return;
            
            const img = headerLogo.querySelector("img");
            if (!img) return;
            
            const headerRect = img.getBoundingClientRect();

            // Get current intro logo position
            const introRect = logoRef.current.getBoundingClientRect();
            
            // Calculate center-to-center movement
            const introCenterX = introRect.left + introRect.width / 2;
            const introCenterY = introRect.top + introRect.height / 2;
            const headerCenterX = headerRect.left + headerRect.width / 2;
            const headerCenterY = headerRect.top + headerRect.height / 2;
            
            const deltaX = headerCenterX - introCenterX;
            const deltaY = headerCenterY - introCenterY;
            
            // 초기 scale 0.8을 고려한 최종 scale 계산
            const currentScale = 0.8;
            const targetScale = (headerRect.width / (introRect.width / currentScale));

            // Create GSAP Timeline
            const timeline = gsap.timeline();

            // Fade out text
            timeline.to(textRef.current, {
              opacity: 0,
              duration: 0.3,
            });

            // Logo transition - 중심점 기준으로 이동
            timeline.to(
              logoRef.current,
              {
                x: deltaX,
                y: deltaY,
                scale: targetScale,
                duration: INTRO_ANIMATION.LOGO_TRANSITION_DURATION / 1000,
                ease: "expo.out",
                transformOrigin: "center center",
              },
              "-=0.2"
            );

            // Fade out background and logo together
            timeline.to(
              [backgroundRef.current, logoRef.current],
              {
                opacity: 0,
                duration: INTRO_ANIMATION.BACKGROUND_SLIDE_DURATION / 1000,
                ease: "expo.out",
              }
            );

            // Fade out container
            timeline.to(
              containerRef.current,
              {
                opacity: 0,
                duration: 0.3,
              },
              "-=0.5"
            );

            // Complete - hide intro and unlock scroll
            timeline.call(() => {
              setIsVisible(false);
              
              // Mark that intro has played in this session (after completion)
              introState.markComplete();
              
              // 스크롤 잠금 즉시 해제 (약간의 안전 마진 100ms)
              scrollUnlockTimer = setTimeout(() => {
                const html = document.documentElement;
                const body = document.body;
                html.style.overflow = "";
                body.style.overflow = "";
                body.style.position = "";
                body.style.width = "";
                body.style.top = "";
              }, 100);
            });
          }, 50);
        }, INTRO_ANIMATION.PAUSE_AFTER_TYPING);
      }
    }, INTRO_ANIMATION.TYPING_SPEED);

    return () => {
      clearInterval(typingInterval);
      if (scrollUnlockTimer) {
        clearTimeout(scrollUnlockTimer);
      }
    };
  }, []);

  if (!mounted || !isVisible) return null;

  const introContent = (
    <>
      <div
        ref={backgroundRef}
        className="fixed inset-0 z-[100] bg-navy"
        style={{ willChange: "opacity" }}
      />

      <div
        ref={containerRef}
        className="fixed inset-0 z-[110] flex items-center justify-center"
        style={{ willChange: "opacity" }}
      >
        <div className="relative flex flex-col items-center justify-center gap-7 px-5 md:gap-12 lg:gap-16">
          <div
            ref={logoRef}
            data-intro-logo="true"
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
            <Image
              src="/images/logo_white.png"
              alt="Reroute"
              width={214}
              height={59}
              className="h-auto w-[70px] sm:w-[80px] md:w-[110px] lg:w-[140px] xl:w-[170px] 2xl:w-[200px]"
              priority
              onLoad={(e) => {
                // Fade in logo after it loads
                gsap.to(e.currentTarget.parentElement, {
                  opacity: 1,
                  scale: 0.8,
                  duration: 0.3,
                });
              }}
            />
          </div>

          <div
            ref={textRef}
            className="text-center"
            style={{ willChange: "opacity" }}
          >
            {TEXT_LINES.map((line, index) => (
              <p
                key={index}
                className="text-[20px] font-bold leading-[22px] text-white sm:text-[28px] sm:leading-[30px] md:text-[40px] md:leading-[50px] lg:text-[56px] lg:leading-[71px] xl:text-[67px] xl:leading-[84px] 2xl:text-[90px] 2xl:leading-[120px]"
              >
                {displayedLines[index]}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(introContent, document.body);
}
