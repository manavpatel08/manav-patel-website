import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/resumeData';
import { Search } from 'lucide-react';

const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = navLinks.filter((link) =>
    link.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
    setQuery('');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setIsOpen(false); setQuery(''); }}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-[20%] left-1/2 z-[1000] w-[90%] max-w-md bg-white border border-black/10 rounded-2xl shadow-xl overflow-hidden text-[#171717]"
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-black/5">
              <Search className="w-4 h-4 text-[#8C959F]" />
              <input
                type="text"
                placeholder="Jump to section..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-[#171717] font-medium text-sm tracking-wide placeholder:text-[#8C959F] outline-none"
              />
              <kbd className="text-[10px] text-[#57606A] font-mono bg-[#EFECE6] border border-black/5 rounded px-1.5 py-0.5">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="py-2">
              {filtered.map((link) => (
                <button
                  key={link}
                  onClick={() => handleNavigate(link.toLowerCase())}
                  className="w-full text-left px-5 py-2.5 text-[#57606A] font-mono text-xs uppercase tracking-wider hover:bg-[#F7F6F2] hover:text-[#171717] transition-colors duration-150 cursor-pointer flex items-center justify-between"
                >
                  <span>{link}</span>
                  <span className="text-[10px] text-[#8C959F]">#{link.toLowerCase()}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-5 py-3 text-[#8C959F] font-mono text-xs text-center">
                  No matching section found
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
