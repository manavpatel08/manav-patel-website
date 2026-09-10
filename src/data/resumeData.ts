// ─────────────────────────────────────────────
// Single source of truth — all content from Manav Patel's resume
// ─────────────────────────────────────────────

export const profile = {
  name: 'Manav Patel',
  heroName: 'Manav Patel',
  title: 'Software Engineer',
  subtitle: 'Software Engineer • Full Stack • AI/ML • Cloud',
  tagline:
    'Building scalable software, intelligent systems, and cloud infrastructure',
  email: 'patelmanav0805@gmail.com',
  phone: '+91-9999999999',
  location: 'Ahmedabad, Gujarat',
  linkedin: 'https://www.linkedin.com/in/manav-patel-97b485284/',
  github: 'https://github.com/manavpatel08',
  codeforces: 'https://codeforces.com/profile/manavp8',
  leetcode: 'https://leetcode.com/u/__Manav_Patel/',
  resumeUrl: 'https://drive.google.com/file/d/1s7tRxqUtPeay87XLXuVE5huHPFnCGEWH/view?usp=drive_link',
};

export const aboutSummary =
  "I'm a Computer Science student at PDEU building full-stack systems that solve real problems, not just tick boxes. I care about the why behind architecture decisions — schema design, API contracts, caching, and scalability — as much as the code itself.\n\nI've built CodeSync, a real-time collaborative code editor with sub-100ms sync latency, and JobKart.ai, an AI-powered job-matching platform that cuts search time by 60–70%. Currently interning at AdaniConneX, working on infrastructure automation for enterprise data centers.\n\nWhen I'm not coding, I'm probably solving a Codeforces problem or reading up on system design.";

export const aboutNarrative = {
  intro: "Computer Science student at PDEU building robust full-stack systems that solve concrete engineering problems with speed and precision.",
  focus: "Deeply invested in the mechanics of architecture: database schema modeling, resilient API contracts, low-latency caching, and distributed scale.",
  work: [
    {
      name: "CodeSync",
      detail: "Real-time collaborative code editor with sub-100ms sync latency via CRDTs & WebSockets.",
    },
    {
      name: "JobKart.ai",
      detail: "AI job-matching engine cutting manual candidate search time by 60–70% via semantic retrieval.",
    },
    {
      name: "AdaniConneX",
      detail: "Cloud intern automating enterprise data center infrastructure with Ansible & OpenStack.",
    },
  ],
  personal: "When offline: tackling competitive programming on Codeforces or dissecting high-throughput system architectures.",
};

export const education = {
  institution: 'Pandit Deendayal Energy University',
  degree: 'B.Tech Computer Science',
  cpi: '9.37 CPI',
  duration: '2023 – 2027',
  location: 'Gandhinagar, Gujarat',
};

export const servicesData = [
  {
    number: '01',
    title: 'Backend Systems',
    description: 'Scalable APIs, service architecture, database design, caching, and reliable high-throughput backend infrastructure.',
    scope: ['API Contracts & Schema Design', 'Distributed Caching (Redis)', 'PostgreSQL Indexing & Optimization', 'Concurrency & Fault Tolerance'],
    accent: '#3A6D8C', // technical / blue
  },
  {
    number: '02',
    title: 'Full-Stack Applications',
    description: 'Production-ready web applications built with rigorous type safety, clean frontend architecture, and resilient state synchronization.',
    scope: ['React & Next.js Architecture', 'Type-Safe Client-Server Contracts', 'REST & GraphQL APIs', 'Performance Auditing'],
    accent: '#BD5338', // terracotta / work
  },
  {
    number: '03',
    title: 'Real-Time Systems',
    description: 'WebSockets, collaborative document synchronization, conflict-free replicated data types (CRDTs), and low-latency event channels.',
    scope: ['Yjs & Conflict-Free Resolution', 'State Synchronization <100ms', 'WebSocket Broker Pipelines', 'Real-Time Telemetry'],
    accent: '#3F6E50', // green / reliability
  },
  {
    number: '04',
    title: 'AI / Intelligent Applications',
    description: 'Practical LLM-powered applications, semantic vector retrieval pipelines (FAISS/RAG), and intelligent search systems.',
    scope: ['Transformer Embeddings & Vector Search', 'Semantic Q&A & Document Ingestion', 'Prompt Architecture & Evaluation', 'FastAPI Microservices'],
    accent: '#C48229', // mustard / highlights
  },
  {
    number: '05',
    title: 'Infrastructure Automation',
    description: 'Infrastructure as Code, configuration orchestration, and server provisioning pipelines for enterprise environments.',
    scope: ['Ansible Playbooks & Roles', 'OpenStack Cloud Environments', 'Linux Server Provisioning', 'Zero-Downtime Deployments'],
    accent: '#6B587B', // lavender / tooling
  },
];

