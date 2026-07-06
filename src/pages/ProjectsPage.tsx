import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../sections/Footer';
import ScrollProgress from '../components/ScrollProgress';
import { projects } from '../data/resumeData';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';

const ProjectsPage: React.FC = () => {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      
      <div className="bg-[#0C0C0C] min-h-screen font-kanit pt-28 pb-20 px-5 sm:px-8 md:px-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0.1} y={20}>
            <Link to="/" className="inline-flex items-center gap-2 text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors mb-10 text-sm tracking-widest uppercase">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#D7E2EA] mb-4">
              All Projects
            </h1>
            <p className="text-[#D7E2EA]/50 text-base sm:text-lg max-w-2xl mb-16">
              A complete archive of everything I've built, including detailed architecture, challenges faced, and technical implementations.
            </p>
          </FadeIn>

          <div className="space-y-24 sm:space-y-32">
            {projects.map((project) => (
              <FadeIn key={project.name} delay={0.2} y={40} className="relative group">
                {/* Project detailed card placeholder */}
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
                  
                  {/* Left: Info */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="text-[#D7E2EA]/30 font-mono text-xl">{project.number}</span>
                      <h2 className="text-3xl sm:text-4xl font-bold text-[#D7E2EA]">{project.name}</h2>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(tech => (
                        <span key={tech} className="px-3 py-1 rounded-full border border-white/10 text-[#D7E2EA]/70 text-xs uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <p className="text-[#D7E2EA]/60 leading-relaxed text-base sm:text-lg">
                      {project.description}
                    </p>

                    <div className="space-y-3 pt-4">
                      <h3 className="text-[#D7E2EA] font-semibold text-sm uppercase tracking-widest">Key Highlights</h3>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-3 text-[#D7E2EA]/70 text-sm">
                            <span className="text-[#B600A8] mt-1">▹</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-4 pt-6">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#D7E2EA] text-sm uppercase tracking-widest transition-all">
                        <FaGithub className="w-4 h-4" /> Code
                      </a>
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D7E2EA] text-[#0C0C0C] hover:bg-white text-sm font-medium uppercase tracking-widest transition-all">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    </div>
                  </div>

                  {/* Right: Visual preview */}
                  <div className="w-full lg:w-5/12 aspect-square md:aspect-video lg:aspect-square rounded-[30px] border border-white/10 relative overflow-hidden group-hover:border-white/20 transition-all duration-500">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent z-10 opacity-60 pointer-events-none" />
                    <img 
                      src={project.image} 
                      alt={`${project.name} preview`} 
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute bottom-6 left-6 z-20 text-[#D7E2EA] font-medium tracking-wide">
                      <p className="text-[#D7E2EA]/50 text-xs uppercase tracking-widest">{project.category}</p>
                      <p className="text-sm">{project.metrics}</p>
                    </div>
                  </div>

                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ProjectsPage;
