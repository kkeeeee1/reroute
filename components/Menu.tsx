"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Solution", href: "/b2b", badge: "B2B" },
  { label: "Labs", href: "/b2c", badge: "B2C" },
  { label: "Works", href: "/works" },
];

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Menu({ isOpen, onClose }: MenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [shouldRender, setShouldRender] = useState(false);

  // AnimatePresence 대체: 조건부 렌더링 + exit 애니메이션 관리
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  // Enter/Exit 애니메이션
  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      // Enter animation
      gsap.fromTo(
        menuRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut",
        },
      );

      // Nav items stagger animation
      navItemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: "expo.out",
          },
        );
      });
    } else if (shouldRender) {
      // Exit animation
      const timeline = gsap.timeline({
        onComplete: () => setShouldRender(false),
      });

      timeline.to(menuRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      ref={menuRef}
      id="menu"
      className="fixed inset-0 z-40 flex h-dvh w-screen flex-col bg-darknavy"
      style={{ opacity: 0, willChange: "opacity" }}
    >
      <div className="mx-auto flex h-full w-full max-w-screen-max flex-col justify-center px-5 pt-5 md:px-10 md:pt-10 lg:px-20 lg:pt-20">
        <nav className="flex h-full flex-col justify-center gap-6 md:gap-8 lg:gap-[40px]">
          {NAV_ITEMS.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <div
                key={item.href}
                ref={(el) => {
                  navItemsRef.current[index] = el;
                }}
                style={{ opacity: 0, willChange: "transform, opacity" }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex w-fit items-start gap-3 md:gap-4 lg:gap-5"
                >
                  <span className="relative text-[48px] font-bold leading-none text-white md:text-[80px] lg:text-[100px] xl:text-[110px] 2xl:text-[120px]">
                    <span className="relative z-10">{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] w-0 bg-[#5161B1] transition-all duration-300 ease-out group-hover:w-full ${isActive ? "w-full" : ""}`}
                    />
                  </span>
                  {item.badge && (
                    <span className="rounded-full mt-2 bg-white px-3 py-1 text-[12px] font-bold text-black md:px-4 md:py-1.5 md:text-[16px] lg:px-5 lg:py-2 lg:text-[20px] xl:text-[22px] 2xl:px-6 2xl:py-2.5 2xl:text-[24px]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
