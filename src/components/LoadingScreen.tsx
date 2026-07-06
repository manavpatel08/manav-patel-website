import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const name = 'MANAV PATEL';

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    if (hasLoaded) {
      setIsVisible(false);
      return;
    }
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('hasLoaded', 'true');
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#0C0C0C] flex flex-col items-center justify-center gap-8"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Name reveal */}
          <div className="flex overflow-hidden">
            {name.split('').map((char, i) => (
              <motion.span
                key={i}
                className="hero-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-[0.2em] uppercase"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.15 + i * 0.06,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-[#D7E2EA]/40 font-light text-xs sm:text-sm uppercase tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Software Engineer
          </motion.p>

          {/* Progress bar */}
          <motion.div className="w-48 sm:w-64 h-[2px] bg-[#D7E2EA]/10 rounded-full overflow-hidden mt-4">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #B600A8, #7621B0, #BE4C00)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.3, duration: 1.6, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
