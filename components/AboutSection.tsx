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
      className="w-full bg-navy px-5 py-16 md:px-10 md:py-20 lg:px-20 lg:py-28"
    >
      <div className="mx-auto flex w-full max-w-screen-max flex-col">
        <div className="flex flex-col">
          {/* WE and REROUTE with line */}
          <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[40px] font-extrabold leading-[40px] text-white md:text-[60px] md:leading-[60px] lg:text-[140px] lg:leading-[140px]"
            >
              WE
            </motion.h2>

            {/* Animated Line or Image */}
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ width: "40px", height: "1px" }}
                animate={
                  isInView && showImage
                    ? { width: 0, height: 0, opacity: 0 }
                    : { width: "40px", height: "1px", opacity: 1 }
                }
                transition={{ duration: 0.6, delay: 1.2 }}
                className="bg-white"
              />

              {showImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-[40px] w-[80px] md:h-[60px] md:w-[120px] lg:h-[140px] lg:w-[280px]"
                >
                  <Image
                    src="/images/main/main_we_reroute.png"
                    alt="We Reroute"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              )}
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[40px] font-extrabold leading-[40px] text-white md:text-[60px] md:leading-[60px] lg:text-[140px] lg:leading-[140px]"
            >
              REROUTE
            </motion.h2>
          </div>

          {/* Description Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 md:mt-20 lg:mt-24 text-[16px] font-normal leading-[24px] text-white md:text-[20px] md:leading-[30px] lg:text-[24px] lg:leading-[36px]"
          >
            리루트는 기업의 복잡한 문제와 기존 방식에 갇힌 조직을 진단하고,<br />
            전략부터 실행까지 한 흐름으로 연결합니다. 통합 운영관리, 브랜딩 &<br />
            고객 경험 설계, 통합 마케팅, 맞춤형 플랫폼 개발까지 브랜드와<br />
            비즈니스가 본질에 집중하며 나아갈 수 있는 구조를 완성합니다.
          </motion.p>

          {/* VIEW MORE Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-auto pt-8 md:pt-12 lg:pt-16"
          >
            <Link
              href="/about"
              className="text-[18px] font-bold leading-[100%] text-white transition-opacity duration-300 hover:opacity-70 md:text-[20px] lg:text-[24px]"
            >
              VIEW MORE
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
