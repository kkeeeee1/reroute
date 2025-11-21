"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ServiceCard } from "./ServiceCard";

export function ServiceSection() {
  const [hoveredCard, setHoveredCard] = useState<"b2b" | "b2c" | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    <section
      ref={sectionRef}
      className="w-full bg-white px-7 py-16 md:px-10 md:py-24 lg:px-20 lg:py-32"
    >
      <div className="mx-auto flex w-full max-w-screen-max flex-col gap-20">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="text-[32px] font-extrabold leading-[40px] text-black sm:text-[36px] sm:leading-[45px] md:text-[40px] md:leading-[50px] lg:text-[56px] lg:leading-[70px]">
            OUR
            <br />
            SERVICE
          </h2>
        </motion.div>

        {/* Service Cards Container - Side by Side */}
        <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
          {serviceCards.map((card, index) => (
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
              isInView={isInView}
              animationDelay={0.2 + index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
