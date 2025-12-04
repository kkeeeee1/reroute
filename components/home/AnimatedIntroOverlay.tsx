"use client";

import { INTRO_OVERLAY } from "@/constants/animations";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { introState } from "@/utils/introState";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu } from "../Menu";

// 단어 데이터
const WORDS = [
  { id: "never", text: "Never", type: "english" as const },
  { id: "stuck", text: "Stuck", type: "english" as const },
  { id: "always", text: "Always", type: "english" as const },
  { id: "reroute", text: "Reroute", type: "english" as const },
  { id: "brand", text: "브랜드와", type: "korean" as const },
  { id: "business", text: "비즈니스의", type: "korean" as const },
  { id: "blocked", text: "막힌 길에서", type: "korean" as const },
  { id: "new", text: "새로운 경로를", type: "korean" as const },
  { id: "design", text: "설계하는", type: "korean" as const },
  { id: "partner", text: "전략 파트너", type: "korean" as const },
];

// 초기 오버레이 텍스트 크기 (IntroOverlay와 동일)
const OVERLAY_TEXT_CLASSES =
  "text-[24px] leading-[32px] sm:text-[32px] sm:leading-[45px] md:text-[55px] md:leading-[70px] lg:text-[85px] lg:leading-[105px] xl:text-[100px] xl:leading-[110px] 2xl:text-[150px] 2xl:leading-[160px]";

// 히어로 섹션 폰트 클래스 (타겟)
const ENGLISH_CLASSES =
  "text-[60px] font-bold leading-[60px] sm:text-[65px] sm:leading-[65px] md:text-[70px] md:leading-[70px] lg:text-[90px] lg:leading-[90px] xl:text-[100px] xl:leading-[100px] 2xl:text-[130px] 2xl:leading-[130px]";

const KOREAN_CLASSES =
  "text-[28px] font-normal leading-[32px] sm:text-[40px] sm:leading-[50px] md:text-[40px] md:leading-[50px] lg:text-[55px] lg:leading-[65px] xl:text-[65px] xl:leading-[75px] 2xl:text-[85px] 2xl:leading-[95px]";

interface WordPosition {
  left: number;
  top: number;
}

interface AnimatedIntroOverlayProps {
  onDismiss?: () => void;
}

