import React, { useLayoutEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../sections/Footer';
import ScrollProgress from '../components/ScrollProgress';
import GhostButton from '../components/GhostButton';
import { projects } from '../data/resumeData';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';

const ProjectsPage: React.FC = () => {
  // Guarantee page always mounts at the exact top
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
    }, 15);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      
      <main className="bg-[#F4F0E8] min-h-screen font-sans text-[#141413] pt-28 sm:pt-32 pb-24 px-6 md:px-12 select-none">
        <div className="max-w-6xl mx-auto">
          
          <FadeIn delay={0.05} y={15}>
            <Link 
              to="/" 
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
                if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
              }}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#524F4A] hover:text-[#141413] transition-colors mb-8 p-2 -ml-2 rounded-lg hover:bg-black/5 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Link>

            <div className="border-b border-black/8 pb-8 mb-14">
              <span className="text-xs font-mono uppercase tracking-widest text-[#827E77] block mb-2 font-semibold">
                SYSTEM REPOSITORY
              </span>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#141413] mb-4">
                All Projects
              </h1>
              <p className="text-[#524F4A] text-base sm:text-lg max-w-2xl leading-relaxed">
                Complete engineering catalog detailing systems built, core architectural trade-offs, tech stacks, and metrics.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-16">
            {projects.map((project, index) => (
              <FadeIn key={project.name} delay={0.1 + index * 0.08} y={24}>
                <div className="p-7 sm:p-9 md:p-11 rounded-3xl bg-[#FDFBF7] border border-black/8 shadow-sm hover:border-black/16 hover:shadow-md transition-all duration-300 group">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    
                    {/* Left details */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                      
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[#ECE6DC] text-[#141413] border border-black/5">
                          {project.number}
                        </span>
                        <span className="text-xs font-mono uppercase tracking-widest text-[#524F4A] font-semibold">
                          {project.category}
                        </span>
                        <span className="text-[#827E77] text-xs font-mono">•</span>
                        <span className="text-xs font-mono text-[#827E77]">
                          {project.date}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-[#141413] tracking-tight uppercase">
                        {project.name}
                      </h2>

                      <p className="text-[#524F4A] text-sm sm:text-base leading-relaxed font-normal">
                        {project.description}
                      </p>

                      <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#ECE6DC]/70 border border-black/5 text-xs font-mono text-[#141413] w-fit">
                        <Sparkles className="w-3.5 h-3.5 text-[#C48229]" />
                        <span className="font-semibold">{project.metrics}</span>
                      </div>

                      <div className="space-y-2 pt-2">
                        {project.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#524F4A]">
                            <CheckCircle2 className="w-4 h-4 text-[#3F6E50] shrink-0 mt-0.5" />
                            <span className="leading-snug">{h}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 pt-3">
                        {project.techStack.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-2.5 py-1 rounded bg-[#ECE6DC] text-[#141413] font-mono text-xs border border-black/5 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 pt-3">
                        <GhostButton label="View Code" href={project.github} icon="github" />
                        {project.live && (
                          <GhostButton label="Live System" href={project.live} icon="external" variant="solid" />
                        )}
                      </div>

                    </div>

                    {/* Right visual preview */}
                    <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-black/8 bg-[#ECE6DC] aspect-video lg:aspect-[4/3] relative">
                      <img 
                        src={project.image} 
                        alt={`${project.name} preview`} 
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>

                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProjectsPage;
