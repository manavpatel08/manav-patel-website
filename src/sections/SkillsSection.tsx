import React, { useState } from 'react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { skills } from '../data/resumeData';
import PhysicsPlayground from '../components/PhysicsPlayground';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  MonitorSmartphone, 
  Server, 
  Database, 
  BrainCircuit, 
  Cloud, 
  Wrench 
} from 'lucide-react';

const categories = [
  { title: 'Languages', items: skills.languages, Icon: Code2 },
  { title: 'Frontend', items: skills.frontend, Icon: MonitorSmartphone },
  { title: 'Backend', items: skills.backend, Icon: Server },
  { title: 'Databases', items: skills.databases, Icon: Database },
  { title: 'AI / ML', items: skills.aiml, Icon: BrainCircuit },
  { title: 'Cloud & DevOps', items: skills.cloud, Icon: Cloud },
  { title: 'Developer Tools', items: skills.tools, Icon: Wrench },
];

const SkillsSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'physics'>('physics');

  return (
    <section
      id="skills"
      className="bg-section-skills rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10 -mt-10 border-t border-white/5 overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center mb-14 sm:mb-18 md:mb-24 gap-8 relative z-20">
        <FadeIn delay={0} y={40} className="w-full">
          <SectionHeading text="Skills" />
        </FadeIn>
        
        <FadeIn delay={0.2} y={20}>
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setViewMode('physics')}
              className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
                viewMode === 'physics' 
                  ? 'bg-gradient-to-r from-[#B600A8] to-purple-600 text-white shadow-lg shadow-purple-500/20' 
                  : 'text-[#D7E2EA]/60 hover:text-[#D7E2EA]'
              }`}
            >
              Playground
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-[#B600A8] to-purple-600 text-white shadow-lg shadow-purple-500/20' 
                  : 'text-[#D7E2EA]/60 hover:text-[#D7E2EA]'
              }`}
            >
              Organized
            </button>
          </div>
        </FadeIn>
      </div>

      <div className="max-w-6xl mx-auto relative z-20">
        <AnimatePresence mode="wait">
          {viewMode === 'physics' ? (
            <motion.div
              key="physics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PhysicsPlayground />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
            >
              {categories.map((cat, catIndex) => (
                <FadeIn key={cat.title} delay={catIndex * 0.08} y={25}>
                  <div className="group h-full p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500 relative overflow-hidden backdrop-blur-sm">
                    {/* Hover Glow */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-white/5 rounded-2xl text-[#D7E2EA]/70 group-hover:text-white group-hover:bg-purple-500/20 transition-colors duration-500">
                          <cat.Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-sm">
                          {cat.title}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((skill) => (
                          <span 
                            key={skill}
                            className="inline-block bg-[#0A0A0A] text-[#D7E2EA]/70 border border-white/5 font-mono text-xs px-3 py-1.5 rounded-md hover:bg-white/10 hover:text-white transition-colors duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillsSection;
