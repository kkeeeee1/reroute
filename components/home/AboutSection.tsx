"use client";

import { DARK_SECTION_IDS } from "@/constants/sections";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const weHeaderRef = useRef<HTMLHeadingElement>(null);
  const rerouteHeaderRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 모든 디바이스: 스크롤 시 타이틀과 설명이 페이드인
      
      // 초기 상태: 모두 숨김
      gsap.set([headerContainerRef.current, descriptionRef.current, buttonRef.current], {
        opacity: 0,
      });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1800",
          scrub: 1,
          pin: true,
        },
      });

      // 타이틀 페이드인
      tl.to(
        headerContainerRef.current,
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      );

      // 설명 텍스트 페이드인 (y 이동 포함)
      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        0.3
      );

      // 버튼 페이드인
      tl.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        0.6
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={DARK_SECTION_IDS.ABOUT}
      className="relative w-full bg-deepnavy md:h-screen md:overflow-hidden"
    >
      {/* Content section */}
      <div className="flex h-screen flex-col justify-around px-7 py-24 md:px-16 md:py-28 lg:px-32 lg:py-32 xl:px-[170px] xl:py-36 2xl:px-[226px] 2xl:py-36">
        
        {/* WE (선) REROUTE */}
        <div
          ref={headerContainerRef}
          className="flex flex-col md:flex-row items-center md:items-center justify-start gap-3 md:gap-6 mb-8 md:mb-12 lg:mb-16"
          style={{ willChange: "opacity" }}
        >
          <h2
            ref={weHeaderRef}
            className="shrink-0 text-[35px] font-extrabold text-white md:text-[58px] md:leading-none"
          >
            WE
          </h2>

          {/* Line */}
          <div className="relative flex w-[60px] h-[80px] md:h-[60px] md:w-[200px] shrink-0 items-center justify-center">
            <div
              ref={lineRef}
              className="w-[1px] h-full md:w-full md:h-[1px] origin-center bg-white"
            />
          </div>

          <h2
            ref={rerouteHeaderRef}
            className="shrink-0 text-[35px] font-extrabold text-white md:text-[58px] md:leading-none"
          >
            REROUTE
          </h2>
        </div>
        
        {/* Description Text - 중앙 */}
        <p
          ref={descriptionRef}
          className="text-[22px] font-normal leading-[34px] text-white md:max-w-[75%] md:whitespace-pre-wrap md:text-[28px] md:leading-[40px] lg:max-w-[80%] lg:text-[32px] lg:leading-[48px] xl:max-w-[75%] xl:text-[36px] xl:leading-[50px] 2xl:max-w-[72%] 2xl:text-[40px] 2xl:leading-[58px]"
          style={{ willChange: "transform, opacity" }}
        >
          리루트는 기업의 복잡한 문제와 기존 방식에 갇힌 조직을 진단하고, 전략부터 실행까지 한
          흐름으로 연결합니다.
          {"\n"}
          통합 운영관리, 브랜딩 & 고객 경험 설계, 통합 마케팅, 맞춤형 플랫폼 개발까지 브랜드와
          비즈니스가 본질에 집중하며 나아갈 수 있는 구조를 완성합니다.
        </p>

        {/* VIEW MORE Button - 아래 */}
        <div ref={buttonRef} style={{ willChange: "transform, opacity" }}>
          <Link
            href="/about"
            className="text-[18px] font-bold leading-[100%] text-white transition-opacity duration-300 hover:opacity-70 lg:text-[20px] xl:text-[24px] 2xl:text-[28px]"
          >
            VIEW MORE
          </Link>
        </div>
      </div>
    </section>
  );
}