export function AnimatedIntroOverlay({ onDismiss }: AnimatedIntroOverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<"static" | "animating" | "completed">("static");
  const [wordPositions, setWordPositions] = useState<Record<string, WordPosition>>({});
  const isDesktop = useIsDesktop();
  const isMobile = !isDesktop;
  const wordRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const [mounted, setMounted] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // 클라이언트 마운트 표시
  useEffect(() => {
    setMounted(true);
  }, []);

  // 스크롤 잠금 - 데스크톱에서만 애니메이션 중 스크롤 차단
  useEffect(() => {
    // 모바일에서는 스크롤 잠금 하지 않음
    if (isMobile) {
      return;
    }

    // 데스크톱에서만 스크롤 잠금
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const unlockTimer = setTimeout(() => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }, 6000); // 애니메이션 완료 후 해제

    return () => {
      clearTimeout(unlockTimer);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isMobile]);

  // 위치 계산 함수 - 초기 위치와 타겟 위치 저장
  const calculateTargetPositions = () => {
    const positions: Record<string, WordPosition> = {};
    const initialPositions: Record<string, WordPosition> = {};

    WORDS.forEach((word) => {
      // 현재 오버레이에서의 위치 (초기 위치)
      const sourceEl = wordRefs.current[word.id];
      if (sourceEl) {
        const sourceRect = sourceEl.getBoundingClientRect();
        initialPositions[word.id] = {
          left: sourceRect.left,
          top: sourceRect.top,
        };
      }

      // 히어로 섹션에서의 타겟 위치
      const targetEl = document.querySelector(`[data-word="${word.id}"]`) as HTMLElement;

      if (targetEl) {
        const targetRect = targetEl.getBoundingClientRect();

        // viewport 기준 절대 좌표
        positions[word.id] = {
          left: targetRect.left,
          top: targetRect.top,
        };
      }
    });

    // 초기 위치도 함께 저장
    setWordPositions({
      ...positions,
      ...Object.fromEntries(
        Object.entries(initialPositions).map(([key, val]) => [`${key}_initial`, val])
      ),
    } as any);
  };

  // 메인 타이머: 인트로 애니메이션 재생 여부에 따라 대기 시간 조정
  useEffect(() => {
    const introHasPlayed = introState.hasPlayed();

    // 인트로 애니메이션이 현재 표시되고 있는지 DOM에서 확인
    const introElement = document.querySelector('[data-intro-logo="true"]');
    const introPlaying = introElement !== null;

    // 결정 로직:
    // - 인트로가 재생 중이면 5초 대기
    // - 이번 세션에 인트로가 아직 안 재생됐으면 5초 대기 (곧 재생될 것)
    // - 이미 재생됐으면 0.5초만 대기
    const waitDuration = introPlaying || !introHasPlayed ? INTRO_OVERLAY.STATIC_DURATION : 500;

    const staticTimer = setTimeout(() => {
      // 스크롤을 최상단으로 강제 이동 (위치 계산 전)
      window.scrollTo(0, 0);

      // DOM이 완전히 렌더링되고 스크롤이 완료된 후 위치 계산
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          calculateTargetPositions();
          setPhase("animating");
        });
      });

      const lastWordDelay = (WORDS.length - 1) * INTRO_OVERLAY.STAGGER_DELAY;
      const totalMoveTime = lastWordDelay + INTRO_OVERLAY.MOVE_DURATION * 1000;
      const removeTimer = setTimeout(() => {
        setPhase("completed");
        if (onDismiss) {
          onDismiss();
        }
      }, totalMoveTime + INTRO_OVERLAY.FADE_OUT_DELAY);

      return () => clearTimeout(removeTimer);
    }, waitDuration);

    return () => clearTimeout(staticTimer);
  }, [onDismiss]);

  if (phase === "completed") {
    return null;
  }

  // SSR 방지
  if (!mounted) return null;

  // Portal을 사용하여 body에 직접 렌더링 (GSAP transform 영향 회피)
  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-white">
      {/* 헤더 */}
      <header className="flex justify-center bg-transparent">
        <div className="flex w-full max-w-screen-max items-center justify-between px-7 py-8 md:px-10 md:py-8 lg:px-20 lg:py-12">
          <Link href="/" onClick={closeMenu} className="relative z-50" id="header-logo">
            <Image
              src={isOpen ? "/images/logo_white_ko.png" : "/images/logo_black_ko.png"}
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

      {/* 메인 컨텐츠 - 단어들 */}
      <div className="flex flex-1 items-center px-7 md:px-10 lg:px-20">
        {/* Static phase - animating 시에도 유지 (visibility hidden) */}
        <div
          className="flex flex-wrap items-baseline gap-x-3 md:gap-x-4"
          style={{ visibility: phase === "animating" ? "hidden" : "visible" }}
        >
          {WORDS.map((word) => (
            <span
              key={word.id}
              ref={(el) => {
                wordRefs.current[word.id] = el;
              }}
              data-intro-word={word.id}
              className={`${OVERLAY_TEXT_CLASSES} whitespace-nowrap ${
                word.type === "english" ? "font-bold" : "font-normal"
              }`}
            >
              {word.text}
            </span>
          ))}
        </div>

        {/* Animating phase - static 위에 오버레이, 오버레이 크기로 시작 */}
        {phase === "animating" && (
          <>
            {WORDS.map((word, index) => {
              const position = wordPositions[word.id];
              const initialPosition = (wordPositions as any)[`${word.id}_initial`];
              const delay = (index * INTRO_OVERLAY.STAGGER_DELAY) / 1000;

              if (!position || !initialPosition) return null;

              const targetClass = word.type === "english" ? ENGLISH_CLASSES : KOREAN_CLASSES;

              return (
                <WordAnimation
                  key={word.id}
                  word={word}
                  position={position}
                  initialPosition={initialPosition}
                  delay={delay}
                  targetClass={targetClass}
                  overlayClass={OVERLAY_TEXT_CLASSES}
                  moveDuration={INTRO_OVERLAY.MOVE_DURATION}
                />
              );
            })}
          </>
        )}
      </div>

      <Menu isOpen={isOpen} onClose={closeMenu} />
    </div>,
    document.body
  );
}

