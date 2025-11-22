"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const IMAGES = [
  "main_hero_1.png",
  "main_hero_2.png",
  "main_hero_3.png",
  "main_hero_4.png",
];
const IMAGE_CHANGE_INTERVAL = 3000; // ms

export function HeroImageCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
    }, IMAGE_CHANGE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="aspect-[4/5] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
            className="absolute inset-0"
          >
            <Image
              src={`/images/main/${IMAGES[currentImageIndex]}`}
              alt={`Hero ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority={currentImageIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
