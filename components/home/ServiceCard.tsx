"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

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
  const [isDesktop, setIsDesktop] = useState(false);

  // 데스크탑 감지 (md breakpoint = 768px)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

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

  // Initial animation when isInView changes
  useEffect(() => {
    if (!isInView || !cardRef.current) return;

    const anim = gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: getYOffset(),
        zIndex: getZIndex(),
        duration: 0.5,
        delay: animationDelay,
        ease: "expo.out",
      },
    );

    return () => {
      anim.kill();
    };
  }, [isInView, animationDelay, isDesktop]);

  // Hover animation
  useEffect(() => {
    if (!cardRef.current || !isInView) return;

    gsap.to(cardRef.current, {
      y: getYOffset(),
      zIndex: getZIndex(),
      duration: isHovered || otherHovered ? 0.6 : 0.5,
      ease: "expo.out",
    });
  }, [isHovered, otherHovered, isInView, isDesktop]);

  return (
    <Link href={href} className="block w-full">
      <div
        ref={cardRef}
        onMouseEnter={() => isDesktop && onHover(id)}
        onMouseLeave={() => isDesktop && onHover(null)}
        className="relative aspect-square w-full md:w-[calc(100%-10px)]"
        style={{ opacity: 0, willChange: "transform, opacity" }}
      >
        <Image src={imageSrc} alt={title} fill className="object-cover" />
        {id === "b2b" && <div className="absolute inset-0 bg-[#003BB1B2]" />}
        <div
          className={`absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-transparent via-transparent ${gradientColor} xl:p-15 p-6 sm:p-10 md:p-12 lg:p-14 2xl:p-16`}
        >
          <div>
            <h3 className="mb-4 text-[32px] font-black leading-[40px] text-white sm:mb-[25px] sm:text-[50px] sm:leading-[62px] md:mb-[20px] md:text-[45px] md:leading-[60px] lg:text-[55px] lg:leading-[65px] xl:mb-[28px] xl:text-[65px] xl:leading-[72px] 2xl:mb-[43px] 2xl:text-[80px] 2xl:leading-[70px]">
              {title}
            </h3>
            <p className="text-base font-medium leading-[18px] text-white sm:text-[24px] sm:leading-[30px] md:text-[18px] md:leading-[26px] lg:text-[20px] lg:leading-[32px] xl:text-[22px] xl:leading-[35px] 2xl:text-[32px] 2xl:leading-[70px]">
              {description}
            </p>
          </div>
          <div>
            <span
              className={`inline-block rounded-full ${tagBgColor} mb-2 px-3 py-0.5 text-xs font-bold sm:mb-5 sm:px-4 sm:text-base md:mb-4 md:px-5 md:py-1 md:text-base lg:text-lg xl:px-5 xl:py-1 xl:text-xl 2xl:mb-[30px] 2xl:py-2 2xl:text-[32px] 2xl:leading-[30px] ${tagTextColor}`}
            >
              {tagText}
            </span>
            <p className="text-sm font-medium text-white sm:text-[20px] md:text-[22px] md:leading-[30px] lg:text-[22px] lg:leading-[32px] xl:text-[26px] xl:leading-[40px] 2xl:text-[40px] 2xl:leading-[40px]">
              {callToAction}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
