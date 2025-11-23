"use client";

import { useRef, useEffect, useState, Fragment } from "react";
import Image from "next/image";
import { Inria_Serif, Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["600"],
  style: "italic",
});

const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  weight: ["700"],
  style: "italic",
});

export function MarqueeText() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let frame = 0;
    const speed = 1.2;

    const step = () => {
      setOffset((prev) => {
        let newOffset = prev - speed;

        // 컨테이너 너비를 기반으로 무한루프 계산
        if (containerRef.current) {
          const containerWidth = containerRef.current.scrollWidth;
          const visibleWidth = containerRef.current.clientWidth;

          // 전체 콘텐츠가 왼쪽으로 나가면 처음부터 시작
          if (Math.abs(newOffset) >= containerWidth - visibleWidth) {
            newOffset = 0;
          }
        }

        return newOffset;
      });

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="w-full overflow-hidden py-8 sm:py-12 md:py-20 lg:py-24 xl:py-28 2xl:py-32">
      <div
        ref={containerRef}
        className="flex items-center gap-4 whitespace-nowrap sm:gap-6 md:gap-8 lg:gap-10"
        style={{
          transform: `translateX(${offset}px)`,
          transition: "transform 0.016s linear",
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Fragment key={i}>
            <span
              className={`${inter.className} shrink-0 text-[48px] font-semibold text-black sm:text-[64px] md:text-[96px] lg:text-[128px] xl:text-[140px] 2xl:text-[160px]`}
            >
              We don't just solve problems
            </span>
            <span
              className={`${inter.className} shrink-0 text-[48px] font-semibold text-black sm:text-[64px] md:text-[96px] lg:text-[128px] xl:text-[140px] 2xl:text-[160px]`}
            >
              We
            </span>
            <span
              className={`${inriaSerif.className} shrink-0 text-[48px] font-bold text-black sm:text-[64px] md:text-[96px] lg:text-[128px] xl:text-[140px] 2xl:text-[160px]`}
            >
              Reroute
            </span>
            <span
              className={`${inter.className} shrink-0 text-[48px] font-semibold text-black sm:text-[64px] md:text-[96px] lg:text-[128px] xl:text-[140px] 2xl:text-[160px]`}
            >
              them
            </span>
            <Image
              src="/images/logo_main.png"
              alt="Reroute Logo"
              width={153}
              height={50}
              className="w-[120px] shrink-0 object-contain md:w-[140px] lg:w-[210px] xl:w-[300px] 2xl:w-[451px]"
            />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
