import React from 'react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { scopeData, profile } from '../data/resumeData';
import { FileText, ArrowRight, ShieldCheck, CheckCircle2, ArrowUpRight } from 'lucide-react';

const ScopeSection: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="scope"
      className="bg-[#ECE6DC] px-6 md:px-12 py-24 sm:py-28 md:py-36 relative border-t border-black/8 select-none"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={20}>
          <SectionHeading
            text="Scope & Deliverables"
            tag="06 / ENGAGEMENT BOUNDARIES"
            align="center"
            className="mb-6 sm:mb-8"
          />
        </FadeIn>

        {/* Editorial Subtitle */}
        <FadeIn delay={0.08} y={15} className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <p className="text-[#57606A] text-sm sm:text-base leading-relaxed font-normal">
            {scopeData.summary}
          </p>
        </FadeIn>

        {/* 3 Distinct Engagement Models */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 mb-14 sm:mb-18">
          {scopeData.models.map((model, idx) => (
            <FadeIn key={model.number} delay={idx * 0.1} y={20}>
              <div className="h-full p-6 sm:p-8 rounded-2xl bg-[#FDFBF7] border border-black/8 shadow-sm hover:border-black/16 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div>
                  {/* Top bar: Number + Model Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#ECE6DC] text-[#141413] border border-black/5">
                      {model.number}
                    </span>
                    <span
                      className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                      style={{
                        color: model.accent,
                        borderColor: `${model.accent}30`,
                        backgroundColor: `${model.accent}08`,
                      }}
                    >
                      {model.badge}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C959F] block mb-1">
                    {model.tagline}
                  </span>

                  <h3 className="text-[#141413] font-bold text-lg sm:text-xl tracking-tight uppercase mb-3">
                    {model.title}
                  </h3>

                  <p className="text-[#57606A] text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {model.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="pt-4 border-t border-black/5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C959F] block mb-2.5">
                    STANDARD DELIVERABLES
                  </span>
                  <ul className="space-y-2">
                    {model.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs text-[#24292F] font-mono">
                        <CheckCircle2
                          className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                          style={{ color: model.accent }}
                        />
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Production Standards & Engineering Hygiene Matrix */}
        <FadeIn delay={0.2} y={20}>
          <div className="rounded-3xl bg-[#FDFBF7] border border-black/8 p-6 sm:p-8 md:p-10 mb-14 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono text-[#BD5338] uppercase tracking-wider font-semibold mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Architectural Guarantees &amp; SLAs</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-bold text-[#141413] uppercase tracking-tight mb-8">
              Engineering Hygiene Built In By Default
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {scopeData.standards.map((std, sIdx) => (
                <div
                  key={sIdx}
                  className="p-5 rounded-xl bg-[#ECE6DC]/60 border border-black/5 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C959F] block mb-1">
                      {std.label}
                    </span>
                    <span className="font-mono text-xl sm:text-2xl font-black text-[#141413] block mb-2">
                      {std.value}
                    </span>
                  </div>
                  <p className="text-xs text-[#57606A] font-mono leading-relaxed">
                    {std.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Action Row: View Resume & Initiate Handshake */}
        <FadeIn delay={0.25} y={20}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-[#141413] text-[#F4F0E8] border border-black/10 shadow-sm">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#BD5338] block mb-1 font-semibold">
                READY TO ENGAGE
              </span>
              <h4 className="font-mono text-base sm:text-lg font-bold uppercase tracking-tight text-[#F4F0E8]">
                Review verified qualifications or initiate direct technical discussion.
              </h4>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FDFBF7] text-[#141413] text-xs font-mono uppercase tracking-wider font-bold hover:bg-white transition-colors duration-200 shadow-sm"
              >
                <FileText className="w-3.5 h-3.5 text-[#BD5338]" />
                <span>View Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={scrollToContact}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#BD5338] text-white text-xs font-mono uppercase tracking-wider font-bold hover:bg-[#a8442c] transition-colors duration-200 shadow-sm"
              >
                <span>Initiate Contact</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ScopeSection;
