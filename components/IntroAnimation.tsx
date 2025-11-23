"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

const TEXT_LINES = ["WE DON'T JUST", "SOLVE PROBLEMS,", "WE REROUTE THEM"];
const TYPING_SPEED = 50; // ms per character
const PAUSE_AFTER_TYPING = 800; // ms
const LOGO_TRANSITION_DURATION = 1000; // ms
const BACKGROUND_SLIDE_DURATION = 800; // ms

export function IntroAnimation() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>(["", "", ""]);
  const [startLogoTransition, setStartLogoTransition] = useState(false);
  const [startBackgroundSlide, setStartBackgroundSlide] = useState(false);
  const [logoPosition, setLogoPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const hasShownRef = useRef(false);

  // /studio 경로에서는 인트로 표시 안 함
  if (pathname.startsWith("/studio")) {
    return null;
  }

  useEffect(() => {
    // Only show on actual page load/refresh, not on client-side navigation
    if (hasShownRef.current) {
      return;
    }

    hasShownRef.current = true;
    setIsVisible(true);

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

    // Get header logo position for transition target
    const updateLogoPosition = () => {
      const headerLogo = document.getElementById("header-logo");
      if (headerLogo) {
        const img = headerLogo.querySelector("img");
        if (img) {
          const rect = img.getBoundingClientRect();
          setLogoPosition({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          });
        }
      }
    };

    // Update position initially and on resize
    updateLogoPosition();
    window.addEventListener("resize", updateLogoPosition);

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
          // Update logo position right before transition
          updateLogoPosition();
          setStartLogoTransition(true);

          // Step 2: After logo reaches position, start background slide
          setTimeout(() => {
            setStartBackgroundSlide(true);

            // Step 3: Hide intro after background slides up
            setTimeout(() => {
              setIsVisible(false);
              // 히어로 섹션이 보인 후 1초 후에 스크롤 활성화
              scrollUnlockTimer = setTimeout(() => {
                const html = document.documentElement;
                const body = document.body;
                html.style.overflow = "";
                body.style.overflow = "";
                body.style.position = "";
                body.style.width = "";
                body.style.top = "";
              }, 1000);
            }, BACKGROUND_SLIDE_DURATION + 100);
          }, LOGO_TRANSITION_DURATION);
        }, PAUSE_AFTER_TYPING);
      }
    }, TYPING_SPEED);

    return () => {
      clearInterval(typingInterval);
      window.removeEventListener("resize", updateLogoPosition);
      if (scrollUnlockTimer) {
        clearTimeout(scrollUnlockTimer);
      }
    };
  }, []);

  if (!isVisible) return null;

  // Calculate transform for logo transition
  const getLogoTransform = () => {
    if (!startLogoTransition) return { x: 0, y: 0, scale: 1 };

    // Get the current position of the intro logo (after being pushed by text)
    const introLogo = document.querySelector(
      '[data-intro-logo="true"]',
    ) as HTMLElement;
    if (!introLogo) return { x: 0, y: 0, scale: 1 };

    const introRect = introLogo.getBoundingClientRect();
    const introCenterX = introRect.left + introRect.width / 2;
    const introCenterY = introRect.top + introRect.height / 2;

    // Target: center of header logo
    const targetCenterX = logoPosition.left + logoPosition.width / 2;
    const targetCenterY = logoPosition.top + logoPosition.height / 2;

    // Calculate translation from intro logo's CURRENT position to header logo position
    const deltaX = targetCenterX - introCenterX;
    const deltaY = targetCenterY - introCenterY;

    // Calculate scale
    const scale = logoPosition.width / introRect.width;

    return { x: deltaX, y: deltaY, scale };
  };

  const transform = getLogoTransform();

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: startBackgroundSlide ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: BACKGROUND_SLIDE_DURATION / 1000,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            className="fixed inset-0 z-[100] bg-navy"
          />

          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] flex items-center justify-center"
          >
            <div className="relative flex flex-col items-center justify-center gap-7 px-5 md:gap-12 lg:gap-16">
              <motion.div
                data-intro-logo="true"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  startBackgroundSlide
                    ? {
                        opacity: 0,
                        position: "fixed",
                        top: logoPosition.top,
                        left: logoPosition.left,
                        width: logoPosition.width,
                        height: logoPosition.height,
                        scale: 1,
                        x: 0,
                        y: 0,
                      }
                    : {
                        opacity: 1,
                        scale: transform.scale,
                        x: transform.x,
                        y: transform.y,
                      }
                }
                transition={{
                  opacity: { duration: 0.3, delay: 0 },
                  scale: {
                    duration: LOGO_TRANSITION_DURATION / 1000,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  x: {
                    duration: LOGO_TRANSITION_DURATION / 1000,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  y: {
                    duration: LOGO_TRANSITION_DURATION / 1000,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  top: { duration: 0 },
                  left: { duration: 0 },
                  width: { duration: 0 },
                  height: { duration: 0 },
                }}
              >
                <Image
                  src="/images/logo_white.png"
                  alt="Reroute"
                  width={214}
                  height={59}
                  className="h-auto w-[70px] sm:w-[80px] md:w-[110px] lg:w-[140px] xl:w-[170px] 2xl:w-[200px]"
                  priority
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: startLogoTransition ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                {TEXT_LINES.map((line, index) => (
                  <p
                    key={index}
                    className="text-[20px] font-bold leading-[22px] text-white sm:text-[28px] sm:leading-[30px] md:text-[40px] md:leading-[50px] lg:text-[56px] lg:leading-[71px] xl:text-[67px] xl:leading-[84px] 2xl:text-[90px] 2xl:leading-[120px]"
                  >
                    {displayedLines[index]}
                  </p>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
