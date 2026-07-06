import React, { useEffect } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis: Lenis | null;
  }
}

const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    
    window.__lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return <>{children}</>;
};

export default LenisProvider;
