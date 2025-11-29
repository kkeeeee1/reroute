"use client";

import { CustomPortableText } from "@/components/CustomPortableText";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface WorkDetailContentProps {
  work: {
    _id: string;
    workId: string;
    name: string;
    summary: string;
    thumbnail?: any;
    content?: any;
    startDate?: string;
    endDate?: string;
    roles?: string[];
    createdAt?: string;
    prevWork?: { workId: string; name: string } | null;
    nextWork?: { workId: string; name: string } | null;
  };
}

export function WorkDetailContent({ work }: WorkDetailContentProps) {
  const defaultImage = "/images/default_image.png";
  const thumbnailUrl = work.thumbnail ? urlForImage(work.thumbnail as any)?.url() : null;
  const imageUrl = (thumbnailUrl || defaultImage) as string;

  // 날짜 포맷팅 (YYYY-MM 형식)
  const formatDateRange = (startDate?: string, endDate?: string) => {
    const formatMonth = (dateStr: string) => {
      // YYYY-MM 형식에서 "2025-11" 같은 문자열 처리
      const trimmed = dateStr?.trim();
      if (!trimmed) return "";

      // 이미 YYYY-MM-DD 형식이면 그대로 사용, 아니면 -01 추가
      const fullDate = trimmed.includes("-") && trimmed.split("-").length === 2
        ? `${trimmed}-01`
        : trimmed;

      const date = new Date(fullDate);

      // Invalid Date 체크
      if (isNaN(date.getTime())) {
        return dateStr; // 원본 문자열 반환
      }

      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };

    if (startDate && endDate) {
      return `${formatMonth(startDate)} - ${formatMonth(endDate)}`;
    } else if (startDate) {
      return formatMonth(startDate);
    }
    return "";
  };

  const dateRange = formatDateRange(work.startDate, work.endDate);

  // Refs for styling
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <section>
      <div className="max-w-screen-max px-7 md:px-10 lg:px-20 py-16 md:py-20 lg:py-24 mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] xl:grid-cols-[400px_1fr] gap-12 md:gap-16 xl:gap-20">
        {/* 왼쪽: 썸네일 */}
        <div ref={thumbnailRef} className="relative aspect-[3/2] overflow-hidden bg-[#141B29]">
          <Image
            src={imageUrl}
            alt={work.name || "리루트 작업"}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 오른쪽 */}
        <div>
          <div className="mb-[18px] md:mb-[22px] lg:mb-[25px] xl:mb-[26px] 2xl:mb-[28px]">
            <div className="w-full flex justify-between items-center mb-[14px] md:mb-[17px] lg:mb-[19px] xl:mb-[20px] 2xl:mb-[21px]">
              {/* 작업 이름 */}
              <h1
                ref={titleRef}
                className="text-[36px] md:text-[44px] lg:text-[50px] xl:text-[53px] 2xl:text-[56px] leading-[36px] md:leading-[42px] lg:leading-[45px] xl:leading-[46px] 2xl:leading-[48px] font-extrabold"
              >
                {work.name}
              </h1>

              {/* 뒤로가기 버튼 */}
              <Link
                data-no-cursor
                href="/works"
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

            {/* 프로젝트 기간 및 역할 */}
            <div className="flex flex-col gap-[24px] md:gap-[30px] lg:gap-[35px] xl:gap-[37px] 2xl:gap-[39px] ">
              {/* 기간 */}
              {dateRange && (
                <span className="text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[26px] font-medium text-gray">
                  {dateRange}
                </span>
              )}

              {/* 역할 */}
              {work.roles && work.roles.length > 0 && (
                <div className="flex flex-wrap gap-[8px] md:gap-[10px] lg:gap-[12px]">
                  {work.roles.map((role, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-black px-[12px] md:px-[20px] lg:px-[30px] py-[6px] md:py-[8px] lg:py-[10px] text-[12px] md:text-[14px] lg:text-[20px] font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              )}
            </div>
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
            {work.content && (
              <div className="max-w-none [&>p]:mb-4">
                <CustomPortableText
                  id={work._id}
                  type="work"
                  path={[]}
                  paragraphClasses="text-base md:text-lg leading-relaxed text-black"
                  value={work.content as any}
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
              {work.prevWork ? (
                <Link
                  href={`/works/${work.prevWork.workId}`}
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
                className={`hidden text-center md:block opacity-0 group-hover:opacity-100 transition-opacity mt-[8px] md:mt-[9px] lg:mt-[10px] xl:mt-[10.5px] 2xl:mt-[11px] text-[11px] md:text-[12px] lg:text-[13px] xl:text-[13.5px] 2xl:text-[14px] font-bold uppercase tracking-wider ${work.prevWork ? "text-black" : "text-[#888888]"}`}
              >
                Previous <br /> Project
              </p>
            </div>

            {/* 다음글 버튼 */}
            <div className="group flex flex-col items-center">
              {work.nextWork ? (
                <Link
                  href={`/works/${work.nextWork.workId}`}
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
                className={`hidden text-center md:block opacity-0 group-hover:opacity-100 transition-opacity mt-[8px] md:mt-[9px] lg:mt-[10px] xl:mt-[10.5px] 2xl:mt-[11px] text-[11px] md:text-[12px] lg:text-[13px] xl:text-[13.5px] 2xl:text-[14px] font-bold uppercase tracking-wider ${work.nextWork ? "text-black" : "text-[#888888]"}`}
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
