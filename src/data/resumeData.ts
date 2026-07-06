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
  "I'm a Computer Science student at PDEU building full-stack systems that solve real problems, not just tick boxes. I care about the why behind architecture decisions — schema design, API contracts, caching, scalability — as much as the code itself.\n\nI've built CodeSync, a real-time collaborative code editor with sub-100ms sync latency, and JobKart.ai, an AI-powered job-matching platform that cuts search time by 60–70%. Currently interning at AdaniConneX, working on infrastructure automation for enterprise data centers.\n\nWhen I'm not coding, I'm probably solving a Codeforces problem or reading up on system design.";

export const aboutHighlights = [
  {
    icon: '🚀',
    title: 'Full Stack',
    description: 'React, Node, Next.js — end-to-end product development',
    color: '#61DAFB',
  },
  {
    icon: '🧠',
    title: 'AI / ML',
    description: 'Transformers, FAISS, NLP — intelligent system design',
    color: '#FF6F61',
  },
  {
    icon: '☁️',
    title: 'Cloud Infra',
    description: 'Ansible, OpenStack, AWS — infrastructure as code',
    color: '#FF9900',
  },
  {
    icon: '🏆',
    title: 'Competitive',
    description: 'Codeforces, LeetCode — algorithmic problem solving',
    color: '#28c840',
  },
];

export const education = {
  institution: 'Pandit Deendayal Energy University',
  degree: 'B.Tech Computer Science and Engineering',
  cpi: '9.37/10',
  duration: 'June 2023 – May 2027',
  location: 'Gandhinagar, Gujarat',
  courses: [
    'DBMS',
    'Operating System',
    'Computer Network',
    'Data Structures and Algorithms',
    'Theory of Computation',
    'Compiler Design',
    'Artificial Intelligence',
    'Information Security',
    'Cybersecurity',
    'Web Technologies',
  ],
};

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
  { value: 1327, label: 'Codeforces Rating', suffix: '', decimals: 0 },
  { value: 1554, label: 'LeetCode Rating', suffix: '', decimals: 0 },
  { value: 3, label: 'Major Projects Built', suffix: '+', decimals: 0 },
];

export const achievements = [
  { platform: 'Codeforces', handle: 'manavp8', url: 'https://codeforces.com/profile/manavp8' },
  { platform: 'LeetCode', handle: '__Manav_Patel', url: 'https://leetcode.com/u/__Manav_Patel/' },
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

export const navLinks = ['About', 'Experience', 'Skills', 'Projects', 'Contact'];
