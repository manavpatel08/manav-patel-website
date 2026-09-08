import React from 'react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import CodingProfiles from '../components/CodingProfiles/CodingProfiles';

const CompetitiveProgrammingSection: React.FC = () => {
  return (
    <section className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-14 sm:py-18 md:py-22 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <FadeIn delay={0} y={16}>
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[#D7E2EA]/60 text-xs font-mono uppercase tracking-widest mb-4">
              <span>Problem Solving</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.06} y={20}>
            <SectionHeading text="Compete" className="mb-3" />
          </FadeIn>

          <FadeIn delay={0.12} y={16}>
            <p className="text-[#D7E2EA]/55 text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed">
              Competitive programming, global contest performance, and algorithmic problem solving.
            </p>
          </FadeIn>
        </div>

        {/* Interactive Profile Tiles */}
        <FadeIn delay={0.18} y={24}>
          <CodingProfiles />
        </FadeIn>
      </div>
    </section>
  );
};

export default CompetitiveProgrammingSection;
