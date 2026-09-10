// ─────────────────────────────────────────────
// Single source of truth — all content from Manav Patel's resume
// ─────────────────────────────────────────────

export const profile = {
  name: 'Manav Patel',
  heroName: 'Manav Patel',
  title: 'Software Engineer',
  subtitle: 'Software Engineering • Backend Development • Systems Architecture',
  tagline:
    'Building scalable software, intelligent systems, and cloud infrastructure',
  email: 'patelmanav0805@gmail.com',
  phone: '+91-9999999999',
  location: 'Ahmedabad, Gujarat',
  linkedin: 'https://www.linkedin.com/in/manav-patel-97b485284/',
  github: 'https://github.com/manavpatel08',
  codeforces: 'https://codeforces.com/profile/manavp8',
  leetcode: 'https://leetcode.com/u/__Manav_Patel/',
  resumeUrl: 'https://drive.google.com/file/d/1uKaPGXwmxHfykgmwoiylXJNkW31Hi1wU/view?usp=drive_link',
};

export const aboutSummary =
  'Computer Science student at PDEU building full-stack systems that solve real problems, not just tick boxes. I focus on the engineering behind reliable systems — API design, database architecture, caching, distributed systems, and scalability.';

export const aboutNarrative = {
  focus: {
    title: 'Engineering Focus',
    body: 'Computer Science student at PDEU building full-stack systems that solve real problems, not just tick boxes.\n\nI focus on the engineering behind reliable systems — API design, database architecture, caching, distributed systems, and scalability.',
  },
  context: {
    title: 'Systems & Context',
    body: 'Creator of CodeSync, a real-time collaborative code editor with sub-100ms synchronization, and JobKart.ai, an AI-powered job matching platform that reduces manual search effort by 60–70%.\n\nPreviously a Software Engineering Intern at AdaniConneX, where I worked on infrastructure automation and monitoring for enterprise data centers.',
  },
  offline: {
    title: 'Offline',
    body: 'Solving Codeforces problems and studying large-scale system design.',
  },
};

export const education = {
  institution: 'Pandit Deendayal Energy University',
  degree: 'B.Tech in Computer Science and Engineering',
  cpi: 'CPI: 9.37 / 10',
  duration: 'June 2023 – May 2027',
  location: 'Gandhinagar, Gujarat',
};

export const experienceData = [
  {
    number: '01',
    company: 'AdaniConneX',
    role: 'Software Engineering Intern',
    date: 'June 2026 – July 2026',
    location: 'Mumbai, Maharashtra',
    description:
      'Worked on infrastructure automation and monitoring for enterprise data centers across 25+ Linux VMs.',
    bullets: [
      'Automated provisioning and configuration of 25+ Linux VMs using reusable Ansible playbooks, roles, and inventories.',
      'Spearheaded development of a Prometheus-Grafana monitoring pipeline analyzing 8+ infrastructure KPIs across 25+ VMs.',
      'Engineered an infrastructure health engine processing 10K+ time-series metrics per reporting cycle to detect resource bottlenecks.',
      'Designed a Grafana-driven SLA reporting framework consolidating 25+ VM health reports into a single dashboard with optimization recommendations.',
    ],
    tags: ['Ansible', 'Prometheus', 'Grafana', 'Linux', 'VMs', 'Infrastructure'],
  },
];

export const projects = [
  {
    number: '01',
    category: 'Distributed Systems & Real-Time',
    name: 'CodeSync',
    description:
      'Designed a distributed real-time collaborative code editor using Yjs CRDTs and WebSockets, supporting concurrent multi-user editing with <100 ms synchronization latency across 5+ languages.',
    techStack: ['React.js', 'Node.js', 'NeonDB', 'Yjs', 'WebSockets', 'JWT', 'Express.js'],
    metrics: '<100ms Sync Latency • 12 REST APIs • Docker Isolation',
    highlights: [
      'Designed a distributed real-time collaborative code editor using Yjs CRDTs and WebSockets, supporting concurrent multi-user editing with <100 ms synchronization latency across 5+ languages.',
      'Architected a scalable backend with Node.js, Express.js, and PostgreSQL, implementing 12 authenticated REST APIs, JWT-based sessions, and 4 composite indexes for efficient data access.',
      'Orchestrated a Docker-isolated multi-language execution pipeline with resource limits, execution timeouts, and fault-tolerant persistence, enabling reliable code execution and session recovery.',
    ],
    github: 'https://github.com/manavpatel08/codesync.git',
    live: 'https://github.com/manavpatel08/codesync.git',
    date: 'May 2026',
    image: '/mockups/codesync.webp',
  },
  {
    number: '02',
    category: 'AI & Semantic Search',
    name: 'JobKart.ai',
    description:
      'Built an AI-powered job matching platform with FastAPI, React.js, and Supabase, reducing manual job-search effort by 60–70% through automated resume-job matching.',
    techStack: ['Python', 'FastAPI', 'React.js', 'Supabase', 'Transformers', 'FAISS'],
    metrics: '60–70% Search Time Saved • <2s Search • 100+ Roles',
    highlights: [
      'Built an AI-powered job matching platform with FastAPI, React.js, and Supabase, reducing manual job-search effort by 60–70% through automated resume-job matching.',
      'Developed a Transformer + FAISS semantic search pipeline, ranking relevant jobs in <2 seconds and improving matching efficiency by 2× over keyword-based search.',
      'Prototyped AI resume scoring and chatbot feedback, identifying skill gaps and generating personalized recommendations in <5 seconds, while automating 100+ monthly application-tracking entries.',
    ],
    github: 'https://github.com/manavpatel08/JobKart.git',
    live: 'https://job-kart-ai.vercel.app',
    date: 'February 2026',
    image: '/mockups/jobkart.webp',
  },
  {
    number: '03',
    category: 'NLP & Information Retrieval',
    name: 'YT Summarizer',
    description:
      'Built an LLM-powered summarization system reducing 30–60 minute videos to under 1-minute summaries, saving 90%+ content consumption time.',
    techStack: ['Python', 'FastAPI', 'React.js', 'Gemini API', 'NLP'],
    metrics: '90%+ Content Time Saved • Semantic Q&A • PDF Export',
    highlights: [
      'Built an LLM-powered summarization system reducing 30–60 minute videos to under 1-minute summaries, saving 90%+ content consumption time.',
      'Built an NLP pipeline for transcript processing, chunking, semantic retrieval, quiz generation, and timestamp extraction.',
      'Enabled semantic Q&A over videos, reducing information retrieval time from minutes to seconds.',
      'Developed a full-stack application with bookmarking and PDF export for instant knowledge retrieval and reuse.',
    ],
    github: 'https://github.com/AdityaThakkar56/yt-summarizer.git',
    live: 'https://yt-summarizer-green.vercel.app',
    date: 'March 2026',
    image: '/mockups/yt-summarizer.webp',
  },
  {
    number: '04',
    category: 'Information Retrieval & Entity Matching',
    name: 'ProfileIQ',
    description:
      'Developed a multi-platform people search engine querying across 3+ platforms including LinkedIn, ResearchGate, and Crunchbase in a single request.',
    techStack: ['Python', 'SerpAPI', 'OpenAI', 'spaCy', 'Fuzzy Matching', 'Gemini API'],
    metrics: '3+ Platforms • 70–80% Search Time Saved • Boolean Logic',
    highlights: [
      'Developed a multi-platform people search engine querying across 3+ platforms including LinkedIn, ResearchGate, and Crunchbase in a single request.',
      'Reduced manual profile search time by 70–80% by automating aggregation and ranking.',
      'Converted natural-language queries into Boolean search logic, improving search precision and relevance.',
      'Engineered a retrieval and entity-matching pipeline combining fuzzy matching and LLM-assisted ranking.',
    ],
    github: 'https://github.com/manavpatel08',
    live: 'https://redmars.vercel.app/',
    date: 'June 2025',
    image: '/mockups/profileiq.webp',
  },
];