export const experienceData = [
  {
    number: '01',
    role: 'AdaniConneX — Cloud Intern',
    date: 'June 2026 – Present',
    location: 'Mumbai, Maharashtra',
    description:
      'Contributing to infrastructure automation for enterprise data center environments. Developing Ansible playbooks, roles, and inventories for Linux server provisioning. Hands-on with OpenStack, SSH, and Infrastructure as Code.',
    tags: ['Ansible', 'OpenStack', 'Linux', 'IaC', 'Cloud'],
  }
];

export const projects = [
  {
    number: '01',
    category: 'Full Stack',
    name: 'CodeSync',
    description:
      'A Google Docs-style collaborative code editor where multiple developers edit the same file in real time. Built on Yjs CRDTs over WebSockets for conflict-free concurrent editing with sub-100ms sync latency across 5 programming languages.',
    techStack: ['React.js', 'Node.js', 'Express', 'WebSockets', 'Yjs', 'NeonDB', 'Prisma', 'Clerk', 'Tailwind'],
    metrics: '5 Languages • Sub-100ms Latency • 12 REST APIs',
    highlights: [
      'Concurrent multi-user editing via Yjs CRDTs over WebSockets',
      'PostgreSQL schema with 4 composite indexes powering 12 REST APIs',
      'GitHub/Google OAuth via Clerk + sandboxed code execution',
      'Code export & import for seamless project continuity',
    ],
    github: 'https://github.com/manavpatel08/codesync.git',
    live: 'https://github.com/manavpatel08/codesync.git',
    date: 'May 2026',
    image: '/mockups/codesync.webp',
  },
  {
    number: '02',
    category: 'AI / ML',
    name: 'JobKart.ai',
    description:
      'An AI-powered job matching engine that semantically analyzes your résumé against 100+ job roles using Transformer embeddings and FAISS vector search, then ranks matches by fit score — cutting manual job-hunting time by 60–70%.',
    techStack: ['Python', 'FastAPI', 'React.js', 'Supabase', 'Transformers', 'FAISS', 'Pandas', 'Tailwind'],
    metrics: '100+ Roles • 60-70% Time Saved • <2s Queries',
    highlights: [
      'Automated job application tracking eliminating 100+ manual entries/month',
      'Transformer-based semantic matching + FAISS vector search',
      'AI resume scoring with chatbot feedback in under 5 seconds',
      'Personalized skill gap analysis and recommendations',
    ],
    github: 'https://github.com/manavpatel08/JobKart.git',
    live: 'https://job-kart-ai.vercel.app',
    date: 'Feb 2026',
    image: '/mockups/jobkart.webp',
  },
  {
    number: '03',
    category: 'Full Stack & AI',
    name: 'YT Summarizer',
    description:
      'An LLM-powered summarization system reducing 30–60 min videos to < 1 min summaries. Developed a full-stack app with an NLP pipeline for transcript processing, semantic retrieval, quiz generation, and semantic Q&A over videos.',
    techStack: ['Python', 'FastAPI', 'React.js', 'Gemini API', 'NLP'],
    metrics: 'Semantic Q&A • PDF Export • NLP Pipeline',
    highlights: [
      'Reduces 30–60 min videos to < 1 min summaries, saving 90%+ consumption time',
      'Built NLP pipeline for chunking, semantic retrieval, and timestamp extraction',
      'Enabled semantic Q&A, reducing retrieval time from minutes to seconds',
      'Full-stack app with bookmarking + PDF export for instant knowledge reuse'
    ],
    github: 'https://github.com/AdityaThakkar56/yt-summarizer.git',
    live: 'https://yt-summarizer-green.vercel.app',
    date: 'Mar 2026',
    image: '/mockups/yt-summarizer.webp',
  },
  {
    number: '04',
    category: 'Search Engine',
    name: 'ProfileIQ',
    description:
      'A multi-platform people search engine querying across 3+ platforms (LinkedIn, ResearchGate, Crunchbase) in a single request. Engineered a retrieval pipeline combining fuzzy matching and LLM-assisted ranking.',
    techStack: ['Python', 'SerpAPI', 'OpenAI', 'SpaCy', 'Fuzzy Matching', 'Gemini API'],
    metrics: 'Fuzzy Matching • LLM Ranking • Boolean Logic',
    highlights: [
      'Query across 3+ platforms (LinkedIn, ResearchGate, Crunchbase) simultaneously',
      'Reduced manual profile search time by 70–80% by automating aggregation',
      'Converted natural language queries into Boolean search logic',
      'Combined fuzzy matching and LLM-assisted ranking for accurate discovery'
    ],
    github: 'https://github.com/manavpatel08',
    live: 'https://redmars.vercel.app/',
    date: 'Jun 2025',
    image: '/mockups/profileiq.webp',
  },
];

