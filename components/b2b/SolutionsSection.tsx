'use client';


import { AccordionItem } from './AccordionItem';
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SolutionsSection() {
    const solutions = [
        {
            number: '01',
            title: 'C-Level 총괄 PM 파트너십',
            description: 'CBO/CMO급 전략 파트너로 프로젝트 전반을 책임지며, 조직을 체계적으로 기업화합니다.',
            items: [
                '프로젝트 기획 · 예산 수립 및 실행팀 지휘',
                '전략 실행 및 성과 보고 통제',
                '조직 운영 체계화 및 기업화 기반 구축',
                '프로젝트 전반 책임 + 의사결정 통제 제공'
            ]
        },
        {
            number: '02',
            title: '프리미엄 브랜딩 & 고객 경험(CX) 설계',
            description: '하이엔드 브랜드와 VVIP 고객을 위한 독점적 경험을 설계합니다.',
            items: [
                '브랜드 런칭 & BX 전략',
                '멤버십 · 하이엔드 프로그램 기획',
                '고객 경험(Customer Experience) 설계 및 현장 직원 교육 직접 수행',
                'VVIP 의전, GR팀 구축 포함'
            ]
        },
        {
            number: '03',
            title: '통합 마케팅 & 파트너십 오케스트레이션',
            description: '분산된 마케팅 채널과 전략적 파트너를 연결하여 효과를 극대화합니다.',
            items: [
                '핵심 파트너(KOL, 대기업 마케팅사 등) 발굴 및 지휘',
                '브랜드 메시지 · 콘텐츠 일관성 강화',
                'SNS · 디지털 광고 통합 전략 설계 및 운영',
                '디지털 터치포인트 전반(홈페이지·SNS) 리뉴얼'
            ]
        },
        {
            number: '04',
            title: '비즈니스 맞춤형 플랫폼 개발',
            description: '비즈니스 모델 핵심을 구현하는 맞춤형 앱·웹 플랫폼을 개발합니다.',
            items: [
                '전략 실행을 위한 맞춤형 플랫폼 기획 · 개발',
                '앱, 웹, ERP 등 시스템 개발',
                '브랜드 · 비즈니스 구조와 직접 연결',
            ]
        }
    ];

    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const verticalTextRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.fromTo(titleRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Vertical Text Animation
            if (verticalTextRef.current) {
                gsap.fromTo(verticalTextRef.current,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 1,
                        delay: 0.5,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                        }
                    }
                );
            }

            // Accordion List Animation (Staggered)
            if (listRef.current) {
                const items = listRef.current.children;
                gsap.fromTo(items,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: listRef.current,
                            start: "top 85%",
                        }
                    }
                );
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="b2b-solutions-section" className="relative bg-black text-white py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 overflow-hidden">
            <div className="mx-auto max-w-screen-max px-7 md:px-10 lg:px-16 xl:px-20">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 xl:gap-14 2xl:gap-16">
                    {/* 좌측 타이틀 - 데스크탑만 */}
                    <div className="hidden md:block">
                        <h2 ref={titleRef} className="mb-16 md:mb-20 xl:mb-28 2xl:mb-32 text-2xl md:text-3xl xl:text-4xl font-bold">4가지 전문 솔루션</h2>
                        
                        {/* 세로 텍스트 */}
                        <div ref={verticalTextRef} className="mt-8 md:mt-10 xl:mt-12">
                            <p className="whitespace-nowrap text-[14px] md:text-[16px] xl:text-[18px] tracking-widest text-[#666666] rotate-180" style={{ writingMode: 'vertical-rl' }}>
                                4 SOLUTION
                            </p>
                        </div>
                    </div>

                    {/* 모바일 타이틀 */}
                    <h2 className="mb-8 text-[28px] font-bold md:hidden">4가지 전문 솔루션</h2>

                    {/* 솔루션 리스트 */}
                    <div ref={listRef} className="flex-1">
                        {solutions.map((solution, index) => (
                            <AccordionItem
                                key={index}
                                number={solution.number}
                                title={solution.title}
                                description={solution.description}
                                items={solution.items}
                                isLast={index === solutions.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
