"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function ServiceSection() {
  const [hoveredCard, setHoveredCard] = useState<"b2b" | "b2c" | null>(null);

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

        {/* Service Cards Container */}
        <div className="relative h-[500px] md:h-[600px]">
          {/* B2B Card */}
          <motion.div
            initial={{ y: 0, zIndex: 10 }}
            animate={{
              y: hoveredCard === "b2c" ? 40 : 0,
              zIndex: hoveredCard === "b2b" ? 20 : 10,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onMouseEnter={() => setHoveredCard("b2b")}
            onMouseLeave={() => setHoveredCard(null)}
            className="absolute inset-0 w-full cursor-pointer overflow-hidden rounded-lg"
          >
            <Image
              src="/images/main/main_service_b2b.jpg"
              alt="B2B Solution"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-transparent to-blue-900 p-8 md:p-12">
              <div>
                <span className="inline-block rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-900 md:text-base">
                  B2B
                </span>
              </div>
              <div>
                <h3 className="mb-3 text-[40px] font-extrabold leading-[50px] text-white md:text-[56px] md:leading-[70px] lg:text-[80px] lg:leading-[100px]">
                  Solution
                </h3>
                <p className="text-[16px] font-medium leading-[24px] text-white md:text-[20px] md:leading-[30px]">
                  브랜드와 비즈니스의 방향을 재설계합니다
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-white md:text-base">
                  For Your Business
                </p>
              </div>
            </div>
          </motion.div>

          {/* B2C Card */}
          <motion.div
            initial={{ y: 40, zIndex: 5 }}
            animate={{
              y: hoveredCard === "b2b" ? 80 : 40,
              zIndex: hoveredCard === "b2c" ? 20 : 5,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onMouseEnter={() => setHoveredCard("b2c")}
            onMouseLeave={() => setHoveredCard(null)}
            className="absolute inset-0 w-full cursor-pointer overflow-hidden rounded-lg"
          >
            <Image
              src="/images/main/main_service_b2c.jpg"
              alt="B2C Labs"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-transparent to-black p-8 md:p-12">
              <div>
                <span className="inline-block rounded-full bg-white px-4 py-2 text-sm font-bold text-black md:text-base">
                  B2C
                </span>
              </div>
              <div>
                <h3 className="mb-3 text-[40px] font-extrabold leading-[50px] text-white md:text-[56px] md:leading-[70px] lg:text-[80px] lg:leading-[100px]">
                  Labs
                </h3>
                <p className="text-[16px] font-medium leading-[24px] text-white md:text-[20px] md:leading-[30px]">
                  일상의 문제를 실현 가능한 솔루션으로
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-white md:text-base">
                  For Your Life
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
