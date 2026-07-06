import React from 'react';
import FadeIn from '../components/FadeIn';
import AnimatedCounter from '../components/AnimatedCounter';
import { stats } from '../data/resumeData';

const StatsSection: React.FC = () => {
  return (
    <section className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-16 sm:py-20 md:py-28">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.12} y={30}>
            <div className="glass-card glow-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center gap-2">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                className="hero-heading font-black text-3xl sm:text-4xl md:text-5xl"
              />
              <p className="text-[#D7E2EA]/50 font-light text-xs sm:text-sm uppercase tracking-wider leading-tight mt-1">
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
