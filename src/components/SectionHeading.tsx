import React from 'react';

interface SectionHeadingProps {
  text: string;
  className?: string;
  dark?: boolean; // true = dark text on white bg
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ text, className = '', dark = false }) => {
  return (
    <h2
      className={`${dark ? 'text-[#0C0C0C]' : 'hero-heading'} font-black uppercase text-center leading-none tracking-tight ${className}`}
      style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
    >
      {text}
    </h2>
  );
};

export default SectionHeading;
