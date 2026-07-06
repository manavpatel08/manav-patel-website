import React, { useEffect, useState } from 'react';
import FadeIn from '../components/FadeIn';
import { motion } from 'framer-motion';

const CTASection: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Thanks for scrolling :)';

  useEffect(() => {
    let i = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const interval = setInterval(() => {
            setTypedText(fullText.substring(0, i + 1));
            i++;
            if (i === fullText.length) clearInterval(interval);
          }, 60);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const el = document.getElementById('cta-section');
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cta-section"
      className="bg-[#0C0C0C] relative px-5 sm:px-8 md:px-10 py-32 sm:py-40 md:py-48 overflow-hidden"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#B600A8]/[0.04]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Terminal-style sign-off */}
        <FadeIn delay={0} y={30}>
          <div className="font-mono text-center space-y-4">
            <p className="text-[#D7E2EA]/30 text-xs sm:text-sm uppercase tracking-[0.3em]">
              $ echo "message"
            </p>
            <h2
              className="hero-heading font-black uppercase tracking-tight leading-none"
              style={{ fontSize: 'clamp(2rem, 8vw, 6rem)' }}
            >
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1 sm:w-1.5 h-[1em] bg-[#B600A8] ml-2 align-baseline"
              />
            </h2>
          </div>
        </FadeIn>

        {/* Divider */}
        <div className="section-divider w-full max-w-sm" />

        {/* Attribution */}
        <FadeIn delay={0.3} y={20}>
          <p className="text-[#D7E2EA]/30 font-mono text-xs sm:text-sm tracking-widest text-center">
            Built with React + TypeScript + Framer Motion
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default CTASection;
