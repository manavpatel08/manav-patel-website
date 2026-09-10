import React from 'react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { experienceData } from '../data/resumeData';
import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="bg-[#ECE6DC] px-6 md:px-12 py-24 sm:py-28 md:py-36 relative border-t border-black/8 select-none"
    >
      <div className="max-w-4xl mx-auto">
        <FadeIn delay={0} y={20}>
          <SectionHeading text="Experience" tag="02 / PROFESSIONAL TIMELINE" align="center" className="mb-14 sm:mb-18" />
        </FadeIn>

        <div className="relative">
          {/* Subtle vertical timeline rule */}
          <div className="absolute left-6 sm:left-8 top-4 bottom-4 w-px bg-black/10 hidden md:block" />

          <div className="space-y-8">
            {experienceData.map((item, index) => (
              <FadeIn key={item.number} delay={index * 0.1} y={20}>
                <div className="relative md:pl-16">
                  {/* Timeline Node Bullet */}
                  <div className="hidden md:flex absolute left-8 -translate-x-1/2 top-8 w-4 h-4 rounded-full bg-white border-2 border-[#BD5338] items-center justify-center shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#BD5338]" />
                  </div>

                  {/* Clean Editorial Experience Card */}
                  <div className="p-7 sm:p-9 rounded-2xl bg-[#FDFBF7] border border-black/8 shadow-sm hover:border-black/16 transition-all duration-300">
                    
                    {/* Header: Company Prominent + Role Underneath + Date/Location */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#BD5338] uppercase tracking-wider mb-2 font-semibold">
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>Enterprise Infrastructure</span>
                        </div>
                        {/* Visually Prominent Company Name */}
                        <h3 className="text-2xl sm:text-3xl font-black text-[#141413] tracking-tight mb-1">
                          {item.company}
                        </h3>
                        {/* Role displayed clearly underneath */}
                        <p className="text-base sm:text-lg font-semibold text-[#3A6D8C]">
                          {item.role}
                        </p>
                      </div>

                      <div className="flex flex-col sm:items-end gap-1.5 font-mono text-xs text-[#827E77]">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECE6DC] text-[#141413] font-semibold border border-black/5 whitespace-nowrap">
                          <Calendar className="w-3.5 h-3.5 text-[#524F4A]" />
                          {item.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[#524F4A] mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#827E77]" />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    {/* 4 Actual Production Bullets */}
                    <ul className="space-y-3 mb-6">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 text-sm sm:text-base text-[#524F4A] leading-relaxed font-normal">
                          <CheckCircle2 className="w-4 h-4 text-[#3F6E50] shrink-0 mt-1" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technical tags */}
                    <div className="flex flex-wrap gap-2 pt-5 border-t border-black/8">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded bg-[#ECE6DC] text-[#141413] font-mono text-xs border border-black/5 font-medium"
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
