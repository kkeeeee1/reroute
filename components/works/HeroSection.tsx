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
  const taglineRef = useRef<HTMLSpanElement>(null);
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

        // Tagline Animation
        gsap.fromTo(
          taglineRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.5,
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
      id="works-hero-section"
      className="relative flex min-h-[65dvh] md:min-h-[85dvh] flex-col bg-[#00002B] text-white overflow-hidden"
    >
      <Image
        ref={bgImageRef}
        src="/images/works/works_bg.png"
        alt="Works 3D Object"
        className="object-contain absolute bottom-0 right-0 opacity-0 w-full"
        priority
        width={2000}
        height={2000}
      />

      <div className="relative z-10 mx-auto max-w-screen-max flex w-full flex-1 flex-col px-7 md:px-10 lg:px-16 xl:px-20 pt-32 pb-12 md:pt-48 xl:pt-56 2xl:pt-64 lg:pb-16">
        <div className="flex flex-1 flex-col justify-between md:max-w-[60%] xl:max-w-[55%] 2xl:max-w-[47%]">
          <div className="space-y-5 md:space-y-7 xl:space-y-8 2xl:space-y-[36px]">
            <h2
              ref={titleRef}
              className="text-[48px] md:text-[64px] xl:text-[72px] 2xl:text-[80px] font-bold uppercase leading-none opacity-0"
            >
              Works
            </h2>

            <div>
              <span
                ref={taglineRef}
                className="font-bold text-[16px] md:text-[24px] xl:text-[28px] 2xl:text-[32px] leading-[28px] md:leading-[38px] xl:leading-[44px] 2xl:leading-[50px] opacity-0"
              >
                "리루트는 결과로 이야기합니다"
              </span>
            </div>

            <div className="text-[16px] md:text-[24px] xl:text-[28px] 2xl:text-[32px] leading-[28px] md:leading-[38px] xl:leading-[44px] 2xl:leading-[50px] md:whitespace-pre-line">
              <span
                ref={descLine1Ref}
                className="opacity-0"
              >{`전략, 디자인, 기술을 하나로 묶어\n실제로 변화가 일어나는 프로젝트만 수행합니다.\n우리의 방식이 어떻게 성과로 이어졌는지,\n다양한 제작사례를 확인하세요.`}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
