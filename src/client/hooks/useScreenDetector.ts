'use client';

import { useEffect, useState } from "react";

export const useScreenDetector = () => {
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleWindowSizeChange();
    }
  }, []);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width ? width <= 768 : false;
  const isTablet = width ? width <= 1024 : false;
  const isDesktop = width ? width > 1024 : false;

  return { isMobile, isTablet, isDesktop, width };
};