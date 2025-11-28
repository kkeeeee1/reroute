"use client";

import { introState } from "@/utils/introState";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descLine1Ref = useRef<HTMLParagraphElement>(null);
  const descLine2Ref = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const playAnimations = () => {
      const ctx = gsap.context(() => {
        // Background Image Parallax & Scale
        gsap.fromTo(
          bgImageRef.current,
          { scale: 1.2, opacity: 0 },
          {
            scale: 1,
            opacity: window.innerWidth >= 768 ? 1 : 0.4,
            duration: 1.8,
            ease: "power3.out",
          }
        );

        gsap.to(bgImageRef.current, {
          y: 150,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Title Animation
        gsap.fromTo(
          titleRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: 0.3,
            ease: "power3.out",
          }
        );

        // Description Animation (Staggered)
        gsap.fromTo(
          [descLine1Ref.current, descLine2Ref.current],
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.6,
            stagger: 0.2,
            ease: "power3.out",
          }
        );

        // Badge Animation
        gsap.fromTo(
          badgeRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 1.2,
            ease: "power3.out",
          }
        );
      }, containerRef);

      return ctx;
    };

    // Check if intro has already played
    if (introState.hasPlayed()) {
      // Intro already played, start animations immediately
      const ctx = playAnimations();
      return () => ctx.revert();
    } else {
      // Intro hasn't played yet, wait for it to complete
      const checkInterval = setInterval(() => {
        if (introState.hasPlayed()) {
          clearInterval(checkInterval);
          // Add a small delay after intro completes for smooth transition
          setTimeout(() => {
            playAnimations();
          }, 0);
        }
      }, 0);

      return () => {
        clearInterval(checkInterval);
      };
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="b2b-hero-section"
      className="relative flex min-h-[70dvh] md:min-h-[85dvh] flex-col bg-black text-white overflow-hidden"
    >
      <Image
        ref={bgImageRef}
        src="/images/b2b/solution_bg.png"
        alt="Solution 3D Object"
        className="object-contain absolute bottom-0 right-0 opacity-0 w-1/2"
        priority
        width={2000}
        height={2000}
      />

      <div className="relative z-10 mx-auto max-w-screen-max flex w-full flex-1 flex-col px-7 md:px-10 lg:px-16 xl:px-20 pt-32 pb-12 md:pt-48 xl:pt-56 2xl:pt-64 lg:pb-16">
        <div className="flex flex-1 flex-col justify-between md:max-w-[60%] xl:max-w-[55%] 2xl:max-w-[47%]">
          <div className="space-y-7 md:space-y-10 xl:space-y-12 2xl:space-y-14">
            <h2
              ref={titleRef}
              className="text-[48px] md:text-[64px] xl:text-[72px] 2xl:text-[80px] font-bold uppercase leading-none opacity-0"
            >
              SOLUTION
            </h2>
            <div className="text-[16px] md:text-[24px] xl:text-[28px] 2xl:text-[32px] whitespace-pre-line leading-[28px] md:leading-[38px] xl:leading-[44px] 2xl:leading-[50px] flex flex-col gap-1 md:gap-2">
              <span
                ref={descLine1Ref}
                className="opacity-0"
              >{`브랜드와 비즈니스를 움직이는 전문 솔루션. \n 리루트는 기업이 목표를 명확히 달성할 수 있도록 브랜드의 전략, 실행, 시스템을 통합 설계합니다.`}</span>
            </div>
          </div>

          <div
            ref={badgeRef}
            className="flex items-center gap-4 md:gap-6 xl:gap-7 2xl:gap-[34px] mt-8 md:mt-0 opacity-0"
          >
            <span className="rounded-full bg-white text-[18px] md:text-[22px] xl:text-[24px] 2xl:text-[26px] leading-[22px] md:leading-[26px] xl:leading-[28px] 2xl:leading-[30px] font-bold text-black px-4 py-1 md:px-5 md:py-1.5 xl:px-6 xl:py-1.5 2xl:px-6 2xl:py-1.5">
              B2B
            </span>
            <span className="text-[20px] md:text-[26px] xl:text-[29px] 2xl:text-[32px]">
              For Your Business
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
