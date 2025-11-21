"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ABOUT_SECTION } from "../constants";

export function AboutSection() {
  const [isInView, setIsInView] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Show image after 1 second
          const timer = setTimeout(() => {
            setShowImage(true);
          }, 1000);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`w-full bg-navy ${ABOUT_SECTION.sectionPadding}`}
    >
      <div className="mx-auto flex w-full max-w-screen-max flex-col">
        {/* WE REROUTE Header */}
        <div className="flex flex-col items-center">
          {/* WE and REROUTE with line */}
          <div className={`flex flex-wrap items-center justify-center ${ABOUT_SECTION.lineGap.sm} ${ABOUT_SECTION.lineGap.md} ${ABOUT_SECTION.lineGap.lg}`}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-white ${ABOUT_SECTION.heading.sm} ${ABOUT_SECTION.heading.md} ${ABOUT_SECTION.heading.lg}`}
            >
              WE
            </motion.h2>

            {/* Animated Line */}
            <motion.div
              initial={{ width: "100%", height: "1px" }}
              animate={
                isInView && showImage
                  ? { width: 0, height: 0, opacity: 0 }
                  : { width: "100%", height: "1px", opacity: 1 }
              }
              transition={{ duration: 0.8, delay: 1.2 }}
              className="bg-white lg:min-w-[120px]"
            />

            {/* Image appears in place of line */}
            {showImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-[60px] w-[120px] md:h-[80px] md:w-[160px] lg:h-[200px] lg:w-[400px]"
              >
                <Image
                  src="/images/main/main_we_reroute.png"
                  alt="We Reroute"
                  fill
                  className="object-contain"
                />
              </motion.div>
            )}

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`text-white ${ABOUT_SECTION.heading.sm} ${ABOUT_SECTION.heading.md} ${ABOUT_SECTION.heading.lg}`}
            >
              REROUTE
            </motion.h2>
          </div>

          {/* Description Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ marginTop: "clamp(40px, 8vw, 84px)" }}
            className={`w-full text-center text-white ${ABOUT_SECTION.description.sm} ${ABOUT_SECTION.description.md} ${ABOUT_SECTION.description.lg}`}
          >
            리루트는 기업의 복잡한 문제와 기존 방식에 갇힌 조직을 진단하고,
            전략부터 실행까지 한 흐름으로 연결합니다. 통합 운영관리, 브랜딩 &
            고객 경험 설계, 통합 마케팅, 맞춤형 플랫폼 개발까지 브랜드와
            비즈니스가 본질에 집중하며 나아갈 수 있는 구조를 완성합니다.
          </motion.p>

          {/* VIEW MORE Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 md:mt-20 lg:mt-28"
          >
            <Link
              href="/about"
              className={`text-white transition-opacity duration-300 hover:opacity-70 ${ABOUT_SECTION.viewMore.sm} ${ABOUT_SECTION.viewMore.md} ${ABOUT_SECTION.viewMore.lg}`}
            >
              VIEW MORE
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
