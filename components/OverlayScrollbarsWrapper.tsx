"use client";

import { ReactNode, useEffect } from "react";
import { OverlayScrollbars } from "overlayscrollbars";
import "overlayscrollbars/overlayscrollbars.css";
import "@/styles/overlayscrollbars.css";

interface OverlayScrollbarsWrapperProps {
  children: ReactNode;
}

export function OverlayScrollbarsWrapper({
  children,
}: OverlayScrollbarsWrapperProps) {
  useEffect(() => {
    // body에 OverlayScrollbars 적용
    const osInstance = OverlayScrollbars(document.body, {
      overflow: {
        x: "hidden", // 가로 스크롤 숨김
        y: "scroll", // 세로 스크롤 활성화
      },
      scrollbars: {
        visibility: "auto", // 스크롤 시에만 표시
        autoHide: "move", // 마우스 이동 시 자동 숨김
        autoHideDelay: 1300, // 1.3초 후 자동 숨김
        dragScroll: true, // 드래그로 스크롤 가능
      },
    });

    return () => {
      osInstance.destroy();
    };
  }, []);

  return <>{children}</>;
}
