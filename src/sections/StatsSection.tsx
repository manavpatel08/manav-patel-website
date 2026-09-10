import React from 'react';
import FadeIn from '../components/FadeIn';
import AnimatedCounter from '../components/AnimatedCounter';
import { stats } from '../data/resumeData';

const StatsSection: React.FC = () => {
  return (
    <section className="bg-[#F7F6F2] px-6 md:px-12 py-16 sm:py-20 relative border-t border-black/8 select-none">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.08} y={20}>
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-black/8 shadow-sm flex flex-col items-center text-center gap-1.5 hover:border-black/16 hover:shadow-md transition-all duration-200">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                className="text-[#171717] font-black text-3xl sm:text-4xl md:text-5xl font-mono tracking-tight"
              />
              <p className="text-[#57606A] font-mono text-xs uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
