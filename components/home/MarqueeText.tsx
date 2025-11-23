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
    const speed = 0.5;
    let singleSetWidth = 0;

    // 한 세트의 실제 너비를 계산 (컴포넌트 마운트 후)
    const calculateSetWidth = () => {
      if (containerRef.current) {
        const children = containerRef.current.children;
        const itemsPerSet = 5; // 4개 텍스트 span + 1개 이미지
        
        if (children.length >= itemsPerSet) {
          let totalWidth = 0;
          const gapStyle = window.getComputedStyle(containerRef.current).gap;
          const gap = parseFloat(gapStyle) || 0;
          
          // 첫 번째 세트의 너비를 계산
          for (let i = 0; i < itemsPerSet; i++) {
            const child = children[i] as HTMLElement;
            totalWidth += child.offsetWidth;
            // gap 추가 (마지막 요소 제외)
            if (i < itemsPerSet - 1) {
              totalWidth += gap;
            }
          }
          
          singleSetWidth = totalWidth;
        }
      }
    };

    // DOM이 렌더링된 후 너비 계산
    setTimeout(calculateSetWidth, 100);

    const step = () => {
      setOffset((prev) => {
        let newOffset = prev - speed;

        // 한 세트가 완전히 지나가면 리셋
        if (singleSetWidth > 0 && Math.abs(newOffset) >= singleSetWidth) {
          newOffset = newOffset + singleSetWidth;
        }

        return newOffset;
      });

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="w-full py-8 sm:py-12 md:py-20 lg:py-24 xl:py-28 2xl:py-32">
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
