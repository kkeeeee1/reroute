"use client";

import { motion } from "framer-motion";
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
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

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

  return (
    <Link href={href} className="block w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={
          isInView
            ? { opacity: 1, y: getYOffset(), zIndex: getZIndex() }
            : { opacity: 0, y: 30 }
        }
        transition={{
          duration: isHovered || otherHovered ? 0.6 : 0.5,
          delay: animationDelay,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        onMouseEnter={() => isDesktop && onHover(id)}
        onMouseLeave={() => isDesktop && onHover(null)}
        className="relative aspect-square w-full md:w-[calc(100%-10px)]"
      >
        <Image src={imageSrc} alt={title} fill className="object-cover" />
        {id === "b2b" && <div className="absolute inset-0 bg-[#003BB1B2]" />}
        <div
          className={`absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-transparent via-transparent ${gradientColor} p-6 sm:p-6 md:p-12 lg:p-14 xl:p-16 2xl:p-20`}
        >
          <div>
            <h3 className="mb-4 text-[32px] font-black leading-[40px] text-white sm:mb-6 sm:text-[40px] sm:leading-[48px] md:mb-10 md:text-[56px] md:leading-[70px] lg:text-[64px] lg:leading-[75px] xl:text-[72px] xl:leading-[80px] 2xl:text-[96px] 2xl:leading-[100px]">
              {title}
            </h3>
            <p className="text-base font-medium leading-[18px] text-white sm:text-xl sm:leading-[22px] md:text-[28px] md:leading-[40px] lg:text-[32px] lg:leading-[50px] xl:text-[40px] xl:leading-[60px] 2xl:text-[48px] 2xl:leading-[70px]">
              {description}
            </p>
          </div>
          <div>
            <span
              className={`inline-block rounded-full ${tagBgColor} mb-2 px-3 py-1 text-xs font-bold sm:mb-[20px] sm:px-4 sm:py-2 sm:text-sm md:mb-[30px] md:px-5 md:py-2 md:text-lg lg:mb-8 lg:px-6 lg:py-3 lg:text-xl xl:mb-10 xl:px-7 xl:py-3 xl:text-2xl 2xl:mb-12 2xl:px-8 2xl:py-4 2xl:text-[32px] 2xl:leading-[30px] ${tagTextColor}`}
            >
              {tagText}
            </span>
            <p className="text-sm font-medium text-white sm:text-base md:text-[32px] md:leading-[40px] lg:text-[40px] lg:leading-[50px] xl:text-[48px] xl:leading-[60px] 2xl:text-[56px] 2xl:leading-[70px]">
              {callToAction}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
