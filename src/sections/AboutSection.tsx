import React from 'react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import SystemArchitectureNode from '../components/SystemArchitectureNode';
import { education } from '../data/resumeData';
import { GraduationCap, MapPin, Calendar, Terminal } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="bg-[#F4F0E8] px-6 md:px-12 py-24 sm:py-28 md:py-36 relative border-t border-black/8 select-none"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={20}>
          <SectionHeading 
            text="About" 
            tag="01 / ARCHITECTURE & INTENT" 
            align="center" 
            className="mb-14 sm:mb-18" 
          />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* ── Left Column (7 cols): Editorial Engineering Narrative ── */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
            
            {/* Engineering Focus Card */}
            <FadeIn delay={0.1} y={20} className="flex-1">
              <div className="h-full p-7 sm:p-8 rounded-2xl bg-white border border-black/8 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#3A6D8C] uppercase tracking-widest font-semibold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Engineering Focus</span>
                </div>
                <p className="text-base sm:text-lg text-[#141413] font-semibold leading-relaxed mb-3">
                  Computer Science student at PDEU building full-stack systems that solve real problems, not just tick boxes.
                </p>
                <p className="text-sm sm:text-base text-[#524F4A] leading-relaxed font-normal">
                  I focus on the engineering behind reliable systems — API design, database architecture, caching, distributed systems, and scalability.
                </p>
              </div>
            </FadeIn>

            {/* Systems & Context + Offline Card */}
            <FadeIn delay={0.2} y={20} className="flex-1">
              <div className="h-full p-7 sm:p-8 rounded-2xl bg-[#ECE6DC]/70 border border-black/8 shadow-sm flex flex-col justify-between">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-[#827E77] mb-2 font-semibold">
                    Systems & Context
                  </p>
                  <p className="text-sm sm:text-base text-[#524F4A] leading-relaxed mb-3">
                    Creator of <strong className="text-[#141413]">CodeSync</strong>, a real-time collaborative code editor with sub-100ms synchronization, and <strong className="text-[#141413]">JobKart.ai</strong>, an AI-powered job matching platform that reduces manual search effort by 60–70%.
                  </p>
                  <p className="text-sm sm:text-base text-[#524F4A] leading-relaxed">
                    Previously a Software Engineering Intern at <strong className="text-[#141413]">AdaniConneX</strong>, where I worked on infrastructure automation and monitoring for enterprise data centers.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-black/8 flex items-center gap-2 text-xs font-mono text-[#524F4A]">
                  <span className="text-[#827E77] uppercase tracking-wider font-semibold">Offline:</span>
                  <span>Solving Codeforces problems and studying large-scale system design.</span>
                </div>
              </div>
            </FadeIn>

          </div>

          {/* ── Right Column (5 cols): Interactive System Architecture + Clean Standalone Education ── */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            
            {/* Interactive 3D System Architecture Visual */}
            <FadeIn delay={0.15} y={20} className="flex-1">
              <div className="h-full rounded-2xl bg-white border border-black/8 shadow-sm overflow-hidden flex flex-col">
                <SystemArchitectureNode />
              </div>
            </FadeIn>

            {/* Clean Standalone Education Block (No Extracurricular, No PR Head) */}
            <FadeIn delay={0.25} y={20}>
              <div className="p-7 sm:p-8 rounded-2xl bg-white border border-black/8 shadow-sm">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#ECE6DC] text-[#141413]">
                      <GraduationCap className="w-5 h-5 text-[#3A6D8C]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-[#827E77] font-semibold">Education</p>
                      <h3 className="font-bold text-[#141413] text-base leading-snug">
                        {education.institution}
                      </h3>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#E1EBE3] text-[#3F6E50] font-mono text-xs font-semibold whitespace-nowrap border border-[#3F6E50]/20">
                    {education.cpi}
                  </span>
                </div>

                <div className="pl-11 space-y-2">
                  <p className="text-xs sm:text-sm text-[#524F4A] font-medium">
                    {education.degree}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#827E77]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#827E77]" />
                      {education.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#827E77]" />
                      {education.location}
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
