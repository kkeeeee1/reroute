import { useIsDesktop } from "@/hooks/useIsDesktop";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  id: "b2b" | "b2c";
  title: string;
  description: string;
  tagText: string;
  callToAction: string;
  imageSrc: string;
  href: string;
  isHovered: boolean;
  onHover: (id: "b2b" | "b2c" | null) => void;
  gradientColor: string;
  tagBgColor: string;
  tagTextColor: string;
  otherHovered: boolean;
  isInView?: boolean;
  animationDelay?: number;
}

export function ServiceCard({
  id,
  title,
  description,
  tagText,
  callToAction,
  imageSrc,
  href,
  isHovered,
  onHover,
  gradientColor,
  tagBgColor,
  tagTextColor,
  otherHovered,
  isInView = false,
  animationDelay = 0,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLParagraphElement>(null);
  const isDesktop = useIsDesktop();
  const [animationComplete, setAnimationComplete] = useState(false);

  // 데스크탑에서만 y-offset 적용
  const getYOffset = () => {
    if (!isDesktop) return 0;
    if (isHovered) return -30;
    if (otherHovered) return 70;
    return id === "b2b" ? 0 : 70;
  };

  const getZIndex = () => {
    if (!isDesktop) return 0;
    if (isHovered) return 20;
    return id === "b2b" ? 10 : 5;
  };

  // 글자별로 나누는 함수
  const splitTextToSpans = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="wave-char inline-block" style={{ whiteSpace: char === " " ? "pre" : "normal" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  // Initial animation when isInView changes
  useEffect(() => {
    if (!isInView || !cardRef.current) return;

    const ctx = gsap.context(() => {
      // 카드 초기 fade-in - animationDelay에 맞춰서
      gsap.fromTo(
        cardRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay: animationDelay,
          ease: "power2.out",
        }
      );

      // 초기 위치 설정
      gsap.set(cardRef.current, {
        y: id === "b2b" ? 0 : 70,
        zIndex: getZIndex(),
      });

      // 모든 wave-char 요소들 안 보이게
      const chars = cardRef.current?.querySelectorAll(".wave-char");
      if (chars) {
        gsap.set(chars, { opacity: 0 });
      }

      // tag와 CTA 초기 상태
      gsap.set([tagRef.current, ctaRef.current], {
        opacity: 0,
        x: 50,
      });

      // 애니메이션 시작 - 카드 fade-in 후 시작
      const timeline = gsap.timeline({
        delay: animationDelay + 0.5,
        onComplete: () => {
          setAnimationComplete(true);
        },
      });

      // 1. Title 파도 애니메이션
      const titleChars = titleRef.current?.querySelectorAll(".wave-char");
      if (titleChars) {
        titleChars.forEach((char, index) => {
          timeline.fromTo(
            char,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: -15,
              duration: 0.4,
              ease: "power1.out",
            },
            index * 0.08 // 간격 늘림: 0.05 -> 0.08
          );

          timeline.to(
            char,
            {
              y: 0,
              duration: 0.5,
              ease: "power1.inOut",
            },
            index * 0.08 + 0.2
          );
        });
      }

      // 2. Description 파도 애니메이션 (title이 어느정도 진행된 후)
      const descChars = descriptionRef.current?.querySelectorAll(".wave-char");
      if (descChars) {
        const descStartTime = titleChars ? titleChars.length * 0.08 + 0.5 : 0.5; // 간격 변경 반영
        descChars.forEach((char, index) => {
          timeline.fromTo(
            char,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: -15,
              duration: 0.5,
              ease: "power1.out",
            },
            descStartTime + index * 0.05 // 간격 늘림: 0.03 -> 0.05
          );

          timeline.to(
            char,
            {
              y: 0,
              duration: 0.6,
              ease: "power1.inOut",
            },
            descStartTime + index * 0.05 + 0.2
          );
        });

        // 3. Tag - 오른쪽에서 왼쪽으로
        const tagStartTime = descStartTime + descChars.length * 0.05 + 0.8; // 간격 변경 반영
        timeline.to(
          tagRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          tagStartTime
        );

        // 4. CTA - 오른쪽에서 왼쪽으로
        timeline.to(
          ctaRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          tagStartTime + 0.3
        );
      }
    }, cardRef);

    return () => {
      ctx.revert();
    };
  }, [isInView, animationDelay, id, isDesktop]);

  // Hover animation - 애니메이션 완료 후에만
  useEffect(() => {
    if (!cardRef.current || !isInView || !animationComplete) return;

    gsap.to(cardRef.current, {
      y: getYOffset(),
      zIndex: getZIndex(),
      duration: isHovered || otherHovered ? 0.6 : 0.5,
      ease: "expo.out",
    });
  }, [isHovered, otherHovered, isInView, isDesktop, animationComplete]);

  return (
    <Link href={href} className="block w-full">
      <div
        ref={cardRef}
        onMouseEnter={() => isDesktop && animationComplete && onHover(id)}
        onMouseLeave={() => isDesktop && animationComplete && onHover(null)}
        className="relative aspect-square w-full md:w-[calc(100%-10px)]"
        style={{ opacity: 0, willChange: "transform, opacity" }}
      >
        <Image src={imageSrc} alt={title} fill className="object-cover" />
        {id === "b2b" && <div className="absolute inset-0 bg-[#003BB1B2]" />}
        <div
          className={`absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-transparent via-transparent ${gradientColor} xl:p-15 p-6 sm:p-10 md:p-12 lg:p-14 2xl:p-16`}
        >
          <div>
            <h3
              ref={titleRef}
              className="mb-4 text-[32px] font-black leading-[35px] text-white sm:mb-[20px] sm:text-[40px] sm:leading-[50px] md:mb-[22px] md:text-[38px] md:leading-[50px] lg:text-[48px] lg:leading-[56px] xl:mb-[24px] xl:text-[56px] xl:leading-[64px] 2xl:mb-[30px] 2xl:text-[64px] 2xl:leading-[70px]"
            >
              {splitTextToSpans(title)}
            </h3>
            <p
              ref={descriptionRef}
              className="text-sm font-medium text-white sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[22px] lg:text-[20px] lg:leading-[24px] xl:text-[22px] xl:leading-[28px] 2xl:text-[25px] 2xl:leading-[32px]"
            >
              {splitTextToSpans(description)}
            </p>
          </div>
          <div>
            <span
              ref={tagRef}
              className={`inline-block rounded-full ${tagBgColor} mb-2 px-3 py-0.5 text-xs font-bold sm:mb-3 sm:px-3 sm:text-[11px] md:mb-3 md:px-3 md:py-0.5 md:text-[11px] lg:text-sm lg:px-4 lg:py-1 xl:px-5 xl:py-1 xl:text-base 2xl:mb-[15px] 2xl:text-lg 2xl:leading-[18px] ${tagTextColor}`}
              style={{ willChange: "transform, opacity" }}
            >
              {tagText}
            </span>
            <p
              ref={ctaRef}
              className="text-sm font-medium text-white sm:text-[16px] sm:leading-[20px] md:text-[18px] md:leading-[22px] lg:text-[20px] lg:leading-[24px] xl:text-[22px] xl:leading-[28px] 2xl:text-[25px] 2xl:leading-[32px]"
              style={{ willChange: "transform, opacity" }}
            >
              {callToAction}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
