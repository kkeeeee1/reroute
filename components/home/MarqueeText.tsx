"use client";

import { useRef, useLayoutEffect, useState, Fragment } from "react";
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
  const offsetRef = useRef(0);
  const containerWidthRef = useRef(0);
  const visibleWidthRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 감지
  useLayoutEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // 마퀴 애니메이션 (데스크톱만)
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;

    // 초기 크기 측정
    containerWidthRef.current = container.scrollWidth;
    visibleWidthRef.current = container.clientWidth;

    let frameId: number;
    const speed = 0.5;

    const animate = () => {
      offsetRef.current -= speed;

      // 무한 루프 처리
      if (
        Math.abs(offsetRef.current) >=
        containerWidthRef.current - visibleWidthRef.current
      ) {
        offsetRef.current = 0;
      }

      // DOM 직접 조작 (리렌더링 없음)
      container.style.transform = `translateX(${offsetRef.current}px)`;
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    // 리사이즈 감지
    const resizeObserver = new ResizeObserver(() => {
      containerWidthRef.current = container.scrollWidth;
      visibleWidthRef.current = container.clientWidth;
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [isMobile]);

  // 모바일 레이아웃
  if (isMobile) {
    return (
      <section className="w-full px-4 py-12">
        <div className="space-y-6">
          <div className="space-y-3">
            <p
              className={`${inter.className} text-xl font-semibold leading-tight text-black`}
            >
              We don't just solve problems
            </p>
            <div className="flex items-center gap-3">
              <p className={`${inter.className} text-xl font-semibold text-black`}>
                We
              </p>
              <p
                className={`${inriaSerif.className} text-2xl font-bold text-black`}
              >
                Reroute
              </p>
              <p className={`${inter.className} text-xl font-semibold text-black`}>
                them
              </p>
            </div>
          </div>
          <div className="flex justify-center pt-4">
            <Image
              src="/images/logo_main.png"
              alt="Reroute Logo"
              width={153}
              height={50}
              className="h-auto w-24 object-contain"
            />
          </div>
        </div>
      </section>
    );
  }

  // 데스크톱 마퀴 레이아웃
  return (
    <section className="w-full overflow-hidden py-8 sm:py-12 md:py-20 lg:py-24 xl:py-28 2xl:py-32">
      <div
        ref={containerRef}
        className="flex items-center gap-4 whitespace-nowrap sm:gap-6 md:gap-8 lg:gap-10"
        style={{
          willChange: "transform",
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
