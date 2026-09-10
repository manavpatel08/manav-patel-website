import React from 'react';
import Navbar from '../components/Navbar';
import ScrollProgress from '../components/ScrollProgress';
import ScrollWayfinding from '../components/ScrollWayfinding';
import LoadingScreen from '../components/LoadingScreen';
import CommandPalette from '../components/CommandPalette';
import HeroSection from '../sections/HeroSection';
import MarqueeSection from '../sections/MarqueeSection';
import AboutSection from '../sections/AboutSection';
import ExperienceSection from '../sections/ExperienceSection';
import ProjectsSection from '../sections/ProjectsSection';
import CompetitiveProgrammingSection from '../sections/CompetitiveProgrammingSection';
import SkillsSection from '../sections/SkillsSection';
import ServicesSection from '../sections/ServicesSection';
import ScopeSection from '../sections/ScopeSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../sections/Footer';
import SectionTransition from '../components/SectionTransition';

const Home: React.FC = () => {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <ScrollWayfinding />
      <Navbar />
      <CommandPalette />

      <div className="bg-[#F4F0E8] font-sans text-[#141413] relative z-10" style={{ overflowX: 'clip' }}>
        {/* Hero & Identity */}
        <HeroSection />
        <MarqueeSection />

        {/* 01 — ABOUT */}
        <AboutSection />

        <SectionTransition
          from="01 / ABOUT"
          to="02 / EXPERIENCE"
          label="SYSTEM ARCHITECTURE → DATA CENTER IaC"
          type="diagram"
        />

        {/* 02 — EXPERIENCE */}
        <ExperienceSection />

        <SectionTransition
          from="02 / EXPERIENCE"
          to="03 / PROJECTS"
          label="ENTERPRISE CLOUD → PRODUCTION SYSTEMS"
          type="timeline"
        />

        {/* 03 — PROJECTS & ALGORITHMIC DEPTH */}
        <ProjectsSection />
        <CompetitiveProgrammingSection />

        <SectionTransition
          from="03 / PROJECTS"
          to="04 / SKILLS"
          label="SYSTEM IMPLEMENTATIONS → CORE CAPABILITIES"
          type="technology"
        />

        {/* 04 — SKILLS */}
        <SkillsSection />

        <SectionTransition
          from="04 / SKILLS"
          to="05 / SERVICES"
          label="TECHNICAL PROFICIENCIES → DELIVERED SERVICES"
          type="capability"
        />

        {/* 05 — SERVICES */}
        <ServicesSection />

        <SectionTransition
          from="05 / SERVICES"
          to="06 / SCOPE"
          label="DELIVERED SOLUTIONS → ENGAGEMENT & SLAs"
          type="engagement"
        />

        {/* 06 — SCOPE */}
        <ScopeSection />

        <SectionTransition
          from="06 / SCOPE"
          to="07 / CONTACT"
          label="SPECIFICATIONS → DIRECT HANDSHAKE"
          type="handshake"
        />

        {/* 07 — CONTACT */}
        <ContactSection />

        {/* Closing Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
