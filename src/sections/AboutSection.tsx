import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { aboutSummary } from '../data/resumeData';
import { GraduationCap, Users, Cpu } from 'lucide-react';

// ── Floating network node decoration ─────────────────
const FloatingNode = ({
  delay,
  x,
  y,
  size = 4,
}: {
  delay: number;
  x: string;
  y: string;
  size?: number;
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: 'rgba(59,130,246,0.5)',
      boxShadow: '0 0 8px rgba(59,130,246,0.4)',
    }}
    animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.4, 1] }}
    transition={{ duration: 3.5, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

// ── Pill tag ──────────────────────────────────────────
const Tag = ({ label }: { label: string }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/8 bg-white/[0.04] text-[#D7E2EA]/60 text-xs font-mono tracking-wide">
    {label}
  </span>
);

// ── Info card ─────────────────────────────────────────
const InfoCard = ({
  icon: Icon,
  accent,
  label,
  title,
  subtitle,
  badge,
  delay,
}: {
  icon: React.FC<{ className?: string }>;
  accent: string;
  label: string;
  title: string;
  subtitle: string;
  badge: string;
  delay: number;
}) => (
  <FadeIn delay={delay} y={24}>
    <div
      className="p-6 sm:p-7 rounded-2xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-md relative overflow-hidden group hover:border-white/[0.1] transition-all duration-500"
      style={{ '--accent': accent } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 0% 0%, ${accent}0f 0%, transparent 60%)`,
        }}
      />
      <div className="flex items-start gap-4 relative z-10">
        <div
          className="p-2.5 rounded-xl flex-shrink-0 transition-colors duration-300"
          style={{ background: `${accent}18`, color: accent }}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-mono tracking-widest uppercase mb-1.5" style={{ color: accent }}>
            {label}
          </p>
          <h3 className="text-[#D7E2EA] font-medium text-base leading-snug mb-0.5">{title}</h3>
          <p className="text-[#D7E2EA]/45 text-sm font-light mb-3">{subtitle}</p>
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono border"
            style={{
              borderColor: `${accent}30`,
              background: `${accent}10`,
              color: `${accent}cc`,
            }}
          >
            {badge}
          </span>
        </div>
      </div>
    </div>
  </FadeIn>
);

const AboutSection: React.FC = () => {
  const paragraphs = aboutSummary.split('\n\n');

  const interests = [
    'Backend Engineering',
    'Distributed Systems',
    'System Design',
    'High-Performance C++',
    'Codeforces',
    'Data Modeling',
  ];

  return (
    <section
      id="about"
      className="relative px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-40 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 70% 20%, rgba(59,130,246,0.06) 0%, transparent 55%),
          radial-gradient(ellipse at 20% 80%, rgba(118,33,176,0.07) 0%, transparent 55%),
          #09090F
        `,
      }}
    >
      {/* Floating decorative nodes */}
      <FloatingNode delay={0} x="8%" y="18%" size={5} />
      <FloatingNode delay={1.2} x="88%" y="12%" size={3} />
      <FloatingNode delay={2.4} x="75%" y="70%" size={4} />
      <FloatingNode delay={0.8} x="5%" y="75%" size={3} />

      {/* Faint code watermark */}
      <div className="absolute top-[15%] right-[6%] opacity-[0.025] font-mono text-[9px] pointer-events-none select-none hidden xl:block leading-relaxed">
        <pre>{`// distributed state
sync(nodes, crdt)
  .resolve(conflict)
  .replicate(peers)
  .commit(log)`}</pre>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn delay={0} y={40}>
          <SectionHeading text="About me" className="mb-16 sm:mb-20 md:mb-24" />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 xl:gap-20 items-start">

          {/* ── Left: bio ─────────────────────────────── */}
          <FadeIn delay={0.1} y={28}>
            <div className="space-y-5">
              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-[#D7E2EA]/75 font-light leading-[1.85] tracking-wide"
                  style={{ fontSize: 'clamp(0.94rem, 1.5vw, 1.1rem)' }}
                >
                  {para}
                </p>
              ))}

              {/* Interest tags */}
              <div className="pt-4 flex flex-wrap gap-2">
                {interests.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </div>
          </FadeIn>

          {/* ── Right: cards ──────────────────────────── */}
          <div className="flex flex-col gap-4">
            <InfoCard
              icon={GraduationCap}
              accent="#B600A8"
              label="Education"
              title="Pandit Deendayal Energy University"
              subtitle="B.Tech Computer Science · 2023 – 2027"
              badge="9.37 CPI"
              delay={0.18}
            />
            <InfoCard
              icon={Cpu}
              accent="#3b82f6"
              label="Internship"
              title="AdaniConneX"
              subtitle="Infrastructure Automation · Cloud Intern"
              badge="June 2026 – Present"
              delay={0.26}
            />
            <InfoCard
              icon={Users}
              accent="#10b981"
              label="Leadership"
              title="PR & Marketing Head"
              subtitle="Science & Technical Committee · PDEU"
              badge="PDEU"
              delay={0.34}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
