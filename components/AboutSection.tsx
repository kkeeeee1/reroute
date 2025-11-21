"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function AboutSection() {
  const [isInView, setIsInView] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // 1초 뒤 이미지 보여주기
          const timer = setTimeout(() => {
            setShowImage(true);
          }, 1000);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-navy">
      <div className="mx-auto flex w-full max-w-screen-max flex-col gap-12 px-7 py-16 md:gap-20 md:px-10 md:py-24 lg:gap-40 lg:px-20 lg:py-32">
        <div className="flex flex-col gap-7 md:gap-10 lg:gap-12">
          {/* WE and REROUTE with line */}
          <div className="flex flex-col items-center md:flex-row md:items-center md:gap-3 lg:gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="shrink-0 text-[32px] font-extrabold text-white sm:text-[36px] md:text-[40px] lg:text-[56px]"
            >
              WE
            </motion.h2>

            {/* Animated Line or Image */}
            <div className="relative flex h-[60px] w-[120px] shrink-0 items-center justify-center md:h-[60px] md:w-[150px] lg:h-[140px] lg:w-[240px]">
              {/* Line - animates with fade-in and scale */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={
                  isInView
                    ? { opacity: 1, scaleX: 1 }
                    : { opacity: 0, scaleX: 0 }
                }
                transition={
                  isInView
                    ? { duration: 0.6, delay: 0.3, ease: "easeOut" }
                    : { duration: 0 }
                }
                className="absolute h-[1px] w-full origin-center bg-white"
              />

              {/* Image - expands from center, overlays the line */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={
                  showImage
                    ? { scaleY: 1, opacity: 1 }
                    : { scaleY: 0, opacity: 0 }
                }
                transition={
                  showImage
                    ? { duration: 0.4, delay: 0.5, ease: "easeInOut" }
                    : { duration: 0 }
                }
                className="relative z-10 h-full w-full origin-center"
              >
                <Image
                  src="/images/main/main_we_reroute.png"
                  alt="We Reroute"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="shrink-0 text-[32px] font-extrabold text-white sm:text-[36px] md:text-[40px] lg:text-[56px]"
            >
              REROUTE
            </motion.h2>
          </div>

          {/* Description Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[16px] font-normal leading-[24px] text-white md:text-[20px] md:leading-[30px] lg:text-[40px] lg:leading-[58px] xl:whitespace-pre-wrap"
          >
            리루트는 기업의 복잡한 문제와 기존 방식에 갇힌 조직을 진단하고,
            {"\n"}
            전략부터 실행까지 한 흐름으로 연결합니다. 통합 운영관리, 브랜딩 &
            {"\n"}
            고객 경험 설계, 통합 마케팅, 맞춤형 플랫폼 개발까지 브랜드와{"\n"}
            비즈니스가 본질에 집중하며 나아갈 수 있는 구조를 완성합니다.
          </motion.p>
        </div>

        {/* VIEW MORE Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link
            href="/about"
            className="text-[18px] font-bold leading-[100%] text-white transition-opacity duration-300 hover:opacity-70 md:text-[20px] lg:text-[28px]"
          >
            VIEW MORE
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
