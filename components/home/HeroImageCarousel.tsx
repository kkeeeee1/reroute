"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const IMAGES = [
  "main_hero_5.png",
  "main_hero_6.png",
  "main_hero_3.png",
  "main_hero_7.png",
  "main_hero_8.png",
  "main_hero_2.png",
  "main_hero_9.png",
  "main_hero_4.png",
  "main_hero_1.png",
];
const IMAGE_CHANGE_INTERVAL = 1000; // ms

interface HeroImageCarouselProps {
  fullHeight?: boolean;
}

export function HeroImageCarousel({ fullHeight = false }: HeroImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const currentImageRef = useRef<HTMLDivElement>(null);
  const nextImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Prepare next image
      const next = (currentImageIndex + 1) % IMAGES.length;
      setNextImageIndex(next);

      // Crossfade animation
      if (currentImageRef.current && nextImageRef.current) {
        const timeline = gsap.timeline({
          onComplete: () => {
            setCurrentImageIndex(next);
          },
        });

        // Fade out current, fade in next simultaneously
        timeline
          .to(currentImageRef.current, {
            opacity: 0,
            duration: 0,
          })
          .to(
            nextImageRef.current,
            {
              opacity: 1,
              duration: 0,
            },
            0,
          ); // Start at same time as previous
      }
    }, IMAGE_CHANGE_INTERVAL);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className={fullHeight ? "h-full w-full" : "aspect-[4/5] w-full"}>
        {/* Current Image */}
        <div
          ref={currentImageRef}
          className="absolute inset-0"
          style={{ opacity: 1, willChange: "opacity" }}
        >
          <Image
            src={`/images/main/${IMAGES[currentImageIndex]}`}
            alt={`Hero ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority={currentImageIndex === 0}
          />
        </div>

        {/* Next Image (for crossfade) */}
        <div
          ref={nextImageRef}
          className="absolute inset-0"
          style={{ opacity: 0, willChange: "opacity" }}
        >
          <Image
            src={`/images/main/${IMAGES[nextImageIndex]}`}
            alt={`Hero ${nextImageIndex + 1}`}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
