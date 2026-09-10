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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ── Left Column (7 cols): Concise, High-Impact Editorial Narrative ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Primary Statement */}
            <FadeIn delay={0.1} y={20}>
              <div className="p-7 sm:p-8 rounded-2xl bg-white border border-black/8 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#3A6D8C] uppercase tracking-widest font-semibold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Engineering Focus</span>
                </div>
                <p className="text-lg sm:text-xl text-[#141413] font-semibold leading-relaxed mb-4">
                  Computer Science student at PDEU building full-stack systems that solve real problems, not just tick boxes.
                </p>
                <p className="text-sm sm:text-base text-[#524F4A] leading-relaxed font-normal">
                  I care about the <strong className="text-[#141413] font-medium">why</strong> behind architectural trade-offs — database schema modeling, resilient API contracts, low-latency caching, and distributed scale — as deeply as the code itself.
                </p>
              </div>
            </FadeIn>

            {/* Compact Work Context */}
            <FadeIn delay={0.2} y={20}>
              <div className="p-7 sm:p-8 rounded-2xl bg-[#ECE6DC]/60 border border-black/8 shadow-sm">
                <p className="text-xs font-mono uppercase tracking-widest text-[#827E77] mb-2 font-semibold">
                  Systems & Context
                </p>
                <p className="text-sm sm:text-base text-[#524F4A] leading-relaxed mb-4">
                  Creator of <strong className="text-[#141413]">CodeSync</strong>, a real-time collaborative code editor with sub-100ms sync latency, and <strong className="text-[#141413]">JobKart.ai</strong>, an AI-powered job matching platform that cuts search time by 60–70%. Currently interning at <strong className="text-[#141413]">AdaniConneX</strong>, automating infrastructure for enterprise data centers.
                </p>
                <div className="pt-3 border-t border-black/8 flex items-center gap-2 text-xs font-mono text-[#524F4A]">
                  <span className="text-[#827E77] uppercase tracking-wider">Offline:</span>
                  <span>Solving Codeforces problems and analyzing large-scale system designs.</span>
                </div>
              </div>
            </FadeIn>

          </div>

          {/* ── Right Column (5 cols): 3D System Pipeline + Clean Education ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Interactive 3D System Architecture Visual */}
            <FadeIn delay={0.15} y={20}>
              <div className="rounded-2xl bg-white border border-black/8 shadow-sm overflow-hidden">
                <SystemArchitectureNode />
              </div>
            </FadeIn>

            {/* Clean Standalone Education Block (No Extracurricular) */}
            <FadeIn delay={0.25} y={20}>
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-black/8 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#ECE6DC] text-[#141413]">
                      <GraduationCap className="w-5 h-5 text-[#3A6D8C]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-[#827E77] font-semibold">Education</p>
                      <h3 className="font-bold text-[#141413] text-base leading-tight">
                        {education.institution}
                      </h3>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#E1EBE3] text-[#3F6E50] font-mono text-xs font-semibold whitespace-nowrap border border-[#3F6E50]/20">
                    {education.cpi}
                  </span>
                </div>

                <div className="pl-12 space-y-1.5">
                  <p className="text-xs sm:text-sm text-[#524F4A] font-medium">
                    {education.degree}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-mono text-[#827E77]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#827E77]" />
                      {education.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#827E77]" />
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
