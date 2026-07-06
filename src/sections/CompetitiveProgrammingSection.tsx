import React from 'react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { achievements } from '../data/resumeData';
import { Trophy, Award, ExternalLink } from 'lucide-react';

const CompetitiveProgrammingSection: React.FC = () => {
  return (
    <section className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn delay={0} y={40}>
        <SectionHeading text="Compete" className="mb-14 sm:mb-18 md:mb-24" />
      </FadeIn>

      <div className="max-w-4xl mx-auto">
        {/* Profile cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {/* Codeforces */}
          <FadeIn delay={0.1} y={25}>
            <a
              href={achievements[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card glow-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col gap-4 group cursor-pointer block"
              style={{ borderColor: 'rgba(59, 130, 246, 0.15)', borderWidth: '1px' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[#3b82f6] font-bold text-lg sm:text-xl uppercase tracking-wider">
                  Codeforces
                </span>
                <ExternalLink className="w-4 h-4 text-[#D7E2EA]/30 group-hover:text-[#3b82f6] transition-colors" />
              </div>
              <p className="text-[#D7E2EA] font-medium text-base sm:text-lg">
                @{achievements[0].handle}
              </p>
              <div className="flex items-center gap-2 mt-auto">
                <Trophy className="w-4 h-4 text-[#febc2e]" />
                <span className="text-[#D7E2EA]/50 font-light text-xs sm:text-sm">
                  IICPC Codefest — Rank 1625 / 45,000+
                </span>
              </div>
            </a>
          </FadeIn>

          {/* LeetCode */}
          <FadeIn delay={0.2} y={25}>
            <a
              href={achievements[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card glow-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col gap-4 group cursor-pointer block"
              style={{ borderColor: 'rgba(251, 146, 60, 0.15)', borderWidth: '1px' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[#fb923c] font-bold text-lg sm:text-xl uppercase tracking-wider">
                  LeetCode
                </span>
                <ExternalLink className="w-4 h-4 text-[#D7E2EA]/30 group-hover:text-[#fb923c] transition-colors" />
              </div>
              <p className="text-[#D7E2EA] font-medium text-base sm:text-lg">
                @{achievements[1].handle}
              </p>
              <div className="flex items-center gap-2 mt-auto">
                <Award className="w-4 h-4 text-[#28c840]" />
                <span className="text-[#D7E2EA]/50 font-light text-xs sm:text-sm">
                  300+ Problems Solved
                </span>
              </div>
            </a>
          </FadeIn>
        </div>

        {/* Achievement badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <FadeIn delay={0.3} y={20}>
            <div className="glass-card rounded-xl sm:rounded-2xl px-5 py-4 sm:px-6 sm:py-5 flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#febc2e]/10 flex items-center justify-center flex-shrink-0">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#febc2e]" />
              </div>
              <div>
                <p className="text-[#D7E2EA] font-medium text-sm sm:text-base">
                  IICPC Codefest — IIT Madras
                </p>
                <p className="text-[#D7E2EA]/40 font-light text-xs sm:text-sm">
                  Rank 1625 / 45,000+ participants
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.4} y={20}>
            <div className="glass-card rounded-xl sm:rounded-2xl px-5 py-4 sm:px-6 sm:py-5 flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#3b82f6]" />
              </div>
              <div>
                <p className="text-[#D7E2EA] font-medium text-sm sm:text-base">
                  ML Specialization — Andrew Ng
                </p>
                <p className="text-[#D7E2EA]/40 font-light text-xs sm:text-sm">
                  Coursera Certified
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveProgrammingSection;
