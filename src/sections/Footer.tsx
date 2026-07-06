import React from 'react';
import { profile } from '../data/resumeData';
import { Mail, ArrowUp, FileText } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-section-footer pt-20 pb-12 px-6 sm:px-10 overflow-hidden relative border-t border-black/5 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Top: Call to Action */}
        <h3 className="text-[#050505] font-semibold text-2xl sm:text-3xl md:text-4xl mb-8 tracking-tight text-center">
          Let's Build Something Great Together.
        </h3>

        {/* Middle: Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-white border border-black/10 hover:border-black/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 transition-all duration-300"
          >
            <FaLinkedin className="w-4 h-4 text-[#0077b5]" />
            <span className="text-sm font-medium text-[#111111] uppercase tracking-wider">LinkedIn</span>
          </a>
          
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-white border border-black/10 hover:border-black/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 transition-all duration-300"
          >
            <FileText className="w-4 h-4 text-[#7621B0]" />
            <span className="text-sm font-medium text-[#111111] uppercase tracking-wider">Resume</span>
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-white border border-black/10 hover:border-black/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 transition-all duration-300"
          >
            <Mail className="w-4 h-4 text-[#EA4335]" />
            <span className="text-sm font-medium text-[#111111] uppercase tracking-wider">Email</span>
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black/5 mb-8" />

        {/* Bottom: Credits and Back to Top */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <p className="text-[#333333] font-medium tracking-widest text-[11px] uppercase">
              Designed & Built by <span className="text-[#050505] font-semibold">{profile.name}</span>
            </p>
            <p className="text-[#666666] font-light text-[10px] tracking-widest uppercase">
              © {currentYear} All rights reserved
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 text-[#555555] font-medium text-xs uppercase tracking-widest hover:text-[#050505] transition-colors duration-300 group cursor-pointer"
            aria-label="Back to top"
          >
            Back to top
            <span className="w-9 h-9 rounded-full bg-black/5 border border-black/10 flex items-center justify-center group-hover:bg-black/10 group-hover:border-black/20 transition-all duration-300">
              <ArrowUp className="w-4 h-4 text-[#333333] group-hover:text-[#050505] transition-colors" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
