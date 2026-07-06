import React from 'react';
import Navbar from '../components/Navbar';
import ScrollProgress from '../components/ScrollProgress';
import LoadingScreen from '../components/LoadingScreen';
import CommandPalette from '../components/CommandPalette';
import HeroSection from '../sections/HeroSection';
import MarqueeSection from '../sections/MarqueeSection';
import AboutSection from '../sections/AboutSection';
import StatsSection from '../sections/StatsSection';
import SkillsSection from '../sections/SkillsSection';
import ExperienceSection from '../sections/ExperienceSection';
import ProjectsSection from '../sections/ProjectsSection';
import PhilosophySection from '../sections/PhilosophySection';
import CompetitiveProgrammingSection from '../sections/CompetitiveProgrammingSection';
import CTASection from '../sections/CTASection';
import ContactSection from '../sections/ContactSection';
import Footer from '../sections/Footer';

const Home: React.FC = () => {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <CommandPalette />

      {/* Aurora Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#B600A8]/[0.03] blur-[120px] mix-blend-screen blob" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#7621B0]/[0.03] blur-[120px] mix-blend-screen blob" style={{ animationDelay: '5s' }} />
      </div>

      <div className="bg-transparent font-kanit relative z-10" style={{ overflowX: 'clip' }}>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ExperienceSection />
        <StatsSection />
        <SkillsSection />
        <ProjectsSection />
        <PhilosophySection />
        <CompetitiveProgrammingSection />
        <CTASection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
};

export default Home;