// WordAnimation 컴포넌트 - GSAP로 개별 단어 애니메이션
interface WordAnimationProps {
  word: (typeof WORDS)[0];
  position: WordPosition;
  initialPosition: WordPosition;
  delay: number;
  targetClass: string;
  overlayClass: string;
  moveDuration: number;
}

function WordAnimation({
  word,
  position,
  initialPosition,
  delay,
  targetClass,
  overlayClass,
  moveDuration,
}: WordAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLSpanElement>(null);
  const targetTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current || !overlayTextRef.current || !targetTextRef.current) return;

    // 타겟 크기 측정
    const tempElement = document.createElement("div");
    tempElement.className = targetClass;
    tempElement.style.visibility = "hidden";
    tempElement.style.position = "fixed";
    tempElement.style.whiteSpace = "nowrap";
    tempElement.textContent = word.text;
    document.body.appendChild(tempElement);

    const overlayRect = overlayTextRef.current.getBoundingClientRect();
    const targetRect = tempElement.getBoundingClientRect();
    const scaleX = targetRect.width / overlayRect.width;
    const scaleY = targetRect.height / overlayRect.height;

    document.body.removeChild(tempElement);

    const timeline = gsap.timeline();

    // 위치 이동
    timeline.to(containerRef.current, {
      left: position.left,
      top: position.top,
      duration: moveDuration,
      ease: "power3.out",
      delay: delay,
    });

    // 오버레이 텍스트 크기 서서히 변화 (위치와 동시에)
    timeline.to(
      overlayTextRef.current,
      {
        scaleX: scaleX,
        scaleY: scaleY,
        transformOrigin: "left top",
        duration: moveDuration,
        ease: "power3.out",
      },
      `-=${moveDuration}` // 위치 이동과 동시에
    );

    // 점진적인 crossfade - 처음부터 시작하여 전체 duration 동안 진행
    const crossfadeDuration = moveDuration; // 전체 이동 시간 동안

    // 타겟 텍스트 점진적으로 fade in (처음부터 시작)
    timeline.to(
      targetTextRef.current,
      {
        opacity: 1,
        duration: crossfadeDuration,
        ease: "power2.inOut",
      },
      `-=${moveDuration}` // 위치 이동 시작과 동시에
    );

    // 오버레이 텍스트 점진적으로 fade out (처음부터 시작)
    timeline.to(
      overlayTextRef.current,
      {
        opacity: 0,
        duration: crossfadeDuration,
        ease: "power2.inOut",
      },
      `-=${moveDuration}` // 위치 이동 시작과 동시에, 타겟과 완전히 동시에
    );

    return () => {
      timeline.kill();
    };
  }, [position, initialPosition, delay, moveDuration, targetClass, word]);

  return (
    <div
      ref={containerRef}
      data-intro-word={word.id}
      className={`${overlayClass} whitespace-nowrap ${
        word.type === "english" ? "font-bold" : "font-normal"
      }`}
      style={{
        position: "fixed",
        willChange: "transform",
        left: initialPosition.left,
        top: initialPosition.top,
      }}
    >
      {/* 타겟 텍스트 - 정확한 최종 크기, snap in */}
      <span
        ref={targetTextRef}
        className={targetClass}
        style={{ opacity: 0, position: "absolute", willChange: "opacity" }}
      >
        {word.text}
      </span>
      {/* 오버레이 텍스트 - 서서히 작아지다가 snap out */}
      <span
        ref={overlayTextRef}
        style={{ opacity: 1, willChange: "transform, opacity", transformOrigin: "left top" }}
      >
        {word.text}
      </span>
    </div>
  );
}
