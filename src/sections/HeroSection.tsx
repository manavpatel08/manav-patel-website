import React, { useEffect, useState } from 'react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import { profile } from '../data/resumeData';
import { Download } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const roles = ['Software Engineer', 'Full Stack Dev', 'AI/ML Enthusiast', 'Cloud & DevOps', 'System Architect'];

const HeroSection: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Interactive Cursor Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const cursorX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const cursorY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Calculate slight parallax for background elements
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30; 
      const y = (e.clientY / innerHeight - 0.5) * 30;
      smoothX.set(x);
      smoothY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, smoothX, smoothY]);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 30 : 80;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setText(currentRole.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section 
      className="h-screen flex flex-col relative noise-overlay" 
      style={{ overflowX: 'clip' }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Grid background with slight mouse parallax */}
      <motion.div 
        className="absolute inset-0 grid-bg" 
        style={{ x: smoothX, y: smoothY }}
      />

      {/* Decorative Ambient JSON block */}
      <motion.div 
        className="absolute top-[15%] left-[5%] opacity-[0.03] font-mono text-[8px] sm:text-[10px] pointer-events-none select-none hidden md:block"
        style={{ x: useSpring(useMotionValue((mouseX.get() * -2) || 0)), y: useSpring(useMotionValue((mouseY.get() * -2) || 0)) }}
      >
        <pre>
{`{
  "status": "online",
  "system": "active",
  "mode": "production",
  "latency": "12ms",
  "threads": 8,
  "cache_hit_ratio": 0.98,
  "connections": [
    "ws://gateway-01",
    "ws://gateway-02"
  ]
}`}
        </pre>
      </motion.div>

      {/* Creative Custom Cursor (Inverted blending) */}
      <motion.div 
        className="fixed top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full bg-white pointer-events-none z-50 hidden lg:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.8 }}
        transition={{ opacity: { duration: 0.4 }, scale: { duration: 0.4 } }}
        style={{ 
          x: cursorX, 
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference'
        }}
      />
      
      {/* Small dot following exactly */}
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-50 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ 
          x: mouseX, 
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Spacer for navbar */}
      <div className="pt-24 md:pt-28 flex flex-col items-center justify-center flex-1 relative z-10">
        
        {/* Hero Heading */}
        <FadeIn delay={0.15} y={30} className="relative z-10 w-full mt-8">
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none w-full text-center text-[11vw] sm:text-[12vw] px-4 sm:px-6"
          >
            {profile.heroName}
          </h1>
        </FadeIn>

        {/* Animated role subtitle with Typing Effect */}
        <FadeIn delay={0.3} y={20} className="relative z-10 mt-4 sm:mt-6">
          <div className="h-8 sm:h-10 flex items-center justify-center">
            <p className="text-[#D7E2EA]/60 font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm md:text-base">
              {text}
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1 h-4 sm:h-5 bg-[#B600A8] ml-1 align-middle"
              />
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="mt-auto flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 relative z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA]/50 font-medium uppercase tracking-widest leading-relaxed max-w-[200px] sm:max-w-[280px] md:max-w-[320px]"
            style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1.15rem)' }}
          >
            BUILDING SYSTEMS <br />
            THAT <span className="text-[#D7E2EA] font-semibold">SCALE</span>, <br />
            <span className="text-[#D7E2EA] font-semibold">THINK</span>, <br />
            AND <span className="text-[#D7E2EA] font-semibold">PERFORM</span>
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <div className="flex items-center gap-4">
            <motion.a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 backdrop-blur-md"
              aria-label="Download resume"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
            <ContactButton />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
