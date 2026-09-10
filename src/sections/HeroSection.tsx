import React, { useEffect, useState } from 'react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import { profile } from '../data/resumeData';
import { Download } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const roles = [
  'SYSTEM ARCHITECT',
  'FULL STACK ENGINEER',
  'CLOUD INFRASTRUCTURE',
  'AI / ML SYSTEMS',
];

const HeroSection: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [cursorCoords, setCursorCoords] = useState({ x: 0, y: 0 });

  // Mouse motion values with subtle, gentle spring physics for grid displacement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setCursorCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
      const x = (e.clientX / innerWidth - 0.5) * 14;
      const y = (e.clientY / innerHeight - 0.5) * 14;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Smooth role rotation (fade + subtle vertical translate)
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="min-h-screen flex flex-col relative bg-[#F4F0E8] text-[#141413] select-none overflow-hidden"
    >
      {/* Subtle architectural hairline grid reacting gently to mouse parallax */}
      <motion.div
        className="absolute inset-0 grid-bg pointer-events-none opacity-40"
        style={{ x: smoothX, y: smoothY }}
      />

      {/* Technical Telemetry & Availability Bar */}
      <div className="pt-24 sm:pt-28 px-6 md:px-12 max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] font-mono text-[#524F4A] relative z-10">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-block w-2 h-2 rounded-full bg-[#3F6E50] animate-pulse" />
          <span className="font-semibold tracking-wider uppercase text-[#141413]">OPEN FOR</span>
          <span className="text-[#827E77]">•</span>
          <span className="tracking-wide text-[#524F4A]">Software Engineering</span>
          <span className="hidden sm:inline text-[#827E77]">•</span>
          <span className="hidden sm:inline tracking-wide text-[#524F4A]">Backend Development</span>
          <span className="hidden md:inline text-[#827E77]">•</span>
          <span className="hidden md:inline tracking-wide text-[#524F4A]">Systems Architecture</span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[#827E77]">
          <span>X: {cursorCoords.x.toString().padStart(4, '0')}</span>
          <span>Y: {cursorCoords.y.toString().padStart(4, '0')}</span>
          <span>LATENCY: 12ms</span>
        </div>
      </div>

      {/* Main Hero Display Typography */}
      <div className="flex flex-col items-center justify-center flex-1 max-w-6xl mx-auto w-full px-6 text-center relative z-10 py-12">

        {/* Role Subtitle with smooth fade + translate */}
        <FadeIn delay={0.1} y={15} className="mb-5 sm:mb-6">
          <div className="h-7 sm:h-8 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/8 shadow-sm text-xs sm:text-sm font-mono uppercase tracking-widest text-[#524F4A]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#3A6D8C]" />
                {roles[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>

        {/* Hero Name — Confident, monumental, editorial typography */}
        <FadeIn delay={0.2} y={24} className="w-full">
          <h1 className="editorial-title font-black uppercase text-[#141413] text-[13vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[115px]">
            {profile.heroName}
          </h1>
        </FadeIn>

        {/* Short engineering focus summary */}
        <FadeIn delay={0.3} y={20} className="mt-6 sm:mt-8 max-w-xl">
          <p className="text-[#524F4A] text-sm sm:text-base leading-relaxed font-normal">
            Computer Science student and software engineer building scalable distributed architectures, real-time collaboration engines, and automated cloud infrastructure.
          </p>
        </FadeIn>

      </div>

      {/* Bottom Bar: 3-line Composition Tagline + Actions */}
      <div className="mt-auto border-t border-black/8 bg-[#ECE6DC]/60 backdrop-blur-sm py-6 sm:py-7 px-6 md:px-12 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">

          {/* Strictly structured tagline composition */}
          <FadeIn delay={0.35} y={15}>
            <div className="font-mono uppercase tracking-wider leading-tight">
              <span className="block text-[#827E77] text-[11px] mb-1">
                BUILDING SYSTEMS THAT
              </span>
              <span className="block text-[#141413] font-bold text-sm sm:text-base tracking-widest">
                SCALE,
              </span>
              <span className="block text-[#141413] font-bold text-sm sm:text-base tracking-widest">
                THINK, AND PERFORM
              </span>
            </div>
          </FadeIn>

          {/* Action buttons with solid, clean styling */}
          <FadeIn delay={0.45} y={15}>
            <div className="flex items-center gap-3">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white text-[#141413] font-medium text-xs sm:text-sm uppercase tracking-wider px-5 py-2.5 hover:bg-[#ECE6DC] hover:border-black/20 transition-all duration-200 shadow-sm"
                aria-label="Download resume"
              >
                <span>Resume</span>
                <Download className="w-3.5 h-3.5 text-[#524F4A]" />
              </a>

              <ContactButton />
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
