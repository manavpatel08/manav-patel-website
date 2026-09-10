import React, { useEffect, useState } from 'react';
import { navLinks, profile } from '../data/resumeData';
import { ArrowUpRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Robust scroll-spy across all 7 sections
      const sections = navLinks.map((link) => link.toLowerCase());
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          return;
        }
      }

      if (window.scrollY < 200) {
        setActiveSection('about');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileOpen(false);
      setActiveSection(id);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none ${
          isScrolled
            ? 'py-3 sm:py-3.5 px-6 md:px-12 bg-[#F4F0E8]/95 backdrop-blur-md border-b border-black/8 shadow-sm shadow-black/[0.02]'
            : 'py-5 sm:py-6 px-6 md:px-12 bg-[#F4F0E8]/70 backdrop-blur-xs border-b border-black/5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand / Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMobileOpen(false);
            }}
            className="text-[#141413] font-bold text-base sm:text-lg tracking-wider uppercase hover:opacity-80 transition-opacity font-mono flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#BD5338]" />
            <span>MANAV PATEL</span>
          </a>

          {/* Desktop Navigation Links + Minimal Resume Button */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <nav className="flex items-center gap-6 xl:gap-7">
              {navLinks.map((link) => {
                const id = link.toLowerCase();
                const isActive = activeSection === id;
                return (
                  <a
                    key={link}
                    href={`#${id}`}
                    onClick={(e) => handleClick(e, id)}
                    className={`relative py-1 font-mono uppercase text-xs tracking-wider transition-colors duration-150 ${
                      isActive
                        ? 'text-[#141413] font-bold'
                        : 'text-[#57606A] hover:text-[#141413]'
                    }`}
                  >
                    <span>{link}</span>
                    {/* Subtle Solid Accent Underline (NO GRADIENT) */}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#BD5338] origin-left transition-transform duration-200 ease-out ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Minimal Prominent Resume Header Button */}
            <div className="pl-2 border-l border-black/10 flex items-center">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-black/15 bg-white text-[#141413] hover:border-black/30 hover:bg-[#FDFBF7] transition-all font-mono text-xs uppercase tracking-wider font-semibold shadow-xs"
              >
                <span>Resume</span>
                <ArrowUpRight className="w-3 h-3 text-[#BD5338]" />
              </a>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-black/15 bg-white text-[#141413] font-mono text-[11px] uppercase tracking-wider font-semibold"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-[#BD5338]" />
            </a>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="flex flex-col gap-1.5 cursor-pointer z-50 p-2"
              aria-label="Toggle navigation menu"
            >
              <span
                className={`w-5 h-0.5 bg-[#141413] transition-all duration-300 ${
                  isMobileOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-[#141413] transition-all duration-300 ${
                  isMobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-[#141413] transition-all duration-300 ${
                  isMobileOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#F4F0E8]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 transition-all duration-300 lg:hidden ${
          isMobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#8C959F] mb-2">
          SYSTEM MODULE NAVIGATION
        </div>

        {navLinks.map((link, i) => {
          const id = link.toLowerCase();
          const isActive = activeSection === id;
          return (
            <a
              key={link}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`font-mono font-bold uppercase tracking-widest text-xl transition-all duration-200 flex items-center gap-2 ${
                isActive ? 'text-[#BD5338]' : 'text-[#141413] hover:text-[#BD5338]'
              }`}
              style={{
                transitionDelay: isMobileOpen ? `${i * 40}ms` : '0ms',
                transform: isMobileOpen ? 'translateY(0)' : 'translateY(16px)',
              }}
            >
              <span className="text-xs text-[#8C959F]">0{i + 1}</span>
              <span>{link}</span>
            </a>
          );
        })}

        <div className="pt-4 border-t border-black/10 mt-2">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#141413] text-[#F4F0E8] font-mono text-xs uppercase tracking-wider font-bold shadow-sm"
          >
            <span>Open Resume (PDF)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#BD5338]" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;

// done
