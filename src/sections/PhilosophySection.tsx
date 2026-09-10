import React from 'react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { Server, Zap, Cpu } from 'lucide-react';

const principles = [
  {
    title: 'Scale & Predictability',
    description: 'Stateless services, distributed caching, and horizontal scalability. Systems designed to fail gracefully under peak load.',
    Icon: Server,
    color: '#4E8752',
    code: `redis.setex(
  \`user:\${id}:cache\`,
  3600,
  JSON.stringify(data)
);`,
  },
  {
    title: 'Semantic Intelligence',
    description: 'Integrating LLMs, vector search, and RAG pipelines directly into products to replace hours of manual effort.',
    Icon: Cpu,
    color: '#3B76A6',
    code: `POST /api/v1/semantic-search
{
  "query": "Senior React Engineer",
  "top_k": 5,
  "min_score": 0.85
}`,
  },
  {
    title: 'Architectural Hygiene',
    description: 'Strict API contracts, idempotency, and declarative infrastructure automation. Code that is reliable to operate in production.',
    Icon: Zap,
    color: '#B8732E',
    code: `- name: Deploy Infrastructure
  hosts: production
  roles:
    - { role: openstack }
    - { role: ansible }`,
  },
];

const PhilosophySection: React.FC = () => {
  return (
    <section
      className="bg-[#F7F6F2] px-6 md:px-12 py-24 sm:py-28 md:py-36 relative border-t border-black/8 select-none"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={20}>
          <SectionHeading 
            text="Engineering Principles" 
            tag="06 / ARCHITECTURAL TENETS" 
            align="center" 
            className="mb-14 sm:mb-18" 
          />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {principles.map((p, i) => (
            <FadeIn key={p.title} delay={0.1 + i * 0.1} y={20}>
              <div className="h-full p-6 sm:p-8 rounded-2xl bg-white border border-black/8 shadow-sm hover:border-black/16 hover:shadow-md transition-all duration-300 flex flex-col">
                
                <div className="flex items-center gap-3 mb-5">
                  <div 
                    className="p-2.5 rounded-xl border border-black/5"
                    style={{ background: `${p.color}15`, color: p.color }}
                  >
                    <p.Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[#171717] font-bold text-base tracking-tight uppercase">
                    {p.title}
                  </h3>
                </div>

                <p className="text-[#57606A] text-sm leading-relaxed mb-6 flex-1">
                  {p.description}
                </p>

                {/* Clean Code Snippet */}
                <div className="mt-auto p-3.5 rounded-xl bg-[#EFECE6] border border-black/5">
                  <pre className="text-[11px] font-mono text-[#24292F] whitespace-pre-wrap leading-relaxed">
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
