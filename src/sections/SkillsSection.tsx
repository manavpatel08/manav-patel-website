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
  const [viewMode, setViewMode] = useState<'physics' | 'grid'>('physics');

  return (
    <section
      id="skills"
      className="bg-[#F7F6F2] px-6 md:px-12 py-24 sm:py-28 md:py-36 relative border-t border-black/8 select-none"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Centered SKILLS Heading matching other major section headings */}
        <FadeIn delay={0} y={20}>
          <SectionHeading 
            text="Skills" 
            tag="04 / TECHNICAL CAPABILITIES" 
            align="center" 
            className="mb-8 sm:mb-10" 
          />
        </FadeIn>
        
        {/* Clean view mode toggle */}
        <FadeIn delay={0.1} y={15} className="flex justify-center mb-12 sm:mb-14">
          <div className="inline-flex p-1 bg-white rounded-lg border border-black/8 shadow-sm">
            <button
              onClick={() => setViewMode('physics')}
              className={`px-4 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                viewMode === 'physics' 
                  ? 'bg-[#171717] text-[#F7F6F2] font-semibold' 
                  : 'text-[#57606A] hover:text-[#171717]'
              }`}
            >
              Interactive Simulation
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-[#171717] text-[#F7F6F2] font-semibold' 
                  : 'text-[#57606A] hover:text-[#171717]'
              }`}
            >
              Categorized Matrix
            </button>
          </div>
        </FadeIn>

        {/* Content view */}
        <AnimatePresence mode="wait">
          {viewMode === 'physics' ? (
            <motion.div
              key="physics"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <PhysicsPlayground />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {categories.map((cat, catIndex) => (
                <FadeIn key={cat.title} delay={catIndex * 0.05} y={15}>
                  <div className="h-full p-6 rounded-2xl bg-white border border-black/8 shadow-sm hover:border-black/16 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-[#EFECE6] text-[#171717]">
                        <cat.Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-[#171717] font-bold text-sm tracking-tight uppercase">
                        {cat.title}
                      </h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((skill) => (
                        <span 
                          key={skill}
                          className="px-2.5 py-1 rounded bg-[#EFECE6] text-[#24292F] font-mono text-xs border border-black/5"
                        >
                          {skill}
                        </span>
                      ))}
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
