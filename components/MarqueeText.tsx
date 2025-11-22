"use client";

import { motion } from "framer-motion";

export function MarqueeText() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-4 whitespace-nowrap italic"
        >
          <span className="text-[80px]  font-bold leading-[100px] text-black md:text-[120px] md:leading-[140px] lg:text-[150px] lg:leading-[170px]">
            We don't just solve problems
          </span>
          <span className="text-[80px] font-bold leading-[100px] text-black md:text-[120px] md:leading-[140px] lg:text-[150px] lg:leading-[170px]">
            We Reroute them
          </span>
          <span className="text-[80px] font-bold leading-[100px] text-black md:text-[120px] md:leading-[140px] lg:text-[150px] lg:leading-[170px]">
            We don't just solve problems
          </span>
          <span className="ml-[3vw] text-[80px] font-bold italic leading-[100px] text-black md:text-[120px] md:leading-[140px] lg:text-[150px] lg:leading-[170px]">
            We
          </span>
          <span className="ml-[3vw] text-[80px] font-bold italic leading-[100px] text-black md:text-[120px] md:leading-[140px] lg:text-[150px] lg:leading-[170px]">
            Reroute
          </span>
          <span className="ml-[3vw] text-[80px] font-bold italic leading-[100px] text-black md:text-[120px] md:leading-[140px] lg:text-[150px] lg:leading-[170px]">
            them
          </span>
        </motion.div>
      </div>
    </section>
  );
}
