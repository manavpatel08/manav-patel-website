import React from 'react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { experienceData } from '../data/resumeData';

const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="bg-section-experience px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <SectionHeading text="Experience" className="mb-16 sm:mb-20 md:mb-28" dark={true} />
      </FadeIn>

      <div className="max-w-5xl mx-auto relative">
        {/* Timeline connector line */}
        <div className="absolute left-[clamp(1.8rem,5vw,4.5rem)] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden sm:block" />

        <div className="space-y-4">
          {experienceData.map((item, i) => (
            <FadeIn key={item.number} delay={i * 0.1} y={30}>
              <div
                className="group flex flex-col sm:flex-row items-start gap-6 sm:gap-8 md:gap-12 p-6 sm:p-8 md:p-10 rounded-[30px] border border-black/5 bg-white shadow-sm hover:shadow-xl hover:shadow-black/5 hover:border-black/10 hover:bg-white transition-all duration-500 relative hover:-translate-y-1"
              >
                {/* Number */}
                <span
                  className="font-bold text-black flex-shrink-0 relative z-10 transition-colors duration-500"
                  style={{ fontSize: 'clamp(3rem, 10vw, 100px)', lineHeight: 0.8 }}
                >
                  {item.number}
                </span>

                {/* Content */}
                <div className="flex flex-col gap-3 pt-2 sm:pt-4 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <h3
                      className="font-bold uppercase text-black group-hover:text-black transition-colors duration-300"
                      style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                    >
                      {item.role}
                    </h3>
                    {/* Date badge */}
                    <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-black/5 text-[#333333] font-medium text-xs uppercase tracking-wider whitespace-nowrap">
                      {item.date}
                    </span>
                  </div>

                  <p className="text-[#B600A8] font-medium text-xs sm:text-sm uppercase tracking-wider">
                    {item.location}
                  </p>

                  <p
                    className="font-light leading-relaxed max-w-2xl text-[#444444] mt-2"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.15rem)' }}
                  >
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-black/5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[#555555] uppercase tracking-widest text-xs px-2 py-1 rounded border border-black/5 bg-black/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
