import React from 'react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { experienceData } from '../data/resumeData';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="bg-[#ECE6DC] px-6 md:px-12 py-24 sm:py-28 md:py-36 relative border-t border-black/8 select-none"
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={20}>
          <SectionHeading text="Experience" tag="02 / PROFESSIONAL TIMELINE" align="center" className="mb-14 sm:mb-18" />
        </FadeIn>

        <div className="relative">
          {/* Subtle vertical timeline rule */}
          <div className="absolute left-6 sm:left-8 top-4 bottom-4 w-px bg-black/10 hidden md:block" />

          <div className="space-y-8">
            {experienceData.map((item, index) => (
              <FadeIn key={item.number} delay={index * 0.1} y={20}>
                <div className="relative md:pl-20">
                  {/* Timeline Node Bullet */}
                  <div className="hidden md:flex absolute left-6 -translate-x-1/2 top-7 w-4 h-4 rounded-full bg-white border-2 border-[#BD5338] items-center justify-center shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#BD5338]" />
                  </div>

                  {/* Clean Editorial Experience Card */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#FDFBF7] border border-black/8 shadow-sm hover:border-black/16 hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#BD5338] uppercase tracking-wider mb-1 font-semibold">
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>Professional Experience</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#141413] tracking-tight">
                          {item.role}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECE6DC] text-[#57606A] font-mono text-xs font-medium border border-black/5 whitespace-nowrap">
                          <Calendar className="w-3 h-3 text-[#8C959F]" />
                          {item.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#57606A] uppercase tracking-wide mb-4">
                      <MapPin className="w-3.5 h-3.5 text-[#8C959F]" />
                      <span>{item.location}</span>
                    </div>

                    <p className="text-[#57606A] text-sm sm:text-base leading-relaxed mb-6 font-normal">
                      {item.description}
                    </p>

                    {/* Technical tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded bg-[#ECE6DC] text-[#24292F] font-mono text-xs border border-black/5"
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
      </div>
    </section>
  );
};

export default ExperienceSection;
