import React from 'react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import GhostButton from '../components/GhostButton';
import { projects } from '../data/resumeData';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const ProjectsSection: React.FC = () => {
  // All 4 production systems displayed
  const featuredProjects = projects;

  return (
    <section
      id="projects"
      className="bg-[#ECE6DC] px-6 md:px-12 py-24 sm:py-28 md:py-36 relative border-t border-black/8 select-none"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={20}>
          <SectionHeading 
            text="Featured Projects" 
            tag="03 / PRODUCTION SYSTEMS" 
            align="center" 
            className="mb-14 sm:mb-18" 
          />
        </FadeIn>

        <div className="space-y-12 sm:space-y-16">
          {featuredProjects.map((project, i) => (
            <FadeIn key={project.name} delay={i * 0.1} y={24}>
              <div className="rounded-3xl bg-[#FDFBF7] border border-black/8 shadow-sm p-6 sm:p-8 md:p-10 hover:border-black/16 hover:shadow-md transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Column (7 cols): Architecture & Details */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    
                    {/* Metadata bar */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[#F7F6F2] text-[#171717] border border-black/5">
                        {project.number}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#57606A]">
                        {project.category}
                      </span>
                      <span className="text-[#8C959F] text-xs font-mono">•</span>
                      <span className="text-xs font-mono text-[#8C959F]">
                        {project.date}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight uppercase">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[#57606A] text-sm sm:text-base leading-relaxed">
                      {project.description}
                    </p>

                    {/* Metrics Callout */}
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#F7F6F2] border border-black/5 text-xs font-mono text-[#171717] w-fit">
                      <Sparkles className="w-3.5 h-3.5 text-[#B8732E]" />
                      <span className="font-semibold">{project.metrics}</span>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2 pt-2">
                      {project.highlights.slice(0, 3).map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#57606A]">
                          <CheckCircle2 className="w-4 h-4 text-[#4E8752] flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-3">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded bg-[#EFECE6] text-[#24292F] font-mono text-xs border border-black/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 pt-3">
                      <GhostButton label="View Code" href={project.github} icon="github" />
                      {project.live && (
                        <GhostButton label="Live System" href={project.live} icon="external" variant="solid" />
                      )}
                    </div>

                  </div>

                  {/* Right Column (5 cols): Clean visual frame */}
                  <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-black/8 bg-[#F7F6F2] aspect-video lg:aspect-[4/3] relative group">
                    <img
                      src={project.image}
                      alt={`${project.name} preview`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* View all projects navigation trigger */}
        <FadeIn delay={0.25} y={20} className="mt-16 flex justify-center">
          <Link
            to="/projects"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
              if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
            }}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white border border-black/10 text-[#171717] font-medium uppercase tracking-wider text-xs sm:text-sm hover:bg-[#171717] hover:text-white hover:border-[#171717] transition-all duration-200 shadow-sm"
          >
            <span>Explore All Projects (4)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>

      </div>
    </section>
  );
};

export default ProjectsSection;
