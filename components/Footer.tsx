"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-white px-7 py-16 md:px-10 lg:px-20">
      <div className="mx-auto flex w-full max-w-screen-max items-center justify-between">
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
        <p className="text-center text-base font-medium leading-[24px] text-black md:text-lg">
          © 2025 REROUTE. All rights reserved.
        </p>

        {/* Right - Contact Links */}
        <div className="flex shrink-0 gap-8">
          <a
            href="mailto:contact@reroute.com"
            className="text-base font-black leading-[24px] text-black transition-opacity duration-300 hover:opacity-70 md:text-lg"
          >
            MAIL
          </a>
          <a
            href="http://pf.kakao.com/_TLlpn/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-black leading-[24px] text-black transition-opacity duration-300 hover:opacity-70 md:text-lg"
          >
            KAKAOTALK
          </a>
        </div>
      </div>
    </footer>
  );
}
