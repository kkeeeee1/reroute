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
  const yOffset = otherHovered ? (id === "b2b" ? 40 : 80) : id === "b2b" ? 0 : 40;
  const zIndex = isHovered ? 20 : id === "b2b" ? 10 : 5;

  return (
    <Link href={href}>
      <motion.div
        initial={{ y: id === "b2b" ? 0 : 40, zIndex: id === "b2b" ? 10 : 5 }}
        animate={{
          y: yOffset,
          zIndex,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onMouseEnter={() => onHover(id)}
        onMouseLeave={() => onHover(null)}
        className="relative h-[400px] w-full flex-1 cursor-pointer overflow-hidden rounded-lg md:h-[500px]"
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
        <div className={`absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-transparent via-transparent ${gradientColor} p-8 md:p-12 lg:p-16`}>
          <div>
            <h3 className="mb-4 text-[48px] font-extrabold leading-[56px] text-white md:text-[56px] md:leading-[70px] lg:text-[80px] lg:leading-[100px]">
              {title}
            </h3>
            <p className="text-[14px] font-medium leading-[20px] text-white md:text-[16px] md:leading-[24px]">
              {description}
            </p>
          </div>
          <div>
            <div>
              <span className={`inline-block rounded-full ${tagBgColor} px-4 py-1 text-sm font-bold ${tagTextColor} md:text-base`}>
                {tagText}
              </span>
            </div>
            <p className="text-[14px] font-medium text-white md:text-[16px]">
              {callToAction}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
