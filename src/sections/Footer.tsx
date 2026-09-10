import React from 'react';
import { profile } from '../data/resumeData';
import { Mail, ArrowUp, FileText, ArrowUpRight } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: false });
    }
  };

  return (
    <footer className="bg-[#141413] text-[#F4F0E8] border-t border-white/10 py-10 sm:py-12 px-6 md:px-12 relative select-none">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Main Row: Structured 2-Column Editorial Layout */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          
          {/* Left Column: Identity & Engineering Descriptor */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#BD5338]" />
              <span className="font-mono text-base sm:text-lg font-black tracking-wider uppercase text-[#F4F0E8]">
                {profile.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-[#827E77]">
              Software Engineering · Backend Systems · Architecture
            </p>
            <p className="text-[11px] font-mono tracking-wider text-[#C48229] uppercase font-semibold pt-1">
              BUILDING SYSTEMS THAT SCALE, THINK, AND PERFORM.
            </p>
          </div>

          {/* Center / Right Column: Verified Project Links (LinkedIn prioritized) */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#F4F0E8] hover:bg-white/10 hover:border-[#3A6D8C] transition-all duration-200 shadow-sm"
              aria-label="LinkedIn profile"
            >
              <FaLinkedin className="w-3.5 h-3.5 text-[#3A6D8C]" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-[#827E77]" />
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#F4F0E8] hover:bg-white/10 hover:border-white/20 transition-all duration-200 shadow-sm"
              aria-label="GitHub profile"
            >
              <FaGithub className="w-3.5 h-3.5 text-[#ECE6DC]" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-[#827E77]" />
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#F4F0E8] hover:bg-white/10 hover:border-[#BD5338] transition-all duration-200 shadow-sm"
              aria-label="Send email"
            >
              <Mail className="w-3.5 h-3.5 text-[#BD5338]" />
              <span>Email</span>
            </a>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#F4F0E8] hover:bg-white/10 hover:border-[#C48229] transition-all duration-200 shadow-sm"
              aria-label="Open Resume"
            >
              <FileText className="w-3.5 h-3.5 text-[#C48229]" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-[#827E77]" />
            </a>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Subtle Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#827E77]">
          <div>
            <span>&copy; 2026 {profile.name}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#827E77] hover:text-[#F4F0E8] transition-colors cursor-pointer group"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <div className="w-5 h-5 rounded bg-white/10 border border-white/15 flex items-center justify-center group-hover:border-white/30 transition-colors">
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform text-[#F4F0E8]" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
