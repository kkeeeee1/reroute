'use client';


import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        window.open("http://pf.kakao.com/_TLlpn/chat", "_blank");
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text Animation
            gsap.fromTo(textRef.current,
                { y: 30, opacity: 0 },
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

            // Button Animation
            gsap.fromTo(buttonRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    }
                }
            );

            // Background Parallax (Simple)
            gsap.to(containerRef.current, {
                backgroundPosition: "0% 60%",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={containerRef}
            id="b2b-cta-section"
            className="relative bg-cover bg-center bg-no-repeat py-16 md:py-24 xl:py-32 2xl:py-36 text-white overflow-hidden"
            style={{ backgroundImage: 'url(/images/b2b/b2b_cta_bg.jpg)' }}
        >
            {/* 어두운 오버레이 */}
            <div className="absolute inset-0 bg-[#2C3039]/80"></div>
            
            <div className="z-10 relative mx-auto max-w-screen-max text-center space-y-8 md:space-y-12 xl:space-y-14 2xl:space-y-[50px] px-5 md:px-16 xl:px-20">
                <p ref={textRef} className="text-[18px] md:text-[28px] xl:text-[34px] 2xl:text-[40px] leading-[32px] md:leading-[50px] xl:leading-[60px] 2xl:leading-[70px] font-medium">
                    비즈니스의 핵심 문제를 정밀하게 진단하고, 가장 효과적인 전략적 방향을 설계합니다.
                </p>
                    <button onClick={handleClick} ref={buttonRef} className="border md:border-2 border-white px-5 py-2 md:px-7 md:py-3.5 xl:px-8 xl:py-4 text-[14px] md:text-[18px] xl:text-[20px] font-bold leading-[28px] md:leading-[36px] xl:leading-[40px] hover:bg-white hover:text-black transition-colors">
                        전단 미팅 요청하기
                    </button>
            </div>
        </section>
    );
}
