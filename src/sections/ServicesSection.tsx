import React from 'react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { servicesData, profile } from '../data/resumeData';
import { ArrowUpRight, Mail, CheckCircle2, Terminal } from 'lucide-react';

const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#F4F0E8] px-6 md:px-12 py-24 sm:py-28 md:py-36 relative border-t border-black/8 select-none"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={20}>
          <SectionHeading
            text="Engineering Services"
            tag="05 / WHAT I DELIVER"
            align="center"
            className="mb-14 sm:mb-18"
          />
        </FadeIn>

        {/* 5 Numbered Services Cards in Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {servicesData.map((service, index) => {
            const isWide = index === 0 || index === 3;
            return (
              <FadeIn
                key={service.number}
                delay={index * 0.08}
                y={20}
                className={isWide ? 'md:col-span-1 lg:col-span-1' : ''}
              >
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-[#FDFBF7] border border-black/8 shadow-sm hover:border-black/16 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    {/* Header: Number + Accent Pill */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#ECE6DC] text-[#141413] border border-black/5">
                        {service.number}
                      </span>
                      <div
                        className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125"
                        style={{ backgroundColor: service.accent }}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-[#141413] font-bold text-lg sm:text-xl tracking-tight uppercase mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#57606A] text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Technical Scope Checklist */}
                  <div className="pt-4 border-t border-black/5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C959F] block mb-2.5">
                      CORE CAPABILITIES
                    </span>
                    <ul className="space-y-2">
                      {service.scope.map((item, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 text-xs text-[#24292F] font-mono">
                          <CheckCircle2
                            className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                            style={{ color: service.accent }}
                          />
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Prominent "Hire Me / Let's Work Together" CTA Banner */}
        <FadeIn delay={0.25} y={20} className="mt-14 sm:mt-18">
          <div className="rounded-3xl bg-[#ECE6DC] border border-black/10 p-8 sm:p-10 md:p-12 relative overflow-hidden">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/8 text-xs font-mono text-[#BD5338] font-semibold mb-4">
                <Terminal className="w-3.5 h-3.5" />
                <span>OPEN FOR HIGH-IMPACT ROLES & CONTRACTS</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#141413] uppercase tracking-tight mb-4">
                Need high-throughput backends or distributed systems built right?
              </h3>

              <p className="text-[#57606A] text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                I engineer production-grade systems focused on reliability, low latency, and maintainable architecture.
                Whether you need a full-time software engineer, backend specialist, or systems consulting, let&apos;s talk.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${profile.email}?subject=Project%20Inquiry%20%7C%20Engineering%20Opportunity&body=Hi%20Manav,%0D%0A%0D%0AI'd%20like%20to%20discuss%20an%20engineering%20opportunity%20or%20project...`}
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#141413] text-[#F4F0E8] font-mono text-xs sm:text-sm uppercase tracking-wider font-bold hover:bg-[#BD5338] transition-colors duration-200 shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Hire Me</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <div className="flex items-center gap-2 text-xs font-mono text-[#57606A] px-3 py-2">
                  <span className="w-2 h-2 rounded-full bg-[#3F6E50] animate-pulse" />
                  <span>Fast response time &bull; Direct inbox: {profile.email}</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ServicesSection;
