import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ContactButtonProps {
  label?: string;
  onClick?: () => void;
}

const ContactButton: React.FC<ContactButtonProps> = ({ label = "Let's Connect", onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      className="group inline-flex items-center gap-2 rounded-lg bg-[#171717] text-[#F7F6F2] font-medium text-xs sm:text-sm uppercase tracking-wider px-5 py-2.5 hover:bg-[#2A2E33] transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98]"
    >
      <span>{label}</span>
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#8C959F] group-hover:text-white" />
    </button>
  );
};

export default ContactButton;

// done
