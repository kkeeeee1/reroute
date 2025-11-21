"use client";

import { motion } from "framer-motion";

export function MarqueeText() {
  return (
    <section className="w-full overflow-hidden bg-white px-7 py-16 md:px-10 md:py-24 lg:px-20 lg:py-32">
      <div className="mx-auto w-full max-w-screen-max">
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex whitespace-nowrap"
          >
            <span className="text-[80px] font-bold leading-[100px] text-black md:text-[120px] md:leading-[140px] lg:text-[150px] lg:leading-[170px]">
              We don't just solve problems
            </span>
            <span className="text-[80px] font-bold leading-[100px] text-black md:text-[120px] md:leading-[140px] lg:text-[150px] lg:leading-[170px]">
              We Reroute them
            </span>
            <span className="text-[80px] font-bold leading-[100px] text-black md:text-[120px] md:leading-[140px] lg:text-[150px] lg:leading-[170px]">
              We don't just solve problems
            </span>
            <span className="ml-[3vw] text-[80px] font-bold leading-[100px] italic text-black md:text-[120px] md:leading-[140px] lg:text-[150px] lg:leading-[170px]">
              We Reroute them
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
