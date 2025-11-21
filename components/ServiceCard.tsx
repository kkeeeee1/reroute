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
}: ServiceCardProps) {
  // 초기 위치: B2B는 0, B2C는 40
  // 호버 시: 호버된 것은 -20, 다른 것은 60
  const yOffset = isHovered ? -20 : otherHovered ? 60 : id === "b2b" ? 0 : 40;
  const zIndex = isHovered ? 20 : id === "b2b" ? 10 : 5;

  return (
    <Link href={href} className="w-full">
      <motion.div
        initial={{ y: id === "b2b" ? 0 : 40, zIndex: id === "b2b" ? 10 : 5 }}
        animate={{
          y: yOffset,
          zIndex,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onMouseEnter={() => onHover(id)}
        onMouseLeave={() => onHover(null)}
        className="relative aspect-square w-[calc(100%-10px)] overflow-hidden"
      >
        <Image src={imageSrc} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-[#003BB1B2]" />
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
