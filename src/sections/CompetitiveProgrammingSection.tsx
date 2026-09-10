import React from 'react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import CodingProfiles from '../components/CodingProfiles/CodingProfiles';

const CompetitiveProgrammingSection: React.FC = () => {
  return (
    <section 
      id="competitive"
      className="bg-[#F4F0E8] px-6 md:px-12 py-24 sm:py-28 md:py-36 relative border-t border-black/8 select-none"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <FadeIn delay={0} y={16}>
          <SectionHeading 
            text="Algorithmic Profiles" 
            tag="05 / CODEFORCES & LEETCODE" 
            align="center" 
            className="mb-4" 
          />
        </FadeIn>

        <FadeIn delay={0.1} y={16}>
          <p className="text-[#57606A] text-sm sm:text-base max-w-lg mx-auto text-center leading-relaxed mb-12 sm:mb-14">
            Interactive profile cards connected to live platform APIs. Click a card to inspect verified contest rating history, ranking percentiles, and problem breakdown.
          </p>
        </FadeIn>

        {/* Interactive Profile Tiles */}
        <FadeIn delay={0.18} y={24}>
          <CodingProfiles />
        </FadeIn>

      </div>
    </section>
  );
};

export default CompetitiveProgrammingSection;
