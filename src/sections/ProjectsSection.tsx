import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GhostButton from '../components/GhostButton';
import SectionHeading from '../components/SectionHeading';
import FadeIn from '../components/FadeIn';
import { projects } from '../data/resumeData';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
  totalCards: number;
  targetScale: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  targetScale,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={cardRef} className="h-[85vh] sticky top-24 md:top-32" style={{ top: `${index * 28}px` }}>
      <motion.div
        className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 h-full flex flex-col origin-top"
        style={{ scale }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-4 sm:mb-6">
          <div className="flex items-start gap-4 sm:gap-6 md:gap-10">
            <span
              className="hero-heading font-black flex-shrink-0"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)', lineHeight: 1 }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1 pt-2 sm:pt-4">
              <span className="text-[#D7E2EA]/60 font-light uppercase tracking-widest text-xs sm:text-sm">
                {project.category}
              </span>
              <h3
                className="text-[#D7E2EA] font-medium uppercase"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
              <p className="text-[#D7E2EA]/40 font-light text-xs sm:text-sm mt-1 max-w-lg">
                {project.date}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <GhostButton label="View Code" href={project.github} icon="github" />
            {project.live && (
              <GhostButton label="Live Demo" href={project.live} icon="external" />
            )}
          </div>
        </div>

        {/* Content grid */}
        <div className="flex gap-3 sm:gap-4 flex-1 min-h-0">
          {/* Left column - 40%: Info */}
          <div className="w-[40%] flex flex-col gap-3 sm:gap-4">
            {/* Description card */}
            <div className="glass-card rounded-[24px] sm:rounded-[32px] md:rounded-[40px] p-4 sm:p-5 md:p-6 flex-1 flex flex-col gap-3" style={{ height: 'clamp(130px, 16vw, 230px)' }}>
              <p className="text-[#D7E2EA]/70 font-light text-xs sm:text-sm leading-relaxed line-clamp-4">
                {project.description}
              </p>
              {/* Metrics */}
              <p className="text-[#B600A8] font-medium text-[10px] sm:text-xs uppercase tracking-wider mt-auto">
                {project.metrics}
              </p>
            </div>

            {/* Tech stack */}
            <div className="glass-card rounded-[24px] sm:rounded-[32px] md:rounded-[40px] p-4 sm:p-5 md:p-6 flex flex-col gap-3" style={{ height: 'clamp(160px, 22vw, 340px)' }}>
              <p className="text-[#D7E2EA]/30 font-light text-[10px] sm:text-xs uppercase tracking-widest">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/70 bg-[#D7E2EA]/[0.06] px-3 py-1.5 rounded-full border border-[#D7E2EA]/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {/* Highlights */}
              <div className="mt-auto flex flex-col gap-1.5">
                {project.highlights.slice(0, 3).map((h, j) => (
                  <p key={j} className="text-[#D7E2EA]/40 font-light text-[9px] sm:text-[11px] leading-snug flex items-start gap-1.5">
                    <span className="text-[#B600A8] mt-px">▸</span>
                    <span className="line-clamp-2">{h}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - 60%: Visual */}
          <div className="w-[60%] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden relative glass-card">
            {/* Generated project preview */}
            <ProjectVisual project={project} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* Project visual: mockup image with perspective tilt */
const ProjectVisual: React.FC<{ project: (typeof projects)[0] }> = ({ project }) => {
  return (
    <div className="w-full h-full relative overflow-hidden group/visual">
      {/* Gradient overlay for blending */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent z-10 opacity-40" />
      
      {/* Mockup image */}
      <img
        src={project.image}
        alt={`${project.name} mockup`}
        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/visual:scale-105"
        loading="lazy"
      />

      {/* Project name watermark */}
      <p
        className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 text-[#D7E2EA]/[0.08] font-black uppercase text-3xl sm:text-5xl md:text-6xl tracking-tighter select-none z-20"
      >
        {project.name}
      </p>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const featuredProjects = projects.slice(0, 3);
  const totalCards = featuredProjects.length;

  return (
    <section
      id="projects"
      className="bg-section-projects rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <SectionHeading text="Projects" className="mb-16 sm:mb-20 md:mb-28" />
      </FadeIn>

      <div className="max-w-7xl mx-auto">
        {featuredProjects.map((project, i) => {
          const targetScale = 1 - (totalCards - 1 - i) * 0.03;
          return (
            <ProjectCard
              key={project.number}
              project={project}
              index={i}
              totalCards={totalCards}
              targetScale={targetScale}
            />
          );
        })}
      </div>

      <FadeIn delay={0.2} y={40} className="mt-24 flex justify-center">
        <Link 
          to="/projects"
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent overflow-hidden rounded-full border border-white/10 text-[#D7E2EA] font-medium uppercase tracking-widest text-sm sm:text-base transition-all duration-300 hover:border-white/30 hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#B600A8]/10 via-[#7621B0]/10 to-[#BE4C00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10">Explore All Projects</span>
          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </FadeIn>
    </section>
  );
};

export default ProjectsSection;
