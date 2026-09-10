import React, { useState, useEffect, useRef } from 'react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { profile } from '../data/resumeData';
import { Mail, FileText, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const ContactSection: React.FC = () => {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const command = 'connect --manav';

  // Intersection observer to start animation when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setStep(1);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Terminal state machine
  useEffect(() => {
    if (step === 1) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(command.substring(0, i + 1));
        i++;
        if (i === command.length) {
          clearInterval(interval);
          setTimeout(() => setStep(2), 400);
        }
      }, 75);
      return () => clearInterval(interval);
    } else if (step === 2) {
      const timeout = setTimeout(() => setStep(3), 600);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  const links = [
    { label: 'Email', value: profile.email, icon: <Mail className="w-4 h-4" />, href: `mailto:${profile.email}` },
    { label: 'LinkedIn', value: 'manav-patel', icon: <FaLinkedin className="w-4 h-4" />, href: profile.linkedin },
    { label: 'GitHub', value: 'manavpatel08', icon: <FaGithub className="w-4 h-4" />, href: profile.github },
    { label: 'Resume', value: 'Download PDF', icon: <FileText className="w-4 h-4" />, href: profile.resumeUrl },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-[#F7F6F2] px-6 md:px-12 py-24 sm:py-28 md:py-36 relative border-t border-black/8 select-none"
    >
      <FadeIn delay={0} y={20}>
        <SectionHeading 
          text="Contact" 
          tag="07 / DIRECT COMMUNICATIONS" 
          align="center" 
          className="mb-14 sm:mb-18" 
        />
      </FadeIn>

      <div className="max-w-3xl mx-auto">
        <FadeIn delay={0.15} y={20}>
          {/* Minimal Engineering Terminal Window */}
          <div className="w-full rounded-2xl bg-white border border-black/10 overflow-hidden shadow-sm">
            
            {/* Terminal Header */}
            <div className="bg-[#EFECE6] border-b border-black/8 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#E07A5F]" />
                <div className="w-3 h-3 rounded-full bg-[#F2CC8F]" />
                <div className="w-3 h-3 rounded-full bg-[#81B29A]" />
              </div>
              <div className="text-center text-[11px] font-mono text-[#57606A]">
                manav@gateway ~ session
              </div>
              <div className="text-[10px] font-mono text-[#8C959F]">
                SECURE
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 sm:p-8 font-mono text-sm min-h-[300px] text-[#171717]">

              {/* Command Line */}
              {step >= 1 && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#4E8752] font-semibold">manav@gateway</span>
                  <span className="text-[#8C959F]">~</span>
                  <span className="text-[#3B76A6] font-bold">$</span>
                  <span className="text-[#171717] font-semibold">{typedText}</span>
                  {step === 1 && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-2 h-4 bg-[#171717] inline-block ml-0.5 align-middle"
                    />
                  )}
                </div>
              )}

              {/* Connecting Output */}
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-5 text-xs text-[#57606A]"
                >
                  [i] Initializing direct channel protocols...
                </motion.div>
              )}

              {/* Interactive Links Output */}
              {step >= 3 && (
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xs text-[#4E8752] font-semibold mb-4"
                  >
                    ✓ Session active. Select a protocol to initiate contact:
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {links.map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + (i * 0.08) }}
                        className="group flex items-center justify-between p-3.5 rounded-xl bg-[#F7F6F2] border border-black/5 hover:border-black/16 hover:bg-[#EFECE6] transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-[#3B76A6] group-hover:text-[#171717] transition-colors">
                            {link.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-[#8C959F] uppercase tracking-wider">{link.label}</span>
                            <span className="font-semibold text-xs text-[#171717]">
                              {link.value}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#8C959F] group-hover:text-[#171717] group-hover:translate-x-0.5 transition-transform" />
                      </motion.a>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 flex items-center gap-2 pt-4 border-t border-black/5 text-xs"
                  >
                    <span className="text-[#4E8752] font-semibold">manav@gateway</span>
                    <span className="text-[#8C959F]">~</span>
                    <span className="text-[#3B76A6] font-bold">$</span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-2 h-4 bg-[#171717] inline-block ml-0.5 align-middle"
                    />
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactSection;
