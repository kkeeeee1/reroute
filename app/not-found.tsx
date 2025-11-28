"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center bg-deepnavy px-7 py-10 md:px-16 lg:px-32">
      {/* Fade in animation */}
      <div
        className={`flex flex-col items-center gap-8 md:gap-12 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* 404 Text */}
        <div className="text-center">
          <h1 className="text-[120px] font-extrabold leading-none text-white md:text-[180px] lg:text-[220px]">
            404
          </h1>
          <div className="mt-4 h-[1px] w-full bg-white opacity-30" />
        </div>

        {/* Message */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[24px] font-bold leading-tight text-white md:text-[32px] lg:text-[40px]">
            PAGE NOT FOUND
          </h2>
          <p className="max-w-[280px] text-[16px] font-normal leading-relaxed text-white opacity-70 md:max-w-[400px] md:text-[18px] lg:max-w-[500px] lg:text-[20px]">
            요청하신 페이지를 찾을 수 없습니다.
            <br />
            주소를 다시 확인해주세요.
          </p>
        </div>

        {/* Home Link */}
        <Link
          href="/"
          className="group relative mt-4 overflow-hidden rounded-full border-2 border-white px-8 py-4 text-[16px] font-bold text-white transition-all duration-300 hover:bg-white hover:text-deepnavy md:px-10 md:py-5 md:text-[18px] lg:text-[20px]"
        >
          <span className="relative z-10">GO TO HOME</span>
        </Link>
      </div>

      {/* Background decoration - optional subtle element */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <div className="text-[300px] font-extrabold text-white md:text-[400px] lg:text-[500px]">
          404
        </div>
      </div>
    </div>
  );
}
