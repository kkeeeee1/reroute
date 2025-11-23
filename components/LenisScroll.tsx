"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface LenisScrollProps {
  children: ReactNode;
}

export function LenisScroll({ children }: LenisScrollProps) {
  const pathname = usePathname();

  // /studio 경로에서는 Lenis 비활성화
  if (pathname.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        // 스크롤 애니메이션 지속 시간 (초)
        // 더 크면 더 천천히 움직임
        // duration: 1.5,
        // 관성감을 조절하는 선형보간(lerp) 값
        // 더 작으면 더 부드럽고 천천히
        // lerp: 0.02,
        // 감속 효과
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        // 동기화 모드
        syncTouch: true,
        // 스크롤 방향 반전
        syncTouchLerp: 0.05,
      }}
    >
      {children}
    </ReactLenis>
  );
}
