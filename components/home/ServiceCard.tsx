import { useIsDesktop } from "@/hooks/useIsDesktop";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

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
  const isDesktop = useIsDesktop();

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
      }
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
            <h3 className="mb-4 text-[32px] font-black leading-[35px] text-white sm:mb-[20px] sm:text-[40px] sm:leading-[50px] md:mb-[22px] md:text-[38px] md:leading-[50px] lg:text-[48px] lg:leading-[56px] xl:mb-[24px] xl:text-[56px] xl:leading-[64px] 2xl:mb-[30px] 2xl:text-[64px] 2xl:leading-[70px]">
              {title}
            </h3>
            <p className="text-sm font-medium text-white sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[22px] lg:text-[20px] lg:leading-[24px] xl:text-[22px] xl:leading-[28px] 2xl:text-[25px] 2xl:leading-[32px]">
              {description}
            </p>
          </div>
          <div>
            <span
              className={`inline-block rounded-full ${tagBgColor} mb-2 px-3 py-0.5 text-xs font-bold sm:mb-3 sm:px-3 sm:text-[11px] md:mb-3 md:px-3 md:py-0.5 md:text-[11px] lg:text-sm lg:px-4 lg:py-1 xl:px-5 xl:py-1 xl:text-base 2xl:mb-[15px] 2xl:text-lg 2xl:leading-[18px] ${tagTextColor}`}
            >
              {tagText}
            </span>
            <p className="text-sm font-medium text-white sm:text-[16px] sm:leading-[20px] md:text-[18px] md:leading-[22px] lg:text-[20px] lg:leading-[24px] xl:text-[22px] xl:leading-[28px] 2xl:text-[25px] 2xl:leading-[32px]">
              {callToAction}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
