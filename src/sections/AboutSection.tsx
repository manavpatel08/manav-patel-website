import React from 'react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { aboutSummary } from '../data/resumeData';
import { GraduationCap, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const ServerNode = ({ delay, yOffset }: { delay: number; yOffset: number }) => (
  <motion.div
    className="w-16 h-4 rounded-md border border-white/10 bg-white/[0.02] relative overflow-hidden backdrop-blur-md"
    animate={{
      y: [yOffset, yOffset - 10, yOffset],
      opacity: [0.3, 0.7, 0.3],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    <motion.div
      className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-blue-400"
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: delay * 2 }}
    />
  </motion.div>
);

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="bg-section-about relative px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-40 overflow-hidden"
    >
      {/* Decorative SQL block */}
      <div className="absolute top-[20%] right-[10%] opacity-[0.03] font-mono text-[10px] pointer-events-none select-none hidden lg:block">
        <pre>
          {`SELECT 
  id,
  user_profile,
  tech_stack
FROM developers
WHERE mindset = 'architecture-first'
  AND passion > 0.99
ORDER BY impact DESC;`}
        </pre>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn delay={0} y={40}>
          <SectionHeading text="About me" className="mb-16 sm:mb-20 md:mb-24" />
        </FadeIn>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Story */}
          <FadeIn delay={0.1} y={30} className="relative">
            <div className="space-y-6 whitespace-pre-wrap">
              <p
                className="text-[#D7E2EA]/80 font-light leading-[1.8] tracking-wide"
                style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)' }}
              >
                {aboutSummary}
              </p>
            </div>
          </FadeIn>

          {/* Right: Cards & Abstract 3D Element */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto flex flex-col gap-6 relative">

            {/* Abstract 3D Floating Server Cluster Background */}
            <div className="absolute -top-16 -right-16 pointer-events-none opacity-40 hidden sm:block">
              <div className="relative w-48 h-48 rotate-[-15deg]">
                <ServerNode delay={0} yOffset={0} />
                <ServerNode delay={1.2} yOffset={25} />
                <ServerNode delay={2.4} yOffset={50} />
                {/* Connecting Lines */}
                <motion.div
                  className="absolute left-8 top-4 w-px h-[50px] bg-gradient-to-b from-blue-500/0 via-blue-500/30 to-blue-500/0"
                  animate={{ opacity: [0.1, 0.5, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>

            {/* Education Card */}
            <FadeIn delay={0.2} y={30}>
              <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md relative overflow-hidden group hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B600A8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-start gap-5 relative z-10">
                  <div className="p-3 rounded-xl bg-white/5 text-[#B600A8] group-hover:bg-[#B600A8]/10 transition-colors">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-[#B600A8] uppercase mb-2">Education</h4>
                    <h3 className="text-lg font-medium text-[#D7E2EA] mb-1">
                      Pandit Deendayal Energy University
                    </h3>
                    <p className="text-[#D7E2EA]/60 text-sm font-light mb-4">
                      B.Tech Computer Science
                    </p>
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-[#D7E2EA] font-mono">
                      9.37 CPI
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Leadership Card */}
            <FadeIn delay={0.3} y={30}>
              <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md relative overflow-hidden group hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-start gap-5 relative z-10">
                  <div className="p-3 rounded-xl bg-white/5 text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-blue-400 uppercase mb-2">Leadership & Activities</h4>
                    <h3 className="text-lg font-medium text-[#D7E2EA] mb-1">
                      PR & Marketing Head
                    </h3>
                    <p className="text-[#D7E2EA]/60 text-sm font-light mb-4">
                      Science & Technical Committee
                    </p>
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-[#D7E2EA] font-mono">
                      PDEU
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
