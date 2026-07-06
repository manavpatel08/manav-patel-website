import React, { useEffect, useRef, useState } from 'react';
import TechCard from '../components/TechCard';
import { techMarqueeRow1, techMarqueeRow2 } from '../data/resumeData';

// Triple for seamless scrolling
const row1Tripled = [...techMarqueeRow1, ...techMarqueeRow1, ...techMarqueeRow1];
const row2Tripled = [...techMarqueeRow2, ...techMarqueeRow2, ...techMarqueeRow2];

const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const raw = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(raw);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      {/* Row 1 - moves RIGHT */}
      <div className="flex gap-3 mb-3" style={{ willChange: 'transform' }}>
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {row1Tripled.map((tech, i) => (
            <TechCard key={`r1-${i}`} name={tech.name} tagline={tech.tagline} />
          ))}
        </div>
      </div>

      {/* Row 2 - moves LEFT */}
      <div className="flex gap-3" style={{ willChange: 'transform' }}>
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {row2Tripled.map((tech, i) => (
            <TechCard key={`r2-${i}`} name={tech.name} tagline={tech.tagline} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
