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
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#F7F6F2] flex flex-col items-center justify-center gap-6 select-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Name reveal */}
          <div className="flex overflow-hidden">
            {name.split('').map((char, i) => (
              <motion.span
                key={i}
                className="text-[#171717] font-black text-2xl sm:text-4xl md:text-5xl tracking-[0.2em] uppercase font-mono"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.1 + i * 0.04,
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-[#57606A] font-mono text-xs uppercase tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            System Architect & Software Engineer
          </motion.p>

          {/* Solid progress bar */}
          <motion.div className="w-44 sm:w-56 h-[2px] bg-[#EFECE6] rounded-full overflow-hidden mt-2">
            <motion.div
              className="h-full bg-[#171717] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.2, duration: 1.4, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

// done
