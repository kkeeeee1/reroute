"use client";

import { DARK_SECTION_IDS } from "@/constants/sections";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  const item1Ref = useRef<HTMLDivElement>(null);
  const item2Ref = useRef<HTMLDivElement>(null);
  const item3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 초기 상태 설정: 1번, 2번, 3번 요소들 숨김
      gsap.set([item1Ref.current, item2Ref.current, item3Ref.current], {
        opacity: 0,
      });

      // 배경 이미지 초기 scale 설정
      gsap.set(bgRef.current, {
        scale: 1.0,
      });

      // ABOUT 텍스트는 초기에 투명
      gsap.set(aboutTitleRef.current, {
        opacity: 0,
      });

      // ABOUT 텍스트 페이드인 (인트로 있으면 2초 뒤, 없으면 바로)
      const introPlaying = sessionStorage.getItem("introPlaying") === "true";
      const delay = introPlaying ? 2 : 0;

      gsap.to(aboutTitleRef.current, {
        opacity: 1,
        duration: 0.6,
        delay,
      });

      // ScrollTrigger 애니메이션 with Snap (자석 효과)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=4500",
          pin: true,
          scrub: 1,
          markers: false,
          snap: {
            snapTo: [0, 0.27, 0.55, 0.85, 1],
            duration: { min: 0.2, max: 0.4 },
            delay: 0.08,
            ease: "back.out",
          },
          onEnter: () => {
            // 스크롤 시작 시 1번 요소가 보이도록 보장
            gsap.set(item1Ref.current, { opacity: 1 });
          },
        },
      });

      // 초기 진입 시에만 1번 요소 부드럽게 보여주기 (ScrollTrigger 전)
      gsap.to(item1Ref.current, {
        opacity: 1,
        duration: 1,
        delay: delay + 0.8,
        ease: "power2.out",
      });

      // 1번 요소는 이미 보이는 상태에서 시작
      // 배경은 전체 타임라인 동안 연속적으로 확대 (1.0 → 1.35)
      // power1.inOut으로 각 단계에서 느려지는 느낌
      tl.to(
        bgRef.current,
        {
          scale: 1.35,
          duration: 6.0,
          ease: "power1.inOut", // 시작/끝에서 느려져서 단계별 멈춤 느낌
        },
        0
      );

      // 1번 요소 유지 후 사라짐
      tl.to(
        item1Ref.current,
        {
          opacity: 0,
          duration: 0.15,
        },
        2.0
      );

      // 2번 요소 나타남
      tl.to(
        item2Ref.current,
        {
          opacity: 1,
          duration: 0.15,
        },
        2.3
      ).to(
        item2Ref.current,
        {
          opacity: 0,
          duration: 0.15,
        },
        4.1
      );

      // 3번 요소 나타남
      tl.to(
        item3Ref.current,
        {
          opacity: 1,
          duration: 1.5,
        },
        4.4
      );

      // 이미지 나타난 후 일정 시간 유지 후 섹션 끝냄 (스크롤 해제)
      tl.to({}, {}, 7.5);
    }, sectionRef);

    return () => {
      // 컴포넌트 언마운트 직전 모든 GSAP 애니메이션과 ScrollTrigger 정리
      gsap.killTweensOf([
        sectionRef.current,
        bgRef.current,
        aboutTitleRef.current,
        item1Ref.current,
        item2Ref.current,
        item3Ref.current,
      ]);

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={DARK_SECTION_IDS.ABOUT}
      className="relative h-dvh bg-black w-full overflow-hidden"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image
          src="/images/about/about_bg.png"
          alt="About Background"
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>

      <div className="relative z-10 max-w-screen-max mx-auto px-7 sm:px-6 md:px-10 lg:px-16 2xl:px-20 w-full h-full flex flex-col items-center justify-start pb-4 sm:pb-6 md:pb-8 lg:pb-10 2xl:pb-12 pt-20 sm:pt-24 md:pt-32 lg:pt-36 2xl:pt-40">
        {/* ABOUT Title - Top Left */}
        <div className="w-full h-fit">
          <h2
            ref={aboutTitleRef}
            className="font-bold leading-none text-white text-[32px] sm:text-[44px] md:text-[56px] lg:text-[68px] 2xl:text-[80px] py-4"
          >
            ABOUT
          </h2>
        </div>

        {/* Main Content - Centered (Stacked items in same position) */}
        <div className="relative flex flex-col items-center justify-center text-center text-white w-full flex-1">
          {/* 1번 */}
          <div
            ref={item1Ref}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 2xl:gap-12"
            style={{ willChange: "opacity" }}
          >
            <h2 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] 2xl:text-[56px] font-bold leading-[1.2] sm:leading-[1.3] md:leading-[1.3] lg:leading-[48px] 2xl:leading-[48px]">
              금융 전략, 현장 운영, 기술 실행까지 책임지는 리루트
            </h2>

            <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-2 2xl:gap-2 text-[14px] sm:text-[16px] md:text-[20px] lg:text-[26px] 2xl:text-[32px] leading-[1.4] sm:leading-[1.5] md:leading-[1.6] lg:leading-[48px] 2xl:leading-[48px] whitespace-pre-line text-center">
              <p>{`리루트는 단순 컨설팅이나 개발사가 아닙니다.\n재무·운영·기술의 세 축을 이해하고 직접 실행하는 종합 PM 리더십으로,\n브랜드의 문제를 처음부터 끝까지 책임집니다.`}</p>
            </div>
          </div>

          {/* 2번 */}
          <div
            ref={item2Ref}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 2xl:gap-12"
            style={{ willChange: "opacity" }}
          >
            <h2 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] 2xl:text-[56px] font-bold leading-[1.2] sm:leading-[1.3] md:leading-[1.3] lg:leading-[48px] 2xl:leading-[48px]">
              실행되는 전략, 숫자로 증명되는 성장
            </h2>

            <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-2 2xl:gap-2 text-[14px] sm:text-[16px] md:text-[20px] lg:text-[26px] 2xl:text-[32px] leading-[1.4] sm:leading-[1.5] md:leading-[1.6] lg:leading-[48px] 2xl:leading-[48px] md:whitespace-pre-line text-center">
              <span>
                많은 회사가 전략을 이야기하지만 실행하지 못하고,
                <br />
                많은 개발사는 기술만 제시하고 사업의 본질을 이해하지 못합니다.
                <br />
                {`리루트는 ROI 중심 사고 + 현장 운영 역량 + 기술력을 결합해\n브랜드가 실제로 성장할 수 있는 솔루션을 제공합니다.`}
              </span>
            </div>
          </div>

          {/* 3번  */}
          <div
            ref={item3Ref}
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ willChange: "opacity" }}
          >
            <Image
              src="/images/logo_main.png"
              alt="Reroute Logo"
              width={574}
              height={216}
              priority
              className="object-contain w-[250px] h-[110px] md:w-[420px] md:h-[130px] lg:w-[574px] lg:h-[216px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
