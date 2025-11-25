"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { DARK_SECTION_IDS } from "@/constants/sections";

export function AboutSection() {
  const [isInView, setIsInView] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const weHeaderRef = useRef<HTMLHeadingElement>(null);
  const rerouteHeaderRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // 1초 뒤 이미지 보여주기
          const timer = setTimeout(() => {
            setShowImage(true);
          }, 1000);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // GSAP 애니메이션 - isInView 변경 시
  useEffect(() => {
    if (!isInView) return;

    const elements = [
      { ref: weHeaderRef, delay: 0.2 },
      { ref: rerouteHeaderRef, delay: 0.4 },
      { ref: descriptionRef, delay: 0.6 },
      { ref: buttonRef, delay: 0.8 },
    ];

    const animations = elements.map(({ ref, delay }) => {
      if (!ref.current) return null;
      return gsap.fromTo(
        ref.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power2.out",
        },
      );
    });

    // Line animation
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { opacity: 0, scaleX: 0 },
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
        },
      );
    }

    return () => {
      animations.forEach((anim) => anim?.kill());
    };
  }, [isInView]);

  // Image animation - showImage 변경 시
  useEffect(() => {
    if (!showImage || !imageRef.current) return;

    const anim = gsap.fromTo(
      imageRef.current,
      { scaleY: 0, opacity: 0 },
      {
        scaleY: 1,
        opacity: 1,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.inOut",
      },
    );

    return () => {
      anim.kill();
    };
  }, [showImage]);

  return (
    <section ref={sectionRef} id={DARK_SECTION_IDS.ABOUT} className="w-full bg-deepnavy">
      <div className="mx-auto flex w-full max-w-screen-max flex-col gap-12 px-7 py-16 md:gap-20 md:px-16 md:py-24 lg:gap-40 lg:px-32 lg:py-20 xl:px-[170px] xl:py-24 2xl:px-[226px] 2xl:py-32">
        <div className="flex flex-col gap-10 lg:gap-12">
          {/* WE and REROUTE with line */}
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-6">
            <h2
              ref={weHeaderRef}
              className="shrink-0 text-[35px] font-extrabold text-white md:text-[45px] xl:text-[50px] 2xl:text-[56px]"
              style={{ opacity: 0, willChange: "transform, opacity" }}
            >
              WE
            </h2>

            {/* Animated Line or Image */}
            <div className="relative flex h-[60px] w-[140px] shrink-0 items-center justify-center md:h-[60px] lg:h-[140px] lg:w-[160px] xl:w-[200px] 2xl:w-[240px]">
              {/* Line - animates with fade-in and scale */}
              <div
                ref={lineRef}
                className="absolute h-[1px] w-full origin-center bg-white"
                style={{ opacity: 0, willChange: "transform, opacity" }}
              />

              {/* Image - expands from center, overlays the line */}
              <div
                ref={imageRef}
                className="relative z-10 h-full w-full origin-center"
                style={{ opacity: 0, willChange: "transform, opacity" }}
              >
                <Image
                  src="/images/main/main_we_reroute.png"
                  alt="We Reroute"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <h2
              ref={rerouteHeaderRef}
              className="shrink-0 text-[35px] font-extrabold text-white md:text-[45px] xl:text-[50px] 2xl:text-[56px]"
              style={{ opacity: 0, willChange: "transform, opacity" }}
            >
              REROUTE
            </h2>
          </div>

          {/* Description Text */}
          <p
            ref={descriptionRef}
            className="text-[18px] font-normal leading-[24px] text-white md:max-w-[58%] md:whitespace-pre-wrap md:text-[20px] md:leading-[30px] lg:max-w-[78%] lg:text-[28px] lg:leading-[40px] xl:max-w-[75%] xl:text-[32px] xl:leading-[50px] 2xl:max-w-[72%] 2xl:text-[40px] 2xl:leading-[58px]"
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
            리루트는 기업의 복잡한 문제와 기존 방식에 갇힌 조직을 진단하고,
            전략부터 실행까지 한 흐름으로 연결합니다.
            {"\n"}
            통합 운영관리, 브랜딩 & 고객 경험 설계, 통합 마케팅, 맞춤형 플랫폼
            개발까지 브랜드와 비즈니스가 본질에 집중하며 나아갈 수 있는 구조를
            완성합니다.
          </p>
        </div>

        {/* VIEW MORE Button */}
        <div
          ref={buttonRef}
          style={{ opacity: 0, willChange: "transform, opacity" }}
        >
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
