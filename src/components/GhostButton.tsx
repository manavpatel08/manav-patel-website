import React from 'react';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

interface GhostButtonProps {
  label: string;
  href?: string;
  icon?: 'external' | 'github';
}

const GhostButton: React.FC<GhostButtonProps> = ({ label, href = '#', icon = 'external' }) => {
  const Icon = icon === 'github' ? FaGithub : ExternalLink;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm hover:bg-[#D7E2EA]/10 transition-all duration-200"
    >
      {label}
      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
    </a>
  );
};

export default GhostButton;
