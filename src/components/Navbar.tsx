import React, { useEffect, useState } from 'react';
import { navLinks } from '../data/resumeData';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    const observers: IntersectionObserver[] = [];

    navLinks.forEach((link) => {
      const id = link.toLowerCase();
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 px-6 md:px-10 bg-[#0C0C0C]/80 backdrop-blur-xl border-b border-white/5'
            : 'py-6 md:py-8 px-6 md:px-10 bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMobileOpen(false);
            }}
            className="text-[#D7E2EA] font-bold text-lg sm:text-xl tracking-wider uppercase hover:opacity-70 transition-opacity duration-200"
          >
            MP
          </a>

          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => {
              const id = link.toLowerCase();
              return (
                <a
                  key={link}
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  className={`relative group font-medium uppercase tracking-wider text-sm lg:text-[1rem] transition-all duration-300 ${
                    activeSection === id ? 'text-[#D7E2EA]' : 'text-[#D7E2EA]/60 hover:text-[#D7E2EA]'
                  }`}
                >
                  {link}
                  <span 
                    className={`absolute -bottom-1.5 left-0 w-full h-[2px] bg-gradient-to-r from-[#B600A8] to-[#7621B0] origin-left transition-transform duration-300 ease-out ${
                      activeSection === id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} 
                  />
                </a>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden flex flex-col gap-1.5 cursor-pointer z-50"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`w-6 h-0.5 bg-[#D7E2EA] transition-all duration-300 ${
                isMobileOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#D7E2EA] transition-all duration-300 ${
                isMobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#D7E2EA] transition-all duration-300 ${
                isMobileOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0C0C0C]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          isMobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link, i) => {
          const id = link.toLowerCase();
          return (
            <a
              key={link}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`text-[#D7E2EA] font-bold uppercase tracking-widest text-2xl hover:opacity-70 transition-all duration-200 ${
                activeSection === id ? 'nav-active' : 'opacity-60'
              }`}
              style={{
                transitionDelay: isMobileOpen ? `${i * 80}ms` : '0ms',
                transform: isMobileOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {link}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
