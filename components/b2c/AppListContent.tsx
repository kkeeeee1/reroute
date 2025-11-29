"use client";

import { urlForImage } from "@/sanity/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

interface AppListContentProps {
  apps: any[];
  totalCount?: number;
}

export function AppListContent({ apps: initialApps, totalCount = 0 }: AppListContentProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const defaultImage = "/images/default_image.png";

  const [loadedApps, setLoadedApps] = useState<any[]>(initialApps || []);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(totalCount ? initialApps.length < totalCount : true);
  const initializedRef = useRef(false);

  // 초기 애니메이션 (제목 + 첫 카드들) - 초기 로드만
  useEffect(() => {
    if (initializedRef.current || !titleRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation - ScrollTrigger 없이 즉시 시작
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Card stagger animation - ScrollTrigger 없이 즉시 시작
      const cards = Array.from(gridRef.current!.querySelectorAll(".app-card"));
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }
    });

    initializedRef.current = true;
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
      ctx.revert();
    };
  }, []);

  // 더 많은 앱 로드
  const loadMoreApps = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const url = `/api/apps?skip=${loadedApps.length}&limit=12`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setLoadedApps((prev) => [...prev, ...result.data]);
        setHasMore(result.hasMore);
      } else {
        console.error("Invalid API response:", result);
      }
    } catch (error) {
      console.error("앱 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="max-w-screen-max mx-auto px-7 md:px-10 lg:px-20 py-16 md:py-20 lg:py-32">
        {/* Our Apps 제목 */}
        <h2
          ref={titleRef}
          className="text-[32px] md:text-[40px] lg:text-[44px] xl:text-[46px] 2xl:text-[48px] leading-tight md:leading-[48px] font-extrabold mb-[50px] md:mb-[70px] lg:mb-[85px] xl:mb-[92px] 2xl:mb-[100px]"
        >
          Our Apps
        </h2>

        {/* 빈 리스트 메시지 */}
        {loadedApps.length === 0 ? (
          <div className="flex items-center justify-center py-20 md:py-32">
            <div className="text-center">
              <div className="mb-6 md:mb-8 flex justify-center">
                <div className="w-[60px] md:w-[80px] h-[60px] md:h-[80px] rounded-full border-2 md:border-[2.5px] border-[#E0E0E0] flex items-center justify-center">
                  <div className="w-[40px] md:w-[55px] h-[40px] md:h-[55px] rounded-full border-2 md:border-[2.5px] border-[#999999] border-t-[#231F20] animate-spin" />
                </div>
              </div>
              <p className="text-[18px] md:text-[20px] lg:text-[22px] text-[#231F20] font-bold mb-2">
                Coming Soon
              </p>
              <p className="text-[14px] md:text-[16px] lg:text-[18px] text-[#999999] max-w-[300px] md:max-w-[400px]">
                더 많은 혁신적인 앱들이 곧 공개됩니다.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* 앱 그리드 */}
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] md:gap-[50px] lg:gap-[60px] xl:gap-[65px] 2xl:gap-[70px]"
            >
              {loadedApps?.map((app: any) => {
                const thumbnailUrl = app.thumbnail
                  ? urlForImage(app.thumbnail as any)?.url()
                  : null;
                const imageUrl = (thumbnailUrl || defaultImage) as string;

                return (
                  <div key={app.appId} className="app-card">
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
                        <div className="flex flex-col space-y-[10px] md:space-y-[12px] lg:space-y-[13px] xl:space-y-[14px] 2xl:space-y-[15px] px-[20px] md:px-[29px] lg:px-[34px] xl:px-[37px] 2xl:px-[40px] pt-[19px] md:pt-[25px] lg:pt-[30px] xl:pt-[32px] 2xl:pt-[35px] pb-[25px] md:pb-[33px] lg:pb-[39px] xl:pb-[42px] 2xl:pb-[45px]">
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

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-12 md:mt-16 lg:mt-20">
                <button
                  data-no-cursor
                  onClick={loadMoreApps}
                  disabled={isLoading}
                  className="border md:border-2 border-black px-5 py-2 md:px-7 md:py-3.5 xl:px-8 xl:py-4 text-[14px] md:text-[18px] xl:text-[20px] font-bold leading-[28px] md:leading-[36px] xl:leading-[40px] hover:bg-black hover:text-white transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
