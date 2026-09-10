import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Cpu, Activity, Layers, Wrench, Handshake, Shield } from 'lucide-react';

interface SectionTransitionProps {
  from: string;
  to: string;
  label: string;
  type?: 'diagram' | 'timeline' | 'technology' | 'capability' | 'engagement' | 'handshake';
}

const icons = {
  diagram: Cpu,
  timeline: Activity,
  technology: Layers,
  capability: Wrench,
  engagement: Shield,
  handshake: Handshake,
};

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  from,
  to,
  label,
  type = 'diagram',
}) => {
  const Icon = icons[type];

  return (
    <div
      className="relative w-full py-8 sm:py-10 flex flex-col items-center justify-center select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Upper hairline rule */}
      <div className="w-px h-6 sm:h-8 bg-black/10" />

      {/* Telemetry pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#ECE6DC] border border-black/8 text-[10px] font-mono text-[#57606A] shadow-sm tracking-wider uppercase my-2"
      >
        <span className="font-bold text-[#141413]">{from}</span>
        <span className="text-[#8C959F]">&bull;</span>
        <div className="flex items-center gap-1.5 text-[#BD5338] font-semibold">
          <Icon className="w-3 h-3" />
          <span>{label}</span>
        </div>
        <span className="text-[#8C959F]">&bull;</span>
        <span className="font-bold text-[#141413]">{to}</span>
      </motion.div>

      {/* Lower hairline rule with arrow head */}
      <div className="relative flex flex-col items-center">
        <div className="w-px h-6 sm:h-8 bg-black/10" />
        <ArrowDown className="w-3 h-3 text-[#8C959F] -mt-1" />
      </div>
    </div>
  );
};

export default SectionTransition;
