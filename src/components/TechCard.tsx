import React from 'react';

interface TechCardProps {
  name: string;
  tagline: string;
}

const TechCard: React.FC<TechCardProps> = ({ name, tagline }) => {
  return (
    <div className="gradient-border glow-hover flex-shrink-0 flex flex-col items-center justify-center gap-1.5 w-[200px] h-[120px] sm:w-[220px] sm:h-[130px] rounded-2xl cursor-default select-none">
      <span className="text-[#D7E2EA] font-semibold text-base sm:text-lg tracking-wide">
        {name}
      </span>
      <span className="text-[#D7E2EA]/40 font-light text-xs sm:text-sm uppercase tracking-widest">
        {tagline}
      </span>
    </div>
  );
};

export default TechCard;
