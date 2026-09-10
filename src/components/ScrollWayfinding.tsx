import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'about', num: '01', label: 'About' },
  { id: 'experience', num: '02', label: 'Experience' },
  { id: 'projects', num: '03', label: 'Projects' },
  { id: 'skills', num: '04', label: 'Skills' },
  { id: 'competitive', num: '05', label: 'Profiles' },
  { id: 'services', num: '06', label: 'Services' },
  { id: 'contact', num: '07', label: 'Contact' },
];

export const ScrollWayfinding: React.FC = () => {
  const [activeId, setActiveId] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeIndex = sections.findIndex((s) => s.id === activeId);
  const activeSection = sections[activeIndex] || sections[0];

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 pointer-events-none select-none"
      aria-label="Section navigation progress"
    >
      {/* Current Step Counter */}
      <div className="bg-[#FDFBF7]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-black/8 shadow-sm font-mono text-[10px] tracking-wider text-[#524F4A] flex items-center gap-2 pointer-events-auto">
        <span className="font-bold text-[#141413]">{activeSection.num}</span>
        <span className="text-[#827E77]">/</span>
        <span className="text-[#827E77]">07</span>
        <span className="text-[#827E77]">&bull;</span>
        <span className="text-[#BD5338] font-bold uppercase">{activeSection.label}</span>
      </div>

      {/* Discrete Section Dots Track */}
      <div className="flex flex-col gap-2 p-1.5 bg-[#FDFBF7]/80 backdrop-blur-md rounded-full border border-black/8 shadow-sm pointer-events-auto">
        {sections.map((sec) => {
          const isActive = sec.id === activeId;
          return (
            <button
              key={sec.id}
              onClick={() => handleNavClick(sec.id)}
              className="group relative flex items-center justify-center p-1 cursor-pointer"
              aria-label={`Jump to ${sec.label}`}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2 h-5 bg-[#BD5338]'
                    : 'w-1.5 h-1.5 bg-black/20 group-hover:bg-black/40'
                }`}
              />
              
              {/* Tooltip on hover */}
              <span className="absolute right-7 px-2 py-0.5 rounded bg-[#141413] text-[#F4F0E8] text-[9px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                {sec.num} {sec.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollWayfinding;
