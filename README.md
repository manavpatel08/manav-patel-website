# Manav Patel — Software Engineering Portfolio

> **Building scalable distributed systems, intelligent applications, and automated cloud infrastructure.**

A high-performance, editorial engineering portfolio designed with warm pastel surfaces, restrained motion, technical telemetry, and live platform instrumentation. Built with **React 19**, **TypeScript**, **Vite**, **Framer Motion**, **Matter.js**, and **Vitest**.

---

## Architecture & Design Highlights

- **Editorial Technical Aesthetic**: Warm ivory (`#F4F0E8`) and soft cream (`#ECE6DC`) surfaces with hairline borders (`border-black/8`), solid accent pills, and high-contrast typography instead of generic gradient-heavy templates.
- **Sequential Section Flow**:
  $$\text{01 About} \longrightarrow \text{02 Experience} \longrightarrow \text{03 Projects} \longrightarrow \text{04 Skills} \longrightarrow \text{05 Profiles} \longrightarrow \text{06 Services} \longrightarrow \text{07 Contact}$$
- **Real-Time Instrumentation**:
  - **Live Codeforces & LeetCode APIs**: Dynamic rating graphs with boundary-aware, unclipped tooltips.
  - **Zero-Lag Modals**: Pure GPU-accelerated transforms (`opacity`, `scale`, `transform: translateY`) without layout thrashing.
  - **Interactive Physics**: Rigid-body Matter.js skill playground with drag-and-drop physics and categorized matrix toggle.
  - **Fluid Smooth Scroll**: Unified Lenis scroll engine with wayfinding telemetry (`0X / 07`) and keyboard command palette (`Cmd+K`).

---

## Featured Systems & Projects

### 1. [CodeSync](https://github.com/manavpatel08/codesync.git) — Real-Time Collaborative Editor
- **Stack**: React.js, Node.js, NeonDB, Yjs, WebSockets, JWT, Express.js
- **Key Metrics**: `< 100ms` sync latency across 5+ languages, 12 authenticated REST APIs.
- Distributed CRDT-based concurrent multi-user editor with Docker-isolated sandboxed code execution pipelines and session recovery.

### 2. [JobKart.ai](https://job-kart-ai.vercel.app) — AI-Powered Job Matching Engine
- **Stack**: Python, FastAPI, React.js, Supabase, Transformers, FAISS
- **Key Metrics**: `60–70%` search time reduction, `< 2s` query latency across 100+ roles.
- Semantic vector retrieval engine matching candidate resumes against industry job listings with automated scoring and gap recommendations.

### 3. [YT Summarizer](https://yt-summarizer-green.vercel.app) — LLM Video Knowledge Retrieval
- **Stack**: Python, FastAPI, React.js, Gemini API, NLP
- **Key Metrics**: `90%+` content time saved, semantic Q&A over video transcripts.
- Full-stack NLP pipeline for chunking, semantic retrieval, quiz generation, and timestamp-based PDF knowledge export.

### 4. [ProfileIQ](https://redmars.vercel.app/) — Multi-Platform Search & Ranking Engine
- **Stack**: Python, SerpAPI, OpenAI, spaCy, Fuzzy Matching, Gemini API
- **Key Metrics**: Simultaneous query across 3+ platforms, Boolean search logic compilation.
- Entity-matching retrieval engine combining fuzzy string similarity with LLM-assisted re-ranking.

---

## Tech Stack & Tooling

| Domain | Technologies |
| :--- | :--- |
| **Frontend Core** | React 19, TypeScript, Vite, React Router 7 |
| **Motion & Physics** | Framer Motion, Matter.js, Lucide Icons |
| **Typography & Styling** | Vanilla Tailwind CSS (hairline borders, curated warm palettes) |
| **Smooth Scrolling** | Lenis Scroll Provider, Scroll-Spy Wayfinding |
| **Quality & Testing** | Vitest, React Testing Library, JSDOM, OxLint |

---

## Project Structure

```text
portfolio/
├── public/
│   ├── mockups/          # Verified project preview visual assets
│   └── favicon.svg
├── src/
│   ├── components/       # Reusable UI & architectural widgets
│   │   ├── CodingProfiles/ # Live Codeforces/LeetCode tiles, modals & charts
│   │   ├── PhysicsPlayground.tsx # Matter.js interactive simulation
│   │   ├── ScrollWayfinding.tsx  # Desktop step indicator (01/07)
│   │   ├── SystemArchitectureNode.tsx # 3D canvas pipeline node
│   │   ├── CommandPalette.tsx    # Cmd+K quick navigation palette
│   │   └── Navbar.tsx            # Sticky header with active indicator & resume link
│   ├── data/
│   │   └── resumeData.ts # Single source of truth for resume & systems data
│   ├── pages/
│   │   ├── Home.tsx      # Main single-page editorial layout
│   │   └── ProjectsPage.tsx # Extended project catalog (/projects)
│   ├── sections/         # Top-level page sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── CompetitiveProgrammingSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   ├── services/         # External platform API integrations (Codeforces, LeetCode)
│   ├── tests/            # Automated Vitest test suites (27 tests)
│   ├── index.css         # Global design tokens and utilities
│   └── main.tsx          # Application entry point
├── vitest.config.ts      # Vitest configuration & JSDOM canvas mocks
└── package.json
```

---

## Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** or **pnpm**

### Installation
```bash
# Clone the repository
git clone https://github.com/manavpatel08/manav-patel-website.git

# Navigate into project directory
cd manav-patel-website

# Install dependencies
npm install
```

### Development
```bash
npm run dev
```
Starts the Vite dev server at `http://localhost:5173`.

### Running Tests
```bash
npm run test
```
Executes the Vitest test suite with JSDOM canvas mocks (27 tests covering data integrity, navigation, structure, and chart tooltips).

### Linting
```bash
npm run lint
```
Runs OxLint across all TypeScript and TSX files.

### Production Build
```bash
npm run build
```
Type-checks with `tsc -b` and compiles optimized production bundles in `dist/`.

---

## Contact & Connect

- **Email**: [patelmanav0805@gmail.com](mailto:patelmanav0805@gmail.com)
- **LinkedIn**: [linkedin.com/in/manav-patel-97b485284](https://www.linkedin.com/in/manav-patel-97b485284/)
- **GitHub**: [github.com/manavpatel08](https://github.com/manavpatel08)
- **Resume**: [View PDF Resume](https://drive.google.com/file/d/1uKaPGXwmxHfykgmwoiylXJNkW31Hi1wU/view?usp=drive_link)

---

&copy; 2026 Manav Patel. All rights reserved.
