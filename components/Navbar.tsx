"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "./Menu";
import { DARK_SECTION_IDS } from "@/constants/sections";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);
  const [mounted, setMounted] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    setMounted(true);
    
    // 헤더 높이를 측정하고 CSS 변수로 설정
    const updateNavbarHeight = () => {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        const height = navbar.offsetHeight;
        document.documentElement.style.setProperty("--navbar-height", `${height}px`);
      }
    };

    // 초기 설정
    updateNavbarHeight();
    
    // 리사이즈 시 재측정
    window.addEventListener("resize", updateNavbarHeight);
    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Get navbar position
      const navbar = document.getElementById("navbar");
      if (!navbar) return;

      const navbarRect = navbar.getBoundingClientRect();
      const navbarCenter = navbarRect.top + navbarRect.height / 2;

      // Check if navbar is over any dark section
      const darkSectionIds = Object.values(DARK_SECTION_IDS);
      let isOverDark = false;

      for (const sectionId of darkSectionIds) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (navbarCenter >= rect.top && navbarCenter <= rect.bottom) {
            isOverDark = true;
            break;
          }
        }
      }

      setIsOverDarkSection(isOverDark);
    };

    window.addEventListener("scroll", handleScroll);
    // 초기 체크
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 라이트 테마 여부 (메뉴 열림 또는 다크 섹션 위)
  const isLightTheme = isOpen || isOverDarkSection;

  const navbarContent = (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center bg-transparent transition-colors duration-300`}
      >
        <div className="flex w-full max-w-screen-max items-center justify-between px-7 py-8 md:px-10 md:py-8 lg:px-20 lg:py-12">

          <Link
            href="/"
            onClick={closeMenu}
            className="relative z-50"
            id="header-logo"
          >
            <Image
              src={isLightTheme ? "/images/logo_white.png" : "/images/logo_black.png"}
              alt="Reroute Logo"
              width={214}
              height={59}
              className="h-8 w-auto object-contain md:h-10 lg:h-12 transition-opacity duration-300"
              priority
            />
          </Link>

          <button
            onClick={toggleMenu}
            className="relative z-50 flex items-center gap-5 md:gap-[30px]"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`hidden text-lg font-medium transition-all duration-300 md:inline md:text-xl lg:text-2xl ${
                isOpen 
                  ? "text-white opacity-0" 
                  : isLightTheme 
                    ? "text-white opacity-100" 
                    : "text-black opacity-100"
              }`}
            >
              Menu
            </span>
            <div className="flex h-6 w-6 flex-col items-center justify-center md:h-7 md:w-7 lg:h-8 lg:w-8">
              <span
                className={`block h-0.5 w-5 transform transition-all duration-300 ease-in-out md:w-6 ${
                  isOpen
                    ? "translate-y-[6px] rotate-45 bg-white"
                    : isLightTheme
                      ? "translate-y-0 rotate-0 bg-white"
                      : "translate-y-0 rotate-0 bg-black"
                }`}
              />
              <span
                className={`my-1 block h-0.5 w-5 transition-all duration-300 ease-in-out md:w-6 ${
                  isOpen 
                    ? "bg-white opacity-0" 
                    : isLightTheme 
                      ? "bg-white opacity-100" 
                      : "bg-black opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-5 transform transition-all duration-300 ease-in-out md:w-6 ${
                  isOpen
                    ? "-translate-y-[6px] -rotate-45 bg-white"
                    : isLightTheme
                      ? "translate-y-0 rotate-0 bg-white"
                      : "translate-y-0 rotate-0 bg-black"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      <Menu isOpen={isOpen} onClose={closeMenu} />
    </>
  );

  // Portal을 사용하여 body에 직접 렌더링
  if (!mounted) return null;
  return createPortal(navbarContent, document.body);
}