export const skills = {
  languages: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'SQL'],
  frontend: ['React.js', 'Next.js', 'HTML5', 'CSS3'],
  backend: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'WebSockets', 'JWT'],
  databases: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Prisma', 'FAISS'],
  aiml: ['TensorFlow', 'Keras', 'Scikit-learn', 'NLP', 'Transformers', 'LSTM', 'RAG'],
  cloud: ['Linux', 'Ansible', 'OpenStack', 'AWS'],
  tools: ['Git', 'GitHub', 'Postman', 'VS Code', 'Jupyter', 'Colab', 'Kaggle', 'Vercel', 'Render'],
};

export const stats = [
  { value: 9.37, label: 'CPI at PDEU', suffix: '/10', decimals: 2 },
  { value: 1629, label: 'Codeforces Rating', suffix: '', decimals: 0 },
  { value: 1924, label: 'LeetCode Rating', suffix: '', decimals: 0 },
  { value: 3, label: 'Major Projects Built', suffix: '+', decimals: 0 },
];

export const achievements = [
  {
    platform: 'Codeforces',
    handle: 'manavp8',
    url: 'https://codeforces.com/profile/manavp8',
    rating: 1629,
    rank: 'Expert',
    color: '#3b82f6',
    contests: [
      { name: 'Codeforces Round 1114 (Div. 3)', rank: 558 },
      { name: 'Codeforces Round 1109 (Div. 3)', rank: 884 },
    ],
  },
  {
    platform: 'LeetCode',
    handle: '__Manav_Patel',
    url: 'https://leetcode.com/u/__Manav_Patel/',
    rating: 1924,
    rank: 'Knight',
    percentile: 'Top 4% Globally',
    color: '#fb923c',
    contests: [
      { name: 'BiWeekly Contest 187', rank: 491 },
      { name: 'BiWeekly Contest 188', rank: 669 },
      { name: 'Weekly Contest 509', rank: 894 },
    ],
  },
];

export const techMarqueeRow1 = [
  { name: 'Python', tagline: 'AI & Backend' },
  { name: 'C++', tagline: 'Competitive' },
  { name: 'TypeScript', tagline: 'Type Safety' },
  { name: 'Git', tagline: 'Version Control' },
  { name: 'Express', tagline: 'Backend' },
  { name: 'React', tagline: 'Frontend' },
  { name: 'Node.js', tagline: 'Runtime' },
  { name: 'PostgreSQL', tagline: 'Database' },
  { name: 'Docker', tagline: 'Containers' },
  { name: 'Linux', tagline: 'Systems' },
  { name: 'JavaScript', tagline: 'Full Stack' },
  { name: 'Tailwind', tagline: 'Styling' },
  { name: 'Java', tagline: 'Enterprise' },
];

