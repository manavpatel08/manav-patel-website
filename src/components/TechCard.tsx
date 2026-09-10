import React from 'react';

interface TechCardProps {
  name: string;
  tagline: string;
}

const TechCard: React.FC<TechCardProps> = ({ name, tagline }) => {
  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-center gap-1.5 w-[190px] h-[100px] sm:w-[210px] sm:h-[110px] rounded-2xl bg-white border border-black/8 shadow-sm hover:border-black/16 hover:shadow-md transition-all duration-200 cursor-default select-none">
      <span className="text-[#171717] font-bold text-sm sm:text-base tracking-wide">
        {name}
      </span>
      <span className="text-[#57606A] font-mono text-[11px] uppercase tracking-wider">
        {tagline}
      </span>
    </div>
  );
};

export default TechCard;

// done
