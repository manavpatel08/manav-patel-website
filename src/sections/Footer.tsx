import React from 'react';
import { profile } from '../data/resumeData';
import { Mail, ArrowUp, FileText, ArrowUpRight } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: false });
    }
  };

  return (
    <footer className="bg-[#141413] text-[#F4F0E8] border-t border-white/10 py-12 px-6 md:px-12 relative select-none">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Top Row: Closing statement + Primary Contact Actions */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C959F] block mb-1.5">
              CLOSING PERSPECTIVE
            </span>
            <p className="font-mono text-base sm:text-lg font-black tracking-wider text-[#F4F0E8] uppercase">
              BUILDING SYSTEMS THAT SCALE WITH CLARITY.
            </p>
          </div>

          {/* Clean Editorial Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={`mailto:${profile.email}?subject=Hire%20Me%20%7C%20Engineering%20Inquiry`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#BD5338] text-white text-xs font-mono uppercase tracking-wider font-bold hover:bg-[#a8442c] transition-all duration-200 shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Hire Me</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#F4F0E8] hover:bg-white/10 hover:border-white/20 transition-all duration-200 shadow-sm"
            >
              <FaLinkedin className="w-3.5 h-3.5 text-[#3A6D8C]" />
              <span>LinkedIn</span>
            </a>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#F4F0E8] hover:bg-white/10 hover:border-white/20 transition-all duration-200 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-[#C48229]" />
              <span>Resume</span>
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#F4F0E8] hover:bg-white/10 hover:border-white/20 transition-all duration-200 shadow-sm"
            >
              <Mail className="w-3.5 h-3.5 text-[#BD5338]" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Bottom Row: Attribution, Coordinates & Integrated Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8C959F]">
          <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3F6E50]" />
            <span>
              Designed &amp; Built by <strong className="text-[#F4F0E8] font-semibold">{profile.name}</strong>
            </span>
            <span className="text-white/20">•</span>
            <span>&copy; {currentYear} All rights reserved</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden md:inline text-[11px] text-[#8C959F]/80">
              COORD: 23.0225&deg; N, 72.5714&deg; E
            </span>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8C959F] hover:text-[#F4F0E8] transition-colors cursor-pointer group"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <div className="w-6 h-6 rounded-md bg-white/10 border border-white/15 flex items-center justify-center group-hover:border-white/30 shadow-sm">
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-[#F4F0E8]" />
              </div>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
