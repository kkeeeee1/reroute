"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function CaseStudySection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const rerouteRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Logo Animation
      gsap.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top 85%",
          },
        }
      );

      // Rows Animation Helper
      const animateRow = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (ref.current) {
          gsap.fromTo(
            ref.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
              },
            }
          );
        }
      };

      animateRow(problemRef);
      animateRow(rerouteRef);
      animateRow(solutionsRef);
      animateRow(resultRef);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="case-study-section" className="bg-white overflow-hidden">
      <div className="mx-auto max-w-screen-max px-7 md:px-10 lg:px-16 xl:px-20 py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32">
        {/* 제목 */}
        <div ref={titleRef}>
          <h2 className="mb-5 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-[35px] text-[28px] md:text-[32px] lg:text-[38px] xl:text-[44px] 2xl:text-[48px] leading-[36px] md:leading-[42px] lg:leading-[48px] xl:leading-[54px] 2xl:leading-[58px] font-extrabold">
            Reroute
            <br />
            Case Study
          </h2>
          <p className="text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] text-gray">
            리루트 솔루션으로 브랜드 자산 가치를 성공적으로 상승시킨 사례
          </p>
        </div>

        {/* Case Study 카드 with 이미지 */}
        <Image
          ref={logoRef}
          src="/images/b2b/casestudy_logo.png"
          alt="Case Study Logo"
          className="h-auto w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] mx-auto object-contain mt-16 md:mt-20 lg:mt-24 xl:mt-28 2xl:mt-[108px] mb-12 md:mb-16 lg:mb-20 xl:mb-24 2xl:mb-[99px]"
          width={400}
          height={360}
        />

        {/* Content Sections */}
        <div className="space-y-10 md:space-y-12 lg:space-y-14 xl:space-y-16 2xl:space-y-[70px]">
          <Border />

          {/* Problem */}
          <div
            ref={problemRef}
            className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12"
          >
            <CaseStudyCategory title="Problem" />
            <p className="flex-1 text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px] 2xl:text-[28px] leading-[24px] md:leading-[28px] lg:leading-[36px] xl:leading-[44px] 2xl:leading-[50px]">
              대형견 동반 한옥 카페'라는 명확한 비전이 있었지만, 인테리어 사기로 프로젝트가 전면
              중단.
              <br />
              오픈 일정 지연, 전문 현장 경험 없이는 복구 불가 상황.
            </p>
          </div>

          <Border />

          {/* Reroute */}
          <div
            ref={rerouteRef}
            className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12"
          >
            <CaseStudyCategory title="Reroute" />
            <div className="flex-1 space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-14 2xl:space-y-[60px]">
              <p className="text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px] 2xl:text-[28px] leading-[24px] md:leading-[28px] lg:leading-[36px] xl:leading-[44px] 2xl:leading-[50px]">
                리루트는 총괄 PM 파트너십을 체결하여 위기를 '브랜드 자산으로 전환'하는 전략으로
                재설계했습니다.
              </p>
              <ul className="space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-7 2xl:space-y-[26px] text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] leading-[22px] md:leading-[24px] lg:leading-[26px] xl:leading-[28px] 2xl:leading-[30px] ml-0">
                <li className="flex items-start gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5 2xl:gap-[13px]">
                  <span className="h-1.5 w-1.5 md:h-2 md:w-2 flex-shrink-0 rounded-full bg-primary mt-2 md:mt-3"></span>
                  <span>
                    <strong>위기 전환</strong> : 셀프 인테리어 문제를 진정성 있는 브랜드 스토리로
                    반전
                  </span>
                </li>
                <li className="flex items-start gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5 2xl:gap-[13px]">
                  <span className="h-1.5 w-1.5 md:h-2 md:w-2 flex-shrink-0 rounded-full bg-primary mt-2 md:mt-3"></span>
                  <span>
                    <strong>포지셔닝</strong> : 단순 카페 → '반려동물 커뮤니티'의 문화적 아지트
                  </span>
                </li>
                <li className="flex items-start gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5 2xl:gap-[13px]">
                  <span className="h-1.5 w-1.5 md:h-2 md:w-2 flex-shrink-0 rounded-full bg-primary mt-2 md:mt-3"></span>
                  <span>프로젝트 기획·예산 수립 및 실행팀 지휘</span>
                </li>
              </ul>
            </div>
          </div>

          <Border />

          {/* Solutions */}
          <div
            ref={solutionsRef}
            className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12"
          >
            <CaseStudyCategory title="Solutions" />
            <div className="flex-1 flex flex-col gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-[60px]">
              {/* 01 */}
              <div className="flex-1">
                <div className="flex gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5 2xl:gap-[10px] items-end mb-6 md:mb-7 lg:mb-8 xl:mb-10 2xl:mb-[44px]">
                  <span className="text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] 2xl:text-[70px] leading-[30px] md:leading-[36px] lg:leading-[42px] xl:leading-[46px] 2xl:leading-[50px] font-thin">
                    01
                  </span>
                  <div className="h-[8px] w-[8px] md:h-[9px] md:w-[9px] lg:h-[10px] lg:w-[10px] xl:h-[11px] xl:w-[11px] 2xl:h-[12.5px] 2xl:w-[12.5px] rounded-full bg-primary" />
                </div>
                <h4 className="mb-8 md:mb-10 lg:mb-12 xl:mb-14 2xl:mb-[64px] text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] 2xl:text-[28px] font-bold">
                  브랜드 경험(BX) 설계
                </h4>
                <ul className="space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-7 2xl:space-y-[26px] text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] leading-[22px] md:leading-[24px] lg:leading-[26px] xl:leading-[28px] 2xl:leading-[30px] ml-0">
                  <li className="flex items-start gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5 2xl:gap-[13px]">
                    <span className="h-1.5 w-1.5 md:h-2 md:w-2 flex-shrink-0 rounded-full bg-primary mt-2 md:mt-3"></span>
                    <span>'퓨전 한옥' 컨셉 정의 (전통 + 현대 조화)</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5 2xl:gap-[13px]">
                    <span className="h-1.5 w-1.5 md:h-2 md:w-2 flex-shrink-0 rounded-full bg-primary mt-2 md:mt-3"></span>
                    <span>시그니처 메뉴 개발 컨설팅 ('바나나 베이스 커피', '잣 식혜')</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5 2xl:gap-[13px]">
                    <span className="h-1.5 w-1.5 md:h-2 md:w-2 flex-shrink-0 rounded-full bg-primary mt-2 md:mt-3"></span>
                    <span>브랜드 네이밍 스토리 개발 (대표 철학 + 브랜드 염원 결합)</span>
                  </li>
                </ul>
              </div>

              {/* 02 */}
              <div className="flex-1">
                <div className="flex gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5 2xl:gap-[10px] items-end mb-6 md:mb-7 lg:mb-8 xl:mb-10 2xl:mb-[44px]">
                  <span className="text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] 2xl:text-[70px] leading-[30px] md:leading-[36px] lg:leading-[42px] xl:leading-[46px] 2xl:leading-[50px] font-thin">
                    02
                  </span>
                  <div className="h-[8px] w-[8px] md:h-[9px] md:w-[9px] lg:h-[10px] lg:w-[10px] xl:h-[11px] xl:w-[11px] 2xl:h-[12.5px] 2xl:w-[12.5px] rounded-full bg-primary" />
                </div>
                <h4 className="mb-8 md:mb-10 lg:mb-12 xl:mb-14 2xl:mb-[64px] text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] 2xl:text-[28px] font-bold">
                  현장 운영 시스템 구축
                </h4>
                <ul className="space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-7 2xl:space-y-[26px] text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] leading-[22px] md:leading-[24px] lg:leading-[26px] xl:leading-[28px] 2xl:leading-[30px] ml-0">
                  <li className="flex items-start gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5 2xl:gap-[13px]">
                    <span className="h-1.5 w-1.5 md:h-2 md:w-2 flex-shrink-0 rounded-full bg-primary mt-2 md:mt-3"></span>
                    <span>30회 이상의 F&B 현장 경험 기반으로 운영 동선·SOP 0부터 구축</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5 2xl:gap-[13px]">
                    <span className="h-1.5 w-1.5 md:h-2 md:w-2 flex-shrink-0 rounded-full bg-primary mt-2 md:mt-3"></span>
                    <span>신규 인력의 HR·서비스 교육 직접 수행</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Border />

          {/* Result */}
          <div
            ref={resultRef}
            className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12"
          >
            <CaseStudyCategory title="Result" />
            <ul className="space-y-5 md:space-y-6 lg:space-y-7 xl:space-y-8 2xl:space-y-[32px] text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px] 2xl:text-[26px] leading-[22px] md:leading-[24px] lg:leading-[26px] xl:leading-[28px] 2xl:leading-[30px] ml-0 font-bold">
              <li className="flex items-start gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5 2xl:gap-[13px]">
                <span className="h-1.5 w-1.5 md:h-2 md:w-2 flex-shrink-0 rounded-full bg-primary mt-2 md:mt-3"></span>
                <span>오픈 3개월 내 안정적 운영 시스템 확보</span>
              </li>
              <li className="flex items-start gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5 2xl:gap-[13px]">
                <span className="h-1.5 w-1.5 md:h-2 md:w-2 flex-shrink-0 rounded-full bg-primary mt-2 md:mt-3"></span>
                <span>'대구 유일 감성 한옥 대형견 카페' 시장 독점 포지션 달성</span>
              </li>
              <li className="flex items-start gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5 2xl:gap-[13px]">
                <span className="h-1.5 w-1.5 md:h-2 md:w-2 flex-shrink-0 rounded-full bg-primary mt-2 md:mt-3"></span>
                <span>브랜드 자산 가치 상승 → 투자금 회수 + 매각(리셀) 성공</span>
              </li>
              <li className="flex items-start gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5 2xl:gap-[13px]">
                <span className="h-1.5 w-1.5 md:h-2 md:w-2 flex-shrink-0 rounded-full bg-primary mt-2 md:mt-3"></span>
                <span>리루트의 '0-to-1 런칭 + 자산 가치 상승 전략' 증명</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const Border = () => {
  return <div className="border-t border-[#B9B9B9] w-full" />;
};

const CaseStudyCategory = ({ title }: { title: string }) => {
  return (
    <div className="w-full md:w-[180px] xl:w-[220px] 2xl:w-[250px] flex-shrink-0">
      <h3 className="text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[40px] leading-none font-bold">
        {title}
      </h3>
    </div>
  );
};
