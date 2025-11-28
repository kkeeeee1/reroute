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
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerContainerRef.current) return;

    const ctx = gsap.context(() => {
      // 초기 상태 설정 - 모든 wave-char 요소들 안 보이게
      const chars = headerContainerRef.current?.querySelectorAll(".wave-char");
      if (chars) {
        gsap.set(chars, {
          opacity: 0,
        });
      }

      gsap.set(descriptionRef.current, {
        opacity: 0,
        x: 50,
      });

      gsap.set(buttonRef.current, {
        opacity: 0,
        y: 20,
      });

      // ScrollTrigger로 뷰포트에 들어올 때 애니메이션 시작
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          const timeline = gsap.timeline();

          // 1. WE (선) REROUTE 파도 애니메이션 - 각 글자/요소별로 순차적으로
          const chars = headerContainerRef.current?.querySelectorAll(".wave-char");
          if (chars) {
            chars.forEach((char, index) => {
              timeline.fromTo(
                char,
                {
                  opacity: 0,
                  y: 30,
                },
                {
                  opacity: 1,
                  y: -15, // 위로 올라갔다가
                  duration: 0.4,
                  ease: "power1.out",
                },
                index * 0.1 // 각 글자마다 0.1초 간격으로 부드럽게
              );

              timeline.to(
                char,
                {
                  y: 0, // 원래 위치로
                  duration: 0.5,
                  ease: "power1.inOut",
                },
                index * 0.1 + 0.2 // 약간 겹치면서 부드럽게
              );
            });
          }

          // 2. Description Text - 오른쪽에서 왼쪽으로 페이드인 (2초 애니메이션 후)
          timeline.to(
            descriptionRef.current,
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            1.6 // 파도 애니메이션 후
          );

          // 3. VIEW MORE - 아래에서 위로 (description 애니메이션 후)
          timeline.to(
            buttonRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            2.4 // description 애니메이션 후
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={DARK_SECTION_IDS.ABOUT}
      className="relative w-full bg-deepnavy md:overflow-hidden"
    >
      {/* Content section */}
      <div className="flex flex-col justify-between md:justify-around px-7 py-20 md:px-16 md:py-28 lg:px-32 lg:py-32 xl:px-[170px] xl:py-36 2xl:px-[226px] 2xl:py-40">
        {/* WE (선) REROUTE */}
        <div
          ref={headerContainerRef}
          className="flex flex-col md:flex-row items-center md:items-center justify-start gap-3 md:gap-6 mb-12 md:mb-16 lg:mb-20"
        >
          {/* WE - 각 글자를 개별 span으로 */}
          <h2 className="shrink-0 text-[35px] font-extrabold text-white md:text-[58px] md:leading-none flex">
            <span className="wave-char inline-block">W</span>
            <span className="wave-char inline-block">E</span>
          </h2>

          {/* Line */}
          <div className="relative flex w-[60px] h-[40px] md:h-[60px] md:w-[140px] lg:w-[200px] shrink-0 items-center justify-center">
            <div className="wave-char w-[1px] h-full md:w-full md:h-[1px] origin-center bg-white" />
          </div>

          {/* REROUTE - 각 글자를 개별 span으로 */}
          <h2 className="shrink-0 text-[35px] font-extrabold text-white md:text-[58px] md:leading-none flex">
            <span className="wave-char inline-block">R</span>
            <span className="wave-char inline-block">E</span>
            <span className="wave-char inline-block">R</span>
            <span className="wave-char inline-block">O</span>
            <span className="wave-char inline-block">U</span>
            <span className="wave-char inline-block">T</span>
            <span className="wave-char inline-block">E</span>
          </h2>
        </div>

        {/* Description Text - 중앙 */}
        <div className="mb-20 md:mb-24 lg:mb-48">
          <p
            ref={descriptionRef}
            className="text-[20px] font-normal leading-[29px] text-white md:max-w-[75%] md:whitespace-pre-wrap md:text-[28px] md:leading-[40px] lg:max-w-[80%] lg:text-[32px] lg:leading-[48px] xl:max-w-[75%] xl:text-[36px] xl:leading-[50px] 2xl:max-w-[72%] 2xl:text-[40px] 2xl:leading-[58px] "
            style={{ willChange: "transform, opacity" }}
          >
            리루트는 기업의 복잡한 문제와 기존 방식에 갇힌 조직을 진단하고, 전략부터 실행까지 한
            흐름으로 연결합니다.
            {"\n"}
            통합 운영관리, 브랜딩 & 고객 경험 설계, 통합 마케팅, 맞춤형 플랫폼 개발까지 브랜드와
            비즈니스가 본질에 집중하며 나아갈 수 있는 구조를 완성합니다.
          </p>
        </div>

        {/* VIEW MORE Button - 아래 */}
        <div ref={buttonRef} style={{ willChange: "transform, opacity" }}>
          <Link
            href="/about"
            className="text-[18px] font-bold leading-[100%] text-white transition-opacity duration-300 hover:opacity-70 lg:text-[20px] xl:text-[24px] 2xl:text-[28px] flex items-end gap-2 md:gap-3"
          >
            VIEW MORE
            <svg
              width="35"
              height="16"
              viewBox="0 0 35 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="md:mb-0.5 lg:mb-1 w-[22px] md:w-[28px] lg:w-[35px]"
            >
              <path
                d="M0 13.3679H30L18.75 1.36792"
                stroke="white"
                strokeWidth="4"
                strokeMiterlimit="10"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
