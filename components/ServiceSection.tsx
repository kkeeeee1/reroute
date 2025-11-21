"use client";

import { useState } from "react";
import { ServiceCard } from "./ServiceCard";

export function ServiceSection() {
  const [hoveredCard, setHoveredCard] = useState<"b2b" | "b2c" | null>(null);

  const serviceCards = [
    {
      id: "b2b" as const,
      title: "Solution",
      description: "브랜드와 비즈니스의 방향을 재설계합니다",
      tagText: "B2B",
      callToAction: "For Your Business",
      imageSrc: "/images/main/main_service_b2b.jpg",
      href: "/b2b",
      gradientColor: "to-blue-900",
      tagBgColor: "bg-white",
      tagTextColor: "text-blue-900",
    },
    {
      id: "b2c" as const,
      title: "Labs",
      description: "일상의 문제를 실현 가능한 솔루션으로",
      tagText: "B2C",
      callToAction: "For Your Life",
      imageSrc: "/images/main/main_service_b2c.jpg",
      href: "/b2c",
      gradientColor: "to-black",
      tagBgColor: "bg-white",
      tagTextColor: "text-black",
    },
  ];

  return (
    <section className="w-full bg-white px-7 py-16 md:px-10 md:py-24 lg:px-20 lg:py-32">
      <div className="mx-auto flex w-full max-w-screen-max flex-col gap-20">
        {/* Title */}
        <div>
          <h2 className="text-[32px] font-extrabold leading-[40px] text-black sm:text-[36px] sm:leading-[45px] md:text-[40px] md:leading-[50px] lg:text-[56px] lg:leading-[70px]">
            OUR
            <br />
            SERVICE
          </h2>
        </div>

        {/* Service Cards Container - Side by Side */}
        <div className="grid gap-6 md:gap-8 lg:gap-10">
          <div className="flex flex-col gap-6 md:flex-row md:gap-8 lg:gap-10">
            {serviceCards.map((card) => (
              <ServiceCard
                key={card.id}
                id={card.id}
                title={card.title}
                description={card.description}
                tagText={card.tagText}
                callToAction={card.callToAction}
                imageSrc={card.imageSrc}
                href={card.href}
                isHovered={hoveredCard === card.id}
                onHover={setHoveredCard}
                gradientColor={card.gradientColor}
                tagBgColor={card.tagBgColor}
                tagTextColor={card.tagTextColor}
                otherHovered={hoveredCard !== null && hoveredCard !== card.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
