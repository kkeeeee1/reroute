'use client';


import { WhyRerouteCard } from './WhyRerouteCard';
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function WhyRerouteSection() {
    const cards = [
        {
            title: 'C-Level 총괄 PM',
            description: '전략과 실행을 하나의 흐름으로 통제'
        },
        {
            title: '0-to-1 런칭 전문성',
            description: '브랜드·운영·경험·마케팅·시스템 통합 구축'
        },
        {
            title: 'High-touch BX/CX',
            description: '하이엔드 고객 경험 설계 전문'
        },
        {
            title: 'Business Asset Up',
            description: '실행을 넘어 브랜드 자산 가치 상승까지 연결'
        },
        {
            title: 'One-House 팀 구조',
            description: '전략, BX, 마케팅, 개발이 한 팀 안에서 유기적 실행'
        }
    ];

    const containerRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(headerRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    }
                }
            );

            // Cards Grid Animation (Staggered)
            if (gridRef.current) {
                const cards = gridRef.current.children;
                gsap.fromTo(cards,
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
                        }
                    }
                );
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="b2b-why-reroute-section" className="bg-navy py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-[150px] text-white overflow-hidden">
            <div className="mx-auto max-w-screen-max space-y-16 md:space-y-20 lg:space-y-24 xl:space-y-28 2xl:space-y-[124px] px-5 md:px-10 lg:px-16 xl:px-20">
                <div ref={headerRef} className="space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-7 2xl:space-y-[34px] opacity-0">
                    <h2 className="text-[28px] md:text-[32px] lg:text-[38px] xl:text-[44px] 2xl:text-[48px] leading-[40px] md:leading-[48px] lg:leading-[56px] xl:leading-[64px] 2xl:leading-[70px] font-extrabold">Why Reroute?</h2>
                    <p className="text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] leading-[28px] md:leading-[34px] lg:leading-[40px] xl:leading-[46px] 2xl:leading-[50px] font-medium">
                        리루트의 결과는 운이 아닙니다. 재현 가능한 방식과 전문성을 갖춘 팀이 함께하기 때문입니다.
                    </p>
                </div>

                {/* 5개 카드 그리드 with 하단 박스 공간 확보 */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-[60px]">
                    {cards.map((card, index) => (
                        <div key={index} className="opacity-0">
                            <WhyRerouteCard
                                title={card.title}
                                description={card.description}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
