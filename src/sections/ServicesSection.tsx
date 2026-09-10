import React from 'react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { servicesData, profile } from '../data/resumeData';
import { ArrowRight, ArrowUpRight, Mail, FileText, CheckCircle2 } from 'lucide-react';

const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#ECE6DC] px-6 md:px-12 py-24 sm:py-28 md:py-36 relative border-t border-black/8 select-none"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={20}>
          <SectionHeading
            text="Services"
            tag="06 / WHAT I BUILD"
            align="center"
            className="mb-14 sm:mb-18"
          />
        </FadeIn>

        {/* 4 Concise Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {servicesData.map((service, index) => (
            <FadeIn
              key={service.number}
              delay={index * 0.08}
              y={20}
            >
              <div className="h-full p-7 sm:p-9 rounded-2xl bg-[#FDFBF7] border border-black/8 shadow-sm hover:border-black/16 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div>
                  {/* Header: Number + Subtle Color Indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#ECE6DC] text-[#141413] border border-black/5">
                      {service.number}
                    </span>
                    <div
                      className="w-3 h-3 rounded-full transition-transform group-hover:scale-125"
                      style={{ backgroundColor: service.accent }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-[#141413] font-bold text-xl sm:text-2xl tracking-tight uppercase mb-3">
                    {service.title}
                  </h3>

                  {/* Concise Description */}
                  <p className="text-[#524F4A] text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Scope Capabilities */}
                <div className="pt-4 border-t border-black/8">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#827E77] block mb-3 font-semibold">
                    Core Capabilities
                  </span>
                  <ul className="space-y-2">
                    {service.scope.map((item, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#141413] font-mono">
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: service.accent }}
                        />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Final CTA: LET'S BUILD SOMETHING USEFUL. */}
        <FadeIn delay={0.25} y={20} className="mt-16 sm:mt-20">
          <div className="rounded-3xl bg-[#141413] text-[#F4F0E8] border border-black/10 p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-md">
            <div className="max-w-3xl relative z-10">
              <span className="inline-block text-xs font-mono text-[#C48229] uppercase tracking-widest font-semibold mb-3">
                LET&apos;S CONNECT
              </span>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-[#F4F0E8]">
                LET&apos;S BUILD SOMETHING USEFUL.
              </h3>

              <p className="text-[#ECE6DC] text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-normal">
                Have a system, product, or engineering problem worth solving?
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${profile.email}?subject=Engineering%20Opportunity%20%7C%20Let's%20Build%20Together&body=Hi%20Manav,%0D%0A%0D%0AI'd%20like%20to%20discuss%20an%20engineering%20problem%20or%20opportunity...`}
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#BD5338] text-white font-mono text-xs sm:text-sm uppercase tracking-wider font-bold hover:bg-[#a8472f] transition-all duration-200 shadow-sm"
                  aria-label="Hire me via email"
                >
                  <Mail className="w-4 h-4" />
                  <span>HIRE ME</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#ECE6DC] text-[#141413] font-mono text-xs sm:text-sm uppercase tracking-wider font-bold hover:bg-white transition-all duration-200 shadow-sm"
                  aria-label="View Resume"
                >
                  <FileText className="w-4 h-4 text-[#141413]" />
                  <span>VIEW RESUME</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-[#ECE6DC]/70">
                <span className="w-2 h-2 rounded-full bg-[#3F6E50] animate-pulse" />
                <span>Direct inbox: {profile.email} &bull; Fast turnaround</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ServicesSection;
