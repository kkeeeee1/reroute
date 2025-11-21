"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-screen-max flex-col items-center gap-8 px-7 py-12 md:flex-row md:items-center md:justify-between md:gap-0 md:py-16 md:px-10 lg:px-20">
        {/* Left - Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo_main.png"
            alt="Reroute Logo"
            width={153}
            height={50}
            priority
          />
        </Link>

        {/* Center - Copyright Text */}
        <span className="text-center text-sm font-medium text-black md:text-base lg:text-lg">
          © 2025 REROUTE. All rights reserved.
        </span>

        {/* Right - Contact Links */}
        <div className="flex shrink-0 gap-6 md:gap-8">
          {/* 클릭 시 메일 보내기 */}
          <a
            href="mailto:contact@reroute.com"
            className="text-sm font-black leading-[20px] text-black transition-opacity duration-300 hover:opacity-70 md:text-base md:leading-[24px] lg:text-lg"
          >
            MAIL
          </a>
          {/* 클릭시 카카오 채팅방 이동 */}
          <a
            href="http://pf.kakao.com/_TLlpn/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-black leading-[20px] text-black transition-opacity duration-300 hover:opacity-70 md:text-base md:leading-[24px] lg:text-lg"
          >
            KAKAOTALK
          </a>
        </div>
      </div>
    </footer>
  );
}
