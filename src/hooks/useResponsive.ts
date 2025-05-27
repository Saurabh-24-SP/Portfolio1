import { useState, useEffect } from 'react';

export const breakpoints = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export type Breakpoint = keyof typeof breakpoints;

export const useResponsive = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isXs = windowWidth >= breakpoints.xs;
  const isSm = windowWidth >= breakpoints.sm;
  const isMd = windowWidth >= breakpoints.md;
  const isLg = windowWidth >= breakpoints.lg;
  const isXl = windowWidth >= breakpoints.xl;
  const is2Xl = windowWidth >= breakpoints['2xl'];

  const isPhone = !isSm;
  const isTablet = isSm && !isLg;
  const isDesktop = isLg;
  const isMobile = !isLg; // phone or tablet

  const breakpoint: Breakpoint = 
    !isSm ? 'xs'
    : !isMd ? 'sm'
    : !isLg ? 'md'
    : !isXl ? 'lg'
    : !is2Xl ? 'xl'
    : '2xl';

  return {
    windowWidth,
    breakpoint,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    isPhone,
    isTablet,
    isDesktop,
    isMobile,
  };
};

// Helper for responsive values
export const responsive = <T>(config: Partial<Record<Breakpoint, T>>, breakpoint: Breakpoint): T | undefined => {
  const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const index = breakpointOrder.indexOf(breakpoint);
  
  for (let i = index; i >= 0; i--) {
    const value = config[breakpointOrder[i]];
    if (value !== undefined) return value;
  }
  
  return undefined;
};
