"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const expertiseAreas = [
  {
    id: "finance",
    title: ["금융", "전략"],
    subtitle: ["Finance", "Strategy"],
    items: [
      "PB 경력 기반 ROI 중심 비즈니스 모델 설계",
      "VVIP 자산 포트폴리오 및 심리 분석 경험",
      "B2B 고가치 상품 영업 전략 및 핵심 관계자 관리",
    ],
    imageSrc: "/images/about/about_금융전략.png",
    imagePosition: "left" as const,
  },
  {
    id: "operation",
    title: ["현장", "운영"],
    subtitle: ["Scene", " Operation"],
    items: [
      "F&B · 엔터테인먼트 대규모 이벤트 운영 - 300명 규모",
      "신규 매장 런칭 및 3개월 내 손익분기점 달성 1:1 컨설팅",
      "30회 이상의 현장 경험 기반 서비스 동선 설계 · 인력 관리",
    ],
    imageSrc: "/images/about/about_현장운영.png",
    imagePosition: "right" as const,
  },
  {
    id: "marketing",
    title: ["마케팅", "기술"],
    subtitle: ["Marketing", "Strategy"],
    items: [
      "SNS · 바이럴 전략 설계 및 퍼포먼스 마케팅 운영",
      "B2C 앱 기획·노코딩 개발 총괄  -  ‘리쿡’, ‘루티장부’, ‘리스코프’",
      "로컬 F&B 네트워크 구축 및 협업 인프라 보유",
    ],
    imageSrc: "/images/about/about_마케팅기술.png",
    imagePosition: "left" as const,
  },
];

export function CBOIntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 헤더 애니메이션
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          markers: false,
        },
      });

      // 각 expertise 아이템 애니메이션
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              markers: false,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white">
      <div className="max-w-screen-max mx-auto px-7 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28 lg:px-20 lg:py-36 space-y-[70px] sm:space-y-[110px] md:space-y-[150px] lg:space-y-[180px] 2xl:space-y-[220px]">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 flex flex-col md:flex-row md:gap-16 lg:gap-20 2xl:gap-[290px]"
        >
          <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] 2xl:text-[48px] font-extrabold shrink-0">
            CBO 소개
          </h2>

          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 2xl:gap-[65px]">
            <span className="text-[18px] sm:text-[22px] md:text-[28px] lg:text-[34px] 2xl:text-[40px] font-bold">
              전략과 실행, 기술을 모두 아우르는 총괄 PM
            </span>
            <span className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[26px] 2xl:text-[32px] font-normal leading-[1.5] sm:leading-[1.6] md:leading-[1.7] lg:leading-[45px] 2xl:leading-[50px]">
              데이터와 현장의 사실을 중심으로 의사결정을 내리며,
              <br />
              사용자 경험과 기술적 가능성을 함께 고려해 프로젝트 전체 구조를 설계합니다.
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-16 sm:gap-20 md:gap-28 lg:gap-32 2xl:gap-[200px] px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-32">
          {expertiseAreas.map((area, index) => (
            <div
              key={area.id}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              className={`flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-14 2xl:gap-16 ${
                area.imagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="flex flex-1 flex-col justify-start gap-6 sm:gap-8 md:gap-12 lg:gap-16 2xl:gap-[80px]">
                {/* 타이틀 */}
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-4 2xl:gap-5">
                  <h3 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] 2xl:text-[48px] font-bold leading-[1.2] sm:leading-[30px] md:leading-[35px] lg:leading-[38px] 2xl:leading-[42px]">
                    {area.title[0]}
                  </h3>
                  <div className="h-[7px] w-[7px] sm:h-[7px] sm:w-[7px] md:h-[8px] md:w-[8px] lg:h-[8px] lg:w-[8px] 2xl:h-[9px] 2xl:w-[9px] flex-shrink-0 rounded-full bg-primary" />
                  <h3 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] 2xl:text-[48px] font-bold leading-[1.2] sm:leading-[30px] md:leading-[35px] lg:leading-[38px] 2xl:leading-[42px]">
                    {area.title[1]}
                  </h3>
                </div>

                {/* 특징 */}
                <ul className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 2xl:gap-[30px] ml-0">
                  {area.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="rounded-full border border-black px-4 sm:px-5 md:px-6 lg:px-8 2xl:px-[30px] py-2 sm:py-2.5 md:py-3 lg:py-4 2xl:py-5 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[22px] 2xl:text-[26px] font-medium leading-[1.3] sm:leading-[18px] md:leading-[20px] lg:leading-[26px] 2xl:leading-[30px] w-fit"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 이미지 */}
              <div className="w-full md:w-2/5">
                <div className="relative aspect-[9/10] md:aspect-[3/4] w-full overflow-hidden">
                  <Image src={area.imageSrc} alt={area.title[0]} fill className="object-cover" />

                  {/* 서브타이틀 오버레이 */}
                  <div className="absolute left-3 sm:left-4 md:left-6 lg:left-8 2xl:left-12 top-3 sm:top-4 md:top-6 lg:top-8 2xl:top-12 flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 2xl:gap-3">
                    <span className="text-white font-bold leading-[1.1] sm:leading-[1.2] md:leading-[30px] lg:leading-[36px] 2xl:leading-[42px] text-[18px] sm:text-[24px] md:text-[32px] lg:text-[40px] 2xl:text-[48px]">
                      {area.subtitle[0]}
                    </span>
                    <span className="text-white font-bold leading-[1.1] sm:leading-[1.2] md:leading-[30px] lg:leading-[36px] 2xl:leading-[42px] text-[18px] sm:text-[24px] md:text-[32px] lg:text-[40px] 2xl:text-[48px]">
                      {area.subtitle[1]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
