import React from 'react';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

interface GhostButtonProps {
  label: string;
  href?: string;
  icon?: 'external' | 'github';
  variant?: 'outline' | 'solid';
}

const GhostButton: React.FC<GhostButtonProps> = ({ label, href = '#', icon = 'external', variant = 'outline' }) => {
  const Icon = icon === 'github' ? FaGithub : ExternalLink;

  if (variant === 'solid') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-[#171717] text-[#F7F6F2] font-medium uppercase tracking-wider px-4 py-2 text-xs hover:bg-[#2A2E33] transition-all duration-200 shadow-sm"
      >
        <span>{label}</span>
        <Icon className="w-3.5 h-3.5 text-[#8C959F]" />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-black/15 bg-white text-[#171717] font-medium uppercase tracking-wider px-4 py-2 text-xs hover:bg-[#EFECE6] hover:border-black/25 transition-all duration-200 shadow-sm"
    >
      <span>{label}</span>
      <Icon className="w-3.5 h-3.5 text-[#57606A]" />
    </a>
  );
};

export default GhostButton;

// done
