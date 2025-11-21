"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollDownIndicator({ hideOnOverlay = false }: { hideOnOverlay?: boolean }) {
  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Show indicator only when at the very top
      if (window.scrollY < 10) {
        setShowIndicator(true);
      } else {
        setShowIndicator(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: showIndicator && !hideOnOverlay ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="pointer-events-none fixed bottom-12 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-2.5 md:flex"
    >
      <span className="text-base font-medium tracking-widest text-black">
        SCROLL DOWN
      </span>
      <svg
        width="22"
        height="10"
        viewBox="0 0 22 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="path-1-inside-1_210_263" fill="white">
          <path d="M0 -1L10.7873 9.38825L21.5745 -1" />
        </mask>
        <path
          d="M10.7873 9.38825L9.39993 10.8289L10.7873 12.1649L12.1746 10.8289L10.7873 9.38825ZM0 -1L-1.38732 0.440606L9.39993 10.8289L10.7873 9.38825L12.1746 7.94764L1.38732 -2.44061L0 -1ZM10.7873 9.38825L12.1746 10.8289L22.9618 0.440606L21.5745 -1L20.1872 -2.44061L9.39993 7.94764L10.7873 9.38825Z"
          fill="#231F20"
          mask="url(#path-1-inside-1_210_263)"
        />
      </svg>
    </motion.div>
  );
}
