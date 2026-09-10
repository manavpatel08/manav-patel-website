import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionHeadingProps {
  text: string;
  className?: string;
  tag?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  text,
  className = '',
  tag,
  align = 'center',
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`flex flex-col ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      } ${className}`}
    >
      {tag && (
        <motion.span
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="font-mono text-[11px] uppercase tracking-widest text-[#57606A] mb-3 px-3 py-1 bg-black/[0.04] border border-black/8 rounded-full"
        >
          {tag}
        </motion.span>
      )}
      <motion.h2
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        className="text-[#141413] font-black uppercase tracking-tight leading-none"
        style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
      >
        {text}
      </motion.h2>
    </div>
  );
};

export default SectionHeading;

// done
