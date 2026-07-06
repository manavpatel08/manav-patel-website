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
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Terminal state machine
  useEffect(() => {
    if (step === 1) {
      // Type out the command
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(command.substring(0, i + 1));
        i++;
        if (i === command.length) {
          clearInterval(interval);
          setTimeout(() => setStep(2), 500);
        }
      }, 100);
      return () => clearInterval(interval);
    } else if (step === 2) {
      // Connecting...
      const timeout = setTimeout(() => setStep(3), 800);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  const links = [
    { label: 'Email', value: profile.email, icon: <Mail className="w-4 h-4" />, href: `mailto:${profile.email}` },
    { label: 'GitHub', value: 'manavpatel08', icon: <FaGithub className="w-4 h-4" />, href: profile.github },
    { label: 'LinkedIn', value: 'manavpatel', icon: <FaLinkedin className="w-4 h-4" />, href: profile.linkedin },
    { label: 'Resume', value: 'Download PDF', icon: <FileText className="w-4 h-4" />, href: profile.resumeUrl },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-section-contact rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10"
    >
      <FadeIn delay={0} y={40}>
        <SectionHeading text="Contact" className="mb-14 sm:mb-18 md:mb-24" />
      </FadeIn>

      <div className="max-w-3xl mx-auto">
        <FadeIn delay={0.2} y={30}>
          {/* Terminal Window */}
          <div className="w-full rounded-2xl bg-[#0C0C0C] border border-white/10 overflow-hidden shadow-2xl relative gradient-border">
            {/* Terminal Header */}
            <div className="bg-white/5 border-b border-white/5 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 text-center text-xs font-mono text-[#D7E2EA]/40">
                manav@portfolio ~ connect
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 sm:p-8 font-mono text-sm sm:text-base min-h-[320px] text-[#D7E2EA]">

              {/* Command Line */}
              {step >= 1 && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#28c840]">manav@portfolio</span>
                  <span className="text-[#D7E2EA]/50">~</span>
                  <span className="text-[#B600A8]">$</span>
                  <span className="text-[#D7E2EA]">{typedText}</span>
                  {step === 1 && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-2 h-5 bg-[#D7E2EA] inline-block ml-1 align-middle"
                    />
                  )}
                </div>
              )}

              {/* Connecting Output */}
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 text-[#D7E2EA]/60"
                >
                  [i] Connecting to secure channel... <br />
                  {step === 2 && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block mt-2"
                    >
                      Establishing connection...
                    </motion.span>
                  )}
                </motion.div>
              )}

              {/* Interactive Links Output */}
              {step >= 3 && (
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-[#28c840] mb-4"
                  >
                    ✓ Connection established. Protocols active.
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {links.map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#B600A8]/50 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-[#B600A8] group-hover:text-[#D7E2EA] transition-colors">
                            {link.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-[#D7E2EA]/50">{link.label}</span>
                            <span className="font-medium text-[#D7E2EA] group-hover:text-[#B600A8] transition-colors">
                              {link.value}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#D7E2EA]/30 group-hover:text-[#D7E2EA] group-hover:translate-x-1 transition-all" />
                      </motion.a>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-6 flex items-center gap-2 pt-6 border-t border-white/5"
                  >
                    <span className="text-[#28c840]">manav@portfolio</span>
                    <span className="text-[#D7E2EA]/50">~</span>
                    <span className="text-[#B600A8]">$</span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-2 h-5 bg-[#D7E2EA] inline-block ml-1 align-middle"
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
