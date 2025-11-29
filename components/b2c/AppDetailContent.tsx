"use client";

import { CustomPortableText } from "@/components/CustomPortableText";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface AppDetailContentProps {
  app: {
    _id: string;
    appId: string;
    name: string;
    summary: string;
    thumbnail?: any;
    content?: any;
    createdAt?: string;
    prevApp?: { appId: string; name: string } | null;
    nextApp?: { appId: string; name: string } | null;
  };
}

export function AppDetailContent({ app }: AppDetailContentProps) {
  const defaultImage = "/images/default_image.png";
  const thumbnailUrl = app.thumbnail ? urlForImage(app.thumbnail as any)?.url() : null;
  const imageUrl = (thumbnailUrl || defaultImage) as string;

  const formattedDate = app.createdAt
    ? new Date(app.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "";

  // Refs for styling
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const dateRef = useRef<HTMLParagraphElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <section>
      <div className="max-w-screen-max px-7 md:px-10 lg:px-20 py-16 md:py-20 lg:py-24 mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] xl:grid-cols-[400px_1fr] gap-12 md:gap-16 xl:gap-20">
        {/* 왼쪽: 썸네일 */}
        <div ref={thumbnailRef} className="relative aspect-[3/2] overflow-hidden bg-[#141B29]">
          <Image
            src={imageUrl}
            alt={app.name || "리루트 앱"}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 오른쪽 */}
        <div>
          <div className="mb-[18px] md:mb-[22px] lg:mb-[25px] xl:mb-[26px] 2xl:mb-[28px]">
            <div className="w-full flex justify-between items-center mb-[14px] md:mb-[17px] lg:mb-[19px] xl:mb-[20px] 2xl:mb-[21px]">
              {/* 앱 이름*/}
              <h1
                ref={titleRef}
                className="text-[36px] md:text-[44px] lg:text-[50px] xl:text-[53px] 2xl:text-[56px] leading-[36px] md:leading-[42px] lg:leading-[45px] xl:leading-[46px] 2xl:leading-[48px] font-extrabold"
              >
                {app.name}
              </h1>

              {/* 뒤로가기 버튼 */}
              <Link
                data-no-cursor
                href="/b2c"
                className="hidden md:block w-[24px] h-[24px] md:w-[28px] md:h-[28px] lg:w-[31px] lg:h-[31px] xl:w-[34px] xl:h-[34px] 2xl:w-[37px] 2xl:h-[37px]"
              >
                <svg
                  className="w-full h-full"
                  viewBox="0 0 37 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_632_1528)">
                    <path
                      d="M18.71 0.349998L0.709961 18.35L18.71 36.35"
                      stroke="#231F20"
                      strokeWidth="3"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M36.71 18.35H0.709961"
                      stroke="#231F20"
                      strokeWidth="3"
                      strokeMiterlimit="10"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_632_1528">
                      <rect width="36.71" height="36.71" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
            {/* 앱 설명 */}
            <p
              ref={summaryRef}
              className="text-[18px] md:text-[22px] lg:text-[25px] xl:text-[26px] 2xl:text-[28px] leading-[28px] md:leading-[38px] lg:leading-[43px] xl:leading-[45px] 2xl:leading-[48px] font-medium mb-[24px] md:mb-[30px] lg:mb-[35px] xl:mb-[37px] 2xl:mb-[39px]"
            >
              {app.summary}
            </p>
            {/* 생성일 */}
            {formattedDate && (
              <p
                ref={dateRef}
                className="text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px] leading-[28px] md:leading-[38px] lg:leading-[43px] xl:leading-[45px] 2xl:leading-[48px] font-medium text-[#999999]"
              >
                {formattedDate}
              </p>
            )}
          </div>

          <div ref={introRef}>
            <div className="border-b-[2px] md:border-b-[2.5px] lg:border-b-[2.75px] xl:border-b-[2.85px] 2xl:border-b-[3px] border-black px-[24px] md:px-[30px] lg:px-[34px] xl:px-[36px] 2xl:px-[36px] py-[8px] md:py-[10px] lg:py-[11px] xl:py-[11.5px] 2xl:py-[12px] w-fit">
              <h2 className="text-[18px] md:text-[21px] lg:text-[23px] xl:text-[24px] 2xl:text-[26px] leading-[28px] md:leading-[33px] lg:leading-[37px] xl:leading-[38px] 2xl:leading-[40px] font-bold">
                소개
              </h2>
            </div>
            {/* 선 */}
            <div className="border-t border-black mb-[30px] md:mb-[38px] lg:mb-[44px] xl:mb-[47px] 2xl:mb-[50px]" />

            {/* 콘텐츠 */}
            {app.content && (
              <div className="max-w-none [&>p]:mb-4">
                <CustomPortableText
                  id={app._id}
                  type="app"
                  path={[]}
                  paragraphClasses="text-base md:text-lg leading-relaxed text-black"
                  value={app.content as any}
                />
              </div>
            )}
          </div>

          {/* 선 */}
          <div className="border-t border-black mt-[80px] md:mt-[100px] lg:mt-[120px] xl:tab-[130px] 2xl:mt-[140px] mb-[40px] md:mb-[52px] lg:tab-[61px] xl:mb-[65px] 2xl:mb-[70px]" />

          {/* 이전글/다음글 버튼 */}
          <div
            ref={navRef}
            className="flex items-center justify-center gap-[12px] md:gap-[15px] lg:gap-[17px] xl:gap-[18px] 2xl:gap-[20px]"
          >
            {/* 이전글 버튼 */}
            <div className="group flex flex-col items-center">
              {app.prevApp ? (
                <Link
                  href={`/b2c/${app.prevApp.appId}`}
                  data-no-cursor
                  className="inline-flex pb-2 items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-19 xl:h-19 2xl:w-20 2xl:h-20 rounded-full border border-black transition-colors"
                >
                  <svg
                    width="45"
                    height="20"
                    viewBox="0 0 45 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M44.6162 17.3679H4.61621L19.6162 1.36792"
                      stroke="black"
                      strokeWidth="4"
                      strokeMiterlimit="10"
                    />
                  </svg>
                </Link>
              ) : (
                <div className="inline-flex pb-2 items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-19 xl:h-19 2xl:w-20 2xl:h-20 rounded-full border border-[#888888]">
                  <svg
                    width="45"
                    height="20"
                    viewBox="0 0 45 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M44.6162 17.3679H4.61621L19.6162 1.36792"
                      stroke="#888888"
                      strokeWidth="4"
                      strokeMiterlimit="10"
                    />
                  </svg>
                </div>
              )}

              {/* 호버 텍스트 (데스크탑만) */}
              <p
                className={`hidden text-center md:block opacity-0 group-hover:opacity-100 transition-opacity mt-[8px] md:mt-[9px] lg:mt-[10px] xl:mt-[10.5px] 2xl:mt-[11px] text-[11px] md:text-[12px] lg:text-[13px] xl:text-[13.5px] 2xl:text-[14px] font-bold uppercase tracking-wider ${app.prevApp ? "text-black" : "text-[#888888]"}`}
              >
                Previous <br /> Project
              </p>
            </div>

            {/* 다음글 버튼 */}
            <div className="group flex flex-col items-center">
              {app.nextApp ? (
                <Link
                  href={`/b2c/${app.nextApp.appId}`}
                  data-no-cursor
                  className="inline-flex pb-2 items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-19 xl:h-19 2xl:w-20 2xl:h-20 rounded-full border border-black transition-colors"
                >
                  <svg
                    width="45"
                    height="20"
                    viewBox="0 0 45 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 17.3679H40L25 1.36792"
                      stroke="black"
                      strokeWidth="4"
                      strokeMiterlimit="10"
                    />
                  </svg>
                </Link>
              ) : (
                <div className="inline-flex pb-2 items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-19 xl:h-19 2xl:w-20 2xl:h-20 rounded-full border border-[#888888]">
                  <svg
                    width="45"
                    height="20"
                    viewBox="0 0 45 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 17.3679H40L25 1.36792"
                      stroke="#888888"
                      strokeWidth="4"
                      strokeMiterlimit="10"
                    />
                  </svg>
                </div>
              )}

              {/* 호버 텍스트 (데스크탑만) */}
              <p
                className={`hidden text-center md:block opacity-0 group-hover:opacity-100 transition-opacity mt-[8px] md:mt-[9px] lg:mt-[10px] xl:mt-[10.5px] 2xl:mt-[11px] text-[11px] md:text-[12px] lg:text-[13px] xl:text-[13.5px] 2xl:text-[14px] font-bold uppercase tracking-wider ${app.nextApp ? "text-black" : "text-[#888888]"}`}
              >
                Next
                <br />
                Project
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
