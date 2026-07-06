import React from 'react';

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
      className="rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      {label}
    </button>
  );
};

export default ContactButton;
