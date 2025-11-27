"use client";

import { urlForImage } from "@/sanity/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface AppListContentProps {
  apps: any[];
}

export function AppListContent({ apps }: AppListContentProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const defaultImage = "/images/default_image.png";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      // Card stagger animation - WhyRerouteSection style
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section>
      <div className="max-w-screen-max mx-auto px-7 md:px-10 lg:px-20 py-16 md:py-20 lg:py-32">
        {/* Our Apps 제목 */}
        <h2
          ref={titleRef}
          className="text-[32px] md:text-[40px] lg:text-[44px] xl:text-[46px] 2xl:text-[48px] leading-tight md:leading-[48px] font-extrabold mb-[50px] md:mb-[70px] lg:mb-[85px] xl:mb-[92px] 2xl:mb-[100px] opacity-0"
        >
          Our Apps
        </h2>

        {/* 앱 그리드 */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] md:gap-[50px] lg:gap-[60px] xl:gap-[65px] 2xl:gap-[70px]"
        >
          {apps?.map((app: (typeof apps)[number]) => {
            const thumbnailUrl = app.thumbnail ? urlForImage(app.thumbnail as any)?.url() : null;
            const imageUrl = (thumbnailUrl || defaultImage) as string;

            return (
              <div key={app.appId} className="opacity-0">
                <Link href={`/b2c/${app.appId}`}>
                  <div className="group flex h-full cursor-pointer flex-col overflow-hidden border border-[#888888] bg-white transition-all duration-300">
                    {/* 이미지 컨테이너 */}
                    <div className="relative aspect-[3/2] overflow-hidden bg-[#141B29]">
                      <Image
                        src={imageUrl}
                        alt={app.name || "리루트 앱"}
                        className="object-cover w-full h-full"
                        height={1000}
                        width={1000}
                      />
                    </div>

                    {/* 콘텐츠 영역 */}
                    <div className="flex flex-col space-y-[10px] md:space-y-[12px] lg:space-y-[13px] xl:space-y-[14px] 2xl:space-y-[15px] px-[25px] md:px-[33px] lg:px-[39px] xl:px-[42px] 2xl:px-[45px] pt-[19px] md:pt-[25px] lg:pt-[30px] xl:pt-[32px] 2xl:pt-[35px] pb-[25px] md:pb-[33px] lg:pb-[39px] xl:pb-[42px] 2xl:pb-[45px]">
                      <h3 className="text-[22px] md:text-[26px] lg:text-[29px] xl:text-[30px] 2xl:text-[32px] font-bold">
                        {app.name}
                      </h3>
                      <p className="text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]">
                        {app.summary}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
