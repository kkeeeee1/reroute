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
  // 호버 시: 호버된 것은 -20, 다른 것은 60
  const getYOffset = () => {
    if (isHovered) return -20;
    if (otherHovered) return 60;
    return id === "b2b" ? 0 : 40;
  };

  const getZIndex = () => {
    if (isHovered) return 20;
    return id === "b2b" ? 10 : 5;
  };

  return (
    <Link href={href} className="h-full w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: getYOffset(), zIndex: getZIndex() } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: animationDelay, ease: "easeOut" }}
        onMouseEnter={() => onHover(id)}
        onMouseLeave={() => onHover(null)}
        className="relative aspect-square h-full w-[calc(100%-10px)] overflow-hidden"
      >
        <Image src={imageSrc} alt={title} fill className="object-cover" />
        {id === "b2b" && <div className="absolute inset-0 bg-[#003BB1B2]" />}
        <div
          className={`absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-transparent via-transparent ${gradientColor} p-8 md:p-12 lg:p-16`}
        >
          <div>
            <h3 className="mb-10 text-[48px] font-black leading-[56px] text-white md:text-[56px] md:leading-[70px] lg:text-[80px] lg:leading-[70px]">
              {title}
            </h3>
            <p className="text-[14px] font-medium leading-[20px] text-white md:text-[32px] md:leading-[70px]">
              {description}
            </p>
          </div>
          <div>
            <span
              className={`inline-block rounded-full ${tagBgColor} mb-[30px] px-5 py-2 text-sm font-bold ${tagTextColor} md:text-[32px] md:leading-[30px]`}
            >
              {tagText}
            </span>
            <p className="text-xl font-medium text-white md:text-[40px] md:leading-[40px]">
              {callToAction}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
