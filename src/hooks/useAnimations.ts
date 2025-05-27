import { useEffect, useState } from 'react';
import { useSpring } from 'framer-motion';

export const useAnimations = (performanceMode: boolean = false) => {
  const [canAnimate, setCanAnimate] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const springConfig = {
    light: { stiffness: 300, damping: 20 },
    medium: { stiffness: 200, damping: 25 },
    heavy: { stiffness: 100, damping: 30 }
  };

  const animationPresets = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    },
    // Add more presets as needed
  };

  return {
    canAnimate: canAnimate && !prefersReducedMotion && !performanceMode,
    springConfig,
    animationPresets
  };
};
