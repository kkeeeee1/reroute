'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

interface AccordionItemProps {
    number: string;
    title: string;
    description: string;
    items?: string[];
    isLast?: boolean;
}

export function AccordionItem({ 
    number, 
    title, 
    description, 
    items,
    isLast = false
}: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        if (isOpen) {
            gsap.to(contentRef.current, {
                height: "auto",
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            });
        } else {
            gsap.to(contentRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        }
    }, [isOpen]);

    return (
        <article className={`pb-8 md:pb-10 lg:pb-12 xl:pb-14 2xl:pb-[60px] flex flex-col gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-[70px] ${!isLast ? 'border-b border-[#333333]' : ''} mb-10 md:mb-12 lg:mb-16 xl:mb-20 2xl:mb-[80px]`}>
            <div className="mb-2 md:mb-3 lg:mb-4 flex flex-col gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-[30px]">
                {/* 번호 */}
                <div className='flex gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5 2xl:gap-[10px] items-end'>
                    <span className='text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] 2xl:text-[70px] leading-[30px] md:leading-[36px] lg:leading-[42px] xl:leading-[46px] 2xl:leading-[50px] font-thin'>{number}</span>
                    <div className="h-[8px] w-[8px] md:h-[9px] md:w-[9px] lg:h-[10px] lg:w-[10px] xl:h-[11px] xl:w-[11px] 2xl:h-[12.5px] 2xl:w-[12.5px] rounded-full bg-primary"/>
                </div>

                {/* 타이틀 */}
                <h3 className="text-[28px] md:text-[36px] lg:text-[44px] xl:text-[52px] 2xl:text-[60px] leading-[32px] md:leading-[40px] lg:leading-[48px] xl:leading-[56px] 2xl:leading-[60px]">
                    {title}
                </h3>

                {/* 설명 */}
                <p className="text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] text-[#999999]">
                    {description}
                </p>
            </div>
            
            <div className='space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-7 2xl:space-y-[30px]'>
                <button 
                onClick={() => setIsOpen(!isOpen)}
                data-no-cursor
                className="group flex items-center gap-1.5 md:gap-2 font-bold leading-[22px] md:leading-[26px] lg:leading-[30px] rounded-full border border-white px-4 py-1.5 md:px-5 md:py-2 lg:px-6 lg:py-2 text-[16px] md:text-[18px] lg:text-[20px] transition-colors md:hover:bg-white md:hover:text-black"
                >
                핵심 제공 가치 
                <div>{isOpen ?  
                    <svg width="32" height="30" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-9">
                    <path d="M11 19H29" stroke="white" strokeWidth="2" strokeMiterlimit="10" className="md:group-hover:stroke-black"/>
                    </svg>
                    : <svg width="32" height="30" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-9">
                    <path d="M11 19H29" stroke="white" strokeWidth="2" strokeMiterlimit="10" className="md:group-hover:stroke-black"/>
                    <path d="M20 10V28" stroke="white" strokeWidth="2" strokeMiterlimit="10" className="md:group-hover:stroke-black"/>
                    </svg>
                    }</div>
              </button>
            
             <div ref={contentRef} style={{ height: 0, opacity: 0, overflow: 'hidden' }}>
                {items && (
                    <ul className="space-y-3 ml-2 md:space-y-4 lg:space-y-5 2xl:space-y-[20px] text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] leading-[22px] md:leading-[24px] lg:leading-[26px] xl:leading-[28px] 2xl:leading-[30px] text-white pt-4">
                        {items.map((item, index) => (
                            <li key={index}>· {item}</li>
                        ))}
                    </ul>
                )}
             </div>
            </div>
        </article>
    );
}
