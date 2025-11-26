"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { HeroImageCarousel } from "./HeroImageCarousel";

gsap.registerPlugin(ScrollTrigger);

export function HeroSectionMobile() {
  const sectionRef = useRef<HTMLElement>(null);
  const topBlockRef = useRef<HTMLDivElement>(null);
  const bottomBlockRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger 애니메이션
  useEffect(() => {
    if (!sectionRef.current || !topBlockRef.current || !bottomBlockRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // 헤더가 투명하므로 top에서 시작
          end: "+=150%", // 블록 슬라이드 + 이미지 감상 시간
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 윗블럭은 위로, 아랫블럭은 아래로 (타임라인의 66%에서 완료)
      tl.to(topBlockRef.current, {
        y: "-100%",
        ease: "none",
        duration: 0.66,
      }, 0)
      .to(bottomBlockRef.current, {
        y: "100%",
        ease: "none",
        duration: 0.66,
      }, 0)
      // 나머지 80%는 이미지만 보여줌 (아무 애니메이션 없음)
      .to({}, { duration: 0.80 }); // 더미 트윈으로 타임라인 연장
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* 배경: 이미지 캐러셀 */}
      <div className="absolute inset-0">
        <HeroImageCarousel fullHeight />
      </div>

      {/* 전경: 텍스트 블럭들 */}
      {/* 윗블럭 (50%): 영문 텍스트를 맨 아래 왼쪽 정렬 */}
      <div 
        ref={topBlockRef}
        className="absolute left-0 top-0 flex h-3/5 w-full items-end justify-start bg-white px-7 pb-4"
      >
        <h1 className="text-left text-[60px] font-bold leading-[60px] sm:text-[65px] sm:leading-[65px]">
          <span>Never Stuck Always Reroute</span>
        </h1>
      </div>

      {/* 밑블럭 (50%): 한글 텍스트를 맨 위 왼쪽 정렬 */}
      <div 
        ref={bottomBlockRef}
        className="absolute bottom-0 left-0 flex h-2/5 w-full items-start justify-start bg-white px-7 pt-4"
      >
        <p className="text-left text-[28px] font-normal leading-[32px] sm:text-[40px] sm:leading-[50px]">
          브랜드와 비즈니스의 막힌 길에서 새로운 경로를 설계하는 전략 파트너
        </p>
      </div>
    </section>
  );
}
