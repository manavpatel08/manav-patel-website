import React from 'react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { Server, Zap, Cpu } from 'lucide-react';

const principles = [
  {
    title: 'Build for Scale',
    description: 'Stateless architectures, distributed caching, and horizontal scaling. Systems that grow gracefully rather than breaking under load.',
    Icon: Server,
    code: `redis.setex(
  \`user:\${id}:cache\`,
  3600,
  JSON.stringify(data)
);`
  },
  {
    title: 'Intelligent Systems',
    description: 'Integrating LLMs, vector search, and RAG into traditional workflows to eliminate manual bottlenecks.',
    Icon: Cpu,
    code: `POST /api/v1/semantic-search
{
  "query": "Senior React Engineer",
  "top_k": 5,
  "min_score": 0.85
}`
  },
  {
    title: 'Developer Experience',
    description: 'Clean API contracts, declarative infrastructure, and zero-touch deployments. Code should be as enjoyable to read as it is to write.',
    Icon: Zap,
    code: `- name: Deploy Infrastructure
  hosts: production
  roles:
    - { role: nginx }
    - { role: docker }`
  }
];

const PhilosophySection: React.FC = () => {
  return (
    <section
      className="bg-section-philosophy relative px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-40 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn delay={0} y={40}>
          <SectionHeading text="Architecture & Philosophy" className="mb-16 sm:mb-20" />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {principles.map((p, i) => (
            <FadeIn key={p.title} delay={0.1 + i * 0.15} y={30}>
              <div className="h-full group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 flex flex-col backdrop-blur-md relative overflow-hidden">
                
                {/* Glowing Node background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700" />

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="p-3 bg-white/5 rounded-xl text-blue-400">
                    <p.Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-[#D7E2EA] font-semibold tracking-wide text-lg">
                    {p.title}
                  </h3>
                </div>

                <p className="text-[#D7E2EA]/60 font-light leading-relaxed mb-8 flex-1 relative z-10 text-sm">
                  {p.description}
                </p>

                {/* Decorative Code Block */}
                <div className="mt-auto p-4 rounded-xl bg-[#030406] border border-white/5 group-hover:border-blue-500/20 transition-colors duration-500 relative z-10">
                  <pre className="text-xs font-mono text-[#D7E2EA]/50 group-hover:text-blue-300/80 transition-colors duration-500 whitespace-pre-wrap">
                    {p.code}
                  </pre>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
