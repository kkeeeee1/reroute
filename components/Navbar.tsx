"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "./Menu";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header
        id="navbar"
        className={`sticky top-0 z-50 flex justify-center bg-transparent transition-colors duration-300`}
      >
        <div className="flex w-full max-w-screen-max items-center justify-between px-7 py-8 md:px-10 md:py-8 lg:px-20 lg:py-12">

          <Link
            href="/"
            onClick={closeMenu}
            className="relative z-50"
            id="header-logo"
          >
            <Image
              src={isOpen ? "/images/logo_white.png" : "/images/logo_black.png"}
              alt="Reroute Logo"
              width={214}
              height={59}
              className="h-8 w-auto object-contain md:h-10 lg:h-12"
              priority
            />
          </Link>

          <button
            onClick={toggleMenu}
            className="relative z-50 flex items-center gap-5 md:gap-[30px]"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`hidden text-lg font-medium transition-opacity duration-300 md:inline md:text-xl lg:text-2xl ${
                isOpen ? "text-white opacity-0" : "text-black opacity-100"
              }`}
            >
              Menu
            </span>
            <div className="flex h-6 w-6 flex-col items-center justify-center md:h-7 md:w-7 lg:h-8 lg:w-8">
              <span
                className={`block h-0.5 w-5 transform transition-all duration-300 ease-in-out md:w-6 ${
                  isOpen
                    ? "translate-y-[6px] rotate-45 bg-white"
                    : "translate-y-0 rotate-0 bg-black"
                }`}
              />
              <span
                className={`my-1 block h-0.5 w-5 transition-all duration-300 ease-in-out md:w-6 ${
                  isOpen ? "bg-white opacity-0" : "bg-black opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-5 transform transition-all duration-300 ease-in-out md:w-6 ${
                  isOpen
                    ? "-translate-y-[6px] -rotate-45 bg-white"
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
}