export const skills = {
  languages: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'SQL'],
  frontend: ['React.js', 'Next.js', 'HTML5', 'CSS3'],
  backend: ['Node.js', 'FastAPI', 'REST APIs', 'LLD', 'API Design'],
  databases: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Prisma ORM'],
  aiml: ['TensorFlow', 'Keras', 'Scikit-learn', 'NLP', 'Transformers', 'LSTM', 'RAG'],
  cloud: ['Git', 'GitHub', 'Linux', 'AWS', 'Docker', 'CI/CD', 'Ansible'],
};

export const servicesData = [
  {
    number: '01',
    title: 'Backend Systems',
    description: 'Scalable APIs, authentication, database architecture, caching, and backend services.',
    scope: ['API Design & Architecture', 'Authentication & JWT Sessions', 'Database Indexing & Query Optimization', 'Distributed Caching (Redis)'],
    accent: '#3A6D8C', // muted blue
  },
  {
    number: '02',
    title: 'Real-Time Systems',
    description: 'WebSockets, CRDTs, collaborative applications, event-driven communication, and low-latency systems.',
    scope: ['CRDT Synchronization (Yjs)', 'WebSockets & Event Channels', 'Low-Latency (<100ms) Sync', 'Session Recovery & State Persistence'],
    accent: '#3F6E50', // dusty teal / sage
  },
  {
    number: '03',
    title: 'AI-Powered Applications',
    description: 'Semantic search, RAG pipelines, LLM integrations, NLP systems, and intelligent product features.',
    scope: ['Semantic Vector Search (FAISS)', 'Transformer & NLP Pipelines', 'LLM Agents & Retrieval (RAG)', 'FastAPI Microservice Integration'],
    accent: '#C48229', // muted yellow
  },
  {
    number: '04',
    title: 'Full-Stack Products',
    description: 'Production-oriented web applications with React, Node.js, FastAPI, PostgreSQL, and modern infrastructure.',
    scope: ['React & Next.js Architecture', 'End-to-End Type Safety', 'Docker-Isolated Execution Pipelines', 'Production CI/CD & Deployments'],
    accent: '#BD5338', // soft terracotta
  },
];

export const stats = [
  { value: 9.37, label: 'CPI at PDEU', suffix: '/10', decimals: 2 },
  { value: 1629, label: 'Codeforces Rating', suffix: '', decimals: 0 },
  { value: 1924, label: 'LeetCode Rating', suffix: '', decimals: 0 },
  { value: 3, label: 'Production Projects Built', suffix: '+', decimals: 0 },
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
  { name: 'Express.js', tagline: 'Backend' },
  { name: 'React.js', tagline: 'Frontend' },
  { name: 'Node.js', tagline: 'Runtime' },
  { name: 'PostgreSQL', tagline: 'Database' },
  { name: 'Docker', tagline: 'Containers' },
  { name: 'Linux', tagline: 'Systems' },
  { name: 'JavaScript', tagline: 'Full Stack' },
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
  { name: 'Ansible', tagline: 'Automation' },
  { name: 'WebSockets', tagline: 'Real-time' },
  { name: 'Next.js', tagline: 'Framework' },
  { name: 'Supabase', tagline: 'Cloud DB' },
  { name: 'Prisma ORM', tagline: 'ORM' },
];

export const navLinks = ['About', 'Experience', 'Projects', 'Skills', 'Services', 'Contact'];