export const techMarqueeRow2 = [
  { name: 'TensorFlow', tagline: 'Deep Learning' },
  { name: 'AWS', tagline: 'Cloud Services' },
  { name: 'MongoDB', tagline: 'NoSQL' },
  { name: 'FAISS', tagline: 'Vector Search' },
  { name: 'REST APIs', tagline: 'Integration' },
  { name: 'FastAPI', tagline: 'Python API' },
  { name: 'Redis', tagline: 'Caching' },
  { name: 'OpenStack', tagline: 'Cloud Infra' },
  { name: 'WebSockets', tagline: 'Real-time' },
  { name: 'Next.js', tagline: 'Framework' },
  { name: 'Ansible', tagline: 'Automation' },
  { name: 'Prisma', tagline: 'ORM' },
];

export const scopeData = {
  headline: 'Architectural Scope & Engagement Boundaries',
  summary:
    'Clear contracts, production-ready deliverables, and disciplined engineering hygiene. Designed for organizations needing dependable distributed backends, low-latency microservices, or intelligent AI pipelines.',
  models: [
    {
      number: '01',
      title: 'Full-Time Engineering Roles',
      tagline: 'High-Impact Ownership',
      description:
        'Software Engineer / Backend / Distributed Systems roles with end-to-end ownership from architecture design to production telemetry.',
      deliverables: [
        'Production backend microservices & distributed caches',
        'Database indexing, schema migrations, and performance audits',
        'Clean API contracts (REST, GraphQL, WebSockets)',
        'Infrastructure automation & deployment playbooks',
      ],
      badge: 'Full-Time',
      accent: '#BD5338',
    },
    {
      number: '02',
      title: 'Contract Systems Buildout',
      tagline: 'Focused Execution',
      description:
        'Direct project-based execution for zero-to-one infrastructure, real-time collaboration engines, or custom RAG/search pipelines.',
      deliverables: [
        'Real-time synchronization engines (CRDTs, WebSockets)',
        'LLM & vector retrieval pipelines (FAISS, LangChain, FastAPI)',
        'Custom multi-platform search engines & fuzzy rankers',
        'Cloud provisioning pipelines (Linux, OpenStack, Ansible)',
      ],
      badge: 'Milestone Contract',
      accent: '#3A6D8C',
    },
    {
      number: '03',
      title: 'Architecture Advisory & Review',
      tagline: 'Technical Hygiene',
      description:
        'System design audits, query optimization, high-throughput scaling strategies, and architectural risk assessments.',
      deliverables: [
        'Bottleneck discovery & latency reduction audits',
        'Relational & NoSQL schema design reviews',
        'Fault tolerance & graceful degradation strategies',
        'Concurrency & event-driven architecture design',
      ],
      badge: 'Advisory',
      accent: '#3F6E50',
    },
  ],
  standards: [
    {
      label: 'Sync & Latency SLA',
      value: '< 100ms',
      detail: 'State replication and cached endpoints engineered for low-latency feedback.',
    },
    {
      label: 'Type Safety & Contracts',
      value: '100% Strict',
      detail: 'End-to-end type validation across client, server, and database layers.',
    },
    {
      label: 'Deployment Hygiene',
      value: 'Zero-Downtime',
      detail: 'Automated CI/CD, declarative playbooks, and rolling migration support.',
    },
    {
      label: 'System Resilience',
      value: '99.9% Fault Tolerance',
      detail: 'Idempotency, distributed circuit breakers, and graceful fallback paths.',
    },
  ],
};

export const navLinks = ['About', 'Experience', 'Projects', 'Skills', 'Services', 'Scope', 'Contact'];
